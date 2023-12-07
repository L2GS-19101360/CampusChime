-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 07, 2023 at 06:49 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campuschime`
--

-- --------------------------------------------------------

--
-- Table structure for table `entrepreneur_requests`
--

DROP TABLE IF EXISTS `entrepreneur_requests`;
CREATE TABLE IF NOT EXISTS `entrepreneur_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `product_description` text COLLATE utf8mb4_general_ci,
  `status` enum('pending','accepted','declined') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `request_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `decision_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `user_id_fk` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entrepreneur_requests`
--

INSERT INTO `entrepreneur_requests` (`request_id`, `user_id`, `image`, `product_description`, `status`, `request_date`, `decision_date`) VALUES
(22, 43, 'uploads/656b6fef483bd4.70962929.png', 'yessir', 'accepted', '2023-12-02 10:57:03', '2023-12-05 00:37:45'),
(23, 61, 'uploads/6570be070d57c2.72681922.jpg', 'Books', 'accepted', '2023-12-06 11:31:35', '2023-12-06 18:52:14'),
(24, 47, 'uploads/6571537dd55c25.08331024.png', 'asdfsfd', 'declined', '2023-12-06 22:09:17', '2023-12-07 05:09:30'),
(25, 62, 'uploads/65717b020dc743.27862688.png', 'asf', 'accepted', '2023-12-07 00:57:54', '2023-12-07 07:58:06'),
(26, 63, 'uploads/6571c968026af0.14466111.png', 'Make me seller haiya', 'accepted', '2023-12-07 05:32:24', '2023-12-07 13:33:11');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `product_description` text COLLATE utf8mb4_general_ci,
  `product_category` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_color` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_size` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `is_sale` tinyint(1) DEFAULT '0',
  `is_displayed` tinyint(1) DEFAULT '1',
  `product_qty` int DEFAULT '0',
  `original_price` decimal(10,2) NOT NULL,
  `ratings` float DEFAULT '0',
  `number_of_add_to_carts` int DEFAULT '0',
  `merchant_id` int DEFAULT NULL,
  `product_image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `products_ibfk_1` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_category`, `product_color`, `product_size`, `date_added`, `is_deleted`, `is_sale`, `is_displayed`, `product_qty`, `original_price`, `ratings`, `number_of_add_to_carts`, `merchant_id`, `product_image`) VALUES
(1, 'Product 1', 'Description for Product 1', 'Category A', 'Red', 'Medium', '2023-12-07 06:37:26', 0, 0, 1, 10, '29.99', 4.5, 20, 43, 'product1.jpg'),
(2, 'Product 2', 'Description for Product 2', 'Category B', 'Blue', 'Large', '2023-12-07 06:37:26', 0, 1, 1, 15, '49.99', 3.8, 15, 43, 'product2.jpg'),
(3, 'Product 3', 'Description for Product 3', 'Category A', 'Green', 'Small', '2023-12-07 06:37:26', 0, 0, 1, 5, '19.99', 4.2, 10, 47, 'product3.jpg'),
(4, 'Product 4', 'Description for Product 4', 'Category C', 'Yellow', 'Large', '2023-12-07 06:37:26', 0, 1, 1, 8, '39.99', 4, 12, 61, 'product4.jpg'),
(8, 'AMD RYZEN 7 6800H', 'AMD APU', 'APU', 'RED', '0', '2023-12-07 18:22:05', 0, 0, 1, 50, '25000.00', 0, 0, 63, 'files/17019733258615.png'),
(9, 'TRY AHAIN', 'OK', 'A', 'A', '0', '2023-12-07 18:24:48', 0, 0, 1, 12, '555.00', 0, 0, 63, 'files/17019734884447.png');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_products`
--

