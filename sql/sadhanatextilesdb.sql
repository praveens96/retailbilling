-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:8806
-- Generation Time: Nov 21, 2015 at 06:48 AM
-- Server version: 5.6.26-log
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sadhanatextilesdb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `debug_msg`(enabled INTEGER, msg VARCHAR(255))
BEGIN
  IF enabled THEN BEGIN
    select concat("** ", msg) AS '** DEBUG:';
  END; END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_BillItemsDel`(IN `pBillID` INT(10))
BEGIN
   delete from billitems where billid like pBillID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_billitems_ins`(IN `pBillID` INT(10), IN `pItemID` INT(10), IN `pItemName` VARCHAR(255), IN `pQuantity` INT(10), IN `pRate` INT(20), IN `pAmount` INT(20))
BEGIN
	insert into billitems(billid,itemid,itemname,quantity,rate,amount)
    values(pBillID,pItemID,pItemName,pQuantity,pRate,pAmount);
    
    update sadhanatextilesdb.itemsavailable 
	set QuantityAvailable = QuantityAvailable -pQuantity
	where itemid = pItemID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CheckUser`(IN `pUsername` VARCHAR(50), IN `pPassword` VARCHAR(500))
BEGIN 
	select username,role from login where (username like pUsername and passwordhash like pPassword);
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_FetchAllItemDetails`(IN `pItemName` VARCHAR(128), OUT `pItemDetails` VARCHAR(1024))
    NO SQL
BEGIN
	
    SELECT purchasedfrom,@SelItemid:= Itemid, @SelType:=typeid, @SelBrandid:= Brandid, @SelQual:= ClothQualityID, @SelCostPrice:= costprice FROM `purchaseitems` WHERE ItemName = pItemName;

select @SelClothing:= ClothingType from typeofclothing where typeid = @SelItemid;

select @SelClothing, @SelBrand:=BrandName from brands where BrandID = @SelBrandid;

select @SelClothing,  @SelBrand, @SelClothQualityLevel:=ClothQualityLevel,@SelCostPrice from quality where ClothQualityID =  @SelQual;


select @SelClothing,  @SelBrand, @SelClothQualityLevel,@SelSP:= IA.sellingPrice, @SelDiscount:= IA.Discount,@SelNickName:= IA.NickName, @SelImagePath:= IA.ImagePath
from itemsavailable IA,typeofclothing TC,Brands Br,Quality Qual  where Itemid = @SelItemid;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_bill`(IN `pCustomerName` VARCHAR(50), IN `pBillDate` DATETIME, IN `pBillAmount` INT(20), IN `pDiscount` INT(20), IN `pamountreceived` INT(11), IN `pbalancetendered` INT(11), IN `pCustomerMobile` BIGINT(10), IN `pNetAmount` INT, OUT `pLastInsertID` INT, IN `pBillID` INT(10), IN `pTaxAmount` INT(50), IN `pBiller` VARCHAR(50))
BEGIN
delete from bill where billid like pBillID;
	Insert into bill(billid,customername,BillDate,Billamount,discount,amountreceived,balancetendered,CustomerMobileNo,NetBillAmount,TaxAmount,Biller)
    values(pBillID,pCustomerName,pBillDate,pBillAmount,pDiscount,pamountreceived,pbalancetendered,pCustomerMobile,pNetAmount,pTaxAmount,pBiller);

set pLastInsertID = last_insert_id();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Purchases`(IN `pPurchaseName` VARCHAR(128), IN `pPurchaseDate` DATE, IN `pPurchasedFrom` VARCHAR(128), IN `pItemType` VARCHAR(30), IN `pBrandName` VARCHAR(128), IN `pQuality` VARCHAR(30), IN `pCostPrice` INT(20), IN `pPurchaseQuantity` INT(20), IN `pItemName` VARCHAR(128), IN `pSellingPrice` INT(30), IN `pDiscount` INT(30), IN `pNickName` VARCHAR(128), IN `pImagePath` VARCHAR(512))
    NO SQL
