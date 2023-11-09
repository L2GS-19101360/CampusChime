-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2023 at 01:01 AM
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
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `contactnumber` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `lastname`, `firstname`, `contactnumber`, `email`, `password`, `registered`) VALUES
(1, 'Cabogoy', 'Zyguel Philip', 9123456789, 'zyguel@gmail.com', '$2y$10$aKlT8.AZO9IcTccM4Qgpz.6z1aE9HsS9VH3ngkvjZNKV4xRihmKBm', '2023-11-07 11:54:16'),
(2, 'Suico', 'Lorenz Gil', 9987654321, 'lorenz@gmail.com', '$2y$10$8J0Pwjo2x35Ge3mnY1KXXOFBLvGLxLodhg6ITZueU124u14n7y/g.', '2023-11-07 11:54:16'),
(3, 'Ceniza', 'Jaden', 9369852147, 'jaden@gmail.com', '$2y$10$5ubjOjxmxXeglPQPvTHMYux4FTdUyi2MPMviF/rQ2pI6WIpxuQVmy', '2023-11-07 11:54:16'),
(4, 'Tangcay', 'Maria Madonna', 9147852369, 'maria@gmail.com', '$2y$10$r8yjGi.3NT4pmdM7DUov6eHBqjnhuqXUnzq97JUTNNJVyWuH2vkuC', '2023-11-07 11:54:16'),
(5, 'Jones', 'Bob', 9369852147, 'bob@gmail.com', '$2y$10$NhI6Y.kwc3ytevu1TZ/HPePgvyAXG5rvVXJ2e8Mroz999oYygLJfu', '2023-11-08 18:08:08'),
(7, 'Jones', 'Lorenz', 9369852147, 'carl@gmail.com', '$2y$10$H7IPE/60L3.bOORQg1NeBuuySx8pTq7nDhEK0D2M7jAxWVr08mV5S', '2023-11-08 23:56:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
