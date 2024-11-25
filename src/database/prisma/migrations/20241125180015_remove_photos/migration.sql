/*
  Warnings:

  - You are about to drop the `players_photos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams_photos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_photos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "players_photos" DROP CONSTRAINT "players_photos_player_id_fkey";

-- DropForeignKey
ALTER TABLE "teams_photos" DROP CONSTRAINT "teams_photos_team_id_fkey";

-- DropForeignKey
ALTER TABLE "users_photos" DROP CONSTRAINT "users_photos_user_id_fkey";

-- DropTable
DROP TABLE "players_photos";

-- DropTable
DROP TABLE "teams_photos";

-- DropTable
DROP TABLE "users_photos";
