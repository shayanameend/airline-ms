ALTER TABLE `aircraft` ADD `pilot_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `crew_member` ADD `aircraft_id` text;--> statement-breakpoint
ALTER TABLE `pilot` ADD `aircraft_id` text;