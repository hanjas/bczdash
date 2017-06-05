DROP DATABASE IF EXISTS bczdash;
CREATE DATABASE bczdash;
USE bczdash;


DROP TABLE IF EXISTS `assetinfo`;
CREATE TABLE `assetinfo` (
  `assetpath` varchar(500) NOT NULL,
  `meta` text,
  PRIMARY KEY (`assetpath`)
);

DROP TABLE IF EXISTS `assets`;
CREATE TABLE `assets` (
  `assetid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `assettype` varchar(300) DEFAULT NULL,
  `assetpath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`assetid`,`name`)
);

DROP TABLE IF EXISTS `assettype`;
CREATE TABLE `assettype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `permid` int(11) NOT NULL AUTO_INCREMENT,
  `w` tinyint(1) DEFAULT NULL,
  `r` tinyint(1) DEFAULT NULL,
  `assetpath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`permid`)
);


DROP TABLE IF EXISTS `role_perm`;
CREATE TABLE `role_perm` (
  `rolepath` varchar(500) NOT NULL,
  `permid` int(11) NOT NULL,
  PRIMARY KEY (`rolepath`,`permid`)
);


DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `userpath` varchar(500) NOT NULL,
  `rolepath` varchar(500) NOT NULL,
  PRIMARY KEY (`userpath`,`rolepath`)
);


DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assetpath` varchar(500) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `meta` text,
  PRIMARY KEY (`id`)
);
