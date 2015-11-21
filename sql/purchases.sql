-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2014 at 06:44 PM
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
-- Table structure for table `purchases`
--

CREATE TABLE IF NOT EXISTS `purchases` (
  `PurchaseId` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `brand` varchar(20) DEFAULT NULL,
  `quality` varchar(50) DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `length` int(10) DEFAULT NULL,
  `costprice` int(20) DEFAULT NULL,
  `dateofpurchase` datetime DEFAULT NULL,
  `purchasedfrom` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PurchaseId`),
  KEY `type` (`type`,`brand`,`quality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`type`, `brand`, `quality`) REFERENCES `brandquality` (`Type`, `Brand`, `Quality`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
