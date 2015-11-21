-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2015 at 04:53 PM
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
-- Table structure for table `itemsavailable`
--

CREATE TABLE IF NOT EXISTS `itemsavailable` (
  `Itemid` int(11) NOT NULL DEFAULT '0',
  `sellingPrice` int(11) DEFAULT NULL,
  `QuantityAvailable` int(11) DEFAULT NULL,
  `Discount` int(11) DEFAULT NULL,
  `NickName` varchar(50) NOT NULL DEFAULT '',
  `ImagePath` varchar(1200) DEFAULT NULL,
  PRIMARY KEY (`Itemid`,`NickName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemsavailable`
--

INSERT INTO `itemsavailable` (`Itemid`, `sellingPrice`, `QuantityAvailable`, `Discount`, `NickName`, `ImagePath`) VALUES
(2, 320, 100, 10, 'raymond1', 'images/STContent/raymond.jpg'),
(3, 160, 200, 10, 'ocm2', 'images/STContent/OCM-Logo.jpg'),
(4, 170, 220, 20, 'rap3', 'images/STContent/Reid & Taylor _New Logo.jpg'),
(6, 170, 220, 20, 'digjam1', 'images/STContent/digjam_logo.png');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `itemsavailable`
--
ALTER TABLE `itemsavailable`
  ADD CONSTRAINT `itemsavailable_ibfk_1` FOREIGN KEY (`Itemid`) REFERENCES `purchaseitems` (`Itemid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
