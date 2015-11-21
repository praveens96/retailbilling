-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2014 at 09:17 AM
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
-- Table structure for table `brandquality`
--

CREATE TABLE IF NOT EXISTS `brandquality` (
  `Brand`` varchar(20) NOT NULL DEFAULT '',
  `Quality` varchar(20) NOT NULL DEFAULT '',
  `Type` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`Type`,`Brand`,`Quality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brandquality`
--

INSERT INTO `brandquality` (`Brand`, `Quality`, `Type`) VALUES
('arvind', 'qualno1', 'shirting'),
('arvind', 'qualno1', 'suiting'),
('arvind', 'qualno2', 'shirting'),
('arvind', 'qualno2', 'suiting'),
('digjam', 'qualno1', 'shirting'),
('digjam', 'qualno2', 'suiting'),
('ocm', 'qualno1', 'suiting'),
('oxemberg', 'qualno2', 'shirting'),
('oxemberg', 'qualno3', 'other'),
('raymond', 'qualno1', 'shirting'),
('raymond', 'qualno2', 'suiting'),
('RT', 'qualno1', 'shirting'),
('RT', 'qualno1', 'suiting'),
('RT', 'qualno3', 'shirting'),
('vimal', 'qualno1', 'shirting'),
('vimal', 'qualno1', 'suiting'),
('vimal', 'qualno3', 'suiting');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
