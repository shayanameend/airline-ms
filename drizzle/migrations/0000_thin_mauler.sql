CREATE TABLE `accident_record` (
	`id` text PRIMARY KEY NOT NULL,
	`flight_id` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `aircraft` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`status` text DEFAULT 'operable' NOT NULL,
	`make` text NOT NULL,
	`model` text NOT NULL,
	`capacity` integer NOT NULL,
	`passenger_count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `airline` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`country` text NOT NULL,
	`year` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `airport` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`country` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `crew_member` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `flight` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`route_id` text NOT NULL,
	`aircraft_id` text NOT NULL,
	`departure` integer NOT NULL,
	`arrival` integer NOT NULL,
	`status` text NOT NULL,
	`price` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `maintenance_record` (
	`id` text PRIMARY KEY NOT NULL,
	`aircraft_id` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `passenger` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`registeration_date` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pilot` (
	`id` text PRIMARY KEY NOT NULL,
	`airline_id` text NOT NULL,
	`name` text NOT NULL,
	`flight_hours` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `route` (
	`id` text PRIMARY KEY NOT NULL,
	`departure_airport_id` text NOT NULL,
	`arrival_airport_id` text NOT NULL,
	`duration_minutes` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ticket` (
	`id` text PRIMARY KEY NOT NULL,
	`flight_id` text NOT NULL,
	`passenger_id` text NOT NULL,
	`date` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `crew_members_to_flights` (
	`crew_member_id` text NOT NULL,
	`flight_id` text NOT NULL,
	PRIMARY KEY(`crew_member_id`, `flight_id`),
	FOREIGN KEY (`crew_member_id`) REFERENCES `crew_member`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`flight_id`) REFERENCES `flight`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pilots_to_flights` (
	`pilot_id` text NOT NULL,
	`flight_id` text NOT NULL,
	PRIMARY KEY(`flight_id`, `pilot_id`),
	FOREIGN KEY (`pilot_id`) REFERENCES `pilot`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`flight_id`) REFERENCES `flight`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `airline_name_unique` ON `airline` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `airline_email_unique` ON `airline` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `passenger_phone_unique` ON `passenger` (`phone`);