DROP TABLE IF EXISTS `asset`;
CREATE TABLE `asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `assettype` varchar(300) DEFAULT NULL,
  `assetpath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `assetpath` (`assetpath`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `assetinfo`;
CREATE TABLE `assetinfo` (
  `assetpath` varchar(500) DEFAULT NULL,
  `meta` text,
  UNIQUE KEY `assetpath` (`assetpath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `assettype`;
CREATE TABLE `assettype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assettype` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `userid` varchar(500) DEFAULT NULL,
  `productid` varchar(300) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `location` text,
  `timestamp` bigint(20) DEFAULT NULL,
  `api` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `assetpath` varchar(500) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `meta` text,
  UNIQUE KEY `assetpath` (`assetpath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
