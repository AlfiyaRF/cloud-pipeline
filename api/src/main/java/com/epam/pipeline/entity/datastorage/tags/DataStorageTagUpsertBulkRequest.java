package com.epam.pipeline.entity.datastorage.tags;

import lombok.Value;

import java.util.List;

@Value
public class DataStorageTagUpsertBulkRequest {
    
    List<DataStorageTagUpsertRequest> requests;
}
