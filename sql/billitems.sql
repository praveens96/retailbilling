-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2014 at 07:26 AM
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
-- Table structure for table `billitems`
--

CREATE TABLE IF NOT EXISTS `billitems` (
  `BillID` int(10) DEFAULT NULL,
  `ItemID` int(20) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(255) DEFAULT NULL,
  `Quantity` int(10) DEFAULT NULL,
  `Rate` int(20) DEFAULT NULL,
  `Amount` int(50) DEFAULT NULL,
  KEY `BillID` (`BillID`),
  KEY `fk_billitemID` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `billitems`
--
ALTER TABLE `billitems`
  ADD CONSTRAINT `billitems_ibfk_2` FOREIGN KEY (`BillID`) REFERENCES `bill` (`BillID`) ON DELETE CASCADE,
  ADD CONSTRAINT `billitems_ibfk_3` FOREIGN KEY (`BillID`) REFERENCES `bill` (`BillID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_billitemID` FOREIGN KEY (`ItemID`) REFERENCES `items` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
