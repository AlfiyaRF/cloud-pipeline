/*
 * Copyright 2017-2020 EPAM Systems, Inc. (https://www.epam.com/)
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

package com.epam.pipeline.controller.vo.billing;

import com.epam.pipeline.entity.billing.BillingDiscount;
import com.epam.pipeline.entity.billing.BillingGrouping;
import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.Map;

@Value
@Builder
public class BillingCostDetailsRequest {

    BillingGrouping grouping;
    Map<String, List<String>> filters;
    boolean isHistogram;
    BillingDiscount discount;
    boolean enabled;

}
