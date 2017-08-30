-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2015 at 12:20 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rumahsampah`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

CREATE TABLE IF NOT EXISTS `artikel` (
  `id_artikel` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `judul_artikel` varchar(32) NOT NULL,
  `isi_artikel` text NOT NULL,
  `kategori` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'Unpromoted',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `artikel`
--

INSERT INTO `artikel` (`id_artikel`, `id_user`, `judul_artikel`, `isi_artikel`, `kategori`, `status`, `timestamp`) VALUES
(1, 0, 'eu', 'lallala', 'Logam', 'Promoted', '2015-12-25 01:55:07'),
(8, 30, 'title', 'content', 'Organik', 'Unpromoted', '2015-12-25 04:59:42'),
(9, 31, 'lalala', 'Kaka', 'Kaca', 'Unpromoted', '2015-12-25 03:59:39'),
(15, 30, 'qweoiqwewieowieiowie', 'mewmewmewmew', 'Organik', 'Promoted', '2015-12-25 17:45:30'),
(17, 30, 'LOL', 'kesel mblo..?', 'Logam', 'Unpromoted', '2015-12-25 18:41:32'),
(20, 0, 'blablablablbla', 'bulbulbulbulbulbulbu', 'Plastik', 'Unpromoted', '2015-12-27 13:20:59'),
(28, 33, 'Cara membuat robot dari kertas b', 'cari di google.com.', 'Kertas', 'Unpromoted', '2015-12-27 13:29:42'),
(29, 35, 'Cara membuat robot dari kertas b', 'tanya mbah google.\nkali aja dapet', 'Kertas', 'Unpromoted', '2015-12-27 13:31:23'),
(30, 35, 'Tunggu - tunggu', 'blablablablablabla', 'Kertas', 'Unpromoted', '2015-12-27 13:33:29'),
(31, 0, 'yaaaaaaaaaaaa', 'eaaae eaa eaaa', 'Kaca', 'Unpromoted', '2015-12-27 13:37:10'),
(32, 33, 'Coba Koding', 'var DEFAULT_PAGE_SIZE_STEP = 5;\n  \n    $scope.currentPage = 1;\n    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;  \n    \n    $scope.loadNextPage = function(){\n      $scope.currentPage++;\n      $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;\n    }', 'Organik', 'Promoted', '2015-12-27 13:45:03'),
(33, 0, 'Test test test', 'Coba - Coba', 'Kertas', 'Unpromoted', '2015-12-27 23:08:37');

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

CREATE TABLE IF NOT EXISTS `komentar` (
  `id_user` int(10) NOT NULL,
  `id_artikel` int(10) NOT NULL,
  `id_komentar` int(10) NOT NULL,
  `isi_komentar` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `komentar`
--

INSERT INTO `komentar` (`id_user`, `id_artikel`, `id_komentar`, `isi_komentar`) VALUES
(0, 1, 1, 'Pertamax Gan'),
(30, 1, 2, 'Keduax gan'),
(33, 15, 3, 'coba coba'),
(33, 15, 5, 'Iseng - iseng'),
(33, 32, 6, 'coba juga'),
(33, 32, 7, 'coba lagi');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
  `id_user` int(10) NOT NULL,
  `id_artikel` int(10) NOT NULL,
  `rating` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id_user`, `id_artikel`, `rating`) VALUES
(0, 1, NULL),
(0, 8, NULL),
(0, 9, NULL),
(0, 15, NULL),
(0, 17, NULL),
(0, 20, NULL),
(0, 30, NULL),
(0, 31, NULL),
(0, 32, NULL),
(0, 33, NULL),
(30, 1, 5),
(30, 15, 1),
(31, 1, 3),
(32, 1, 4),
(33, 32, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(10) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `level_user` int(1) NOT NULL DEFAULT '1',
  `email_user` varchar(32) NOT NULL,
  `jenis_kelamin` char(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `level_user`, `email_user`, `jenis_kelamin`) VALUES
(0, 'mimin', 'super123', 0, 'mimin@min.com', 'L'),
(30, 'yudaprayoga', '123', 1, '123@123.com', 'L'),
(31, 'yanyanyan', '12321', 1, 'ab@ab.com', 'P'),
(32, 'malmalmal', 'asdsa', 1, 'eure@aue.com', 'P'),
(33, 'royhudayana', 'bang_gans', 1, 'royanwika@gmail.com', 'L'),
(35, 'Kuriayuda', 'eueueueu', 1, 'a@b.com', 'P');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id_artikel`,`id_user`), ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id_komentar`,`id_artikel`,`id_user`), ADD KEY `id_user` (`id_user`), ADD KEY `id_artikel` (`id_artikel`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id_user`,`id_artikel`), ADD KEY `id_artikel` (`id_artikel`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`), ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id_artikel` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `komentar`
--
ALTER TABLE `komentar`
  MODIFY `id_komentar` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `artikel`
--
ALTER TABLE `artikel`
ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
ADD CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
ADD CONSTRAINT `komentar_ibfk_2` FOREIGN KEY (`id_artikel`) REFERENCES `artikel` (`id_artikel`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`id_artikel`) REFERENCES `artikel` (`id_artikel`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
