/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50742
 Source Host           : localhost:3306
 Source Schema         : qdev

 Target Server Type    : MySQL
 Target Server Version : 50742
 File Encoding         : 65001

 Date: 07/07/2023 11:14:00
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `type` enum('catalog','menu','page','action') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'catalog',
  `isLink` tinyint(4) NOT NULL DEFAULT 0,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `parentId` int(11) NULL DEFAULT NULL,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  `isShow` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES ('2023-07-03 15:33:38.964863', '2023-07-04 14:25:55.299906', 9, 'dashboard', '首页', '', 'menu', 0, '/dashboard/index', NULL, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-03 15:43:54.099691', '2023-07-03 15:43:54.099691', 13, 'authManage', '权限管理', '', 'catalog', 0, '', NULL, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-03 15:48:07.860293', '2023-07-03 15:48:46.000000', 14, '/auth/auth', '菜单权限', '', 'menu', 0, '/auth/auth', 13, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-03 15:48:41.625913', '2023-07-03 15:48:41.625913', 15, '/auth/role', '角色管理', '', 'menu', 0, '/auth/role', 13, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-03 15:49:20.829185', '2023-07-03 15:49:20.829185', 16, '/auth/administrator', '管理员', '', 'menu', 0, '/auth/administrator', 13, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:02:51.060277', '2023-07-06 17:15:16.000000', 18, 'apiDoc', '接口文档', '', 'menu', 0, 'http://127.0.0.1:3000/apidoc', NULL, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:33:41.906656', '2023-07-06 17:53:06.000000', 19, 'serManagerRole', '设置管理员角色', '', 'action', 0, 'POST:/admin/user/setRole', 16, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:34:19.708440', '2023-07-06 17:53:20.000000', 20, 'delManager', '删除管理员', '', 'action', 0, 'DELETE:/admin/user/del', 16, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:54:14.678345', '2023-07-06 17:54:14.678345', 21, 'delRole', '删除角色', '', 'action', 0, 'DELETE:/admin/role/del', 15, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:54:56.796497', '2023-07-06 17:54:56.796497', 22, 'addRole', '创建角色', '', 'action', 0, 'POST:/admin/role', 15, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:56:00.680136', '2023-07-06 17:56:42.000000', 23, 'updateRole', '修改角色', '', 'action', 0, 'PUT:/admin/role/put', 15, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:56:30.499525', '2023-07-06 17:56:47.000000', 24, 'setRoleAuth', '设置角色权限', '', 'action', 0, 'POST:/admin/role/auth', 15, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:58:01.540930', '2023-07-06 18:10:03.000000', 25, 'getUserAllMenu', '获取用户的菜单列表', '', 'action', 0, 'GET:/admin/user/getMenuList', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:58:32.247495', '2023-07-06 18:10:09.000000', 26, 'getAllmenu', '获取全部菜单列表', '', 'action', 0, 'GET:/admin/auth/menu', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:58:54.063704', '2023-07-06 17:59:01.000000', 27, 'addAuth', '创建权限', '', 'action', 0, 'POST:/admin/auth', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:59:35.648557', '2023-07-06 18:00:15.000000', 28, 'updateAuth', '更新权限', '', 'action', 0, 'PATCH:/admin/auth/patch', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 17:59:57.530525', '2023-07-06 18:00:22.000000', 29, 'delAuth', '删除权限', '', 'action', 0, 'DELETE:/admin/auth/del', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:07:29.775760', '2023-07-06 18:07:29.775760', 30, 'getAllAuth', '获取全部权限', '', 'action', 0, 'GET:/admin/auth', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:09:12.297176', '2023-07-06 18:09:12.297176', 31, 'getAllRole', '获取角色列表', '', 'action', 0, 'GET:/admin/role', 15, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:09:47.798602', '2023-07-06 18:09:47.798602', 32, 'getManageList', '获取管理员列表', '', 'action', 0, 'GET:/admin/user', 16, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:35:37.337710', '2023-07-06 18:45:00.000000', 33, 'getUserInfo', '获取用户信息', '', 'action', 0, 'GET:/admin/user/info', 16, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:44:27.728065', '2023-07-06 18:44:54.000000', 34, 'getAllAction', '获取全部动作', '', 'action', 0, 'GET:/admin/auth/allAction', 14, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:50:01.035024', '2023-07-06 18:50:01.035024', 35, 'getUserRoleList', '获取用户的角色列表', '', 'action', 0, 'GET:/admin/user/getRoleList', 16, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 18:50:44.456035', '2023-07-06 18:50:44.456035', 36, 'getRoleNoPage', '获取角色列表无分页', '', 'action', 0, 'GET:/admin/role/all', 16, NULL, 0);
INSERT INTO `auth` VALUES ('2023-07-06 19:00:58.233542', '2023-07-06 19:01:09.000000', 37, 'getUserAuths', '获取用户的权限列表', '', 'action', 0, 'GET:/admin/user/getAuthList', 14, NULL, 0);

-- ----------------------------
-- Table structure for auth_closure
-- ----------------------------
DROP TABLE IF EXISTS `auth_closure`;
CREATE TABLE `auth_closure`  (
  `id_ancestor` int(11) NOT NULL,
  `id_descendant` int(11) NOT NULL,
  PRIMARY KEY (`id_ancestor`, `id_descendant`) USING BTREE,
  INDEX `IDX_327480ae3a92f56b24b637aef0`(`id_ancestor`) USING BTREE,
  INDEX `IDX_4e130fbbe156234e5e7fd6ff6d`(`id_descendant`) USING BTREE,
  CONSTRAINT `FK_327480ae3a92f56b24b637aef04` FOREIGN KEY (`id_ancestor`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_4e130fbbe156234e5e7fd6ff6d7` FOREIGN KEY (`id_descendant`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_closure
-- ----------------------------
INSERT INTO `auth_closure` VALUES (9, 9);
INSERT INTO `auth_closure` VALUES (13, 13);
INSERT INTO `auth_closure` VALUES (13, 14);
INSERT INTO `auth_closure` VALUES (13, 15);
INSERT INTO `auth_closure` VALUES (13, 16);
INSERT INTO `auth_closure` VALUES (14, 14);
INSERT INTO `auth_closure` VALUES (15, 15);
INSERT INTO `auth_closure` VALUES (16, 16);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2023-07-02 14:08:37.843719', '2023-07-03 15:43:29.000000', 1, '超级管理员', NULL);
INSERT INTO `role` VALUES ('2023-07-07 02:58:19.156197', '2023-07-07 02:58:19.156197', 2, '测试管理员', NULL);

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_auths_auth
-- ----------------------------
INSERT INTO `role_auths_auth` VALUES (1, 9);
INSERT INTO `role_auths_auth` VALUES (1, 13);
INSERT INTO `role_auths_auth` VALUES (1, 14);
INSERT INTO `role_auths_auth` VALUES (1, 15);
INSERT INTO `role_auths_auth` VALUES (1, 16);
INSERT INTO `role_auths_auth` VALUES (1, 18);
INSERT INTO `role_auths_auth` VALUES (1, 19);
INSERT INTO `role_auths_auth` VALUES (1, 20);
INSERT INTO `role_auths_auth` VALUES (1, 21);
INSERT INTO `role_auths_auth` VALUES (1, 22);
INSERT INTO `role_auths_auth` VALUES (1, 23);
INSERT INTO `role_auths_auth` VALUES (1, 24);
INSERT INTO `role_auths_auth` VALUES (1, 25);
INSERT INTO `role_auths_auth` VALUES (1, 26);
INSERT INTO `role_auths_auth` VALUES (1, 27);
INSERT INTO `role_auths_auth` VALUES (1, 28);
INSERT INTO `role_auths_auth` VALUES (1, 29);
INSERT INTO `role_auths_auth` VALUES (1, 30);
INSERT INTO `role_auths_auth` VALUES (1, 31);
INSERT INTO `role_auths_auth` VALUES (1, 32);
INSERT INTO `role_auths_auth` VALUES (1, 33);
INSERT INTO `role_auths_auth` VALUES (1, 34);
INSERT INTO `role_auths_auth` VALUES (1, 35);
INSERT INTO `role_auths_auth` VALUES (1, 36);
INSERT INTO `role_auths_auth` VALUES (1, 37);
INSERT INTO `role_auths_auth` VALUES (2, 25);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2023-07-02 14:19:19.424102', '2023-07-02 14:19:19.424102', 2, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, NULL);
INSERT INTO `user` VALUES ('2023-07-06 18:10:58.573602', '2023-07-06 18:10:58.573602', 3, 'test', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_3a7fa0c3809d19eaf2fb4f6594`(`userId`) USING BTREE,
  CONSTRAINT `FK_3a7fa0c3809d19eaf2fb4f65949` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (2, 1);

-- ----------------------------
-- Table structure for user_thrid
-- ----------------------------
DROP TABLE IF EXISTS `user_thrid`;
CREATE TABLE `user_thrid`  (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `deleteTime` datetime(6) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_b134f5f2eff8b2276caf1f3968c`(`userId`) USING BTREE,
  CONSTRAINT `FK_b134f5f2eff8b2276caf1f3968c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_thrid
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
