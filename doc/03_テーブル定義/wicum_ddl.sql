-- Project Name : wicum
-- Date/Time    : 2021/06/23 21:40:18
-- Author       : ecotiya
-- RDBMS Type   : MySQL
-- Application  : A5:SQL Mk-2

/*
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
*/

-- 問い合わせ一覧
--* BackupToTempTable
DROP TABLE if exists `t_inquiry_lists` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_inquiry_lists` (
  `inquiry_id` bigint auto_increment NOT NULL COMMENT '問い合わせID'
  , `category_code` varchar(255) NOT NULL COMMENT 'カテゴリコード'
  , `urgency_code` varchar(255) NOT NULL COMMENT '緊急度コード'
  , `subject` varchar(255) NOT NULL COMMENT '件名'
  , `content` varchar(255) NOT NULL COMMENT '内容'
  , `request_datetime` datetime NOT NULL COMMENT '依頼日時'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_inquiry_lists_PKC` PRIMARY KEY (`inquiry_id`)
) COMMENT '問い合わせ一覧' ;

CREATE INDEX `fk_m_categorys_t_inquiry_lists_category_code_idx`
  ON `t_inquiry_lists`(`category_code`);

CREATE INDEX `fk_m_urgencys_t_inquiry_lists_urgency_code_idx`
  ON `t_inquiry_lists`(`urgency_code`);

-- 画面変更履歴
--* BackupToTempTable
DROP TABLE if exists `t_screen_change_historys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_screen_change_historys` (
  `history_id` bigint auto_increment NOT NULL COMMENT '履歴ID'
  , `user_id` bigint NOT NULL COMMENT 'ユーザID'
  , `screen_code` varchar(255) NOT NULL COMMENT '画面コード'
  , `content` varchar(255) NOT NULL COMMENT '内容'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_screen_change_historys_PKC` PRIMARY KEY (`history_id`)
) COMMENT '画面変更履歴' ;

CREATE INDEX `fk_m_screens_t_screen_change_historys_screen_code_idx`
  ON `t_screen_change_historys`(`screen_code`);

-- サブタスク一覧
--* BackupToTempTable
DROP TABLE if exists `t_subtask_lists` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_subtask_lists` (
  `sub_task_id` bigint auto_increment NOT NULL COMMENT 'サブタスクID'
  , `task_id` bigint NOT NULL COMMENT 'タスクID'
  , `status_code` varchar(255) NOT NULL COMMENT '状態コード'
  , `title` varchar(255) NOT NULL COMMENT 'タイトル'
  , `content` varchar(255) COMMENT '内容'
  , `completion_datetime` datetime COMMENT '完了予定日時'
  , `remind_datetime` datetime COMMENT 'リマインダー日時'
  , `completion_flg` boolean NOT NULL COMMENT '完了フラグ'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_subtask_lists_PKC` PRIMARY KEY (`sub_task_id`)
) COMMENT 'サブタスク一覧' ;

CREATE INDEX `fk_t_task_lists_idx`
  ON `t_subtask_lists`(`task_id`);

CREATE INDEX `fk_m_states_idx`
  ON `t_subtask_lists`(`status_code`);

-- タスク一覧
--* BackupToTempTable
DROP TABLE if exists `t_task_lists` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_task_lists` (
  `task_id` bigint auto_increment NOT NULL COMMENT 'タスクID'
  , `user_id` bigint NOT NULL COMMENT 'ユーザID'
  , `big_classify_id` bigint NOT NULL COMMENT '大分類ID'
  , `mid_classify_id` bigint NOT NULL COMMENT '中分類ID'
  , `status_code` varchar(255) NOT NULL COMMENT '状態コード'
  , `title` varchar(255) NOT NULL COMMENT 'タイトル'
  , `content` varchar(255) COMMENT '内容'
  , `completion_datetime` datetime COMMENT '完了予定日時'
  , `remind_datetime` datetime COMMENT 'リマインダー日時'
  , `completion_flg` boolean NOT NULL COMMENT '完了フラグ'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_task_lists_PKC` PRIMARY KEY (`task_id`)
) COMMENT 'タスク一覧' ;

CREATE INDEX `fk_m_states_t_task_lists_status_code_idx`
  ON `t_task_lists`(`status_code`);

CREATE INDEX `fk_t_task_big_classifys_t_task_lists_big_classify_id_idx`
  ON `t_task_lists`(`big_classify_id`);

CREATE INDEX `fk_t_task_mid_classifys_t_task_lists_mid_classify_id_idx`
  ON `t_task_lists`(`mid_classify_id`);

CREATE INDEX `fk_t_users_t_task_lists_user_id_idx`
  ON `t_task_lists`(`user_id`);

-- タスク中分類一覧
--* BackupToTempTable
DROP TABLE if exists `t_task_mid_classifys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_task_mid_classifys` (
  `mid_classify_id` bigint auto_increment NOT NULL COMMENT '中分類ID'
  , `mid_classify_name` varchar(255) NOT NULL COMMENT '中分類名称'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_task_mid_classifys_PKC` PRIMARY KEY (`mid_classify_id`)
) COMMENT 'タスク中分類一覧' ;

-- ユーザ一覧
--* BackupToTempTable
DROP TABLE if exists `t_users` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_users` (
  `user_id` bigint auto_increment NOT NULL COMMENT 'ユーザID'
  , `user_name` varchar(255) NOT NULL COMMENT 'ユーザ名'
  , `mail_address` varchar(255) NOT NULL COMMENT 'メールアドレス'
  , `password` varchar(255) NOT NULL COMMENT 'パスワード'
  , `authority_code` varchar(255) NOT NULL COMMENT '権限コード'
  , `icon` varchar(255) COMMENT 'アイコン'
  , `temp_regist_flg` boolean NOT NULL COMMENT '仮登録フラグ'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_users_PKC` PRIMARY KEY (`user_id`)
) COMMENT 'ユーザ一覧' ;

CREATE INDEX `fk_m_authoritys_t_users_authority_code_idx`
  ON `t_users`(`authority_code`);

-- 権限マスタ
--* BackupToTempTable
DROP TABLE if exists `m_authoritys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_authoritys` (
  `authority_code` varchar(255) NOT NULL COMMENT '権限コード'
  , `authority_name` varchar(255) NOT NULL COMMENT '権限名称'
  , `screen_code` varchar(255) NOT NULL COMMENT '画面コード'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_authoritys_PKC` PRIMARY KEY (`authority_code`)
) COMMENT '権限マスタ' ;

CREATE INDEX `fk_m_screens_m_authoritys_authority_code_idx`
  ON `m_authoritys`(`screen_code`);

-- 問い合わせカテゴリマスタ
--* BackupToTempTable
DROP TABLE if exists `m_categorys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_categorys` (
  `category_code` varchar(255) NOT NULL COMMENT 'カテゴリコード'
  , `category_name` varchar(255) NOT NULL COMMENT 'カテゴリ名称'
  , `request_flg` boolean NOT NULL COMMENT '要望フラグ'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_categorys_PKC` PRIMARY KEY (`category_code`)
) COMMENT '問い合わせカテゴリマスタ' ;

-- 画面マスタ
--* BackupToTempTable
DROP TABLE if exists `m_screens` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_screens` (
  `screen_code` varchar(255) NOT NULL COMMENT '画面コード'
  , `screen_name` varchar(255) NOT NULL COMMENT '画面名称'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_screens_PKC` PRIMARY KEY (`screen_code`)
) COMMENT '画面マスタ' ;