BEGIN
    DECLARE lid_purchases int;
    DECLARE lid_typeofclothing int;
    DECLARE lid_brand int;
    DECLARE lid_quality int;
    DECLARE lid_purchaseitems int;
    #ID_old_new vars
    #DECLARE lid_purchases_isOld int;
    DECLARE lid_typeofclothing_isOld int;
    DECLARE lid_brand_isOld int;
    DECLARE lid_quality_isOld int;
    
     #DECLARE Last_Transaction_Success int;
     IF pPurchaseName IS NOT NULL AND pPurchaseName !='' THEN
     
     	insert into purchases(dateofpurchase,purchasename)
        values(pPurchaseDate,pPurchaseName);
     	#set Last_Transaction_Success = 1;
     	set lid_purchases = LAST_INSERT_ID();
        
     END IF; /*pPurchaseName*/
     
     IF pItemType IS NOT NULL AND pItemType !='' THEN
         
         IF NOT EXISTS(select ClothingType from typeofclothing where ClothingType = pItemType) THEN
                 
                 insert into typeofclothing(ClothingType)
                 values(pItemType);
                set lid_typeofclothing = LAST_INSERT_ID();
                set lid_typeofclothing_isOld = 0;
         ELSE
            set lid_typeofclothing = (select TypeID from typeofclothing where ClothingType = pItemType);
            set lid_typeofclothing_isOld =1;
            
         END IF; #ClothingType duplicate check
     	
     END IF; #pItemType Null check
     
     #brand check and insertion
     IF pBrandName IS NOT NULL AND pBrandName !='' THEN
     
         IF NOT EXISTS(select BrandName from brands where BrandName = pBrandName)  THEN
         
            insert into Brands(BrandName)
            values(pBrandName);
            set lid_brand = LAST_INSERT_ID();
            set lid_brand_isOld = 0;
         ELSE
         	set lid_brand = (select BrandID from brands where BrandName = pBrandName);
            set lid_brand_isOld = 1;
         
         END IF; #pBrandName  duplicate check
    END IF;  #pBrandName nul
     
     #Quality check and insertion
     IF  pQuality IS NOT NULL AND pQuality !='' THEN
         IF NOT EXISTS(select ClothQualityLevel from quality where ClothQualityLevel = pQuality) THEN
         
            insert into quality(ClothQualityLevel)
            values(pQuality);
            set lid_quality = LAST_INSERT_ID();
            set lid_quality_isOld = 0;
         ELSE
         	set lid_quality = (select ClothQualityID from quality where  ClothQualityLevel = pQuality);
         	set lid_quality_isOld =1;
         END IF; #Quality check and insertion
         
     END IF; #pQuality Null
     
     IF (lid_typeofclothing > 0 AND lid_quality > 0 AND lid_brand > 0 AND lid_purchases > 0) THEN 
        call debug_msg(TRUE,"my debug msg b4 if purchaseitems");
        
        IF NOT EXISTS (select Itemid from purchaseitems where typeid = lid_typeofclothing AND brandid = lid_brand 
                       AND ClothQualityID = lid_quality AND ItemName = pItemName) THEN
             insert into purchaseitems(purchaseId,typeid,brandid,ClothQualityID,purchasedfrom,costprice,quantity,ItemName)         		   	   values(lid_purchases,lid_typeofclothing,lid_brand,lid_quality,pPurchasedFrom,pCostPrice,pPurchaseQuantity,pItemName);
   		set lid_purchaseitems = LAST_INSERT_ID();
     call debug_msg(TRUE,lid_purchaseitems);
        ELSE
     call debug_msg(TRUE,"in else purchaseitems");   
     	     update purchaseitems
             set quantity = quantity+pPurchaseQuantity
             where typeid = lid_typeofclothing AND brandid = lid_brand AND ClothQualityID = lid_quality;
        
             set lid_purchaseitems = (select Itemid from purchaseitems where typeid = lid_typeofclothing AND 
                                      brandid = lid_brand AND ClothQualityID = lid_quality);
        
        END IF; #Select check
     END IF; #IF lid_purchases,quality,brand,typeofclothing > 0 
     call debug_msg(TRUE,"b4 if itemsavailable inser");
     IF (lid_typeofclothing > 0 AND lid_quality > 0 AND lid_brand > 0 AND lid_purchases > 0 AND lid_purchaseitems > 0)  THEN
   		
        IF NOT EXISTS(select Itemid from itemsavailable where Itemid IN (select Itemid from purchaseitems where typeid = lid_typeofclothing AND brandid = lid_brand AND ClothQualityID = lid_quality AND ItemName = pItemName)) THEN
            insert into itemsavailable(Itemid, sellingPrice, QuantityAvailable, Discount, NickName, ImagePath)
            values(lid_purchaseitems,pSellingPrice,pPurchaseQuantity,pDiscount,pNickName,pImagePath);
                                                
   		ELSE
                update itemsavailable 
                set QuantityAvailable = QuantityAvailable+pPurchaseQuantity , sellingPrice= pSellingPrice, Discount = pDiscount
                where Itemid IN (select Itemid from purchaseitems where typeid = lid_typeofclothing AND brandid = lid_brand AND 
           											ClothQualityID = lid_quality AND ItemName like pItemName);
        	
            END IF;
        
    END IF;
