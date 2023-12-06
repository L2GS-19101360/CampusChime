-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 06:47 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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

CREATE TABLE `entrepreneur_requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `product_description` text DEFAULT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `request_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `decision_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entrepreneur_requests`
--

INSERT INTO `entrepreneur_requests` (`request_id`, `user_id`, `image`, `product_description`, `status`, `request_date`, `decision_date`) VALUES
(22, 43, 'uploads/656b6fef483bd4.70962929.png', 'yessir', 'accepted', '2023-12-02 10:57:03', '2023-12-05 00:37:45');

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
  `user_image` varchar(255) NOT NULL DEFAULT '#%&{}\\<>',
  `active_status` int(11) NOT NULL DEFAULT 1,
  `registered` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `lastname`, `firstname`, `contactnumber`, `email`, `password`, `role`, `user_image`, `active_status`, `registered`) VALUES
(36, 'Cabogoy', 'Zyguel', 9147852369, 'zyguel@gmail.com', '$2y$10$4zE5z.KRDSoJIq1OuLafQ.rsc8ZQKEUWaVkT6L5Cl2q0hEpQofEx6', 'admin', 'Zyguel.jpg', 1, '2023-11-28 01:02:05'),
(37, 'Ceniza', 'Jaden', 9369852147, 'jaden@gmail.com', '$2y$10$IowdE0H02yhGxJbCwjHa9OK39RS5FB9O50/I6SAeSp59B9IfE2ylC', 'admin', 'Jaden.jpg', 1, '2023-11-28 01:02:51'),
(38, 'Tangcay', 'Maria', 9741258963, 'maria@gmail.com', '$2y$10$5w6QrVZVDcBLOB0lkMJ2aOf.M.M0T.Xo7VDj0OJ8up28aKIlwqjZW', 'admin', '#%&{}\\<>', 1, '2023-11-28 01:03:33'),
(43, 'Suico', 'Lawerence', 9123456789, 'lawrence@gmail.com', '$2y$10$bVKjjCrE4PM9hVZGP62B5eOrzA3/BMgDdSvEXSeEqUStwhXVBZA8W', 'entrepreneur', 'pinA.png', 1, '2023-12-02 00:27:37'),
(44, 'Suico', 'Alexandra', 9123456789, 'alexandra@gmail.com', '$2y$10$1SkvQFxoGPTbSDlXcxYCwOlK2YnsvRlCfbq3h1nGMSJqm0YiFVIY6', 'customer', 'pinB.png', 1, '2023-12-02 00:30:57'),
(46, 'Jones', 'Carl', 9369852147, 'carl@gmail.com', '$2y$10$R7nguXyqy9NnE4h68kmyvO2G1./OSLNQTZnhmGzfLHIIUYhvlybMu', 'customer', '#%&{}\\<>', 0, '2023-12-04 17:41:48'),
(47, 'Doe', 'John', 9987456321, 'john@gmail.com', '$2y$10$W94419sUBcd8h8hBMc7sx.d1h2of112LWcov6C0uFqXgYPNeL3gRe', 'customer', '#%&{}\\<>', 1, '2023-12-04 17:43:41'),
(48, 'Doe', 'Jane', 9369852147, 'jane@gmail.com', '$2y$10$4vrEejIhPZu4tvWFRds8pOA.JPrmRS09ye4L5Wbv8qGfJ7o6HsUqG', 'customer', '#%&{}\\<>', 1, '2023-12-04 17:46:43'),
(49, 'Suico', 'Lorenz Gil', 9147852369, 'lorenzsuico@gmail.com', '$2y$10$wf0hfV32nTIYfGbo2P8xe.xI4JeyfrBRon0LcWi6Pv0PuGMYnjpnC', 'customer', '#%&{}\\<>', 1, '2023-12-05 01:34:47'),
(50, 'Tester', 'Tester', 9369852147, 'test@gmail.com', '$2y$10$wZ6d/Cpt1FySNpYGNBBepu4MAQjqzf7zXwhXDlB6LjT1eKs.5xJJu', 'customer', 'DELETE.jpg', 1, '2023-12-05 02:21:59'),
(51, 'Cat', 'Tom', 9123456789, 'tom@gmail', '$2y$10$0ZwnfoxNjl5n6l/PPuNIQ.aMClXvpzEZ7pbywU/o101NVsdg5a4PO', 'customer', '#%&{}\\<>', 0, '2023-12-06 05:30:50'),
(52, 'Mouse', 'Jerry', 9321654987, 'jerry@gmail.com', '$2y$10$4..iqjGv5fPn4iC8rTaksuhXVG/WEDe5xhhn6IF1OiAj.lZ/.sT.W', 'customer', '#%&{}\\<>', 0, '2023-12-06 05:31:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
