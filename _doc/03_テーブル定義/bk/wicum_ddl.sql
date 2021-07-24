-- MySQL Script generated by MySQL Workbench
-- Tue Jun 22 23:37:14 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema wicum_develop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wicum_develop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wicum_develop` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `wicum_develop` ;

-- -----------------------------------------------------
-- Table `wicum_develop`.`m_states`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`m_states` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`m_states` (
  `status_code` VARCHAR(45) NOT NULL COMMENT '状態コード',
  `state_name` VARCHAR(45) NOT NULL COMMENT '状態名称',
  `complete_flg` TINYINT NOT NULL COMMENT '完了フラグ',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`status_code`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'タスク状態マスタ';


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_task_big_classifys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_task_big_classifys` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_task_big_classifys` (
  `big_classify_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '大分類ID',
  `big_classify_name` VARCHAR(45) NOT NULL COMMENT '大分類名称',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`big_classify_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'タスク大分類一覧';


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_task_mid_classifys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_task_mid_classifys` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_task_mid_classifys` (
  `mid_classify_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '中分類ID',
  `mid_classify_name` VARCHAR(45) NOT NULL COMMENT '中分類名称',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`mid_classify_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'タスク中分類一覧';


-- -----------------------------------------------------
-- Table `wicum_develop`.`m_screens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`m_screens` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`m_screens` (
  `screen_code` VARCHAR(45) NOT NULL COMMENT '画面コード',
  `screen_name` VARCHAR(45) NOT NULL COMMENT '画面名称',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`screen_code`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '画面マスタ';


-- -----------------------------------------------------
-- Table `wicum_develop`.`m_authoritys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`m_authoritys` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`m_authoritys` (
  `authority_code` VARCHAR(45) NOT NULL COMMENT '権限コード',
  `authority_name` VARCHAR(45) NOT NULL COMMENT '権限名称',
  `screen_code` VARCHAR(45) NOT NULL COMMENT '画面コード',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`authority_code`),
  INDEX `fk_m_screens_m_authoritys_authority_code_idx` (`screen_code` ASC) VISIBLE,
  CONSTRAINT `fk_m_screens_m_authoritys_authority_code`
    FOREIGN KEY (`screen_code`)
    REFERENCES `wicum_develop`.`m_screens` (`screen_code`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '権限マスタ';


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_users` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ユーザID',
  `user_name` VARCHAR(45) NOT NULL COMMENT 'ユーザ名',
  `mail_address` VARCHAR(45) NOT NULL COMMENT 'メールアドレス',
  `password` VARCHAR(45) NOT NULL COMMENT 'パスワード',
  `authority_code` VARCHAR(45) NOT NULL COMMENT '権限コード',
  `icon` VARCHAR(45) NULL COMMENT 'アイコン',
  `temp_regist_flg` TINYINT NOT NULL COMMENT '仮登録フラグ',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`user_id`),
  INDEX `fk_m_authoritys_t_users_authority_code_idx` (`authority_code` ASC) INVISIBLE,
  CONSTRAINT `fk_m_authoritys_t_users_authority_code`
    FOREIGN KEY (`authority_code`)
    REFERENCES `wicum_develop`.`m_authoritys` (`authority_code`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'ユーザ一覧';


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_task_lists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_task_lists` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_task_lists` (
  `task_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'タスクID',
  `user_id` BIGINT NOT NULL COMMENT 'ユーザID',
  `big_classify_id` BIGINT NOT NULL COMMENT '大分類ID',
  `mid_classify_id` BIGINT NOT NULL COMMENT '中分類ID',
  `status_code` VARCHAR(45) NOT NULL COMMENT '状態コード',
  `title` TEXT NULL COMMENT 'タイトル',
  `content` TEXT NULL COMMENT '内容',
  `completion_datetime` DATETIME NULL COMMENT '完了予定日',
  `remind_datetime` DATETIME NULL COMMENT 'リマインダー日時',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`task_id`),
  INDEX `fk_m_states_t_task_lists_status_code_idx` (`status_code` ASC) VISIBLE,
  INDEX `fk_t_task_big_classifys_t_task_lists_big_classify_id_idx` (`big_classify_id` ASC) VISIBLE,
  INDEX `fk_t_task_mid_classifys_t_task_lists_mid_classify_id_idx` (`mid_classify_id` ASC) VISIBLE,
  INDEX `fk_t_users_t_task_lists_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_m_states_t_task_lists_status_code`
    FOREIGN KEY (`status_code`)
    REFERENCES `wicum_develop`.`m_states` (`status_code`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_task_big_classifys_t_task_lists_big_classify_id`
    FOREIGN KEY (`big_classify_id`)
    REFERENCES `wicum_develop`.`t_task_big_classifys` (`big_classify_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_task_mid_classifys_t_task_lists_mid_classify_id`
    FOREIGN KEY (`mid_classify_id`)
    REFERENCES `wicum_develop`.`t_task_mid_classifys` (`mid_classify_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_t_users_t_task_lists_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `wicum_develop`.`t_users` (`user_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'タスク一覧';


-- -----------------------------------------------------
-- Table `wicum_develop`.`m_urgencys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`m_urgencys` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`m_urgencys` (
  `urgency_code` VARCHAR(45) NOT NULL COMMENT '緊急度コード',
  `urgency_name` VARCHAR(45) NULL COMMENT '緊急度名称',
  `urgency_level` INT NOT NULL COMMENT '緊急度レベル',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`urgency_code`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '問い合わせ緊急度マスタ';


-- -----------------------------------------------------
-- Table `wicum_develop`.`m_categorys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`m_categorys` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`m_categorys` (
  `category_code` VARCHAR(45) NOT NULL COMMENT 'カテゴリコード',
  `urgency_code` VARCHAR(45) NOT NULL COMMENT '緊急度コード',
  `category_name` VARCHAR(45) NULL COMMENT 'カテゴリ名称',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`category_code`),
  INDEX `fk_m_urgencys_m_categorys_urgency_code_idx` (`urgency_code` ASC) VISIBLE,
  CONSTRAINT `fk_m_urgencys_m_categorys_urgency_code`
    FOREIGN KEY (`urgency_code`)
    REFERENCES `wicum_develop`.`m_urgencys` (`urgency_code`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '問い合わせカテゴリマスタ';


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_inquiry_lists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_inquiry_lists` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_inquiry_lists` (
  `inquiry_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '問い合わせID',
  `category_code` VARCHAR(45) NOT NULL COMMENT 'カテゴリコード',
  `subject` VARCHAR(45) NOT NULL COMMENT '件名',
  `content` TEXT NOT NULL COMMENT '内容',
  `request_datetime` DATETIME NOT NULL COMMENT '依頼日時',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`inquiry_id`),
  INDEX `fk_m_categorys_t_inquiry_lists_category_code_idx` (`category_code` ASC) INVISIBLE,
  CONSTRAINT `fk_m_categorys_t_inquiry_lists_category_code`
    FOREIGN KEY (`category_code`)
    REFERENCES `wicum_develop`.`m_categorys` (`category_code`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '問い合わせ一覧'
KEY_BLOCK_SIZE = 8;


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_screen_change_historys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_screen_change_historys` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_screen_change_historys` (
  `history_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '履歴ID',
  `screen_code` VARCHAR(45) NOT NULL COMMENT '画面コード',
  `change_id` BIGINT NOT NULL COMMENT '変更ID',
  `user_id` BIGINT NULL COMMENT 'ユーザID',
  `content` TEXT NULL COMMENT '内容',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`history_id`),
  INDEX `fk_m_screens_t_screen_change_historys_screen_code_idx` (`screen_code` ASC) VISIBLE,
  CONSTRAINT `fk_m_screens_t_screen_change_historys_screen_code`
    FOREIGN KEY (`screen_code`)
    REFERENCES `wicum_develop`.`m_screens` (`screen_code`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '画面変更履歴';


-- -----------------------------------------------------
-- Table `wicum_develop`.`m_screen_changes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`m_screen_changes` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`m_screen_changes` (
  `screen_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '画面ID',
  `change_id` BIGINT NOT NULL COMMENT '変更ID',
  `change_content` VARCHAR(45) NOT NULL COMMENT '変更内容',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`screen_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = '変更内容マスタ';


-- -----------------------------------------------------
-- Table `wicum_develop`.`t_subtask_lists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wicum_develop`.`t_subtask_lists` ;

CREATE TABLE IF NOT EXISTS `wicum_develop`.`t_subtask_lists` (
  `sub_task_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'サブタスクID',
  `task_id` BIGINT NOT NULL COMMENT 'タスクID',
  `status_code` VARCHAR(45) NOT NULL COMMENT 'ステータスコード',
  `title` TEXT NOT NULL COMMENT '変更ID',
  `content` TEXT NOT NULL COMMENT '変更内容',
  `completion_datetime` DATETIME NULL COMMENT '完了日時',
  `remind_datetime` DATETIME NULL COMMENT 'リマインダー日時',
  `regist_userid` VARCHAR(45) NOT NULL COMMENT '登録ユーザID',
  `update_userid` VARCHAR(45) NOT NULL COMMENT '更新ユーザID',
  `regist_datetime` DATETIME NOT NULL COMMENT '登録日時',
  `update_datetime` DATETIME NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`sub_task_id`),
  INDEX `fk_t_task_lists_idx` (`task_id` ASC) VISIBLE,
  INDEX `fk_m_states_idx` (`status_code` ASC) VISIBLE,
  CONSTRAINT `fk_t_task_lists`
    FOREIGN KEY (`task_id`)
    REFERENCES `wicum_develop`.`t_task_lists` (`task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_states`
    FOREIGN KEY (`status_code`)
    REFERENCES `wicum_develop`.`m_states` (`status_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'サブタスク一覧';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
