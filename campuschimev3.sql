-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2023 at 05:39 PM
-- Server version: 10.4.28-MariaDB
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
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`, `quantity`, `total_price`, `date_added`) VALUES
(108, 43, 2, 1, '10.00', '2023-12-21 04:01:15');

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
(22, 43, 'uploads/656b6fef483bd4.70962929.png', 'yessir', 'accepted', '2023-12-02 10:57:03', '2023-12-05 00:37:45'),
(23, 61, 'uploads/6570be070d57c2.72681922.jpg', 'Books', 'accepted', '2023-12-06 11:31:35', '2023-12-06 18:52:14'),
(24, 47, 'uploads/6571537dd55c25.08331024.png', 'asdfsfd', 'accepted', '2023-12-06 22:09:17', '2023-12-21 21:15:25'),
(25, 62, 'uploads/65717b020dc743.27862688.png', 'asf', 'accepted', '2023-12-07 00:57:54', '2023-12-07 07:58:06'),
(26, 63, 'uploads/6571c968026af0.14466111.png', 'Make me seller haiya', 'accepted', '2023-12-07 05:32:24', '2023-12-07 13:33:11'),
(27, 66, 'uploads/65850d71522169.86064842.jpg', 'safsdf', 'accepted', '2023-12-21 21:15:45', '2023-12-21 21:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`) VALUES
(30, 62, '2023-12-20 10:05:04', '122.00'),
(31, 62, '2023-12-20 23:32:44', '135.00'),
(32, 62, '2023-12-21 00:00:17', '376.00'),
(33, 66, '2023-12-21 00:28:24', '393.96'),
(34, 66, '2023-12-21 00:32:10', '25.00'),
(35, 43, '2023-12-21 03:49:37', '122.00'),
(36, 43, '2023-12-21 03:50:02', '25.00'),
(37, 62, '2023-12-21 23:21:55', '496.00'),
(38, 62, '2023-12-21 23:25:14', '80.00'),
(39, 62, '2023-12-21 23:38:34', '35.00'),
(40, 62, '2023-12-21 23:49:01', '544.00'),
(41, 66, '2023-12-22 02:58:10', '54.99'),
(42, 66, '2023-12-22 05:32:02', '35.00'),
(43, 66, '2023-12-22 05:33:41', '90.00'),
(44, 66, '2023-12-22 05:40:41', '35.00'),
(45, 66, '2023-12-22 05:43:34', '35.00'),
(46, 66, '2023-12-22 05:45:41', '35.00'),
(47, 66, '2023-12-22 05:50:59', '35.00');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_sent` timestamp NULL DEFAULT NULL,
  `status` enum('pending','cancelled','completed') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`order_id`, `product_id`, `quantity`, `date_sent`, `status`) VALUES
(30, 16, 1, NULL, 'cancelled'),
(31, 4, 3, '2023-12-21 22:50:35', 'completed'),
(32, 16, 3, NULL, 'cancelled'),
(33, 3, 4, NULL, 'pending'),
(33, 4, 2, NULL, 'pending'),
(33, 16, 2, NULL, 'cancelled'),
(37, 16, 3, NULL, 'cancelled'),
(40, 15, 3, NULL, 'cancelled'),
(40, 16, 2, NULL, 'cancelled'),
(41, 3, 1, NULL, 'cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `order_products_history`
--

CREATE TABLE `order_products_history` (
  `history_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('pending','cancelled','completed') DEFAULT NULL,
  `removal_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `removed_by_merchant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_products_history`
--

INSERT INTO `order_products_history` (`history_id`, `order_id`, `product_id`, `quantity`, `status`, `removal_date`, `removed_by_merchant_id`) VALUES
(4, 34, 1, 1, 'completed', '2023-12-21 23:13:39', 43),
(5, 34, 1, 1, 'completed', '2023-12-21 23:15:56', 43),
(6, 36, 1, 1, 'completed', '2023-12-21 23:16:07', 43),
(7, 31, 2, 3, 'completed', '2023-12-21 23:16:53', 43),
(8, 32, 2, 1, 'cancelled', '2023-12-21 23:17:17', 43),
(9, 37, 1, 4, 'completed', '2023-12-21 23:22:38', 43),
(10, 37, 2, 3, 'completed', '2023-12-21 23:23:24', 43),
(11, 38, 2, 3, 'cancelled', '2023-12-21 23:37:47', 43),
(12, 35, 16, 1, 'cancelled', '2023-12-21 23:47:47', 62),
(13, 39, 2, 1, 'cancelled', '2023-12-21 23:51:15', 43),
(14, 41, 1, 1, 'cancelled', '2023-12-22 05:29:06', 43),
(15, 39, 1, 1, 'completed', '2023-12-22 05:30:12', 43),
(16, 41, 2, 1, 'cancelled', '2023-12-22 05:31:02', 43),
(17, 38, 1, 2, 'cancelled', '2023-12-22 05:31:14', 43),
(18, 42, 1, 1, 'completed', '2023-12-22 05:32:12', 43),
(19, 42, 2, 1, 'cancelled', '2023-12-22 05:32:58', 43),
(20, 43, 2, 4, 'cancelled', '2023-12-22 05:38:40', 43),
(21, 43, 1, 2, 'completed', '2023-12-22 05:40:17', 43),
(22, 44, 2, 1, 'pending', '2023-12-22 05:40:49', 43),
(23, 44, 1, 1, 'pending', '2023-12-22 05:42:16', 43),
(24, 44, 1, 1, 'cancelled', '2023-12-22 05:43:13', 43),
(25, 45, 1, 1, 'pending', '2023-12-22 05:43:40', 43),
(26, 45, 2, 1, 'pending', '2023-12-22 05:43:47', 43),
(27, 46, 1, 1, 'pending', '2023-12-22 05:45:51', 43),
(28, 46, 2, 1, 'pending', '2023-12-22 05:49:34', 43),
(29, 47, 1, 1, 'pending', '2023-12-22 05:51:04', 43),
(30, 47, 2, 1, 'cancelled', '2023-12-22 08:03:10', 43);

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
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_sale` tinyint(1) DEFAULT 0,
  `is_displayed` tinyint(1) DEFAULT 1,
  `is_reported` int(11) NOT NULL,
  `product_qty` int(11) DEFAULT 0,
  `original_price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) NOT NULL,
  `ratings` float DEFAULT 0,
  `number_of_add_to_carts` int(11) DEFAULT 0,
  `merchant_id` int(11) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_category`, `product_color`, `product_size`, `date_added`, `is_deleted`, `is_sale`, `is_displayed`, `is_reported`, `product_qty`, `original_price`, `sale_price`, `ratings`, `number_of_add_to_carts`, `merchant_id`, `product_image`) VALUES
