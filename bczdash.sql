-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: bczdash
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assetinfo`
--

DROP TABLE IF EXISTS `assetinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assetinfo` (
  `assetpath` varchar(500) NOT NULL,
  `meta` text,
  PRIMARY KEY (`assetpath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assetinfo`
--

LOCK TABLES `assetinfo` WRITE;
/*!40000 ALTER TABLE `assetinfo` DISABLE KEYS */;
INSERT INTO `assetinfo` VALUES ('/2/1','{}'),('/2/1/2/2','{}'),('/2/1/2/2/3/3','{}'),('/2/1/3/6','{}');
/*!40000 ALTER TABLE `assetinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets` (
  `assetid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `assettype` varchar(300) DEFAULT NULL,
  `assetpath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`assetid`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (1,'Blueciphers','2','/2/1'),(2,'Thirdeye','2','/2/1/2/2'),(3,'thirdeyeadmin','3','/2/1/2/2/3/3'),(5,'roshan@blueciphers.com','1','/2/1/1/5'),(6,'blueadmin','3','/2/1/3/6'),(8,'doctorspot','4','/2/1/4/8'),(9,'thirdeye@blueciphers.com','1','/2/1/2/2/1/9'),(10,'starcool','4','/2/1/2/2/4/10');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assettype`
--

DROP TABLE IF EXISTS `assettype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assettype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assettype`
--

LOCK TABLES `assettype` WRITE;
/*!40000 ALTER TABLE `assettype` DISABLE KEYS */;
INSERT INTO `assettype` VALUES (2,'com.blueciphers.assets.group'),(6,'com.blueciphers.assets.page'),(5,'com.blueciphers.assets.payment'),(4,'com.blueciphers.assets.product'),(3,'com.blueciphers.assets.role'),(1,'com.blueciphers.assets.user.localuser');
/*!40000 ALTER TABLE `assettype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `permid` int(11) NOT NULL AUTO_INCREMENT,
  `w` tinyint(1) DEFAULT NULL,
  `r` tinyint(1) DEFAULT NULL,
  `assetpath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`permid`),
  UNIQUE KEY `w` (`w`,`r`,`assetpath`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (5,1,1,'/2/1/2/2/4/10'),(2,1,1,'/2/1/4/8');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productinfo`
--

DROP TABLE IF EXISTS `productinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productinfo` (
  `assetpath` varchar(500) NOT NULL,
  `productcost` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `meta` text,
  PRIMARY KEY (`assetpath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productinfo`
--

LOCK TABLES `productinfo` WRITE;
/*!40000 ALTER TABLE `productinfo` DISABLE KEYS */;
INSERT INTO `productinfo` VALUES ('/2/1/2/2/4/10',13500,0,'{}'),('/2/1/4/8',12000,0,'{}');
/*!40000 ALTER TABLE `productinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_perm`
--

DROP TABLE IF EXISTS `role_perm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_perm` (
  `rolepath` varchar(500) NOT NULL,
  `permid` int(11) NOT NULL,
  PRIMARY KEY (`rolepath`,`permid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_perm`
--

LOCK TABLES `role_perm` WRITE;
/*!40000 ALTER TABLE `role_perm` DISABLE KEYS */;
INSERT INTO `role_perm` VALUES ('/2/1/2/2/3/3',1),('/2/1/2/2/3/3',5),('/2/1/3/6',1),('/2/1/3/6',2);
/*!40000 ALTER TABLE `role_perm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `assetpath` varchar(500) NOT NULL,
  `userpath` varchar(500) NOT NULL,
  `amount` double DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `meta` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`assetpath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('/2/1/2/2/4/10','/2/1/2/2/1/9',4000,1234556767,'{}');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `userpath` varchar(500) NOT NULL,
  `rolepath` varchar(500) NOT NULL,
  PRIMARY KEY (`userpath`,`rolepath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('/2/1/1/5','/2/1/3/6'),('/2/1/2/2/1/9','/2/1/2/2/3/3');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assetpath` varchar(500) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `meta` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'/2/1/1/5','$2a$08$0Lc8p1GmdcpdR/WoA6/oL.zvlMmZ3oGPrtOIWz/5kku/5HPNaKsUK','{}'),(2,'/2/1/2/2/1/9','$2a$08$kDoFj7fwzImN5TuNBGrmQef4/AePkufDmFvE1sdjPN7g2Y4uIEmZ.','{}');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-17  0:08:46
