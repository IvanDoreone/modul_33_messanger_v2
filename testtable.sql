-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Сен 04 2023 г., 19:16
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testtable`
--

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(50) NOT NULL,
  `message` varchar(1026) DEFAULT NULL,
  `sender` int(50) NOT NULL,
  `addressat` int(50) NOT NULL,
  `sender_classname` varchar(256) NOT NULL,
  `sender_foto` varchar(256) NOT NULL,
  `sender_name` varchar(256) NOT NULL,
  `addressat_name` varchar(256) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `message`, `sender`, `addressat`, `sender_classname`, `sender_foto`, `sender_name`, `addressat_name`, `timestamp`) VALUES
(388, 'можно привет передать Ивану?!', 105, 106, 'secondary', 'images/workwork.jpg', 'марк', 'джон', '2023-08-30 19:02:36'),
(389, 'можно привет передать Ивану?', 105, 108, 'secondary', 'images/workwork.jpg', 'марк', 'eone ', '2023-08-25 13:31:40'),
(391, 'всем куку', 105, 108, 'secondary', 'images/workwork.jpg', 'марк', 'марк,джон,eone', '2023-08-25 13:32:35'),
(392, 'и вам от меня', 106, 105, 'secondary', 'images/фото2.jpg', 'джон', 'марк,джон,eone', '2023-08-25 13:33:08'),
(393, 'и вам от меня', 106, 108, 'secondary', 'images/фото2.jpg', 'джон', 'марк,джон,eone', '2023-08-25 13:33:08'),
(487, 'hi!', 105, 114, 'danger', 'images/usr1.png', 'марк', 'mr.Bean', '2023-08-30 19:03:09'),
(488, 'привет всем', 105, 114, 'info', 'images/usr1.png', 'марк', 'марк,carmen,mr.Bean', '2023-08-30 19:03:29'),
(816, 'привет всем', 105, 119, 'info', 'images/usr1.png', 'марк', 'paul ', '2023-09-04 10:58:40');

-- --------------------------------------------------------

--
-- Структура таблицы `mutes`
--

CREATE TABLE `mutes` (
  `id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `mutes` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `mutes`
--

INSERT INTO `mutes` (`id`, `user_id`, `mutes`) VALUES
(1, 105, ''),
(2, 106, ''),
(4, 114, 'paul'),
(9, 119, '');

-- --------------------------------------------------------

--
-- Структура таблицы `users2`
--

CREATE TABLE `users2` (
  `id` int(11) NOT NULL,
  `login` varchar(256) NOT NULL,
  `password_hash` varchar(256) DEFAULT NULL,
  `user_hash_cookie` varchar(256) DEFAULT NULL,
  `register_time` date DEFAULT NULL,
  `role` varchar(256) DEFAULT NULL,
  `vk_user_id` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `users2`
--

INSERT INTO `users2` (`id`, `login`, `password_hash`, `user_hash_cookie`, `register_time`, `role`, `vk_user_id`) VALUES
(105, 'a@a.', '$2y$10$E881DQkhFwz9tdASba3wP.8c9p9i4NTm1ZxU4Md44EhSHURrslTG6', NULL, '2023-08-08', NULL, NULL),
(106, 's@s.', '$2y$10$wR9vAVyRrUpkWiwxwGbGc.iR/jcQrQIJbEvUaDKdPJzTS8eAK9xyO', NULL, '2023-08-17', NULL, NULL),
(114, 'b@b.', '$2y$10$tTv8A1TNm3kIUYY3ehBo0OdMV4wItazRtPb8CeqB7YQ1l7calZCQi', '9931c6fe70ab329bbe24beca15986bfa', '2023-08-28', NULL, NULL),
(119, 'k@k.', '$2y$10$D3auUKdeJL.KT861BunJ9Otf50ADOWdTnHtQDYrHEEuI9X8AhfAd6', '09b87a10405122fd2d1d24089085f6bf', '2023-08-30', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `user_profile`
--

CREATE TABLE `user_profile` (
  `user_id` int(50) NOT NULL,
  `user_foto` varchar(256) DEFAULT 'images/default_photo.jpg',
  `user_name` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_profile`
--

INSERT INTO `user_profile` (`user_id`, `user_foto`, `user_name`) VALUES
(105, 'images/usr1.png', 'марк'),
(106, 'images/usr4.png', 'carmen'),
(114, 'images/usr3.png', 'mr.Bean'),
(119, 'images/123.jpg', 'paul');

-- --------------------------------------------------------

--
-- Структура таблицы `user_status`
--

CREATE TABLE `user_status` (
  `user_id` int(50) NOT NULL,
  `status` varchar(256) NOT NULL DEFAULT 'ofline',
  `socket_id` varchar(256) DEFAULT NULL,
  `user_name` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_status`
--

INSERT INTO `user_status` (`user_id`, `status`, `socket_id`, `user_name`) VALUES
(105, 'ofline', 'Za6S5Icjd_bvX41PAAFV', 'марк'),
(106, 'ofline', 'zmVopt2QKjLSNTz4AAAF', 'carmen'),
(114, 'online', 'd63VUqoEoPWrPDCYAAFd', 'mr.Bean'),
(119, 'ofline', 'VUm_GeF1QZmt3rQ1AACF', 'paul');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`sender`,`addressat`);

--
-- Индексы таблицы `mutes`
--
ALTER TABLE `mutes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users2`
--
ALTER TABLE `users2`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_profile`
--
ALTER TABLE `user_profile`
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `user_name` (`user_name`);

--
-- Индексы таблицы `user_status`
--
ALTER TABLE `user_status`
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=903;

--
-- AUTO_INCREMENT для таблицы `mutes`
--
ALTER TABLE `mutes`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `users2`
--
ALTER TABLE `users2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `mutes`
--
ALTER TABLE `mutes`
  ADD CONSTRAINT `mutes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users2` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users2` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_status`
--
ALTER TABLE `user_status`
  ADD CONSTRAINT `user_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users2` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