End$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE IF NOT EXISTS `bill` (
  `BillID` int(10) NOT NULL,
  `CustomerName` varchar(50) DEFAULT NULL,
  `BillDate` datetime DEFAULT NULL,
  `Billamount` int(20) DEFAULT NULL,
  `NetBillAmount` int(20) NOT NULL,
  `discount` int(20) DEFAULT NULL,
  `amountreceived` int(11) DEFAULT NULL,
  `balancetendered` int(11) DEFAULT NULL,
  `CustomerMobileNo` bigint(10) DEFAULT NULL,
  `TaxAmount` int(255) NOT NULL,
  `Biller` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`BillID`, `CustomerName`, `BillDate`, `Billamount`, `NetBillAmount`, `discount`, `amountreceived`, `balancetendered`, `CustomerMobileNo`, `TaxAmount`, `Biller`) VALUES
(1, 'seela1', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(2, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(3, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(4, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(5, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(6, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(7, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(8, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(9, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(10, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(11, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(12, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(13, 'seela', '2014-12-11 06:39:50', 387, 347, 40, 300, 7, 9032428081, 0, ''),
(14, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(15, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(16, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428081, 0, ''),
(17, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(18, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(19, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(20, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(21, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(22, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(23, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(24, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(25, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(26, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(27, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(28, 'seela1', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(29, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(30, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(31, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(32, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(33, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(34, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(35, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(36, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(37, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(38, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(39, 'seela', '2014-12-11 06:39:50', 377, 347, 30, 0, 347, 9032428083, 0, ''),
(40, 'seela', '2015-08-16 15:16:03', 902, 852, 50, 852, 0, 9032428081, 0, ''),
(41, 'seela', '2015-08-17 22:53:50', 178, 168, 10, 0, 168, 9032428081, 0, ''),
(42, 'seela', '2015-09-05 18:12:17', 400, 389, 30, 390, -1, 9032428081, 0, ''),
(43, 'seela', '2015-08-28 18:14:14', 540, 547, 20, 0, 547, 9032428081, 0, ''),
(44, 'seela', '2015-09-05 18:21:05', 500, 505, 20, 0, 505, 9032428081, 0, ''),
(45, 'seela', '2015-09-05 18:40:18', 900, 894, 50, 895, -1, 9032428081, 0, ''),
(46, 'seela', '2015-09-05 18:55:42', 520, 515, 30, 0, 515, 9032428081, 0, ''),
(47, 'seela', '2015-09-05 19:17:42', 710, 694, 50, 0, 694, 9032428081, 0, ''),
(48, 'seela', '2015-09-05 19:26:50', 710, 715, 30, 0, 715, 9032428081, 0, ''),
(49, 'seela', '2015-09-06 10:54:12', 330, 337, 10, 0, 337, 9032428081, 0, ''),
(50, 'seela', '2015-09-06 11:23:19', 360, 347, 30, 350, -3, 9032428081, 0, ''),
(51, 'seela', '2015-09-06 11:35:19', 351, 0, 12, 0, 0, 9032428081, 0, ''),
(52, 'seela', '2015-09-06 12:04:49', 170, 168, 13, 168, 0, 9032428081, 0, ''),
(53, 'seela', '2015-09-06 12:08:13', 210, 210, 10, 0, 210, 9032428081, 0, ''),
(54, 'seela', '2015-09-16 12:09:41', 190, 179, 20, 179, 0, 9032428081, 0, ''),
(55, 'seela', '2015-09-02 12:12:35', 211, 199, 22, 0, 199, 9032428081, 0, ''),
(56, 'seela', '2015-09-06 14:50:41', 320, 326, 10, 326, 0, 9032428081, 0, ''),
(57, 'seela', '2015-09-06 15:24:53', 320, 316, 20, 160, 156, 9032428081, 16, ''),
(58, 'seela', '2015-09-06 23:53:07', 520, 526, 20, 0, 526, 9032428081, 26, '0'),
(59, 'seela', '2015-09-06 23:55:49', 170, 158, 20, 0, 158, 9032428081, 8, '0'),
(60, 'seela', '2015-09-07 00:18:30', 179, 176, 12, 0, 176, 9032428081, 9, 'admin'),
(61, 'seela', '2015-09-07 20:30:59', 480, 484, 20, 484, 0, 9032428081, 24, 'admin'),
(62, 'seela', '2015-09-07 20:49:37', 20, 20, 1, 0, 20, 9032428081, 1, 'admin'),
(63, 'seela', '2015-09-08 06:14:17', 480, 484, 20, 0, 484, 9032428081, 24, 'admin'),
(64, 'seela', '2015-09-08 06:19:30', 339, 344, 12, 0, 344, 9032428081, 17, 'admin'),
(65, 'seela', '2015-09-08 07:02:42', 210, 198, 22, 0, 198, 9032428081, 10, 'admin'),
(66, 'seela', '2015-09-12 16:45:26', 738, 740, 35, 740, 0, 9032428081, 37, 'admin'),
(67, 'seela', '2015-09-13 10:18:33', 1600, 1589, 90, 1590, -1, 9032428081, 79, 'admin'),
(68, 'seela', '2015-09-16 07:51:19', 227, 211, 26, 211, 0, 9032428081, 10, 'admin'),
(69, 'seela', '2015-09-16 20:06:57', 1869, 1933, 32, 0, 1933, 9032428081, 96, 'admin'),
(70, 'seela', '2015-09-16 20:29:46', 509, 491, 42, 492, -1, 9032428081, 24, 'admin'),
(71, 'seela', '2015-09-16 20:41:50', 9, -85, 90, 0, -85, 9032428081, -4, 'admin'),
(72, 'seela', '2015-09-21 19:13:18', 761, 768, 31, 768, 0, 9032428081, 38, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `billitems`
--

CREATE TABLE IF NOT EXISTS `billitems` (
  `BillID` int(10) NOT NULL,
  `ItemID` int(10) NOT NULL,
  `ItemName` varchar(255) DEFAULT NULL,
  `Quantity` int(10) DEFAULT NULL,
  `Rate` int(20) DEFAULT NULL,
  `Amount` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billitems`
--

INSERT INTO `billitems` (`BillID`, `ItemID`, `ItemName`, `Quantity`, `Rate`, `Amount`) VALUES
(2, 4, 'rap3', 1, 170, 170),
(3, 4, 'rap3', 1, 170, 170),
(3, 2, 'raymond1', 1, 320, 320),
(4, 4, 'rap3', 1, 170, 170),
(4, 2, 'raymond1', 1, 320, 320),
(4, 3, 'ocm2', 1, 160, 160),
(5, 4, 'rap3', 1, 170, 170),
(5, 3, 'ocm2', 1, 160, 160),
(6, 3, 'ocm2', 1, 160, 160),
(7, 3, 'ocm2', 1, 160, 160),
(8, 3, 'ocm2', 1, 160, 160),
(8, 6, 'digjam1', 1, 170, 170),
(9, 3, 'ocm2', 1, 160, 160),
(9, 6, 'digjam1', 1, 170, 170),
(9, 4, 'rap3', 1, 170, 170),
(10, 3, 'ocm2', 1, 160, 160),
(11, 3, 'ocm2', 1, 160, 160),
(11, 4, 'rap3', 1, 170, 170),
(13, 4, 'rap3', 2, 124, 170),
(13, 3, 'ocm2', 1, 200, 160),
(15, 2, 'raymond1', 1, 320, 320),
(15, 3, 'ocm2', 1, 160, 160),
(16, 2, 'raymond1', 1, 320, 320),
(16, 3, 'ocm2', 1, 160, 160),
(16, 6, 'digjam1', 1, 170, 170),
(17, 2, 'raymond1', 1, 320, 320),
(17, 3, 'ocm2', 1, 160, 160),
(17, 6, 'digjam1', 1, 170, 170),
(18, 2, 'raymond1', 1, 320, 320),
(18, 3, 'ocm2', 1, 160, 160),
(18, 6, 'digjam1', 1, 170, 170),
(19, 2, 'raymond1', 1, 320, 320),
(20, 2, 'raymond1', 1, 320, 320),
(20, 3, 'ocm2', 1, 160, 160),
(20, 2, 'name', 1, 21, 22),
(21, 3, 'ocm2', 1, 160, 160),
(22, 4, 'rap3', 1, 170, 170),
(23, 4, 'rap3', 1, 170, 170),
(24, 4, 'rap3', 1, 170, 170),
(25, 4, 'rap3', 1, 170, 170),
(26, 4, 'rap3', 1, 170, 170),
(27, 4, 'rap3', 1, 170, 170),
(28, 4, 'rap3', 1, 170, 170),
(25, 2, 'asd', 1, 120, 129),
(25, 2, 'asd', 1, 120, 129),
(31, 4, 'rap3', 1, 170, 170),
(31, 3, 'ocm2', 1, 160, 160),
(32, 4, 'rap3', 2, 170, 340),
(32, 3, 'ocm2', 1, 160, 160),
(33, 4, 'rap3', 1, 170, 170),
(34, 2, 'raymond1', 1, 320, 320),
(34, 3, 'ocm2', 1, 160, 160),
(35, 3, 'ocm2', 1, 160, 160),
(36, 4, 'rap3', 1, 170, 170),
(37, 2, 'raymond1', 3, 320, 960),
(37, 6, 'digjam1', 1, 170, 170),
(38, 2, 'raymond1', 1, 320, 320),
(38, 3, 'ocm2', 1, 160, 160),
(38, 4, 'rap3', 1, 19, 19),
(39, 3, 'ocm2', 3, 160, 480),
(40, 2, 'raymond1', 1, 320, 320),
(40, 3, 'ocm2', 2, 160, 320),
(40, 6, 'digjam1', 1, 170, 170),
(41, 3, 'ocm2', 1, 160, 160),
(42, 18, 'puma1', 1, 200, 200),
(42, 6, 'digjam1', 1, 170, 170),
(43, 18, 'puma1', 1, 200, 200),
(43, 2, 'raymond1', 1, 320, 320),
(44, 2, 'raymond1', 1, 320, 320),
(44, 3, 'ocm2', 1, 160, 160),
(45, 2, 'raymond1', 1, 320, 320),
(45, 3, 'ocm2', 1, 160, 160),
(45, 6, 'digjam1', 1, 170, 170),
(45, 18, 'puma1', 1, 200, 200),
(46, 2, 'raymond1', 1, 320, 320),
(46, 6, 'digjam1', 1, 170, 170),
(47, 2, 'raymond1', 1, 320, 320),
(47, 6, 'digjam1', 2, 170, 340),
(48, 2, 'raymond1', 1, 320, 320),
(48, 3, 'ocm2', 1, 160, 160),
(48, 18, 'puma1', 1, 200, 200),
(49, 2, 'raymond1', 1, 320, 320),
(50, 3, 'ocm2', 1, 160, 160),
(50, 6, 'digjam1', 1, 170, 170),
(51, 2, 'raymond1', 1, 320, 320),
(51, 7, 'no', 1, 19, 19),
(52, 3, 'ocm2', 10, 16, 1600),
(53, 18, 'puma1', 1, 200, 200),
(54, 6, 'digjam1', 1, 170, 170),
(55, 4, 'rap3', 1, 19, 19),
(55, 6, 'digjam1', 1, 170, 170),
(56, 2, 'raymond1', 1, 320, 320),
(57, 3, 'ocm2', 2, 160, 320),
(58, 2, 'raymond1', 1, 320, 320),
(58, 18, 'puma1', 1, 200, 200),
(59, 6, 'digjam1', 1, 170, 170),
(60, 3, 'ocm2', 1, 160, 160),
(60, 4, 'rap3', 1, 19, 19),
(61, 2, 'raymond1', 1, 320, 320),
(61, 3, 'ocm2', 1, 160, 160),
(62, 19, 'pama', 1, 20, 20),
(63, 3, 'ocm2', 1, 160, 160),
(63, 2, 'raymond1', 1, 320, 320),
(64, 2, 'raymond1', 1, 320, 320),
(64, 7, 'no', 1, 19, 19),
(65, 6, 'digjam1', 1, 170, 170),
(65, 19, 'pama', 2, 20, 40),
(66, 19, 'pama', 1, 20, 20),
(66, 18, 'puma1', 1, 200, 200),
(66, 4, 'rap3', 1, 19, 19),
(66, 3, 'ocm2', 1, 160, 160),
(66, 2, 'raymond1', 1, 320, 320),
(66, 7, 'no', 1, 19, 19),
(67, 3, 'ocm2', 8, 160, 1280),
(67, 2, 'raymond1', 1, 320, 320),
(68, 4, 'Reid & Taylor', 3, 19, 57),
(68, 6, 'digjam1', 1, 170, 170),
(69, 2, 'raymond1', 2, 320, 640),
(69, 15, 'oxemberg', 1, 121, 121),
(69, 18, 'puma1', 1, 200, 200),
(69, 20, 'vimal1', 4, 222, 888),
(69, 19, 'pama', 1, 20, 20),
(70, 3, 'ocm2', 2, 160, 320),
(70, 4, 'Reid & Taylor', 1, 19, 19),
(70, 6, 'digjam1', 1, 170, 170),
(71, 2, 'raymond1', 9, 1, 9),
(72, 2, 'raymond1', 1, 320, 320),
(72, 3, 'ocm2', 2, 160, 320),
(72, 15, 'oxemberg', 1, 121, 121);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `BrandID` int(11) NOT NULL,
  `BrandName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`BrandID`, `BrandName`) VALUES
(1, 'ocm'),
(2, 'digjam'),
(3, 'vimal'),
(4, 'raymond'),
(5, 'Reid&Talor'),
(6, 'test brand'),
(7, '16julbrand'),
(8, 'oxemberg'),
(9, 'puma'),
(10, 'pama');

-- --------------------------------------------------------

--
-- Table structure for table `clothingitemsavailable`
--

CREATE TABLE IF NOT EXISTS `clothingitemsavailable` (
  `ItemID` int(11) NOT NULL,
  `ItemTypeID` int(10) DEFAULT NULL,
  `ItemBrandID` int(10) DEFAULT NULL,
  `ItemQualityID` int(11) DEFAULT NULL,
  `ItemText` varchar(50) DEFAULT NULL,
  `ItemPurchaseID` int(11) DEFAULT NULL,
  `ItemQuantityAvailable` int(11) DEFAULT NULL,
  `ItemSellingPrice` int(10) NOT NULL,
  `ItemDiscount` int(10) DEFAULT NULL,
  `ItemImagePath` varchar(200) DEFAULT NULL,
  `BaseLengthinMeters` int(10) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clothingitemsavailable`
--

INSERT INTO `clothingitemsavailable` (`ItemID`, `ItemTypeID`, `ItemBrandID`, `ItemQualityID`, `ItemText`, `ItemPurchaseID`, `ItemQuantityAvailable`, `ItemSellingPrice`, `ItemDiscount`, `ItemImagePath`, `BaseLengthinMeters`) VALUES
(1, 2, 1, 1, 'xxxx', 1, 12, 120, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `itemsavailable`
--

CREATE TABLE IF NOT EXISTS `itemsavailable` (
  `Itemid` int(11) NOT NULL,
  `sellingPrice` int(11) DEFAULT NULL,
  `QuantityAvailable` int(11) DEFAULT NULL,
  `Discount` int(11) DEFAULT NULL,
  `NickName` varchar(50) NOT NULL DEFAULT '',
  `ImagePath` varchar(1200) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemsavailable`
--

INSERT INTO `itemsavailable` (`Itemid`, `sellingPrice`, `QuantityAvailable`, `Discount`, `NickName`, `ImagePath`) VALUES
(2, 320, 78, 10, 'raymond1', 'images/STContent/raymond.jpg'),
(3, 160, 177, 10, 'ocm2', 'images/STContent/OCM-Logo.jpg'),
(4, 19, 213, 2, 'Reid & Taylor', 'images/STContent/RT_New.jpg'),
(6, 170, 216, 20, 'digjam1', 'images/STContent/digjam_logo.png'),
(7, 19, 18, 2, 'aravind', 'images/STContent/arvind.jpg'),
(15, 121, 8, 1, 'oxemberg', 'images/STContent/oxemberg_logo.png'),
(18, 200, 297, 10, 'puma1', 'images/STContent/puma.jpg'),
(19, 20, 195, 1, 'pama', 'images/STContent/puma.jpg'),
(20, 222, 92, 0, 'vimal1', 'images/STContent/Vimal-Logo.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `username` varchar(20) NOT NULL,
  `passwordhash` varchar(100) NOT NULL,
  `securityQuestion` varchar(500) NOT NULL,
  `secQueAns` varchar(50) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `passwordhash`, `securityQuestion`, `secQueAns`, `role`) VALUES
('admin', '098f6bcd4621d373cade4e832627b4f6', 'who is admin?', 'MeVineethJain', 'admin'),
('seela', '56ab24c15b72a457069c5ea42fcfc640', '', '', 'admin'),
('test', '5a105e8b9d40e1329780d62ea2265d8a', '', '', 'guest');

-- --------------------------------------------------------

--
-- Table structure for table `purchaseitems`
--

CREATE TABLE IF NOT EXISTS `purchaseitems` (
  `Itemid` int(11) NOT NULL,
  `purchaseId` int(11) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  `brandid` int(11) DEFAULT NULL,
  `ClothQualityID` int(11) DEFAULT NULL,
  `purchasedfrom` varchar(500) DEFAULT NULL,
  `costprice` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `ItemName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchaseitems`
--

INSERT INTO `purchaseitems` (`Itemid`, `purchaseId`, `typeid`, `brandid`, `ClothQualityID`, `purchasedfrom`, `costprice`, `quantity`, `ItemName`) VALUES
(2, 1, 1, 1, 1, 'tst18jul', 18, 118, 'raymond1'),
(3, 1, 2, 2, 1, 'tst18jul', 18, 218, 'ocm2'),
(4, 2, 2, 2, 1, 'tst18jul', 18, 218, 'rap3'),
(6, 1, 2, 2, 3, 'tst18jul', 18, 218, 'digjam1'),
(7, 20, 7, 6, 5, 'tst18jul', 18, 38, 'mytstitem'),
(8, 21, 7, 6, 5, 'tst18jul', 18, 118, 'mytstitem'),
(9, 22, 7, 6, 5, 'tst18jul', 18, 118, 'mytstitem'),
(10, 23, 7, 6, 5, 'tst18jul', 18, 118, 'mytstitem'),
(11, 24, 1, 1, 1, 'tst18jul', 18, 20, 'ocm2'),
(12, 25, 1, 1, 1, 'tst18jul', 18, 20, 'ocm2'),
(13, 26, 1, 1, 1, 'tst18jul', 18, 20, 'ocm2'),
(14, 27, 1, 1, 1, 'tst18jul', 18, 20, 'ocm2'),
(15, 28, 8, 7, 6, 'tst18jul2', 18, 106, '16juli'),
(16, 35, 3, 8, 1, 'sel2sep', 120, 100, 'itm2sep'),
(17, 53, 3, 8, 1, 'sel4sep', 110, 100, 'itm4sep'),
(18, 56, 2, 9, 3, 'sel5sep', 120, 901, 'puma5sep'),
(19, 66, 3, 10, 2, 'sel5sep122', 10, 200, 'pama5sep1'),
(20, 68, 1, 3, 1, 'sel12sep', 212, 100, 'vimal');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE IF NOT EXISTS `purchases` (
  `purchaseId` int(11) NOT NULL,
  `dateofpurchase` datetime DEFAULT NULL,
  `purchasename` varchar(30) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`purchaseId`, `dateofpurchase`, `purchasename`) VALUES
(1, '2014-11-30 17:00:00', NULL),
(2, '2013-11-01 00:00:00', NULL),
(15, '2015-12-12 00:00:00', 'test'),
(16, '2015-12-12 00:00:00', 'test'),
(17, '2015-12-12 00:00:00', 'test'),
(18, '2015-12-12 00:00:00', 'test'),
(19, '2015-12-12 00:00:00', 'test'),
(20, '2015-12-12 00:00:00', 'test'),
(21, '2015-12-12 00:00:00', 'test'),
(22, '0000-00-00 00:00:00', 'test'),
(23, '2015-12-15 00:00:00', 'test'),
(24, '1970-01-01 00:00:00', 'ass'),
(25, '1970-01-01 00:00:00', 'ass'),
(26, '2015-07-07 00:00:00', 'ass'),
(27, '2015-07-07 00:00:00', 'ass'),
(28, '2015-07-16 00:00:00', '16julpruchase'),
(29, '2015-07-18 00:00:00', 'tst18jul'),
(30, '2015-07-18 00:00:00', 'tst18jul'),
(31, '2015-07-18 00:00:00', 'tst18jul1'),
(32, '2015-07-18 00:00:00', 'tst18jul1'),
(33, '2015-07-18 00:00:00', 'tst18jul1'),
(34, '2015-07-20 00:00:00', '20jul'),
(35, '2015-09-02 00:00:00', 'pur2sep'),
(36, '2015-09-02 00:00:00', 'pur2sep'),
(37, '2015-09-03 00:00:00', 'pur3sep'),
(38, '2015-09-03 00:00:00', 'pur3sep'),
(39, '2015-09-03 00:00:00', 'pur3sep'),
(40, '2015-09-03 00:00:00', 'pur3sep'),
(41, '2015-09-03 00:00:00', 'pur3sep'),
(42, '2015-09-03 00:00:00', 'pur3sep'),
(43, '2015-09-03 00:00:00', 'pur3sep1'),
(44, '2015-09-03 00:00:00', 'pur3sep1'),
(45, '2015-09-03 00:00:00', 'pur3sep1'),
(46, '2015-09-03 00:00:00', 'pur3sep1212'),
(47, '2015-09-03 00:00:00', 'pur3sep1'),
(48, '2015-09-04 00:00:00', 'pur3sep1'),
(49, '2015-09-04 00:00:00', 'tstpur4sep'),
(50, '2015-09-04 00:00:00', 'tstpur4sep'),
(51, '2015-09-03 00:00:00', 'tstpur4sep'),
(52, '2015-09-04 00:00:00', 'tst4sep'),
(53, '2015-09-04 00:00:00', 'pur3sep2'),
(54, '2015-09-04 00:00:00', 'pur3sep2'),
(55, '2015-09-04 00:00:00', 'pur3sep2'),
(56, '2015-09-05 00:00:00', 'pur5sep'),
(57, '2015-09-05 00:00:00', 'pur5sep'),
(58, '0000-00-00 00:00:00', 'puma5sep'),
(59, '0000-00-00 00:00:00', 'puma5sep'),
(60, '0000-00-00 00:00:00', 'puma5sep'),
(61, '0000-00-00 00:00:00', 'pur5sep'),
(62, '0000-00-00 00:00:00', 'pur5sep'),
(63, '0000-00-00 00:00:00', 'pur5sep'),
(64, '2015-09-05 00:00:00', 'pur5sep'),
(65, '0000-00-00 00:00:00', 'pur5sep'),
(66, '2015-09-05 00:00:00', 'pur5sep'),
(67, '2015-09-05 00:00:00', 'pur5sep'),
(68, '2015-09-02 00:00:00', 'pur12sep');

-- --------------------------------------------------------

--
-- Table structure for table `quality`
--

CREATE TABLE IF NOT EXISTS `quality` (
  `ClothQualityID` int(11) NOT NULL,
  `ClothQualityLevel` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quality`
--

INSERT INTO `quality` (`ClothQualityID`, `ClothQualityLevel`) VALUES
(1, 'quality1'),
(2, 'quality2'),
(3, 'quality3'),
(4, 'quality4'),
(5, 'test qual'),
(6, '16julq');

-- --------------------------------------------------------

--
-- Table structure for table `typeofclothing`
--

CREATE TABLE IF NOT EXISTS `typeofclothing` (
  `TypeID` int(11) NOT NULL,
  `ClothingType` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `typeofclothing`
--

INSERT INTO `typeofclothing` (`TypeID`, `ClothingType`) VALUES
(1, 'Suiting'),
(2, 'Shirting'),
(3, 'Other'),
(7, 'test type'),
(8, '16jultype');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`BillID`);

--
-- Indexes for table `billitems`
--
ALTER TABLE `billitems`
  ADD KEY `BillID` (`BillID`),
  ADD KEY `ItemID` (`ItemID`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`BrandID`);

--
-- Indexes for table `clothingitemsavailable`
--
ALTER TABLE `clothingitemsavailable`
  ADD PRIMARY KEY (`ItemID`),
  ADD KEY `ItemTypeID` (`ItemTypeID`),
  ADD KEY `ItemBrandID` (`ItemBrandID`),
  ADD KEY `ItemQualityID` (`ItemQualityID`),
  ADD KEY `ItemPurchaseID` (`ItemPurchaseID`);

--
-- Indexes for table `itemsavailable`
--
ALTER TABLE `itemsavailable`
  ADD PRIMARY KEY (`Itemid`,`NickName`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `purchaseitems`
--
ALTER TABLE `purchaseitems`
  ADD PRIMARY KEY (`Itemid`),
  ADD KEY `purchaseId` (`purchaseId`),
  ADD KEY `ClothQualityID` (`ClothQualityID`),
  ADD KEY `brandid` (`brandid`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchaseId`);

--
-- Indexes for table `quality`
--
ALTER TABLE `quality`
  ADD PRIMARY KEY (`ClothQualityID`);

--
-- Indexes for table `typeofclothing`
--
ALTER TABLE `typeofclothing`
  ADD PRIMARY KEY (`TypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `BillID` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=73;
--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `BrandID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `clothingitemsavailable`
--
ALTER TABLE `clothingitemsavailable`
  MODIFY `ItemID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `itemsavailable`
--
ALTER TABLE `itemsavailable`
  MODIFY `Itemid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `purchaseitems`
--
ALTER TABLE `purchaseitems`
  MODIFY `Itemid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchaseId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `quality`
--
ALTER TABLE `quality`
  MODIFY `ClothQualityID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `typeofclothing`
--
ALTER TABLE `typeofclothing`
  MODIFY `TypeID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `billitems`
--
ALTER TABLE `billitems`
  ADD CONSTRAINT `billitems_ibfk_2` FOREIGN KEY (`BillID`) REFERENCES `bill` (`BillID`),
  ADD CONSTRAINT `billitems_ibfk_3` FOREIGN KEY (`ItemID`) REFERENCES `itemsavailable` (`Itemid`);

--
-- Constraints for table `clothingitemsavailable`
--
ALTER TABLE `clothingitemsavailable`
  ADD CONSTRAINT `clothingitemsavailable_ibfk_1` FOREIGN KEY (`ItemTypeID`) REFERENCES `typeofclothing` (`TypeID`),
  ADD CONSTRAINT `clothingitemsavailable_ibfk_2` FOREIGN KEY (`ItemBrandID`) REFERENCES `brands` (`BrandID`),
  ADD CONSTRAINT `clothingitemsavailable_ibfk_3` FOREIGN KEY (`ItemQualityID`) REFERENCES `quality` (`ClothQualityID`),
  ADD CONSTRAINT `clothingitemsavailable_ibfk_4` FOREIGN KEY (`ItemPurchaseID`) REFERENCES `purchases` (`purchaseId`);

--
-- Constraints for table `itemsavailable`
--
ALTER TABLE `itemsavailable`
  ADD CONSTRAINT `itemsavailable_ibfk_1` FOREIGN KEY (`Itemid`) REFERENCES `purchaseitems` (`Itemid`);

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