(1, 'Play Station 4', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Category A', 'Red', 'Medium', '2023-12-07 06:37:26', 0, 1, 1, 0, 10, '29.99', '25.00', 4.2, 20, 43, 'product1.jpg'),
(2, 'Assasins Creed arm knife', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Category B', 'Blue', 'Large', '2023-12-07 06:37:26', 0, 1, 1, 0, 15, '49.99', '10.00', 3, 15, 43, 'product2.jpg'),
(3, 'Star Wars Lego Box', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Toy', 'Green', 'Small', '2023-12-07 06:37:26', 0, 0, 1, 0, 5, '19.99', '0.00', 0.1, 10, 47, 'product3.jpg'),
(4, 'Optimus Prime Transormers Toy', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Category C', 'Yellow', 'Large', '2023-12-07 06:37:26', 0, 1, 1, 0, 8, '39.99', '35.00', 4.4, 12, 61, 'product4.jpg'),
(11, 'Generator', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Power Generator', 'white', '1', '2023-12-08 03:36:00', 1, 0, 1, 0, 50, '120000.00', '900.99', 1, 0, 63, '17020065605331.png'),
(12, 'MakeShift Product', 'Makeshift', 'DIY', 'WHite', '0', '2023-12-08 08:53:54', 1, 0, 1, 0, 12, '1000.00', '649.00', 0, 0, 63, '17020256342743.png'),
(13, 'Test', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Test', '1', '5', '2023-12-08 12:41:51', 1, 0, 1, 0, 65, '25.00', '10.99', 3.8, 0, 63, '17020393118066.png'),
(14, 'Test', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 'Boat', '', '0', '2023-12-08 22:11:55', 0, 0, 1, 0, 25, '269.00', '0.00', 5, 0, 63, '17020735153623.png'),
(15, 'id', 'sadfsf', 'sfdsf', 'sdf', '0', '2023-12-20 18:02:47', 1, 0, 1, 0, 10, '100.00', '0.00', 0, 0, 62, '17030953679918.jpg'),
(16, 'test', 'fsf', 'sfd', 'asf', '0', '2023-12-20 18:04:10', 0, 0, 1, 0, 11, '122.00', '10.00', 0, 0, 62, '17030954506731.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_products`
--

CREATE TABLE `transaction_products` (
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
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
  `user_image` varchar(255) NOT NULL DEFAULT '#%&{}>',
  `active_status` int(11) NOT NULL DEFAULT 0,
  `registered` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(62, 'jaden', 'ceniza', 32423435, '22102267@usc.edu.ph', '$2y$10$W7xuohcTRSwaQBywEmF4BOWEhozda9CMk0EhKOnN3L0abloZsSshe', 'entrepreneur', '#%&{}>', 1, '2023-12-07 07:57:42'),
(63, 'LIM', 'CHANG', 0, 'iluvccp@gmail.com', '$2y$10$1/6ErPr.Scc/mc7TT5OhqerqhRCDSkJiC89.h0Mp3Gx1wGxciTeCq', 'entrepreneur', 'shipImport2.png', 1, '2023-12-07 13:31:58'),
(64, 'Hacker', 'Smith', 12346789, 'h', '$2y$10$K1RuPetkKaw92dKBdsB/HuXVNNbnqJSrapt.81jcxYToXlGSW1tjK', 'customer', '#%&{}>', 1, '2023-12-08 05:38:08'),
(65, 'hack', 'smith', 123456789, 'heyaa@gmail.com', '$2y$10$EPkGSgSLA3FBGm6O0UVWa.GD5yiSa0HUdCZpSb3Vc3hBH9II9dEgG', 'customer', '#%&{}>', 1, '2023-12-08 07:42:29'),
(66, 'john', 'doe', 32423435, 'john1@gmail.com', '$2y$10$6UsiviQxjsMuwkgrLwADUOBWjmB7sNiYT0NH4Nuj8770Km977mSrG', 'customer', '#%&{}>', 1, '2023-12-20 05:55:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `entrepreneur_requests`
--
ALTER TABLE `entrepreneur_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `user_id_fk` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id_fk` (`user_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `order_products_ibfk_2` (`product_id`);

--
-- Indexes for table `order_products_history`
--
ALTER TABLE `order_products_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `order_id_fk` (`order_id`),
  ADD KEY `product_id_fk` (`product_id`),
  ADD KEY `order_products_history_ibfk_3` (`removed_by_merchant_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `products_ibfk_1` (`merchant_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transaction_products`
--
ALTER TABLE `transaction_products`
  ADD PRIMARY KEY (`transaction_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `entrepreneur_requests`
--
ALTER TABLE `entrepreneur_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `order_products_history`
--
ALTER TABLE `order_products_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `entrepreneur_requests`
--
ALTER TABLE `entrepreneur_requests`
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `order_products_history`
--
ALTER TABLE `order_products_history`
  ADD CONSTRAINT `order_products_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_products_history_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `order_products_history_ibfk_3` FOREIGN KEY (`removed_by_merchant_id`) REFERENCES `users` (`user_id`);

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
