-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: pweb
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `idfilm` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `casa_p` varchar(45) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `prezzo` double NOT NULL,
  `ora` time NOT NULL,
  `descr` varchar(200) NOT NULL,
  `n_big` int NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`idfilm`,`data`,`ora`),
  UNIQUE KEY `idfilm` (`idfilm`,`ora`,`data`),
  KEY `PRIMARY1` (`ora`) /*!80000 INVISIBLE */,
  KEY `PRIMARY2` (`data`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (0,'attack on titan 1','Wit Studio','1.jpg',6,'20:43:00','descrizione del film 1',1,'2022-02-28'),(1,'attack on titan 2','Mappa','2.jpg',6,'20:43:00','descrizione del film 2',2,'2022-02-28'),(2,'attack on titan 4','Mappa','5.jpg',6,'20:43:00','descrizione del film 3',5,'2022-02-05'),(2,'Matrix','Warner Bros','matrix.jpg',10,'20:43:00','descrizione del film 5',5,'2022-02-26'),(3,'Jujutsu Kaisen','Mappa','jjk.jpg',10,'20:43:00','descrizione del film 4',50,'2022-02-27'),(5,'Attack on Titan ','Wit Studio','9v2uiucf3aa81.jpg',5,'22:18:00','descrizione',10,'2022-02-28');
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prenotazione`
--

DROP TABLE IF EXISTS `prenotazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prenotazione` (
  `email` varchar(45) NOT NULL,
  `idfilm` int NOT NULL,
  `data` date NOT NULL,
  `ora` time NOT NULL,
  KEY `prenotazione_ibfk_1` (`idfilm`,`ora`,`data`) /*!80000 INVISIBLE */,
  KEY `prenotazione_ibfk_2` (`email`) /*!80000 INVISIBLE */,
  CONSTRAINT `prenotazione_ibfk_1` FOREIGN KEY (`idfilm`, `ora`, `data`) REFERENCES `film` (`idfilm`, `ora`, `data`) ON DELETE CASCADE,
  CONSTRAINT `prenotazione_ibfk_2` FOREIGN KEY (`email`) REFERENCES `utente` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazione`
--

LOCK TABLES `prenotazione` WRITE;
/*!40000 ALTER TABLE `prenotazione` DISABLE KEYS */;
/*!40000 ALTER TABLE `prenotazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` longtext NOT NULL,
  `admin` tinyint NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES ('ema','ema@uni.it','$2b$10$i4mI.S2yqM/l1cTWu7pXt.YUe0dTl69XSVpnKX2dR/MooK1ha2dZe',0),('musta','musta@uni.it','$2b$10$xxIBtXvJa0P3mo3pQCxQUOFkIXT2p55WIPASWJGbEfp5JSbv7H8gO',1);
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-14 21:41:38
