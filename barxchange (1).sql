-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2020 at 12:35 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barxchange`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `fullname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `email`, `password`, `mobile`, `fullname`) VALUES
('arush', 'arush@gmail.com', '111', 6283069142, 'arush mandal'),
('banjo', 'banjo@gmail.com', '111', 6283069142, 'bajrangi'),
('cakawejal', 'hovypux@mailinator.net', 'Pa$$w0rd!', 4912345678, 'Willa Cobb'),
('cegodosy', 'zaziliz@mailinator.net', 'Pa$$w0rd!', 5478954625, 'Oscar Fuentes'),
('ducutyw', 'poxuvuwivu@mailinator.com', 'Pa$$w0rd!', 6280276218, 'Josiah Gardner'),
('helamaxip', 'tege@mailinator.com', 'Pa$$w0rd!', 5278955555, 'Ila Stephenson'),
('kifycyr', 'necuzyf@mailinator.net', 'Pa$$w0rd!', 8701236547, 'Branden Vinson'),
('kuvadeva', 'rulurisoqu@mailinator.com', 'Pa$$w0rd!', 8575896352, 'Darrel Neal'),
('letiryg', 'boje@mailinator.com', 'Pa$$w0rd!', 9815900424, 'Erin Johns'),
('micikixu', 'husomecu@mailinator.com', 'Pa$$w0rd!', 27895662688, 'Acton David'),
('mizexabyf', 'basuxiqav@mailinator.net', 'Pa$$w0rd!', 3478956455, 'Blaze Chang'),
('nemyrygyq', 'govuqu@mailinator.com', 'Pa$$w0rd!', 6283069142, 'Erica Salinas'),
('qomyhoc', 'gedez@mailinator.com', 'Pa$$w0rd!', 7009741717, 'Pearl Mcfarland');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryname` varchar(100) NOT NULL,
  `categorydescription` varchar(5000) NOT NULL,
  `supercategory` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryname`, `categorydescription`, `supercategory`) VALUES
('Alcopops', 'Voluptate veniam in', 'liquor'),
('Astra Patterson', 'Non ab aut tempora v', 'food'),
('Beer', 'Aut quis incidunt s Aut quis incidunt s Aut quis incidunt s vAut quis incidunt s Aut quis incidunt s Aut quis incidunt s', 'liquor'),
('Cocktail Btter', 'Similique dolore con', 'liquor'),
('Colorado Velazquez', 'Placeat assumenda a', 'liquor'),
('Distilled Beverages', 'Eligendi totam exped', 'liquor'),
('Eleanor Graves', 'Sit sint proident t', 'food'),
('Fermented Beverages', 'Harum odio enim ipsa Harum odio enim ipsa Harum odio enim ipsa Harum odio enim ipsa Harum odio enim ipsa Harum odio enim ipsa', 'liquor'),
('Kaitlin Norman', 'Voluptatem Molestia', 'liquor'),
('Kirsten Potter', 'Facilis tempore mol', 'food'),
('Liquor', 'Quos hic consectetur\n', 'liquor'),
('Lucy Mercer', 'Non aut officia labo', 'liquor'),
('Tucker Hatfield', 'Vitae quis sunt temp', 'food'),
('Wine', 'Officia officia prae', 'liquor');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderid` int(11) NOT NULL,
  `amount` float NOT NULL,
  `datetime` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `paymentmode` varchar(200) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `staffname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`orderid`, `amount`, `datetime`, `status`, `paymentmode`, `mobile`, `staffname`) VALUES
