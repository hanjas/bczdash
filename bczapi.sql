DROP DATABASE bczdashapi;
CREATE DATABASE bczdashapi;
USE bczdashapi;

DROP TABLE IF EXISTS `widgets`;
CREATE TABLE `widgets` (
  `miles` double(8,2) NOT NULL,
  `fuel` double(8,2) NOT NULL,
  `time` bigint(20) NOT NULL,
  KEY `widgets_miles_index` (`miles`),
  KEY `widgets_fuel_index` (`fuel`),
  KEY `widgets_time_index` (`time`)
);
LOCK TABLES `widgets` WRITE;
INSERT INTO `widgets` VALUES(15.00,8.00,1534530806000);
UNLOCK TABLES;
