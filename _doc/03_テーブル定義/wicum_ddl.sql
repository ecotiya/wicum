-- Project Name : wicum
-- Date/Time    : 2021/06/29 23:17:40
-- Author       : ecotiya
-- RDBMS Type   : MySQL
-- Application  : A5:SQL Mk-2

/*
  << 注意！！ >>
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
  この機能は A5:SQL Mk-2でのみ有効であることに注意してください。
*/

-- よくある質問マスタ
--* BackupToTempTable
DROP TABLE if exists `m_questions` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_questions` (
  `questions_id` bigint auto_increment NOT NULL COMMENT '質問ID'
  , `title` varchar(255) NOT NULL COMMENT 'タイトル'
  , `content` text NOT NULL COMMENT '内容'
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_questions_PKC` PRIMARY KEY (`questions_id`)
) COMMENT 'よくある質問マスタ' ;

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
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_inquiry_lists_PKC` PRIMARY KEY (`inquiry_id`)
) COMMENT '問い合わせ一覧' ;

CREATE INDEX `fk_m_categorys_t_inquiry_lists_category_code_idx`
  ON `t_inquiry_lists`(`category_code`);

CREATE INDEX `fk_m_urgencys_t_inquiry_lists_urgency_code_idx`
  ON `t_inquiry_lists`(`urgency_code`);

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
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
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
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
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
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
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
  , `password_confirmation` varchar(255) NOT NULL COMMENT 'パスワード確認'
  , `admin` boolean NOT NULL COMMENT '管理者フラグ'
  , `icon` varchar(255) COMMENT 'アイコン'
  , `temp_regist_flg` boolean NOT NULL COMMENT '仮登録フラグ'
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_users_PKC` PRIMARY KEY (`user_id`)
) COMMENT 'ユーザ一覧' ;

-- 問い合わせカテゴリマスタ
--* BackupToTempTable
DROP TABLE if exists `m_categorys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_categorys` (
  `category_code` varchar(255) NOT NULL COMMENT 'カテゴリコード'
  , `category_name` varchar(255) NOT NULL COMMENT 'カテゴリ名称'
  , `request_flg` boolean NOT NULL COMMENT '要望フラグ'
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_categorys_PKC` PRIMARY KEY (`category_code`)
) COMMENT '問い合わせカテゴリマスタ' ;

-- タスク状態マスタ
--* BackupToTempTable
DROP TABLE if exists `m_states` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `m_states` (
  `status_code` varchar(255) NOT NULL COMMENT '状態コード'
  , `state_name` varchar(255) NOT NULL COMMENT '状態名称'
  , `complete_flg` boolean NOT NULL COMMENT '完了フラグ'
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
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
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
  , CONSTRAINT `m_urgencys_PKC` PRIMARY KEY (`urgency_code`)
) COMMENT '問い合わせ緊急度マスタ' ;

-- タスク大分類一覧
--* BackupToTempTable
DROP TABLE if exists `t_task_big_classifys` CASCADE;

--* RestoreFromTempTable
CREATE TABLE `t_task_big_classifys` (
  `big_classify_id` bigint auto_increment NOT NULL COMMENT '大分類ID'
  , `big_classify_name` varchar(255) NOT NULL COMMENT '大分類名称'
  , `created_userid` bigint NOT NULL COMMENT '登録ユーザID'
  , `update_userid` bigint NOT NULL COMMENT '更新ユーザID'
  , `created_at` datetime NOT NULL COMMENT '登録日時'
  , `updated_at` datetime NOT NULL COMMENT '更新日時'
  , CONSTRAINT `t_task_big_classifys_PKC` PRIMARY KEY (`big_classify_id`)
) COMMENT 'タスク大分類一覧' ;

ALTER TABLE `t_inquiry_lists`
  ADD CONSTRAINT `t_inquiry_lists_FK1` FOREIGN KEY (`urgency_code`) REFERENCES `m_urgencys`(`urgency_code`);

ALTER TABLE `t_inquiry_lists`
  ADD CONSTRAINT `t_inquiry_lists_FK2` FOREIGN KEY (`category_code`) REFERENCES `m_categorys`(`category_code`);

ALTER TABLE `t_subtask_lists`
  ADD CONSTRAINT `t_subtask_lists_FK1` FOREIGN KEY (`status_code`) REFERENCES `m_states`(`status_code`);

ALTER TABLE `t_subtask_lists`
  ADD CONSTRAINT `t_subtask_lists_FK2` FOREIGN KEY (`task_id`) REFERENCES `t_task_lists`(`task_id`);

ALTER TABLE `t_task_lists`
  ADD CONSTRAINT `t_task_lists_FK1` FOREIGN KEY (`mid_classify_id`) REFERENCES `t_task_mid_classifys`(`mid_classify_id`);

ALTER TABLE `t_task_lists`
  ADD CONSTRAINT `t_task_lists_FK2` FOREIGN KEY (`user_id`) REFERENCES `t_users`(`user_id`);

ALTER TABLE `t_task_lists`
  ADD CONSTRAINT `t_task_lists_FK3` FOREIGN KEY (`big_classify_id`) REFERENCES `t_task_big_classifys`(`big_classify_id`);

ALTER TABLE `t_task_lists`
  ADD CONSTRAINT `t_task_lists_FK4` FOREIGN KEY (`status_code`) REFERENCES `m_states`(`status_code`);

