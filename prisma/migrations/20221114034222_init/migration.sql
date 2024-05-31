-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `type` VARCHAR(15) NOT NULL,
    `provider` VARCHAR(15) NOT NULL,
    `providerAccountId` VARCHAR(50) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(50) NULL,
    `scope` TEXT NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `accounts_userId_idx`(`userId`),
    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(40) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `sessions_sessionToken_key`(`sessionToken`),
    INDEX `sessions_sessionToken_idx`(`sessionToken`),
    INDEX `sessions_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `roles` VARCHAR(191) NOT NULL DEFAULT 'guest',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_name_idx`(`name`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtokens` (
    `token` VARCHAR(50) NOT NULL,
    `identifier` VARCHAR(50) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `verificationtokens_identifier_token_key`(`identifier`, `token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userprefs` (
    `id` VARCHAR(191) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `theme` MEDIUMTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `userprefs_userId_key`(`userId`),
    INDEX `userprefs_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todocategory` (
    `userId` CHAR(36) NOT NULL,
    `id` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parentId` DATETIME NULL,
    `name` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`userId`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todocatentry` (
    `userId` CHAR(36) NOT NULL,
    `categoryId` DATETIME NOT NULL,
    `entryId` DATETIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `todocatentry_userId_categoryId_key`(`userId`, `categoryId`),
    UNIQUE INDEX `todocatentry_userId_entryId_key`(`userId`, `entryId`),
    PRIMARY KEY (`userId`, `categoryId`, `entryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todoposition` (
    `userId` CHAR(36) NOT NULL,
    `categoryId` DATETIME NOT NULL,
    `entryposition` LONGTEXT NOT NULL,

    PRIMARY KEY (`userId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todoentry` (
    `userId` CHAR(36) NOT NULL,
    `id` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` TEXT NOT NULL,
    `entry` LONGTEXT NOT NULL,

    PRIMARY KEY (`userId`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userprefs` ADD CONSTRAINT `userprefs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todocategory` ADD CONSTRAINT `todocategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todocategory` ADD CONSTRAINT `todocategory_userId_id_fkey` FOREIGN KEY (`userId`, `id`) REFERENCES `todocatentry`(`userId`, `categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todoposition` ADD CONSTRAINT `todoposition_userId_categoryId_fkey` FOREIGN KEY (`userId`, `categoryId`) REFERENCES `todocategory`(`userId`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todoentry` ADD CONSTRAINT `todoentry_userId_id_fkey` FOREIGN KEY (`userId`, `id`) REFERENCES `todocatentry`(`userId`, `entryId`) ON DELETE CASCADE ON UPDATE CASCADE;