-- タスク状態マスタ
--* BackupToTempTable
DROP TABLE if exists `m_states` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_states` (
  `status_code` varchar(255) NOT NULL COMMENT '状態コード'
  , `state_name` varchar(255) NOT NULL COMMENT '状態名称'
  , `complete_flg` boolean NOT NULL COMMENT '完了フラグ'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_states_PKC` PRIMARY KEY (`status_code`)
) COMMENT 'タスク状態マスタ' ;

-- 問い合わせ緊急度マスタ
--* BackupToTempTable
DROP TABLE if exists `m_urgencys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_urgencys` (
  `urgency_code` varchar(255) NOT NULL COMMENT '緊急度コード'
  , `urgency_name` varchar(255) NOT NULL COMMENT '緊急度名称'
  , `urgency_level` int NOT NULL COMMENT '緊急度レベル'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_urgencys_PKC` PRIMARY KEY (`urgency_code`)
) COMMENT '問い合わせ緊急度マスタ' ;

-- タスク大分類一覧
--* BackupToTempTable
DROP TABLE if exists `t_task_big_classifys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_task_big_classifys` (
  `big_classify_id` bigint auto_increment NOT NULL COMMENT '大分類ID'
  , `big_classify_name` varchar(255) NOT NULL COMMENT '大分類名称'
  , `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID'
  , `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID'
  , `regist_datetime` DATETIME NOT NULL COMMENT '登録日時'
  , `update_datetime` DATETIME NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_task_big_classifys_PKC` PRIMARY KEY (`big_classify_id`)
) COMMENT 'タスク大分類一覧' ;