(1, 2048, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(2, 495, '2020-12-12 10:46:53', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(3, 3317, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(4, 2390, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(5, 1222, '2020-11-14 09:49:00', 'paid', 'Online', 'abc@gmail.com', 'rohan'),
(7, 495, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(8, 1792, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(9, 1281, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(10, 1107, '2020-11-14 09:49:00', 'pending', 'Online', 'abc@gmail.com', 'rohan'),
(11, 495, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(12, 1572, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'Arjun'),
(13, 1994, '2020-11-14 09:49:00', 'pending', 'Cash', 'tejwantgill004@gmail', 'rohan'),
(14, 1324, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(15, 1341, '2020-11-14 09:49:00', 'pending', 'Cash', 'abc@gmail.com', 'rohan'),
(16, 2067, '2020-11-14 09:49:00', 'paid', 'Cash', '6283069142', 'rohan'),
(17, 1416, '2020-11-14 09:49:00', 'pending', 'Cash', '7889097373', 'rohan'),
(18, 2730, '2020-11-14 09:49:00', 'pending', 'Online', '7889097373', 'rohan'),
(19, 972, '2020-11-14 09:49:00', 'pending', 'Cash', '6283069142', 'rohan'),
(20, 1368, '2020-11-14 09:49:00', 'pending', 'Cash', '6283069142', 'rohan'),
(21, 817, '2020-11-14 09:49:00', 'pending', 'Cash', '7889097373', 'rohan'),
(22, 903, '2020-11-14 09:49:00', 'pending', 'Cash', '7889097373', 'rohan'),
(23, 748, '2020-11-14 09:49:00', 'pending', 'Cash', '9876606569', 'rohan'),
(24, 204, '2020-11-14 09:49:00', 'pending', 'Cash', '7889097373', 'rohan'),
(25, 786, '2020-11-14 09:49:00', 'pending', 'Cash', 'tejgjahjjdh@gmakajk', 'rohan');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `orderdetailid` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `qty` int(11) NOT NULL,
  `discount` float NOT NULL,
  `netprice` bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL,
  `orderid` int(11) NOT NULL,
  `productid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`orderdetailid`, `price`, `qty`, `discount`, `netprice`, `status`, `orderid`, `productid`) VALUES
(2, 206, 1, 1, 204, 'delivered', 1, 11),
(3, 920, 1, 37, 580, 'delivered', 1, 5),
(4, 790, 2, 20, 1264, 'delivered', 1, 4),
(5, 206, 1, 1, 204, 'pending', 2, 11),
(6, 364, 1, 20, 291, 'pending', 2, 14),
(7, 790, 2, 20, 1264, 'delivered', 3, 4),
(8, 920, 1, 37, 580, 'delivered', 3, 5),
(9, 611, 1, 57, 263, 'delivered', 3, 9),
(10, 890, 2, 76, 428, 'delivered', 3, 8),
(11, 850, 1, 8, 782, 'delivered', 3, 7),
(12, 206, 3, 1, 612, 'delivered', 4, 11),
(13, 850, 2, 8, 1564, 'delivered', 4, 7),
(14, 890, 1, 76, 214, 'delivered', 4, 8),
(15, 920, 1, 37, 580, 'delivered', 5, 5),
(16, 890, 3, 76, 642, 'delivered', 5, 8),
(19, 206, 1, 1, 204, 'delivered', 7, 11),
(20, 364, 1, 20, 291, 'delivered', 7, 14),
(21, 790, 1, 20, 632, 'delivered', 8, 4),
(22, 920, 2, 37, 1160, 'delivered', 8, 5),
(23, 206, 2, 1, 408, 'delivered', 9, 11),
(24, 364, 3, 20, 873, 'delivered', 9, 14),
(25, 206, 4, 1, 816, 'delivered', 10, 11),
(26, 364, 1, 20, 291, 'delivered', 10, 14),
(27, 206, 1, 1, 204, 'delivered', 11, 11),
(28, 364, 1, 20, 291, 'delivered', 11, 14),
(29, 206, 2, 1, 408, 'delivered', 12, 11),
(30, 364, 4, 20, 1164, 'delivered', 12, 14),
(31, 790, 1, 20, 632, 'delivered', 13, 4),
(32, 920, 1, 37, 580, 'delivered', 13, 5),
(33, 850, 1, 8, 782, 'delivered', 13, 7),
(34, 898, 3, 89, 297, 'delivered', 14, 13),
(35, 89, 2, 13, 154, 'delivered', 14, 17),
(36, 364, 3, 20, 873, 'delivered', 14, 14),
(37, 206, 1, 1, 204, 'delivered', 15, 11),
(38, 364, 1, 20, 291, 'delivered', 15, 14),
(39, 790, 1, 20, 632, 'delivered', 15, 4),
(40, 890, 1, 76, 214, 'delivered', 15, 8),
(41, 206, 3, 1, 612, 'delivered', 16, 11),
(42, 364, 5, 20, 1455, 'delivered', 16, 14),
(43, 790, 1, 20, 632, 'delivered', 17, 4),
(44, 920, 1, 37, 580, 'delivered', 17, 5),
(45, 206, 1, 1, 204, 'delivered', 17, 11),
(46, 206, 2, 1, 408, 'delivered', 18, 11),
(47, 364, 2, 20, 582, 'delivered', 18, 14),
(48, 920, 3, 37, 1740, 'delivered', 18, 5),
(49, 206, 1, 1, 204, 'delivered', 19, 11),
(50, 364, 1, 20, 291, 'delivered', 19, 14),
(51, 890, 1, 76, 214, 'delivered', 19, 8),
(52, 611, 1, 57, 263, 'delivered', 19, 9),
(53, 206, 1, 1, 204, 'delivered', 20, 11),
(54, 364, 4, 20, 1164, 'delivered', 20, 14),
(55, 364, 1, 20, 291, 'delivered', 21, 14),
(56, 611, 2, 57, 526, 'delivered', 21, 9),
(57, 206, 3, 1, 612, 'delivered', 22, 11),
(58, 364, 1, 20, 291, 'delivered', 22, 14),
(59, 206, 1, 1, 204, 'delivered', 23, 11),
(60, 364, 1, 20, 291, 'delivered', 23, 14),
(61, 898, 1, 89, 99, 'delivered', 23, 13),
(62, 89, 2, 13, 154, 'delivered', 23, 17),
(63, 206, 1, 1, 204, 'delivered', 24, 11),
(64, 206, 1, 1, 204, 'delivered', 25, 11),
(65, 364, 2, 20, 582, 'delivered', 25, 14);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productid` int(11) NOT NULL,
  `productname` varchar(100) NOT NULL,
  `price` int(10) NOT NULL,
  `stock` int(10) NOT NULL,
  `discount` int(10) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `subcatid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productid`, `productname`, `price`, `stock`, `discount`, `photo`, `description`, `subcatid`) VALUES
(3, 'All Season', 594, 0, 10, 'photo/about_intro.jpg', 'Consequatur Sunt co', 17),
(4, 'Blender', 790, 17, 20, 'photo/product1_medium76bd.jpg', 'Sint aliquip est con', 7),
(5, 'Royal Stag', 920, 454, 37, 'photo/product3_grande59b3.jpg', 'Dolores quisquam num', 11),
(6, 'Teacher', 691, 0, 27, 'photo/product8c058.jpg', 'In cupidatat amet s', 15),
(7, 'Advocate', 850, 90, 8, 'photo/product15b995.jpg', 'Hic tempor nesciunt', 18),
(8, 'Black & White', 890, 82, 76, 'photo/product7_medium5f5d.jpg', 'Voluptatem minus am', 16),
(9, 'Red Label', 611, 27, 57, 'photo/product9_grande59b3.jpg', 'Culpa cillum suscip', 10),
(10, 'Signature', 544, 52, 28, 'photo/product186262.jpg', 'Dolores consequatur', 9),
(11, 'Antiquity', 206, 77, 1, 'photo/img_1.jpg', 'Magnam dolore aut co', 17),
(13, 'Royal Green', 898, 63, 89, 'photo/6-380x384_grandeb995.jpg', 'Quas dolorem ut do a', 9),
(14, 'Kaseem Craft', 364, 86, 20, 'photo/4.png', 'Dolor quos nostrud m', 26),
(17, 'Ivy Vaughan', 89, 17, 13, 'photo/v2osk-1Z2niiBPg5A-unsplash.jpg', 'Magna nulla pariatur', 11);

-- --------------------------------------------------------

--
-- Table structure for table `product_photo`
--

CREATE TABLE `product_photo` (
  `id` int(10) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `caption` varchar(500) NOT NULL,
  `productid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_photo`
--

INSERT INTO `product_photo` (`id`, `photo`, `caption`, `productid`) VALUES
(14, 'photo/product1_medium76bd.jpg', 'Ut dolores inventore', 4),
(15, 'photo/product3_medium59b3.jpg', 'Eum laborum magna la', 5),
(16, 'photo/product359b3.jpg', 'Doloribus a voluptat', 5),
(17, 'photo/product8_a89c7e89-e3a3-4cd8-9126-03dff7be6ae6_grande76bd.jpg', 'Ullam laboriosam fu', 6),
(18, 'photo/product8_a89c7e89-e3a3-4cd8-9126-03dff7be6ae6_grande76bd.jpg', 'Atque fugit eum est', 6),
(19, 'photo/product8_grandec058.jpg', 'Assumenda quod nisi ', 6),
(20, 'photo/product8_mediumc058.jpg', 'Alias sunt maiores ', 6),
(21, 'photo/product8c058.jpg', 'Sed qui explicabo S', 6),
(22, 'photo/product15_0cad9a7c-1d61-4cb4-8299-66aefe9e237d_grande6d5a.jpg', 'Minus molestias qui ', 7),
(23, 'photo/product15_0cad9a7c-1d61-4cb4-8299-66aefe9e237d_medium6d5a.jpg', 'Consequat Consectet', 7),
(24, 'photo/product15_0cad9a7c-1d61-4cb4-8299-66aefe9e237d6d5a.jpg', 'Deleniti omnis id te', 7),
(25, 'photo/product15_grandeb995.jpg', 'Quis ut quisquam in ', 7),
(26, 'photo/product15b995.jpg', 'Dolor obcaecati non ', 7),
(28, 'photo/product75f5d.jpg', 'Vel ex quia facilis ', 8),
(29, 'photo/product7_grande5f5d.jpg', 'Numquam est ex fugia', 8),
(30, 'photo/product7_medium5f5d.jpg', 'Qui est voluptatibu', 8),
(31, 'photo/img_1.jpg', 'Facere natus sit non', 11),
(32, 'photo/6-380x384b995.jpg', 'Accusamus est odit a', 3),
(34, 'photo/6-380x384b995.jpg', 'Elit laborum Dolor', 3),
(36, 'photo/blog_5.jpg', 'Esse consequat Dol', 3);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staffname` varchar(110) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staffname`, `password`, `email`, `mobile`, `status`, `type`) VALUES
('Ainsley Stevenson', 'Pa$$w0rd!', 'qumos@mailinator.com', 6569344657, 'Blocked', 'Cashier'),
('Arjun', '111', 'sujiqep@mailinator.com', 7009741717, 'Activated', 'Cashier'),
('Belle Coleman', '111', 'abc@gmail.com', 6280276218, 'Blocked', 'Captain'),
('Rahul', '111', 'rkb6280@gmail.com', 7009741717, 'Activated', 'Kitchen'),
('Raman', '111', 'rkb6280@gmail.com', 7009741717, 'Blocked', 'Captain'),
('rohan', '111', 'ijk@gmmail.com', 6283069142, 'Activated', 'Captain'),
('Wallace Espinoza', 'Pa$$w0rd!', 'fevadyr@mailinator.com', 3297894472, 'Blocked', 'Kitchen'),
('Yvette Rivas', '111', 'def@gmail.com', 6283069142, 'Activated', 'Captain');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `subcategoryid` int(11) NOT NULL,
  `subcategoryname` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`subcategoryid`, `subcategoryname`, `description`, `category`) VALUES
(7, 'Bryar Coffey', 'Sint aliquip est con', 'Lucy Mercer'),
(8, 'Molly Villarreal', 'Perferendis voluptas', 'Distilled Beverages'),
(9, 'Francesca Lott', 'Officiis est dolor s', 'Kaitlin Norman'),
(10, 'Hedwig Mckee', 'Doloremque esse repr', 'Fermented Beverages'),
(11, 'Vaughan Burch', 'Excepturi ea enim la', 'Wine'),
(12, 'Gemma Snider', 'In irure est non dol', 'Distilled Beverages'),
(13, 'Fulton Cabrera', 'Odit eum deserunt sa', 'Kaitlin Norman'),
(14, 'Gavin Wilkerson', 'Qui distinctio Est ', 'Liquor'),
(15, 'Hollee Good', 'Mollitia odit conseq', 'Cocktail Btter'),
(16, 'Armand Vincent', 'Itaque rerum amet n', 'Cocktail Btter'),
(17, 'Reed Blanchard', 'Consequatur Sunt co', 'Astra Patterson'),
(18, 'Elton Park', 'Ad modi aliquip et c', 'Beer'),
(19, 'Lamar', 'Qui repudiandae ', 'Astra Patterson'),
(20, 'Madeline Garner', 'Sequi at reprehender', 'Cocktail Btter'),
(23, 'Clio Glover', 'Suscipit in aut even', 'Liquor'),
(24, 'Hedley Reilly', 'Non vel magna distin', 'Distilled Beverages'),
(25, 'Brian Austin', 'Nisi nulla iusto atq', 'Distilled Beverages'),
(26, 'Fiona Mcfarland', 'Dolor quos nostrud m', 'Tucker Hatfield'),
(27, 'May Pugh', 'Accusantium dolores ', 'Cocktail Btter');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryname`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `staffname` (`staffname`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`orderdetailid`),
  ADD KEY `orderid` (`orderid`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productid`),
  ADD KEY `subcatid` (`subcatid`);

--
-- Indexes for table `product_photo`
--
ALTER TABLE `product_photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staffname`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subcategoryid`),
  ADD KEY `category` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `orderdetailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_photo`
--
ALTER TABLE `product_photo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subcategoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`staffname`) REFERENCES `staff` (`staffname`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`orderid`) REFERENCES `order` (`orderid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`subcatid`) REFERENCES `subcategory` (`subcategoryid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_photo`
--
ALTER TABLE `product_photo`
  ADD CONSTRAINT `product_photo_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`categoryname`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
