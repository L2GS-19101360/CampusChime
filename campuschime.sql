-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 01, 2023 at 02:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text DEFAULT NULL,
  `product_category` varchar(255) DEFAULT NULL,
  `product_color` varchar(255) DEFAULT NULL,
  `product_size` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_sale` tinyint(1) DEFAULT 0,
  `original_price` decimal(10,2) NOT NULL,
  `ratings` float DEFAULT 0,
  `number_of_add_to_carts` int(11) DEFAULT 0,
  `merchant_id` int(11) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `contactnumber` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('customer','entrepreneur','admin') NOT NULL DEFAULT 'customer',
  `registered` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `lastname`, `firstname`, `contactnumber`, `email`, `password`, `role`, `registered`) VALUES
(34, 'Suico', 'Lorenz', 9123456789, 'lorenz@gmail.com', '$2y$10$wsejaKFNIvc.Z8b37Xo1HOtzPMjsTNZTgJYKZLu6rYcHuuOAviOeG', 'customer', '2023-11-28 01:00:24'),
(35, 'Dunphy', 'Alex', 9987456321, 'alex@gmail.com', '$2y$10$xaqaw9X49Y2yOEVB//FWdev6lUjh4DbC7jlj27ucJCDEoU/RQSz4W', 'customer', '2023-11-28 01:01:04'),
(36, 'Cabogoy', 'Zyguel', 9147852369, 'zyguel@gmail.com', '$2y$10$4zE5z.KRDSoJIq1OuLafQ.rsc8ZQKEUWaVkT6L5Cl2q0hEpQofEx6', 'customer', '2023-11-28 01:02:05'),
(37, 'Ceniza', 'Jaden', 9369852147, 'jaden@gmail.com', '$2y$10$IowdE0H02yhGxJbCwjHa9OK39RS5FB9O50/I6SAeSp59B9IfE2ylC', 'customer', '2023-11-28 01:02:51'),
(38, 'Tangcay', 'Maria', 9741258963, 'maria@gmail.com', '$2y$10$5w6QrVZVDcBLOB0lkMJ2aOf.M.M0T.Xo7VDj0OJ8up28aKIlwqjZW', 'customer', '2023-11-28 01:03:33'),
(39, 'Admin', 'Admin', 1234567890, 'admin@gmail.com', '$2y$10$exampleHashValue', 'admin', '2023-11-28 01:04:15'),
(40, 'Entrepreneur', 'Sample', 9876543210, 'entrepreneur@gmail.com', '$2y$10$exampleHashValue', 'entrepreneur', '2023-11-28 01:05:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_name` (`product_name`),
  ADD KEY `merchant_id` (`merchant_id`),
  ADD KEY `idx_product_name` (`product_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
