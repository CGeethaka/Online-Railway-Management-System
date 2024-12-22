-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: railwaysystem
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `trains`
--

DROP TABLE IF EXISTS `trains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trains` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainNumber` varchar(20) DEFAULT NULL,
  `trainName` varchar(100) DEFAULT NULL,
  `origin` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `departure` varchar(100) DEFAULT NULL,
  `arrival` varchar(100) DEFAULT NULL,
  `firstClassCompartments` varchar(10) DEFAULT NULL,
  `secondClassCompartments` varchar(10) DEFAULT NULL,
  `thirdClassCompartments` varchar(10) DEFAULT NULL,
  `direction` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `stops` varchar(225) DEFAULT NULL,
  `days` varchar(225) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `destinationValue` varchar(45) DEFAULT NULL,
  `originValue` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trains`
--

LOCK TABLES `trains` WRITE;
/*!40000 ALTER TABLE `trains` DISABLE KEYS */;
INSERT INTO `trains` VALUES (19,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-08-20 05:49:55','2023-08-20 05:49:55',NULL,NULL,NULL,NULL,NULL),(20,'Test001','Udarata Manike','006','007','04:00','04:07','0','0','6','down','2023-08-20 05:55:58','2023-08-20 05:55:58','[\"sec-1\",\"000\",\"001\",\"002\",\"003\",\"004\",\"005\",\"006\",\"007\",\"008\",\"sec-2\",\"009\",\"010\",\"011\",\"012\"]','[\"Sun\"]','slow','Dehiwala','Wellawatte'),(21,'Test003','Podi manike','015','000','04:00','04:12','0','0','6','up','2023-08-20 07:46:58','2023-08-20 07:46:58','[\"station-sections\",\"015\",\"014\",\"013\",\"012\",\"011\",\"010\",\"009\",\"008\",\"007\",\"006\",\"005\",\"004\",\"003\",\"002\",\"001\",\"000\"]','','slow','Maradana','Panadura'),(22,'Test004','Podi manike','027','000','04:00','06:12','0','0','6','up','2023-08-20 07:54:10','2023-08-20 07:54:10','[\"station-sections\",\"000\",\"001\",\"002\",\"003\",\"004\",\"005\",\"006\",\"007\",\"008\",\"009\",\"010\",\"011\",\"012\",\"013\",\"014\",\"015\",\"016\",\"017\",\"018\",\"019\",\"020\",\"021\",\"022\",\"023\",\"024\",\"025\",\"026\",\"027\"]','','slow','Maradana','Aluthgama'),(23,'Test005','Podi manike','027','000','05:00','07:12','0','0','6','up','2023-08-20 07:56:08','2023-08-20 07:56:08','[\"station-sections\",\"027\",\"026\",\"025\",\"024\",\"023\",\"022\",\"021\",\"020\",\"019\",\"018\",\"017\",\"016\",\"015\",\"014\",\"013\",\"012\",\"011\",\"010\",\"009\",\"008\",\"007\",\"006\",\"005\",\"004\",\"003\",\"002\",\"001\",\"000\"]','sun,mon,tue,wed,thu,fri,sat','slow','Maradana','Aluthgama');
/*!40000 ALTER TABLE `trains` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-22 10:56:14
