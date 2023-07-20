/*
 Navicat Premium Data Transfer

 Source Server         : qdev2
 Source Server Type    : MySQL
 Source Server Version : 50742
 Source Host           : localhost:3006
 Source Schema         : qdev

 Target Server Type    : MySQL
 Target Server Version : 50742
 File Encoding         : 65001

 Date: 20/07/2023 10:57:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '标题',
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '简短描述',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '内容',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '封面',
  `createUserId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_3bd873efcfe04f25cd32d6a7612`(`createUserId`) USING BTREE,
  CONSTRAINT `FK_3bd873efcfe04f25cd32d6a7612` FOREIGN KEY (`createUserId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '2023-07-19 06:41:17.224462', '2023-07-20 01:06:08.000000', NULL, '第一篇随笔博客', '', '<p><br></p>', '/uploads/01H5PPHXHRQW0X43F7R05PFK28.png', 1);
INSERT INTO `article` VALUES (2, '2023-07-19 23:59:49.315108', '2023-07-20 00:56:30.000000', NULL, 'fetach上传文件失败问题', '', '<p>在使用 fetach 上传文件时，需要去除<strong>conten-type header</strong>，<span style=\"color: rgb(114, 192, 64);\">这样就可以了</span></p><p><br></p><p><br></p><p><br></p>', '/uploads/01H5RCNTGH8ZS9SAH5WKSBVWVW.jpg', 1);
INSERT INTO `article` VALUES (3, '2023-07-20 02:35:46.675268', '2023-07-20 02:35:46.675268', NULL, '123', '', '<p>123</p>', '', 1);
INSERT INTO `article` VALUES (4, '2023-07-20 02:35:51.175174', '2023-07-20 02:35:51.175174', NULL, '3213', '123123', '<p>123123</p>', '', 1);
INSERT INTO `article` VALUES (5, '2023-07-20 02:35:55.149972', '2023-07-20 02:35:55.149972', NULL, '234234', '23423', '<p>4234234</p>', '', 1);
INSERT INTO `article` VALUES (6, '2023-07-20 02:35:58.970537', '2023-07-20 02:35:58.970537', NULL, '3453', '45345', '<p>345345</p>', '', 1);
INSERT INTO `article` VALUES (7, '2023-07-20 02:36:02.890622', '2023-07-20 02:36:02.890622', NULL, '234324', '234', '<p>234234</p>', '', 1);
INSERT INTO `article` VALUES (8, '2023-07-20 02:36:06.489479', '2023-07-20 02:36:06.489479', NULL, '345345', '345', '<p>345345</p>', '', 1);
INSERT INTO `article` VALUES (9, '2023-07-20 02:36:11.378440', '2023-07-20 02:36:11.378440', NULL, '234324', '234', '<p>23424234</p>', '', 1);
INSERT INTO `article` VALUES (10, '2023-07-20 02:36:15.451555', '2023-07-20 02:36:15.451555', NULL, '34534', '5435', '<p>345345</p>', '', 1);
INSERT INTO `article` VALUES (11, '2023-07-20 02:36:19.790545', '2023-07-20 02:36:19.790545', NULL, '234234', '234', '<p>234234234</p>', '', 1);
INSERT INTO `article` VALUES (12, '2023-07-20 02:36:25.538365', '2023-07-20 02:36:25.538365', NULL, '234234', '234', '<p>234234234234</p>', '', 1);
INSERT INTO `article` VALUES (13, '2023-07-20 02:36:29.851821', '2023-07-20 02:38:38.000000', NULL, '1111111111111111', '5345', '<p>345345345</p>', '', 1);

-- ----------------------------
-- Table structure for auth
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `type` enum('catalog','menu','page','action') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'catalog',
  `isShow` tinyint(4) NOT NULL DEFAULT 0,
  `isLink` tinyint(4) NOT NULL DEFAULT 0,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `parentId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES ('2023-06-20 05:16:18.104000', '2023-07-17 01:46:39.967931', NULL, '角色管理', '角色管理', '', 'menu', 1, 0, '/role/index', NULL, 1, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:46:32.380649', '2023-07-17 06:35:35.000000', NULL, '权限管理', '权限管理', '', 'menu', 1, 0, '/auth/index', '7', 2, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:49:07.986309', '2023-07-17 06:35:56.000000', NULL, '系统配置', '系统配置', '', 'menu', 1, 0, '/sys-config/index', '7', 3, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:51:00.901583', '2023-07-17 01:51:00.901583', NULL, '管理员管理', '管理员管理', '', 'menu', 1, 0, '/administrator/index', NULL, 4, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:51:22.417454', '2023-07-17 01:51:22.417454', NULL, '会员管理', '会员管理', '', 'menu', 1, 0, '/member/index', NULL, 5, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 02:22:04.782425', '2023-07-17 06:36:59.000000', NULL, '登录日志', '登录日志', '', 'menu', 1, 0, '/login-log/index', '7', 6, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 06:35:25.624175', '2023-07-17 06:35:25.624175', NULL, '系统管理', '系统管理', '', 'catalog', 1, 0, '', NULL, 7, NULL);
INSERT INTO `auth` VALUES ('2023-07-19 06:33:48.510438', '2023-07-19 06:34:10.000000', NULL, '文章管理', '文章管理', '', 'menu', 1, 0, '/article/index', NULL, 8, NULL);

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '验证码',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '类型|image email',
  `userId` int(11) NOT NULL COMMENT '消费者',
  `isUse` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否已消费',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `type` enum('local','oss','cos') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'local' COMMENT '类型',
  `mark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '标签',
  `size` int(11) NOT NULL DEFAULT 0 COMMENT '文件大小',
  `width` int(11) NOT NULL DEFAULT 0 COMMENT '图片宽',
  `height` int(11) NOT NULL DEFAULT 0 COMMENT '图片高',
  `fileType` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '文件类型',
  `object` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '文件object',
  `thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '缩略图',
  `fileState` enum('default','uping','updone','uperror') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '文件状态',
  `fileMd5` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '文件md5',
  `status` enum('default','longterm','shortterm') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '状态',
  `expirationTime` datetime(0) NULL DEFAULT NULL COMMENT '过期时间，只作用于短期',
  `userId` int(11) NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_b2d8e683f020f61115edea206b`(`userId`) USING BTREE,
  CONSTRAINT `FK_b2d8e683f020f61115edea206b3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('2023-07-17 02:54:05.805625', '2023-07-17 02:54:05.805625', NULL, 'local', NULL, NULL, 24746, 300, 300, 'image/jpeg', '/uploads/01H5GW9XYKT1BERG4XZ3F9H7MF.jpg', '', 'default', '', 'default', NULL, NULL, 1);
INSERT INTO `file` VALUES ('2023-07-18 09:47:00.760857', '2023-07-18 09:47:00.760857', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5M6APWJ8TM8D52D3BF5ME21.png', '', 'default', '', 'default', NULL, NULL, 2);
INSERT INTO `file` VALUES ('2023-07-19 00:35:14.998679', '2023-07-19 00:35:14.998679', NULL, 'local', NULL, NULL, 24746, 300, 300, 'image/jpeg', '/uploads/01H5NS54DC54R7N3M55S3DGMK1.jpg', '', 'default', '', 'default', NULL, NULL, 3);
INSERT INTO `file` VALUES ('2023-07-19 04:31:30.852354', '2023-07-19 04:31:30.852354', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P6NR04EBX8G3VAGW46F9VT.png', '', 'default', '', 'default', NULL, NULL, 4);
INSERT INTO `file` VALUES ('2023-07-19 04:34:36.802312', '2023-07-19 04:34:36.802312', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P6VDKRRJMNHV9SSFZ2Y9S6.png', '', 'default', '', 'default', NULL, NULL, 5);
INSERT INTO `file` VALUES ('2023-07-19 04:35:24.966892', '2023-07-19 04:35:24.966892', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P6WWMYFP2QR1DVW7KE7ASF.png', '', 'default', '', 'default', NULL, NULL, 6);
INSERT INTO `file` VALUES ('2023-07-19 04:36:06.222154', '2023-07-19 04:36:06.222154', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P6Y4Y7208C1X6BQ3K8K5KM.png', '', 'default', '', 'default', NULL, NULL, 7);
INSERT INTO `file` VALUES ('2023-07-19 04:36:20.488554', '2023-07-19 04:36:20.488554', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P6YJVZHC3NT3MQY5CE5SAR.png', '', 'default', '', 'default', NULL, NULL, 8);
INSERT INTO `file` VALUES ('2023-07-19 04:38:04.933301', '2023-07-19 04:38:04.933301', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P71RVFRN7XDQCSWVFHHEGQ.png', '', 'default', '', 'default', NULL, NULL, 9);
INSERT INTO `file` VALUES ('2023-07-19 04:38:30.309944', '2023-07-19 04:38:30.309944', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P72HMXHJSJMKP9MWB4KDC2.png', '', 'default', '', 'default', NULL, NULL, 10);
INSERT INTO `file` VALUES ('2023-07-19 04:38:44.169639', '2023-07-19 04:38:44.169639', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P72Z61NQV2TTMG7MS402ZK.png', '', 'default', '', 'default', NULL, NULL, 11);
INSERT INTO `file` VALUES ('2023-07-19 04:42:10.422741', '2023-07-19 04:42:10.422741', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5P798KF6RA2QVD0WHV2NFN9.png', '', 'default', '', 'default', NULL, NULL, 12);
INSERT INTO `file` VALUES ('2023-07-19 09:09:02.746924', '2023-07-19 09:09:02.746924', NULL, 'local', NULL, NULL, 500562, 814, 674, 'image/png', '/uploads/01H5PPHXHRQW0X43F7R05PFK28.png', '', 'default', '', 'default', NULL, NULL, 13);
INSERT INTO `file` VALUES ('2023-07-20 00:54:53.762852', '2023-07-20 00:54:53.762852', NULL, 'local', NULL, NULL, 24746, 300, 300, 'image/jpeg', '/uploads/01H5RCNTGH8ZS9SAH5WKSBVWVW.jpg', '', 'default', '', 'default', NULL, NULL, 14);

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `platform` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '登录平台 例如 web h5 app mp',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '记录类型 例如 login action',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '请求地址',
  `meta` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '参数',
  `loginMethod` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '登录方式 账号登录 邮箱登录 手机号登录 三方登录 小程序登录',
  `userId` int(11) NULL DEFAULT NULL,
  `client` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '登录平台 例如 front admin',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_cea2ed3a494729d4b21edbd2983`(`userId`) USING BTREE,
  CONSTRAINT `FK_cea2ed3a494729d4b21edbd2983` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES (9, '2023-07-17 05:39:30.402476', '2023-07-17 05:39:30.402476', NULL, 'admin', 'login', '', '', 'web', NULL, 'default');
INSERT INTO `log` VALUES (11, '2023-07-17 05:43:28.450888', '2023-07-17 05:43:28.450888', NULL, 'admin', 'login', '', '', 'web', 1, 'default');
INSERT INTO `log` VALUES (12, '2023-07-17 05:43:40.542714', '2023-07-17 05:43:40.542714', NULL, 'admin', 'login', '', '', 'web', 1, 'default');
INSERT INTO `log` VALUES (13, '2023-07-17 06:11:08.815075', '2023-07-17 06:11:08.815075', NULL, 'admin', 'login', '', '', 'web', 1, 'default');
INSERT INTO `log` VALUES (14, '2023-07-17 06:16:29.703013', '2023-07-17 06:16:29.703013', NULL, 'admin', 'login', '', '', 'web', 1, 'default');
INSERT INTO `log` VALUES (15, '2023-07-17 06:20:59.712253', '2023-07-17 06:20:59.712253', NULL, 'admin', 'login', '', '', 'web', 1, 'default');
INSERT INTO `log` VALUES (16, '2023-07-18 04:06:14.101529', '2023-07-18 04:06:14.101529', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (17, '2023-07-18 04:07:19.076886', '2023-07-18 04:07:19.076886', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (18, '2023-07-18 04:07:56.451624', '2023-07-18 04:07:56.451624', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (19, '2023-07-18 04:08:47.314180', '2023-07-18 04:08:47.314180', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (20, '2023-07-18 04:21:48.866180', '2023-07-18 04:21:48.866180', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (21, '2023-07-18 04:22:33.842286', '2023-07-18 04:22:33.842286', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (22, '2023-07-18 04:26:39.404089', '2023-07-18 04:26:39.404089', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (23, '2023-07-18 04:27:10.702444', '2023-07-18 04:27:10.702444', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (24, '2023-07-18 04:27:17.572747', '2023-07-18 04:27:17.572747', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (25, '2023-07-18 04:29:04.092465', '2023-07-18 04:29:04.092465', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (26, '2023-07-18 04:29:18.873180', '2023-07-18 04:29:18.873180', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (27, '2023-07-18 04:30:36.471202', '2023-07-18 04:30:36.471202', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (28, '2023-07-18 04:30:53.083191', '2023-07-18 04:30:53.083191', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (29, '2023-07-18 04:31:27.380992', '2023-07-18 04:31:27.380992', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (30, '2023-07-18 04:31:40.902758', '2023-07-18 04:31:40.902758', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (31, '2023-07-18 04:33:20.211546', '2023-07-18 04:33:20.211546', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (32, '2023-07-18 04:33:21.372881', '2023-07-18 04:33:21.372881', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (33, '2023-07-18 04:33:45.822511', '2023-07-18 04:33:45.822511', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (34, '2023-07-18 04:37:36.923259', '2023-07-18 04:37:36.923259', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (35, '2023-07-18 04:38:20.975367', '2023-07-18 04:38:20.975367', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (36, '2023-07-18 04:39:07.173697', '2023-07-18 04:39:07.173697', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (37, '2023-07-18 05:24:55.731460', '2023-07-18 05:24:55.731460', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (38, '2023-07-18 05:25:15.142446', '2023-07-18 05:25:15.142446', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (39, '2023-07-18 05:30:23.878253', '2023-07-18 05:30:23.878253', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (40, '2023-07-18 05:48:14.971675', '2023-07-18 05:48:14.971675', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (41, '2023-07-18 06:23:55.331105', '2023-07-18 06:23:55.331105', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (42, '2023-07-18 06:24:02.740800', '2023-07-18 06:24:02.740800', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (43, '2023-07-18 06:24:07.602843', '2023-07-18 06:24:07.602843', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (44, '2023-07-18 06:26:42.276528', '2023-07-18 06:26:42.276528', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (45, '2023-07-18 06:26:43.602451', '2023-07-18 06:26:43.602451', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (46, '2023-07-18 06:29:01.272608', '2023-07-18 06:29:01.272608', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (47, '2023-07-18 06:30:31.471272', '2023-07-18 06:30:31.471272', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (48, '2023-07-18 06:32:15.983651', '2023-07-18 06:32:15.983651', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (49, '2023-07-18 06:32:20.913324', '2023-07-18 06:32:20.913324', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (50, '2023-07-18 06:45:11.468140', '2023-07-18 06:45:11.468140', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (51, '2023-07-18 06:53:23.944355', '2023-07-18 06:53:23.944355', NULL, 'web', 'login', '', '', 'username', 1, 'admin');
INSERT INTO `log` VALUES (52, '2023-07-18 07:12:54.684624', '2023-07-18 07:12:54.684624', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (53, '2023-07-19 00:35:07.456366', '2023-07-19 00:35:07.456366', NULL, 'web', 'login', '', '', 'username', 1, 'admin');
INSERT INTO `log` VALUES (54, '2023-07-19 01:00:11.361870', '2023-07-19 01:00:11.361870', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (55, '2023-07-19 01:01:04.142547', '2023-07-19 01:01:04.142547', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (56, '2023-07-19 06:45:28.544602', '2023-07-19 06:45:28.544602', NULL, 'web', 'login', '', '', 'username', 1, 'admin');
INSERT INTO `log` VALUES (57, '2023-07-19 08:20:25.453015', '2023-07-19 08:20:25.453015', NULL, 'web', 'login', '', '', 'username', 1, 'admin');
INSERT INTO `log` VALUES (58, '2023-07-19 23:51:27.192733', '2023-07-19 23:51:27.192733', NULL, 'web', 'login', '', '', 'username', 1, 'admin');
INSERT INTO `log` VALUES (59, '2023-07-20 01:09:07.913752', '2023-07-20 01:09:07.913752', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (60, '2023-07-20 01:23:14.390753', '2023-07-20 01:23:14.390753', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (61, '2023-07-20 01:24:47.665712', '2023-07-20 01:24:47.665712', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (62, '2023-07-20 01:40:40.027736', '2023-07-20 01:40:40.027736', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (63, '2023-07-20 02:54:04.140376', '2023-07-20 02:54:04.140376', NULL, 'username', 'login', '', '', 'web', 1, 'front');
INSERT INTO `log` VALUES (64, '2023-07-20 02:54:22.052526', '2023-07-20 02:54:22.052526', NULL, 'username', 'login', '', '', 'web', 1, 'front');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2023-06-14 00:52:49.061233', '2023-07-17 01:45:21.445076', '超级管理员', NULL, 1);

-- ----------------------------
-- Table structure for role_auths_auth
-- ----------------------------
DROP TABLE IF EXISTS `role_auths_auth`;
CREATE TABLE `role_auths_auth`  (
  `roleId` int(11) NOT NULL,
  `authId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`, `authId`) USING BTREE,
  INDEX `IDX_0b194bd60a92d9787ec4126412`(`roleId`) USING BTREE,
  INDEX `IDX_9b076d20670c761df3804dd26c`(`authId`) USING BTREE,
  CONSTRAINT `FK_0b194bd60a92d9787ec41264128` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9b076d20670c761df3804dd26c0` FOREIGN KEY (`authId`) REFERENCES `auth` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_auths_auth
-- ----------------------------
INSERT INTO `role_auths_auth` VALUES (1, 1);
INSERT INTO `role_auths_auth` VALUES (1, 2);
INSERT INTO `role_auths_auth` VALUES (1, 3);
INSERT INTO `role_auths_auth` VALUES (1, 4);
INSERT INTO `role_auths_auth` VALUES (1, 5);
INSERT INTO `role_auths_auth` VALUES (1, 6);
INSERT INTO `role_auths_auth` VALUES (1, 7);
INSERT INTO `role_auths_auth` VALUES (1, 8);

-- ----------------------------
-- Table structure for sys_config_group
-- ----------------------------
DROP TABLE IF EXISTS `sys_config_group`;
CREATE TABLE `sys_config_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '配置Key',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '分组名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config_group
-- ----------------------------
INSERT INTO `sys_config_group` VALUES (1, '2023-07-17 01:51:54.644913', '2023-07-17 01:51:54.644913', NULL, 'web', '网站配置');

-- ----------------------------
-- Table structure for sys_config_group_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_config_group_item`;
CREATE TABLE `sys_config_group_item`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '配置Key',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'string' COMMENT '配置项类型',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '配置项名称',
  `stringValue` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '文本类型值',
  `numberValue` int(11) NOT NULL DEFAULT 0 COMMENT '数值类型值',
  `dateValue` datetime(0) NULL DEFAULT NULL COMMENT '时间类型值',
  `fileValue` int(11) NULL DEFAULT NULL COMMENT '文件',
  `switchValue` tinyint(4) NOT NULL DEFAULT 0 COMMENT '开关',
  `sysConfigGroupId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_7253b97f1a84dcbda4b6f28fd5e`(`sysConfigGroupId`) USING BTREE,
  CONSTRAINT `FK_7253b97f1a84dcbda4b6f28fd5e` FOREIGN KEY (`sysConfigGroupId`) REFERENCES `sys_config_group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config_group_item
-- ----------------------------
INSERT INTO `sys_config_group_item` VALUES (1, '2023-07-17 01:53:05.484063', '2023-07-17 01:53:05.484063', NULL, 'title', 'string', '网站标题', '我的网站', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (3, '2023-07-17 01:56:22.790133', '2023-07-17 01:56:22.790133', NULL, 'keyword', 'string', '网站关键词', '拼搏,积极,向上', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (4, '2023-07-17 01:57:03.147464', '2023-07-17 01:57:03.147464', NULL, 'filingNum', 'string', '网站赔备案号', 'jisxxx1223', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (5, '2023-07-17 03:51:31.284529', '2023-07-20 01:41:37.000000', NULL, 'openReg', 'switch', '开放注册', '', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (6, '2023-07-18 06:54:25.575222', '2023-07-18 06:56:13.000000', NULL, 'openLogin', 'switch', '开放登录', '', 0, NULL, NULL, 1, 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT 0,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `super` tinyint(4) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2023-06-14 04:31:28.802449', '2023-07-12 06:30:38.528287', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, NULL, 1, 1);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '邮箱',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '手机号',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '昵称',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_3a7fa0c3809d19eaf2fb4f6594`(`userId`) USING BTREE,
  CONSTRAINT `FK_3a7fa0c3809d19eaf2fb4f65949` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('2023-07-17 00:39:53.931000', '2023-07-17 02:50:57.005000', '', NULL, '123', '超级管理员', 1, 1, '/uploads/01H5P798KF6RA2QVD0WHV2NFN9.png');

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_5f9286e6c25594c6b88c108db7`(`userId`) USING BTREE,
  INDEX `IDX_4be2f7adf862634f5f803d246b`(`roleId`) USING BTREE,
  CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);

-- ----------------------------
-- Table structure for user_thrid
-- ----------------------------
DROP TABLE IF EXISTS `user_thrid`;
CREATE TABLE `user_thrid`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '三方openid',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '三方类型',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_b134f5f2eff8b2276caf1f3968c`(`userId`) USING BTREE,
  CONSTRAINT `FK_b134f5f2eff8b2276caf1f3968c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
