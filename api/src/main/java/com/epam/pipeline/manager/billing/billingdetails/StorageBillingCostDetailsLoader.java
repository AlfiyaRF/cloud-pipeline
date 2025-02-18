/*
 * Copyright 2023 EPAM Systems, Inc. (https://www.epam.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.epam.pipeline.manager.billing.billingdetails;

import com.epam.pipeline.controller.vo.billing.BillingCostDetailsRequest;
import com.epam.pipeline.entity.billing.BillingChartDetails;
import com.epam.pipeline.entity.billing.BillingDiscount;
import com.epam.pipeline.entity.billing.BillingGrouping;
import com.epam.pipeline.entity.billing.StorageBillingChartCostDetails;
import com.epam.pipeline.entity.billing.StorageBillingChartCostDetails.StorageBillingDetails;
import com.epam.pipeline.manager.billing.BillingUtils;
import com.epam.pipeline.manager.utils.ElasticSearchUtils;
import com.epam.pipeline.utils.NumericUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.ParsedSingleValueNumericMetricsAggregation;
import org.elasticsearch.search.aggregations.metrics.avg.AvgAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.sum.SumAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.tophits.ParsedTopHits;
import org.elasticsearch.search.aggregations.metrics.tophits.TopHitsAggregationBuilder;
import org.elasticsearch.search.aggregations.pipeline.PipelineAggregatorBuilders;
import org.elasticsearch.search.aggregations.pipeline.bucketmetrics.sum.SumBucketPipelineAggregationBuilder;
import org.elasticsearch.search.aggregations.pipeline.cumulativesum.CumulativeSumPipelineAggregationBuilder;
import org.elasticsearch.search.sort.SortOrder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class StorageBillingCostDetailsLoader {

    private static final String STORAGES_SIZE_DETAILS = "storages_size_details";
    private static final String LATEST = "_latest";

    private static final String ACCUM_SUM_PREFIX = "accum_";
    private static final String STORAGE_RT = "STORAGE";
    private static final String OBJECT_STORAGE_ST = "OBJECT_STORAGE";
    private static final String RT_FILTER = "resource_type";
    private static final String ST_FILTER = "storage_type";
    private static final String SC_COST_TEMPLATE = "%s_cost";
    private static final String SC_USAGE_TEMPLATE = "%s_usage_bytes";
    private static final String SC_OV_COST_TEMPLATE = "%s_ov_cost";
    private static final String SC_OV_USAGE_TEMPLATE = "%s_ov_usage_bytes";
    public static final Map<String, String> STORAGE_CLASSES =
            Stream.of(
                    ImmutablePair.of("STANDARD", "Standard Layer"),
                    ImmutablePair.of("GLACIER", "Glacier"),
                    ImmutablePair.of("GLACIER_IR", "Glacier IR"),
                    ImmutablePair.of("DEEP_ARCHIVE", "Deep Archive")
            ).collect(Collectors.toMap(Pair::getKey, Pair::getValue));
    public static final List<String> STORAGE_COST_DETAILS_AGGREGATION_MASKS = Arrays.asList(
            "_cost", "_ov_cost", "_usage_bytes", "_ov_usage_bytes",
            "_ov_usage_bytes_latest.hits.hits._source", "_usage_bytes_latest.hits.hits._source"
    );

    private StorageBillingCostDetailsLoader() {}

    public static void buildQuery(final BillingCostDetailsRequest request, final AggregationBuilder topAgg) {
        final long storageDiscount = Optional.ofNullable(request.getDiscount())
                .map(BillingDiscount::getStorages).orElse(0).longValue();
        if (request.getGrouping() == BillingGrouping.STORAGE) {
            // Since we build topAgg as Term agg for storage (bucket is storage), we can just calculate
            // cost as sum and size as avg + for current size we can grab last value
            for (String storageClass : STORAGE_CLASSES.keySet()) {
                final String sc = storageClass.toLowerCase(Locale.ROOT);
                topAgg.subAggregation(buildSumAggregation(SC_COST_TEMPLATE, sc, storageDiscount));
                topAgg.subAggregation(buildSumAggregation(SC_OV_COST_TEMPLATE, sc, storageDiscount));
                topAgg.subAggregation(buildAvgAggregation(SC_USAGE_TEMPLATE, sc));
                topAgg.subAggregation(buildAvgAggregation(SC_OV_USAGE_TEMPLATE, sc));
                topAgg.subAggregation(buildLastByDateHitAggregation(SC_USAGE_TEMPLATE, sc));
                topAgg.subAggregation(buildLastByDateHitAggregation(SC_OV_USAGE_TEMPLATE, sc));
            }
        } else {
            // Here we work with grouping such as STORAGE_TYPE, or even with interval query with filters
            // So we need to calculate size for storages as avg first and then sum it
            final TermsAggregationBuilder avgUsageOfStorageAgg = AggregationBuilders.terms(STORAGES_SIZE_DETAILS)
                    .field(BillingUtils.STORAGE_ID_FIELD).size(Integer.MAX_VALUE);
            for (String storageClass : STORAGE_CLASSES.keySet()) {
                final String sc = storageClass.toLowerCase(Locale.ROOT);
                topAgg.subAggregation(buildSumAggregation(SC_COST_TEMPLATE, sc, storageDiscount));
                topAgg.subAggregation(buildSumAggregation(SC_OV_COST_TEMPLATE, sc, storageDiscount));
                avgUsageOfStorageAgg.subAggregation(buildAvgAggregation(SC_USAGE_TEMPLATE, sc));
                avgUsageOfStorageAgg.subAggregation(buildAvgAggregation(SC_OV_USAGE_TEMPLATE, sc));
                topAgg.subAggregation(buildPipelineSumAggregation(STORAGES_SIZE_DETAILS, SC_USAGE_TEMPLATE, sc));
                topAgg.subAggregation(buildPipelineSumAggregation(STORAGES_SIZE_DETAILS, SC_OV_USAGE_TEMPLATE, sc));
                if (request.isHistogram()) {
                    topAgg.subAggregation(buildAccumulativeSumAggregation(SC_COST_TEMPLATE, sc));
                    topAgg.subAggregation(buildAccumulativeSumAggregation(SC_OV_COST_TEMPLATE, sc));
                }
            }
            topAgg.subAggregation(avgUsageOfStorageAgg);
        }
    }

    public static BillingChartDetails parseResponse(final BillingCostDetailsRequest request,
                                                    final Aggregations aggregations) {
        final List<StorageBillingDetails> tiers = new ArrayList<>();
        for (String sc : STORAGE_CLASSES.keySet()) {
            final StorageBillingDetails.StorageBillingDetailsBuilder detailsBuilder =
                    StorageBillingDetails.builder().storageClass(sc);
            detailsBuilder.cost(fetchSimpleAggregationValue(SC_COST_TEMPLATE, sc, aggregations));
            detailsBuilder.oldVersionCost(fetchSimpleAggregationValue(SC_OV_COST_TEMPLATE, sc, aggregations));
            detailsBuilder.avgSize(fetchSimpleAggregationValue(SC_USAGE_TEMPLATE, sc, aggregations));
            detailsBuilder.oldVersionAvgSize(fetchSimpleAggregationValue(SC_OV_USAGE_TEMPLATE, sc, aggregations));
            if (request.getGrouping() == BillingGrouping.STORAGE) {
                detailsBuilder.size(fetchLastByDateHitValue(SC_USAGE_TEMPLATE, sc, aggregations));
                detailsBuilder.oldVersionSize(fetchLastByDateHitValue(SC_OV_USAGE_TEMPLATE, sc, aggregations));
            }
            if (request.isHistogram()) {
                detailsBuilder.accumulativeCost(fetchSimpleAggregationValue(
                        ACCUM_SUM_PREFIX + SC_COST_TEMPLATE, sc, aggregations));
                detailsBuilder.accumulativeOldVersionCost(fetchSimpleAggregationValue(
                        ACCUM_SUM_PREFIX + SC_OV_COST_TEMPLATE, sc, aggregations));
            }
            final StorageBillingDetails details = detailsBuilder.build();
            if (!isDetailsEntryEmpty(details)) {
                tiers.add(details);
            }
        }
        return StorageBillingChartCostDetails.builder().tiers(tiers).build();
    }

    static boolean isBillingDetailsShouldBeLoaded(final BillingCostDetailsRequest request) {
        if (!request.isEnabled()) {
            return false;
        }
        final BillingGrouping grouping = request.getGrouping();
        if (BillingGrouping.STORAGE.equals(grouping) || BillingGrouping.STORAGE_TYPE.equals(grouping)) {
            return true;
        } else {
            final Map<String, List<String>> filters = MapUtils.emptyIfNull(request.getFilters());
            final Boolean onlyStorageRTypeRequestedOrNothing = Optional.ofNullable(filters.get(RT_FILTER))
                    .map(values -> (values.contains(STORAGE_RT) && values.size() == 1) || values.isEmpty())
                    .orElse(true);
            final Boolean onlyObjectStorageSTypeRequested = Optional.ofNullable(filters.get(ST_FILTER))
                    .map(values -> values.contains(OBJECT_STORAGE_ST) && values.size() == 1).orElse(false);
            return onlyObjectStorageSTypeRequested && onlyStorageRTypeRequestedOrNothing;
        }
    }

    static List<String> getCostDetailsAggregations() {
        return STORAGE_COST_DETAILS_AGGREGATION_MASKS;
    }

    private static boolean isDetailsEntryEmpty(StorageBillingDetails details) {
        return NumericUtils.isZero(details.getCost()) && NumericUtils.isZero(details.getSize())
                && NumericUtils.isZero(details.getAvgSize()) && NumericUtils.isZero(details.getOldVersionCost())
                && NumericUtils.isZero(details.getOldVersionSize())
                && NumericUtils.isZero(details.getOldVersionAvgSize());
    }

    private static long fetchSimpleAggregationValue(final String template, final String storageClass,
                                                    final Aggregations aggregations) {
        final String costAggName = String.format(template, storageClass.toLowerCase(Locale.ROOT));
        return Optional.ofNullable(aggregations)
                .map(aggs -> aggs.<ParsedSingleValueNumericMetricsAggregation>get(costAggName))
                .map(ParsedSingleValueNumericMetricsAggregation::value)
                .filter(it -> !it.isInfinite())
                .map(Double::longValue).orElse(0L);
    }

    private static long fetchLastByDateHitValue(final String template, final String sc,
                                                final Aggregations aggregations) {
        final String field = String.format(template, sc.toLowerCase(Locale.ROOT));
        return Optional.ofNullable(aggregations)
                .map(aggs -> (ParsedTopHits) aggs.get(field + LATEST))
                .map(ParsedTopHits::getHits)
                .map(SearchHits::getHits)
                .filter(storageDocs -> storageDocs.length > 0)
                .map(storageDocs -> storageDocs[0])
                .map(SearchHit::getSourceAsMap)
                .map(source -> source.get(field))
                .map(l -> l instanceof Long ? (Long) l : (Integer) l)
                .orElse(0L);
    }

    private static CumulativeSumPipelineAggregationBuilder buildAccumulativeSumAggregation(
            final String template, final String storageClass) {
        final String agg = getAggregationField(template, storageClass);
        return PipelineAggregatorBuilders.cumulativeSum(ACCUM_SUM_PREFIX + agg, agg);
    }

    private static TopHitsAggregationBuilder buildLastByDateHitAggregation(final String template,
                                                                           final String storageClass) {
        final String agg = getAggregationField(template, storageClass);
        return AggregationBuilders.topHits(agg + LATEST).size(1).fetchSource(agg, null)
                .sort(BillingUtils.BILLING_DATE_FIELD, SortOrder.DESC);
    }

    private static SumAggregationBuilder buildSumAggregation(final String template, final String storageClass,
                                                             final long discount) {
        final String agg = getAggregationField(template, storageClass);
        return BillingUtils.aggregateDiscountCostSum(agg, discount);
    }

    private static AvgAggregationBuilder buildAvgAggregation(final String template, final String storageClass) {
        final String agg = getAggregationField(template, storageClass);
        return AggregationBuilders.avg(agg).field(agg);
    }

    private static SumBucketPipelineAggregationBuilder buildPipelineSumAggregation(final String parentAgg,
                                                                                   final String template,
                                                                                   final String storageClass) {
        final String agg = getAggregationField(template, storageClass);
        return PipelineAggregatorBuilders.sumBucket(agg, ElasticSearchUtils.fieldsPath(parentAgg, agg));
    }

    private static String getAggregationField(String template, String field) {
        return String.format(template, field);
    }
}
