-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by vuth at 23-09-2020 16:03.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE comics
DROP TABLE IF EXISTS comics;
CREATE TABLE `comics` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `copyright_title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `year_start` int(11) DEFAULT NULL,
  `year_end` int(11) DEFAULT NULL,
  `volumes_collected` int(11) DEFAULT NULL,
  `volumes_total` int(11) DEFAULT NULL,
  `ongoing` tinyint(1) DEFAULT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Inserting 59 rows into comics
-- Insert batch #1
INSERT INTO comics (id, title, copyright_title, author, publisher_id, year_start, year_end, volumes_collected, volumes_total, ongoing, finished, thumbnail, created_at, updated_at) VALUES
(1, 'Black Clover', 'Black Clover', 'Yuki Tabata', 1, 2020, NULL, 8, 23, 0, 0, '8_87.jpg', '2020-08-29 10:09:30', '2020-09-20 09:21:29'),
(2, 'Kết giới sư', 'Kekkaishi', 'Yellow Tanabe', 1, 2016, 2016, 35, 35, 0, 1, 'kekkaishi.png', '2020-08-29 11:27:56', '2020-09-20 09:11:05'),
(3, 'Togari', 'Togari', 'Natsume Yoshinori', 1, 2009, 2009, 8, 8, 0, 1, 'togari.jpg', '2020-08-29 11:31:30', '2020-09-20 09:12:12'),
(4, 'Hello Komang', 'Hello Komang', 'Park In-Seo, Choi Sang', 1, 2007, 2007, 6, 6, 0, 1, 'hellokomang.jpg', '2020-08-29 11:34:51', '2020-09-20 09:10:10'),
(5, 'Thiên thần diệt thế', 'Owari no Seraph', 'Takaya Kagami, Yamato Yamamoto, Daisuke Furuya', 1, 2018, 2018, 15, 21, 1, 0, '15_9.jpg', '2020-08-29 11:51:18', '2020-09-20 09:05:53'),
(6, 'Thần Thoại Minh Vương', 'Saint Seiya The Last Canvas', 'Masami Kurumada, Shiori Teshirogi', 3, 2013, 2013, 25, 25, 0, 1, 'seiya.jpg', '2020-08-29 13:51:58', '2020-09-20 09:12:02'),
(7, 'Pokémon đặc biệt', 'Pocket Monster Special', 'Hidenori Kusaka, Mato', 1, 2019, NULL, 53, 55, 1, 0, '53_6.jpg', '2020-08-29 13:58:35', '2020-09-20 09:13:44'),
(8, 'Học viện Siêu anh hùng', 'Boku No Hero Academia', 'Kohei Horikoshi', 1, 2018, NULL, 22, 28, 1, 0, '23.jpg', '2020-08-29 14:03:48', '2020-09-20 09:21:00'),
(9, 'Hunter X Hunter', 'Hunter X Hunter', 'Yoshihiro Togashi', 1, 2017, NULL, 35, 36, 1, 0, '1_10.jpg', '2020-08-29 14:30:54', '2020-09-20 09:09:51'),
(10, 'Pokémon - Cuộc phiêu lưu của Pippi', 'Pokémon', 'Kosaku Anakubo', 1, 2020, 2020, 14, 14, 0, 1, '1_81.jpg', '2020-08-29 14:37:13', '2020-09-20 09:06:10'),
(11, 'Chú Thòong', 'Laofuzi', 'Vương Trạch', 1, 2017, 2017, 25, 25, 0, 1, '25_9.jpg', '2020-08-29 14:38:33', '2020-09-20 09:22:50'),
(12, 'Dr. Slump', 'Dr. Slump', 'Akira Toriyama', 1, 2012, 2012, 18, 18, 0, 1, 'dr-slump-t18.jpg', '2020-08-29 15:20:55', '2020-09-20 09:07:39'),
(13, 'Hành trình u linh giới', 'Yu Yu Hakusho', 'Yoshihiro Togashi ', 1, 2015, 2016, 19, 19, 0, 1, 'yuyuhakusho.jpg', '2020-08-29 15:25:33', '2020-09-20 09:10:33'),
(14, 'Cuộc phiêu lưu của Croket', 'Croket!', 'Manavu Kashimoto', 1, 2019, 2019, 15, 15, 0, 1, '1_36.jpg', '2020-08-29 15:29:42', '2020-09-20 09:06:48'),
(15, 'Doraemon truyện dài', 'Daichohen Doraemon', 'Fujiko F Fujio', 1, 2020, 2020, 24, 24, 0, 1, '24_28.jpg', '2020-08-29 15:31:35', '2020-09-20 09:23:47'),
(16, 'Siêu quậy Teppei', 'Ore wa Teppei', 'Tetsuya Chiba', 1, 2019, 2020, 31, 31, 0, 1, '1_104.jpg', '2020-08-29 15:33:02', '2020-09-20 09:11:27'),
(17, 'Yu-Gi-Oh!', 'Yu-Gi-Oh!', 'Kazuki Takahashi', 1, 2018, 2019, 38, 38, 0, 1, '1_80.jpg', '2020-08-29 16:11:45', '2020-09-20 09:12:58'),
(18, 'Itto - Sóng gió cầu trường', 'Buttobi Itto', 'Motoki Monma', 1, 2019, 2019, 26, 26, 0, 1, '1_ittob.jpg', '2020-08-29 17:34:54', '2020-09-20 09:15:05'),
(19, 'Kurozakuro', 'Kurozakuro', 'Natsume Yoshinori', 1, 2009, 2009, 7, 7, 0, 1, 'kurozakuro.jpeg', '2020-08-29 17:50:04', '2020-09-20 09:10:01'),
(20, 'Thám tử­ Kindaichi', 'Kindaichi Shonen no Jikenbo', 'Seimaru Amagi, Fumiya Sato', 2, 2018, 2019, 34, 34, 0, 1, '1_kin.jpg', '2020-08-29 17:53:16', '2020-09-20 09:06:31'),
(21, 'Thám Tử Kindaichi R', 'Kindaichi Shonen no Jikenbo R', 'Seimaru Amagi, Fumiya Sato', 2, 2020, 2020, 14, 14, 0, 1, 'nxbtre_full_17422020_104204.jpg', '2020-08-29 17:55:11', '2020-09-20 14:22:13'),
(22, 'Văn hào lưu lạc', 'Bungou Stray Dogs', 'Asagiri Kafka, Harukawa Sango', 7, 2018, NULL, 17, 17, 1, 0, '2F26177E-D669-4C7F-9C02-12E42AE9806D.jpeg', '2020-08-29 18:00:59', '2020-09-19 05:47:10'),
(23, 'Giả thuật kim sư', 'Fullmetal Alchemist', 'Hiromu Arakawa', 3, 2013, 2013, 27, 27, 0, 1, 'fma.jpg', '2020-08-29 18:10:53', '2020-09-20 09:08:10'),
(24, 'Cậu bé ba mắt', 'Mitsume ga Tooru', 'Osamu Tezuka', 6, 2012, 2012, 9, 9, 0, 1, '19C7AED0-23DD-4D34-A289-69F734AED41C.jpeg', '2020-08-29 18:14:22', '2020-09-19 13:52:23'),
(25, 'Tomodachi x Monster', 'Tomodachi x Monster', 'Yoshihiko Inui', 4, 2016, 2016, 3, 3, 0, 1, '1_tomo.jpg', '2020-08-29 18:25:56', '2020-09-20 09:12:40'),
(26, 'Thanh gươm diệt quỷ', 'Kimetsu no Yaiba', 'Koyoharu Gotouge', 1, 2020, 2020, 15, 23, 0, 0, '119953096_10157820728438869_2550519904677041957_o.jpg', '2020-08-29 18:27:57', '2020-09-21 17:12:03'),
(27, 'Đội quân nhí nhố', 'Kung Fu Boy Komang', 'Park In-Seo, Choi Sang', 1, 2020, NULL, 6, 39, 0, 0, 'B739DC89-7BEB-4F09-810E-204730C1E747.jpeg', '2020-08-29 18:29:16', '2020-09-19 13:52:40'),
(29, 'Thám tử lừng danh Conan', 'Meitantei Conan', 'Gosho Aoyama', 1, 2020, NULL, 5, 97, 1, 0, '97_2.jpg', '2020-08-29 18:32:47', '2020-09-20 09:14:12'),
(30, 'One Punch Man', 'One Punch Man', 'Yusuke Murata, One', 1, 2019, 2020, 20, 22, 1, 0, '21_36.jpg', '2020-08-29 18:34:01', '2020-09-23 01:42:46'),
(31, 'Bleach', 'Bleach', 'Tite Kubo', 1, 2019, NULL, 33, 74, 0, 0, '34_20.jpg', '2020-08-29 18:34:58', '2020-09-23 01:43:20'),
(33, 'Học viện thám tử Q', 'Tantei Gakuen Q', 'Seimaru Amagi, Fumiya Sato', 1, 2019, NULL, 0, 22, 0, 0, 'q.jpg', '2020-08-29 18:38:57', '2020-09-20 09:10:49'),
(34, 'Naruto', 'Naruto', 'Masashi Kishimoto', 1, 2019, NULL, 41, 72, 0, 0, '18D07080-F8BC-46D7-BCA8-D7058C8CCB9D.jpeg', '2020-08-29 18:40:02', '2020-09-21 08:42:02'),
(35, 'Dragon Ball', 'Dragon Ball', 'Akira Toriyama', 1, 2019, 2020, 42, 42, 0, 1, '42_9.jpg', '2020-08-29 18:41:07', '2020-09-20 09:14:32'),
(36, 'One Piece', 'One Piece', 'Eiichiro Oda', 1, 2014, 2020, 93, 93, 1, 0, '93_3.jpg', '2020-08-29 18:42:32', '2020-09-20 09:18:31'),
(37, 'Gintama', 'Gintama', 'Hideaki Sorachi', 1, 2018, NULL, 58, 77, 0, 0, '59_5.jpg', '2020-08-29 18:43:38', '2020-09-23 01:43:59'),
(38, 'Yaiba', 'Yaiba', 'Gosho Aoyama', 1, 2020, NULL, 4, 24, 0, 0, '0CA4F305-3637-40EC-9A4C-9FDAC4A3249A.jpeg', '2020-08-29 18:44:15', '2020-09-21 08:41:50'),
(39, 'Assassination Classroom', 'Ansatsu Kyoshitsu', 'Yusei Matsui', 2, 2020, NULL, 14, 21, 0, 0, 'sach-assassination-classroom-14-thoi-gian-cuoi-ky.jpg', '2020-08-29 18:45:38', '2020-09-20 15:27:34'),
(40, 'Magic Kaito', 'Magic Kaito', 'Gosho Aoyama', 1, 2020, 2020, 0, 5, 0, 0, '1_161.jpg', '2020-09-07 09:42:15', '2020-09-20 09:16:20'),
(41, 'Doraemon truyện ngắn', 'Doraemon', 'Fujiko F. Fujio', 1, 2020, 2020, 0, 45, 0, 0, 'doraemon.jpeg', '2020-09-07 09:42:20', '2020-09-20 09:16:44'),
(42, 'Yu Gi Oh! R', 'Yu Gi Oh! R', 'Akira Ito', 1, 2020, 2020, 0, 5, 0, 0, '1_yugi.jpeg', '2020-09-07 09:43:36', '2020-09-20 09:16:08'),
(43, 'D.Gray-man', 'D.Gray-man', 'Katsura Hoshino', 1, 2018, 2019, 0, 27, 1, 0, '26_6.jpg', '2020-09-07 09:45:07', '2020-09-20 09:15:41'),
(45, 'Itto - Cơn lốc sân cỏ', 'Kattobi Itto', 'Motoki Monma', 1, 2018, 2019, 0, 47, 0, 0, '1_ittok.jpeg', '2020-09-07 10:01:25', '2020-09-20 09:15:30'),
(46, 'Fairy Tail', 'Fairy Tail', 'Hiro Mashima', 3, 2019, 2019, 0, 63, 0, 0, '1_ft.jpeg', '2020-09-07 10:27:32', '2020-09-20 09:17:19'),
(47, 'Servamp - Hầu cận ma cà rồng', 'Servamp', 'Tanaka Strike', 1, 2020, NULL, 1, 14, 1, 0, '1_ser.jpeg', '2020-09-07 10:38:16', '2020-09-20 09:23:33'),
(48, 'Pokemon Horizon', 'Pokemon Horizon', 'Tenya Yabuno', 1, 2020, 2020, 2, 2, 0, 1, 'pokemon_horizon.jpeg', '2020-09-07 10:40:33', '2020-09-20 09:17:02'),
(49, 'Dragon Ball Super', 'Dragon Ball Super', 'Akira Toriyama, Toyotarou', 1, 2020, NULL, 8, 13, 1, 0, 'A4239C16-E410-458B-92C9-119E18953FEE.jpeg', '2020-09-07 14:34:49', '2020-09-19 13:52:06'),
(50, 'Hannin no Hanzawa-san', 'Hannin no Hanzawa-san', 'Kanba Mayuko', 1, 2020, NULL, 0, 6, 1, 0, '1_hanz.jpeg', '2020-09-07 14:43:50', '2020-09-20 09:17:31'),
(51, 'Nhiệm vụ đặc biệt', 'Kowashiya Gamon', 'Syun Fujiki', 1, 2013, 2013, 9, 9, 0, 1, '1_gamon.jpg', '2020-09-09 14:29:50', '2020-09-20 09:17:40'),
(52, 'Mush - Hoạ sĩ thiên tài', 'Mush - Jidai Yori Atsuku', 'Takatoshi Yamada', 1, 2010, 2010, 9, 9, 0, 1, '1_mush.jpg', '2020-09-09 14:34:24', '2020-09-20 09:17:52'),
(53, 'Kingdom', 'Kingdom', 'Yasuhisa Hara', 1, 2020, NULL, 1, 59, 1, 0, '1_kingdom.jpg', '2020-09-10 09:28:33', '2020-09-20 09:22:05'),
(54, 'Lãng khách Kenshin', 'Rorouni Kenshin', 'Himura Battousai', 1, 2019, 2020, 24, 28, 0, 0, '24_33.jpg', '2020-09-10 10:50:31', '2020-09-21 15:10:04'),
(55, 'Pokemon - Cuộc phiêu lưu của Pippi R.S', 'Pokemon RS Hen', 'Kosaku Anakubo', 1, 2020, 2020, 1, 6, 0, 0, '2_235.jpg', '2020-09-14 09:00:13', '2020-09-21 09:36:27'),
(56, 'Death Note', 'Death Note', 'Tsugumi Ohba, Takeshi Obata', 7, 2018, 2018, 13, 13, 0, 1, '647C9228-0A82-48D0-BBFB-46C98713A21D.jpeg', '2020-09-14 09:03:31', '2020-09-19 13:53:12'),
(57, 'Hội Pháp Sư', 'Reborn Gumiho', 'Han Hyun-dong', 1, 2010, 2010, 21, 21, 0, 1, '576E329B-54BC-4735-A2E9-A176E4A492CD.jpeg', '2020-09-14 09:07:25', '2020-09-20 06:18:28'),
(58, 'Phá bỏ lời nguyền! Hyde & Closer', 'Juho Kaikin! Hyde & Closer', 'Aso Haro', 1, 2010, 2010, 7, 7, 0, 1, 'C9C77207-0F3E-4DD0-9785-372F2E210C09.jpeg', '2020-09-16 13:33:11', '2020-09-20 06:17:54'),
(59, 'Ong đưa thư', 'Tegami Bachi', 'Hiroyuki Asada', 1, 2011, 2011, 20, 20, 0, 1, '6A0AD460-F621-4BFF-A2E1-97723E47EC7B.jpeg', '2020-09-18 10:32:34', '2020-09-21 08:35:30'),
(60, 'Soul Eater', 'Soul Eater', 'Ohkubo Atsushi', 4, 2017, 2019, 15, 25, 0, 0, '15.jpg', '2020-09-19 05:54:02', '2020-09-22 05:51:46'),
(61, 'Young Black Jack', 'Young Black Jack', 'Yoshiaki Tabata, Yugo Okuma', 5, 2018, NULL, 8, 16, 0, 0, 'ybj_08.jpg', '2020-09-20 04:51:39', '2020-09-20 04:51:39'),
(63, 'Tsubasa - Giấc mơ sân cỏ', 'Captain Tsubasa', 'Yoichi Takahashi', 1, 2020, NULL, 7, 26, 0, 0, '7_94.jpg', '2020-09-20 09:31:33', '2020-09-20 09:31:33');

-- END TABLE comics

