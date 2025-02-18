/*
 * Copyright 2017-2019 EPAM Systems, Inc. (https://www.epam.com/)
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

package com.epam.pipeline.exception;

public class ConfigurationReadingException extends RuntimeException {

    public ConfigurationReadingException(String configFile, Throwable cause) {
        super(String.format("Failed to load pipeline configuration from file: %s", configFile), cause);
    }

    public ConfigurationReadingException(String configFile) {
        super(String.format("Failed to load pipeline configuration from file: %s", configFile));
    }

    public ConfigurationReadingException(Throwable cause) {
        super("Failed to parse configuration.", cause);
    }

    public ConfigurationReadingException() {
        super("Failed to parse configuration.");
    }
}
