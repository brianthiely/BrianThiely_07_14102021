-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2021-10-22 23:46:25',
  `updatedAt` datetime NOT NULL DEFAULT '2021-10-22 23:46:25',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachement` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2021-10-22 23:46:24',
  `updatedAt` datetime NOT NULL DEFAULT '2021-10-22 23:46:24',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (97,1,'just setting up groupomania\n',NULL,'2021-11-10 20:01:44','2021-11-10 20:01:44'),(100,40,'FIRST !!',NULL,'2021-11-10 20:15:56','2021-11-10 20:15:56'),(104,37,'DEUZ !!',NULL,'2021-11-12 09:08:17','2021-11-12 09:12:43');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20211016093757-create-user-test.js'),('20211016133819-create-post-test.js'),('20211017225541-create-comments.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2021-10-22 23:46:24',
  `updatedAt` datetime NOT NULL DEFAULT '2021-10-22 23:46:24',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ox6Yt1J576w8rCptPT8NDN/RhxMuRPqbaaxup67WyA8LLy/PKPD0nEj0dBXb5j926vZaJfgd1ukHlUJs8wCwUQ==','$2b$10$a.vPG3gRBXouUFfw/Y3/Oe8UiR0vLUMnGLrIOsd9dozCnGcKgnXJK','Jack','Dorsey',1,'2021-10-22 23:48:10','2021-11-04 13:23:01'),(2,'6+5pZim1/mnsRyCpwol2kibvGWVl6nlDkKTT/yin4G2nCQaoeXBTSkl1kLHTalcLOLaWWodkWhvjRohpVVpMtw==','$2b$10$cE0B8qywQwVS2rv73v6Mpu7Wy0sQmHD/ztLdt4MIMH7jzNvDdQsIu','Brian','Thiely',0,'2021-10-22 23:48:35','2021-10-22 23:48:35'),(35,'lkyCR1vBfnH6m0Pmb9Zm1V66dl9uEXmK3L8cYTqQiu69R8jZO1zrnVamrRlZuTb9xZmnRn5A37JX2gOfyQ5JMQ==','$2b$10$7xOnk0v7DEbVwXJycpaeRuZyQCQLz.5H854msTVDEj.YzXKMOJKKu','Idona','Alexander',0,'2021-11-07 12:40:57','2021-11-07 12:40:57'),(36,'eDA6iSpZCZmtQ3KIVhWuNy9z80UUlR73X4pSnWTDkI8hlJJTsZAFl8DJLVV7JhxhxlsxCX+DkDiq1CIXBijGRg==','$2b$10$UOuz5ULnlCy0kGipxJ18juXGkgyo3RnHgfUKktgyesmQXljC9b6hu','Felicia','Gill',0,'2021-11-07 18:53:38','2021-11-07 18:53:38'),(37,'w57mk1SWjvRxty1jQF3T3TDzpFDYZIyM+CuqLUgBd+rA8UkoRcLODjcjJpakA4gThVjb4pgowBgbc/Oad8DfMw==','$2b$10$a0Z2sbwOXzhU.qPei/Vq9eOH3eivglYSZAgfIcAOQ0e.72X3bOuEK','Echo','Estrada',0,'2021-11-07 19:03:42','2021-11-07 19:03:42'),(40,'ty+zmhoVh5ujC4T02yWVpHYHKu1pbDk1TNiGrgGDSaTNcBRBX46cDL/d+aobpfXwpy4J/u75Ux8FYNvDmg6X8A==','$2b$10$xdhGbU5a/T44i3OY/r.04e.0zro6GRJEgB/A9SFopelbzCl95dzIO','Cassady','Hartman',0,'2021-11-10 19:50:45','2021-11-10 19:50:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-12 15:36:39