DROP TABLE IF EXISTS `transaction_products`;
CREATE TABLE IF NOT EXISTS `transaction_products` (
  `transaction_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`transaction_id`,`product_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `contactnumber` bigint NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('customer','entrepreneur','admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'customer',
  `user_image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '#%&{}>',
  `active_status` int NOT NULL DEFAULT '1',
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `lastname`, `firstname`, `contactnumber`, `email`, `password`, `role`, `user_image`, `active_status`, `registered`) VALUES
(36, 'Cabogoy', 'Zyguel', 9147852369, 'zyguel@gmail.com', '$2y$10$4zE5z.KRDSoJIq1OuLafQ.rsc8ZQKEUWaVkT6L5Cl2q0hEpQofEx6', 'admin', 'Zyguel.jpg', 1, '2023-11-28 01:02:05'),
(37, 'Ceniza', 'Jaden', 9369852147, 'jaden@gmail.com', '$2y$10$2Z6a8kOqSNDN5WSdQlIVgu/vHp6cSBeTgm9jY2tKfiZ3fj9NDth.S', 'admin', 'Jaden.jpg', 1, '2023-11-28 01:02:51'),
(38, 'Tangcay', 'Maria', 9741258963, 'maria@gmail.com', '$2y$10$5w6QrVZVDcBLOB0lkMJ2aOf.M.M0T.Xo7VDj0OJ8up28aKIlwqjZW', 'admin', '#%&{}>', 1, '2023-11-28 01:03:33'),
(43, 'Suico', 'Lawerence', 9123456789, 'lawrence@gmail.com', '$2y$10$bVKjjCrE4PM9hVZGP62B5eOrzA3/BMgDdSvEXSeEqUStwhXVBZA8W', 'entrepreneur', 'pinA.png', 1, '2023-12-02 00:27:37'),
(44, 'Suico', 'Alexandra', 9123456789, 'alexandra@gmail.com', '$2y$10$1SkvQFxoGPTbSDlXcxYCwOlK2YnsvRlCfbq3h1nGMSJqm0YiFVIY6', 'customer', 'pinB.png', 1, '2023-12-02 00:30:57'),
(46, 'Jones', 'Carl', 9369852147, 'carl@gmail.com', '$2y$10$R7nguXyqy9NnE4h68kmyvO2G1./OSLNQTZnhmGzfLHIIUYhvlybMu', 'customer', '#%&{}>', 0, '2023-12-04 17:41:48'),
(47, 'Doe', 'John', 9987456321, 'john@gmail.com', '$2y$10$W94419sUBcd8h8hBMc7sx.d1h2of112LWcov6C0uFqXgYPNeL3gRe', 'customer', '#%&{}>', 1, '2023-12-04 17:43:41'),
(48, 'Doe', 'Jane', 9369852147, 'jane@gmail.com', '$2y$10$4vrEejIhPZu4tvWFRds8pOA.JPrmRS09ye4L5Wbv8qGfJ7o6HsUqG', 'customer', '#%&{}>', 1, '2023-12-04 17:46:43'),
(51, 'Cat', 'Tom', 9123456789, 'tom@gmail', '$2y$10$0ZwnfoxNjl5n6l/PPuNIQ.aMClXvpzEZ7pbywU/o101NVsdg5a4PO', 'customer', '#%&{}>', 0, '2023-12-06 05:30:50'),
(52, 'Mouse', 'Jerry', 9321654987, 'jerry@gmail.com', '$2y$10$4..iqjGv5fPn4iC8rTaksuhXVG/WEDe5xhhn6IF1OiAj.lZ/.sT.W', 'customer', '#%&{}>', 0, '2023-12-06 05:31:34'),
(61, 'Test', 'Test', 9369852147, 'tt2852537@gmail.com', '$2y$10$JWdlE59N0BYF/W5oZR/0WuPjK.Kje9fK3675YQoQqvtCOUW7hfJeK', 'entrepreneur', 'DELETE.jpg', 1, '2023-12-06 07:28:13'),
(62, 'jaden', 'ceniza', 32423435, '22102267@usc.edu.ph', '$2y$10$W7xuohcTRSwaQBywEmF4BOWEhozda9CMk0EhKOnN3L0abloZsSshe', 'entrepreneur', '#%&{}>', 0, '2023-12-07 07:57:42'),
(63, 'LIM', 'CHANG', 0, 'iluvccp@gmail.com', '$2y$10$1/6ErPr.Scc/mc7TT5OhqerqhRCDSkJiC89.h0Mp3Gx1wGxciTeCq', 'entrepreneur', 'shipImport2.png', 1, '2023-12-07 13:31:58');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entrepreneur_requests`
--
ALTER TABLE `entrepreneur_requests`
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `transaction_products`
--
ALTER TABLE `transaction_products`
  ADD CONSTRAINT `transaction_products_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`),
  ADD CONSTRAINT `transaction_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
