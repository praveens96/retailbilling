-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2015 at 04:55 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sadhanatextilesdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `purchaseitems`
--

CREATE TABLE IF NOT EXISTS `purchaseitems` (
  `Itemid` int(11) NOT NULL AUTO_INCREMENT,
  `purchaseId` int(11) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  `brandid` int(11) DEFAULT NULL,
  `ClothQualityID` int(11) DEFAULT NULL,
  `purchasedfrom` varchar(500) DEFAULT NULL,
  `costprice` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `ItemName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Itemid`),
  KEY `purchaseId` (`purchaseId`),
  KEY `ClothQualityID` (`ClothQualityID`),
  KEY `brandid` (`brandid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `purchaseitems`
--

INSERT INTO `purchaseitems` (`Itemid`, `purchaseId`, `typeid`, `brandid`, `ClothQualityID`, `purchasedfrom`, `costprice`, `quantity`, `ItemName`) VALUES
(2, 1, 1, 1, 1, 'wsretail', 230, 100, 'raymond1'),
(3, 1, 2, 2, 1, 'chandana', 130, 200, 'ocm2'),
(4, 2, 2, 2, 1, 'chandana', 130, 200, 'rap3'),
(6, 1, 2, 2, 3, 'bommana', 130, 200, 'digjam1');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchaseitems`
--
ALTER TABLE `purchaseitems`
  ADD CONSTRAINT `purchaseitems_ibfk_1` FOREIGN KEY (`purchaseId`) REFERENCES `purchases` (`purchaseId`),
  ADD CONSTRAINT `purchaseitems_ibfk_2` FOREIGN KEY (`ClothQualityID`) REFERENCES `quality` (`ClothQualityID`),
  ADD CONSTRAINT `purchaseitems_ibfk_3` FOREIGN KEY (`brandid`) REFERENCES `brands` (`BrandID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
