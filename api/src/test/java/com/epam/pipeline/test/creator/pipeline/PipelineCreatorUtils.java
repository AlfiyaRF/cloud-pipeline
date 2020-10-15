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

package com.epam.pipeline.test.creator.pipeline;

import com.epam.pipeline.entity.pipeline.PipelineRun;

import static com.epam.pipeline.test.creator.CommonCreatorConstants.ID;
import static com.epam.pipeline.test.creator.CommonCreatorConstants.ID_2;
import static com.epam.pipeline.test.creator.CommonCreatorConstants.TEST_STRING;

public final class PipelineCreatorUtils {

    public static PipelineRun getPipelineRunWithPermission() {
        PipelineRun pipelineRun = new PipelineRun();
        pipelineRun.setId(ID);
        pipelineRun.setOwner("SIMPLE_USER");
        return pipelineRun;
    }

    public static PipelineRun getPipelineRunWithoutPermission() {
        PipelineRun pipelineRun = new PipelineRun();
        pipelineRun.setId(ID_2);
        pipelineRun.setOwner(TEST_STRING);
        pipelineRun.setName(TEST_STRING);
        return pipelineRun;
    }
}
