DROP TABLE `weather_record`;--> statement-breakpoint
ALTER TABLE `route` RENAME COLUMN `duration` TO `duration_minutes`;--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `aircraft` ADD `status` text NOT NULL;--> statement-breakpoint
ALTER TABLE `aircraft` ADD `passenger_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `aircraft` ADD `pilot_id` text;--> statement-breakpoint
ALTER TABLE `aircraft` ADD `crew_member_id` text;--> statement-breakpoint
ALTER TABLE `airline` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `airline` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `crew_member` ADD `aircraft_id` text;--> statement-breakpoint
ALTER TABLE `flight` ADD `price` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `passenger` ADD `airline_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `passenger` ADD `registeration_date` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `pilot` ADD `aircraft_id` text REFERENCES aircraft(id);--> statement-breakpoint
CREATE UNIQUE INDEX `airline_name_unique` ON `airline` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `airline_email_unique` ON `airline` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `passenger_phone_unique` ON `passenger` (`phone`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `airport` DROP COLUMN `airline_id`;--> statement-breakpoint
ALTER TABLE `ticket` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `ticket` DROP COLUMN `price`;