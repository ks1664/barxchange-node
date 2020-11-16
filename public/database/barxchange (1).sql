-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2020 at 02:10 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
('arush', 'arush@gmail.com', '11', 6283069142, 'arush mandal'),
('banjo', 'banjo@gmail.com', '111', 6283069142, 'bajrangi'),
('cakawejal', 'hovypux@mailinator.net', 'Pa$$w0rd!', 4912345678, 'Willa Cobb'),
('cegodosy', 'zaziliz@mailinator.net', 'Pa$$w0rd!', 5478954625, 'Oscar Fuentes'),
('helamaxip', 'tege@mailinator.com', 'Pa$$w0rd!', 5278955555, 'Ila Stephenson'),
('kifycyr', 'necuzyf@mailinator.net', 'Pa$$w0rd!', 8701236547, 'Branden Vinson'),
('kuvadeva', 'rulurisoqu@mailinator.com', 'Pa$$w0rd!', 8575896352, 'Darrel Neal'),
('micikixu', 'husomecu@mailinator.com', 'Pa$$w0rd!', 27895662688, 'Acton David'),
('mizexabyf', 'basuxiqav@mailinator.net', 'Pa$$w0rd!', 3478956455, 'Blaze Chang'),
('nemyrygyq', 'govuqu@mailinator.com', 'Pa$$w0rd!', 6283069142, 'Erica Salinas'),
('rajuxexa', 'teketara@mailinator.com', 'Pa$$w0rd!', 4875896521, 'Bruce Hayden'),
('Sam Beans', 'parwindersingh@vmmeducation.com', '11', 6283069142, 'Sam');

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
('Nathaniel Guzman', 'Velit eaque ea in d', 'food'),
('Petra Bray', 'Velit in sunt dicta', 'food'),
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
  `mobile` bigint(20) NOT NULL,
  `staffname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`orderid`, `amount`, `datetime`, `status`, `paymentmode`, `mobile`, `staffname`) VALUES
(2, 7316.15, '2020-05-01 16:08:28', 'paid', 'Cash', 6283069142, 'Belle Coleman'),
(3, 203.94, '2020-05-01 16:12:56', 'paid', 'Cash', 6280276218, 'Yvette Rivas'),
(4, 1044.73, '2020-05-01 12:13:46', 'paid', 'Online', 6280276218, 'rohan'),
(5, 407.88, '2020-05-01 12:22:50', 'paid', 'Online', 7973500986, 'rohan'),
(6, 2175.12, '2020-05-01 10:03:06', 'paid', 'Online', 6283069142, 'rohan'),
(7, 1716.03, '2020-05-01 12:11:26', 'paid', 'Cash', 7009741717, 'rohan'),
(8, 611.82, '2020-05-01 13:04:35', 'paid', 'Cash', 6283069142, 'rohan'),
(9, 894.73, '2020-05-01 13:05:21', 'paid', 'Online', 6283069142, 'rohan'),
(10, 3376.36, '2020-05-01 17:07:24', 'paid', 'Cash', 7973500986, 'rohan'),
(11, 1059.2, '2020-05-01 17:09:21', 'paid', 'Online', 7973500986, 'rohan'),
(12, 1785.67, '2020-05-01 17:13:11', 'paid', 'Online', 7973500986, 'rohan'),
(13, 5058.95, '2020-05-27 11:53:28', 'paid', 'Online', 7973500986, 'rohan'),
(14, 407.88, '2020-05-27 11:55:25', 'paid', 'Cash', 6283069142, 'rohan'),
(15, 7800.81, '2020-05-27 11:57:45', 'paid', 'Cash', 7986265665, 'rohan');

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
(1, 790, 3, 20, 632, 'delivered', 2, 4),
(2, 920, 5, 37, 580, 'delivered', 2, 5),
(3, 691, 5, 27, 504, 'delivered', 2, 6),
(4, 206, 1, 1, 204, 'delivered', 3, 11),
(5, 850, 1, 8, 782, 'delivered', 4, 7),
(6, 611, 1, 57, 263, 'delivered', 4, 9),
(7, 206, 2, 1, 204, 'delivered', 5, 11),
(8, 920, 2, 37, 580, 'delivered', 6, 5),
(9, 898, 1, 89, 99, 'delivered', 6, 13),
(10, 544, 1, 28, 392, 'delivered', 6, 10),
(11, 611, 2, 57, 263, 'delivered', 6, 9),
(12, 790, 1, 20, 632, 'delivered', 7, 4),
(13, 920, 1, 37, 580, 'delivered', 7, 5),
(14, 691, 1, 27, 504, 'delivered', 7, 6),
(15, 206, 3, 1, 204, 'delivered', 8, 11),
(16, 790, 1, 20, 632, 'delivered', 9, 4),
(17, 611, 1, 57, 263, 'delivered', 9, 9),
(18, 594, 1, 15, 505, 'delivered', 10, 3),
(19, 850, 3, 8, 782, 'delivered', 10, 7),
(20, 611, 2, 57, 263, 'delivered', 10, 9),
(21, 790, 1, 20, 632, 'delivered', 11, 4),
(22, 890, 2, 76, 214, 'delivered', 11, 8),
(23, 898, 1, 89, 99, 'delivered', 12, 13),
(24, 544, 2, 28, 392, 'delivered', 12, 10),
(25, 890, 3, 76, 214, 'delivered', 12, 8),
(26, 611, 1, 57, 263, 'delivered', 12, 9),
(27, 790, 3, 20, 632, 'delivered', 13, 4),
(28, 691, 5, 27, 504, 'delivered', 13, 6),
(29, 890, 3, 76, 214, 'delivered', 13, 8),
(30, 206, 2, 1, 204, 'delivered', 14, 11),
(31, 594, 3, 15, 505, 'delivered', 15, 3),
(32, 920, 3, 37, 580, 'delivered', 15, 5),
(33, 691, 3, 27, 504, 'delivered', 15, 6),
(34, 898, 3, 89, 99, 'delivered', 15, 13),
(35, 544, 1, 28, 392, 'delivered', 15, 10),
(36, 850, 3, 8, 782, 'delivered', 15, 7);

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
(3, 'All Season', 594, 465, 15, 'photo/product13e2f4.jpg', 'Eaque est quis nequ', 17),
(4, 'Blender', 790, 17, 20, 'photo/product1_medium76bd.jpg', 'Aut laudantium veli', 7),
(5, 'Royal Stag', 920, 459, 37, 'photo/product3_grande59b3.jpg', 'Dolores quisquam num', 11),
(6, 'Teacher', 691, 2, 27, 'photo/product8c058.jpg', 'In cupidatat amet s', 15),
(7, 'Advocate', 850, 91, 8, 'photo/product15b995.jpg', 'Hic tempor nesciunt', 18),
(8, 'Black & White', 890, 84, 76, 'photo/product7_medium5f5d.jpg', 'Voluptatem minus am', 16),
(9, 'Red Label', 611, 29, 57, 'photo/product9_grande59b3.jpg', 'Culpa cillum suscip', 10),
(10, 'Signature', 544, 54, 28, 'photo/product186262.jpg', 'Dolores consequatur', 9),
(11, 'Antiquity', 206, 77, 1, 'photo/img_1.jpg', 'Magnam dolore aut co', 17),
(13, 'Royal Green', 898, 65, 89, 'photo/6-380x384_grandeb995.jpg', 'Quas dolorem ut do a', 9);

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
(11, 'photo/product13_grandee2f4.jpg', 'Enim est autem reic', 3),
(12, 'photo/product13e2f4.jpg', 'Autem tempora quia v', 3),
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
(31, 'photo/img_1.jpg', 'Facere natus sit non', 11);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staffname` varchar(110) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staffname`, `password`, `mobile`, `status`) VALUES
('Belle Coleman', '111', 6280276218, 'Blocked'),
('rohan', '11', 6283069142, 'Activated'),
('Yvette Rivas', '111', 6283069142, 'Activated');

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
(19, 'Lamar Duke', 'Qui repudiandae volu', 'Lucy Mercer'),
(20, 'Madeline Garner', 'Sequi at reprehender', 'Cocktail Btter'),
(21, 'Halla Trujillo', 'Dolorum velit est v', 'Wine'),
(22, 'Aubrey Black', 'Sequi velit velit m', 'Wine'),
(23, 'Clio Glover', 'Suscipit in aut even', 'Liquor'),
(24, 'Hedley Reilly', 'Non vel magna distin', 'Distilled Beverages');

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
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `orderdetailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_photo`
--
ALTER TABLE `product_photo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subcategoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
