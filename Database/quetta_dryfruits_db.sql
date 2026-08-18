-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2026 at 10:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quetta_dryfruits_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT 5,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `email`, `rating`, `message`, `created_at`) VALUES
(12, 'Ikram', 'ikram10@gmail.com', 5, 'Good work', '2026-08-15 22:21:26');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `delivery_address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Delivered','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `customer_phone`, `delivery_address`, `total_amount`, `status`, `created_at`) VALUES
(8, 'Muhammad Ikram', '03000000000', 'Quetta', 5200.00, 'Delivered', '2026-08-15 21:21:13'),
(9, 'Ali', '03000000000', 'Quetta', 6000.00, 'Delivered', '2026-08-15 21:21:35'),
(10, 'Hamza', '03000000000', 'Quetta', 68200.00, 'Pending', '2026-08-15 21:40:16'),
(11, 'Ikram', '03000000000', 'Quetta', 17200.00, 'Delivered', '2026-08-15 22:21:01'),
(12, 'Bilal', '03000000000', 'Quetta', 2800.00, 'Pending', '2026-08-15 22:24:55'),
(13, 'Muneer', '03000000000', 'Quetta', 22200.00, 'Pending', '2026-08-15 22:29:22');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `weight_kg` decimal(5,2) NOT NULL,
  `cost_price_per_kg` decimal(10,2) NOT NULL DEFAULT 0.00,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `weight_kg`, `cost_price_per_kg`, `subtotal`) VALUES
(13, 8, 7, 1.00, 1800.00, 2200.00),
(14, 8, 3, 1.00, 2600.00, 2800.00),
(15, 9, 6, 1.00, 2400.00, 2600.00),
(16, 9, 1, 1.00, 3000.00, 3200.00),
(17, 10, 8, 8.00, 8000.00, 68000.00),
(18, 11, 8, 2.00, 8000.00, 17000.00),
(19, 12, 6, 1.00, 2400.00, 2600.00),
(20, 13, 7, 10.00, 1800.00, 22000.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `category` enum('Nuts','Dried Fruits','Dates','Gift Boxes') NOT NULL,
  `origin` varchar(100) DEFAULT 'Quetta',
  `price_per_kg` decimal(10,2) NOT NULL,
  `cost_price_per_kg` decimal(10,2) NOT NULL DEFAULT 0.00,
  `stock_kg` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `category`, `origin`, `price_per_kg`, `cost_price_per_kg`, `stock_kg`, `image_url`, `description`, `is_featured`, `created_at`) VALUES
(1, 'Kaghzi Badam', 'Nuts', 'Quetta, Balochistan', 3200.00, 3000.00, 44.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1wEvmJw1O2OL1IC88BFyvsiCgGP7S3O8Dm86Jf88BNQ&s=10', NULL, 1, '2026-08-14 20:34:40'),
(2, 'Chilgoza', 'Nuts', 'Zhob / Quetta', 12500.00, 12000.00, 14.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqp3BHIQkJEV4SRWsLx-hMNm4S1COjaCt7ZPK7nAUug&s=10', NULL, 1, '2026-08-14 20:34:40'),
(3, 'Afghani Anjeer', 'Dried Fruits', 'Afghanistan / Quetta Market', 2800.00, 2600.00, 29.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzyYuZRVR-0l_8X7KFgxDdgw9MPGGCh0nxz_swvcE1g&s=10', NULL, 1, '2026-08-14 20:34:40'),
(4, 'Iranian Pista', 'Nuts', 'Iran / Quetta Import', 4500.00, 4300.00, 24.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86kbRmn1eTK1bQoUNzMgUK4VAPevd0PvJYVeswo_BAw&s=10', NULL, 1, '2026-08-14 20:34:40'),
(5, 'Sundarkhani Kishmish', 'Dried Fruits', 'Quetta, Balochistan', 1800.00, 1500.00, 39.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8rrpwQ926vUZ8XACmzGYyttgt4TunUuhV7RGKlgtiA&s=10', NULL, 0, '2026-08-14 20:34:40'),
(6, 'Akhrot Giri', 'Nuts', 'Swat / Quetta Market', 2600.00, 2400.00, 26.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXGVzj-UI_MGIOOFt9CEAlCvOCsUTb_OkJHdW8KIIQA&s=10', NULL, 0, '2026-08-14 20:34:40'),
(7, 'Kala Muneqa', 'Dried Fruits', 'Quetta Market', 2200.00, 1800.00, 6.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWiUhq7D0-hh78CBkY-UhzBQU389eHQBBhetJTA8xdo9arwzzhvV_C-0&s=10', NULL, 0, '2026-08-14 20:34:40'),
(8, 'Quetta Shahi Sougat Gift Box', 'Gift Boxes', 'Quetta', 8600.00, 8100.00, 1.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw0Tq163cjQWebY_BvzZR8p9xcAQCABwOFd6HXMQprQA&s=10', NULL, 1, '2026-08-14 20:34:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
