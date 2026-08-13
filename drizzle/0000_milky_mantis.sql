CREATE TABLE `fitnessProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`age` int,
	`sex` enum('female','male','nonbinary','undisclosed') NOT NULL DEFAULT 'undisclosed',
	`weightKg` decimal(6,2),
	`primaryGoal` enum('strength','endurance','weight_management','general_health') NOT NULL DEFAULT 'general_health',
	`experience` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fitnessProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `fitnessProfiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `workoutLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`exerciseName` varchar(160) NOT NULL,
	`sets` int NOT NULL,
	`reps` int NOT NULL,
	`loadKg` decimal(7,2) NOT NULL DEFAULT '0',
	`durationMinutes` int NOT NULL,
	`intensityRpe` int NOT NULL,
	`performedAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workoutLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `fitnessProfiles` ADD CONSTRAINT `fitnessProfiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workoutLogs` ADD CONSTRAINT `workoutLogs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `workout_user_performed_idx` ON `workoutLogs` (`userId`,`performedAt`);