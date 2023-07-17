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

 Date: 17/07/2023 14:21:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES ('2023-06-20 05:16:18.104000', '2023-07-17 01:46:39.967931', NULL, '角色管理', '角色管理', '', 'menu', 1, 0, '/role/index', NULL, 1, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:46:32.380649', '2023-07-17 01:46:32.380649', NULL, '权限管理', '权限管理', '', 'menu', 1, 0, '/auth/index', NULL, 2, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:49:07.986309', '2023-07-17 02:36:27.000000', NULL, '系统配置', '系统配置', '', 'menu', 1, 0, '/sys-config/index', NULL, 3, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:51:00.901583', '2023-07-17 01:51:00.901583', NULL, '管理员管理', '管理员管理', '', 'menu', 1, 0, '/administrator/index', NULL, 4, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 01:51:22.417454', '2023-07-17 01:51:22.417454', NULL, '会员管理', '会员管理', '', 'menu', 1, 0, '/member/index', NULL, 5, NULL);
INSERT INTO `auth` VALUES ('2023-07-17 02:22:04.782425', '2023-07-17 02:34:42.000000', NULL, '登录日志', '登录日志', '', 'menu', 1, 0, '/login-log/index', NULL, 6, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('2023-07-17 02:54:05.805625', '2023-07-17 02:54:05.805625', NULL, 'local', NULL, NULL, 24746, 300, 300, 'image/jpeg', '/uploads/01H5GW9XYKT1BERG4XZ3F9H7MF.jpg', '', 'default', '', 'default', NULL, NULL, 1);

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `platform` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '登录平台 例如 default  pc mobile app',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'default' COMMENT '记录类型 例如 login action',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '请求地址',
  `meta` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '参数',
  `loginMethod` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '登录方式',
  `userId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_cea2ed3a494729d4b21edbd2983`(`userId`) USING BTREE,
  CONSTRAINT `FK_cea2ed3a494729d4b21edbd2983` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES (9, '2023-07-17 05:39:30.402476', '2023-07-17 05:39:30.402476', NULL, 'admin', 'login', '', '', 'web', NULL);
INSERT INTO `log` VALUES (11, '2023-07-17 05:43:28.450888', '2023-07-17 05:43:28.450888', NULL, 'admin', 'login', '', '', 'web', 1);
INSERT INTO `log` VALUES (12, '2023-07-17 05:43:40.542714', '2023-07-17 05:43:40.542714', NULL, 'admin', 'login', '', '', 'web', 1);
INSERT INTO `log` VALUES (13, '2023-07-17 06:11:08.815075', '2023-07-17 06:11:08.815075', NULL, 'admin', 'login', '', '', 'web', 1);
INSERT INTO `log` VALUES (14, '2023-07-17 06:16:29.703013', '2023-07-17 06:16:29.703013', NULL, 'admin', 'login', '', '', 'web', 1);
INSERT INTO `log` VALUES (15, '2023-07-17 06:20:59.712253', '2023-07-17 06:20:59.712253', NULL, 'admin', 'login', '', '', 'web', 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config_group_item
-- ----------------------------
INSERT INTO `sys_config_group_item` VALUES (1, '2023-07-17 01:53:05.484063', '2023-07-17 01:53:05.484063', NULL, 'title', 'string', '网站标题', '我的网站', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (3, '2023-07-17 01:56:22.790133', '2023-07-17 01:56:22.790133', NULL, 'keyword', 'string', '网站关键词', '拼搏,积极,向上', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (4, '2023-07-17 01:57:03.147464', '2023-07-17 01:57:03.147464', NULL, 'filingNum', 'string', '网站赔备案号', 'jisxxx1223', 0, NULL, NULL, 0, 1);
INSERT INTO `sys_config_group_item` VALUES (5, '2023-07-17 03:51:31.284529', '2023-07-17 04:08:21.000000', NULL, 'openReg', 'switch', '开放注册', '', 0, NULL, NULL, 0, 1);

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
  `avatar` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_3a7fa0c3809d19eaf2fb4f6594`(`userId`) USING BTREE,
  CONSTRAINT `FK_3a7fa0c3809d19eaf2fb4f65949` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('2023-07-17 00:39:53.931000', '2023-07-17 02:50:57.005000', '', NULL, '', '超级管理员', 1, 1, 1);

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
