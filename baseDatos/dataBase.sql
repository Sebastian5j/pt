-- MySQL Script generated by MySQL Workbench
-- mié 04 sep 2019 11:42:51 CDT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB
COMMENT = 'aqui estan los usuarios';


-- -----------------------------------------------------
-- Table `mydb`.`dispositivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`dispositivo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`dispositivo` (
  `idDispositivo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  `users_idusers` INT NOT NULL,
  PRIMARY KEY (`idDispositivo`),
  INDEX `fk_dispositivo_users1_idx` (`users_idusers` ASC),
  CONSTRAINT `fk_dispositivo_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `mydb`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`enlace`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`enlace` ;

CREATE TABLE IF NOT EXISTS `mydb`.`enlace` (
  `idenlace` INT NOT NULL AUTO_INCREMENT,
  `dispositivo_idDispositivo` INT NOT NULL,
  `dispositivo_idDispositivo1` INT NOT NULL,
  PRIMARY KEY (`idenlace`),
  INDEX `fk_enlace_dispositivo1_idx` (`dispositivo_idDispositivo` ASC),
  INDEX `fk_enlace_dispositivo2_idx` (`dispositivo_idDispositivo1` ASC),
  CONSTRAINT `fk_enlace_dispositivo1`
    FOREIGN KEY (`dispositivo_idDispositivo`)
    REFERENCES `mydb`.`dispositivo` (`idDispositivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enlace_dispositivo2`
    FOREIGN KEY (`dispositivo_idDispositivo1`)
    REFERENCES `mydb`.`dispositivo` (`idDispositivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`interface`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`interface` ;

CREATE TABLE IF NOT EXISTS `mydb`.`interface` (
  `idinterface` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `ip` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `dispositivo_idDispositivo` INT NOT NULL,
  PRIMARY KEY (`idinterface`),
  INDEX `fk_interface_dispositivo1_idx` (`dispositivo_idDispositivo` ASC),
  CONSTRAINT `fk_interface_dispositivo1`
    FOREIGN KEY (`dispositivo_idDispositivo`)
    REFERENCES `mydb`.`dispositivo` (`idDispositivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
insert into users(nombre, password) values ('sebas','1197sebas');
#insert into dispositivo	(nombre, tipo, users_idusers)values('R1','router', 1);
#insert into dispositivo	(nombre, tipo, users_idusers)values('R2','router', 1);
#insert into dispositivo	(nombre, tipo, users_idusers)values('R3','router', 1);
#insert into enlace(dispositivo_idDispositivo,dispositivo_idDispositivo1, fecha) values (1,2, '2019-11-11 13:23:44');
#insert into enlace(dispositivo_idDispositivo,dispositivo_idDispositivo1, fecha) values (1,2, '2019-11-11 13:24:44');
#insert into enlace(dispositivo_idDispositivo,dispositivo_idDispositivo1, fecha) values (1,2, '2019-11-11 13:25:44');
#insert into enlace(dispositivo_idDispositivo,dispositivo_idDispositivo1, fecha) values (3,2, '2008-11-11 13:23:44');
#insert into enlace(dispositivo_idDispositivo,dispositivo_idDispositivo1, fecha) values (2,3, '2008-11-11 13:23:44');
#SELECT COUNT(idenlace), dispositivo_idDispositivo, dispositivo_idDispositivo1 FROM enlace GROUP BY dispositivo_idDispositivo, dispositivo_idDispositivo1;


