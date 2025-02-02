--
--    Copyright 2010-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

-- // created task table
-- Migration SQL that makes the change goes here.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create Table tasks(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title varchar NOT NULL,
        created_at TIMESTAMPTZ DEFAULT Now(),
	modified_at TIMESTAMPTZ DEFAULT Now(),
	postedby_id varchar not null,
	status_id varchar not null,
	state char default 'P',
	priority_id varchar not null,
	description varchar,
	assinged_to varchar,
        expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '2 days'
       );


-- //@UNDO
-- SQL to undo the change goes here.
DROP TABLE tasks;

