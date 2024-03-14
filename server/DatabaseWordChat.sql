DROP DATABASE IF EXISTS 5to_DatabaseWordChat;
CREATE DATABASE 5to_DatabaseWordChat;
USE 5to_DatabaseWordChat;

CREATE TABLE UsuarioNoValidado
(
    nombre VARCHAR(45) NOT NULL,
    correoElectronico VARCHAR(45) NOT NULL,
    contraseña VARCHAR(45) NOT NULL,
    codigo INT UNSIGNED NOT NULL,
    idUsuarioNoValidado INT UNSIGNED AUTO_INCREMENT,
    fechaCreacion DATETIME NOT NULL,
    CONSTRAINT PK_UsuarioNoValidado PRIMARY KEY (idUsuarioNoValidado)
);

CREATE TABLE Usuario
(
    nombre VARCHAR(45) NOT NULL,
    correoElectronico VARCHAR(45) NOT NULL,
    contraseña VARCHAR(45) NOT NULL,
    codigo INT UNSIGNED NOT NULL,
    idUsuario INT UNSIGNED NOT NULL,
    fechaCreacion DATETIME NOT NULL,
    CONSTRAINT PK_Usuario PRIMARY KEY (idUsuario)
);

DELIMITER $$
CREATE PROCEDURE altaUsuarioNoValidado(IN unNombre VARCHAR(45),
                                       IN unCorreo VARCHAR(45),
                                       IN unContraseña VARCHAR(45),
                                       IN unCodigo INT UNSIGNED)
BEGIN
    INSERT INTO UsuarioNoValidado (nombre, correoElectronico, contraseña, codigo, fechaCreacion)
        VALUES  (unNombre, unCorreo, unContraseña, unCodigo, NOW());
END
$$

DELIMITER $$
CREATE PROCEDURE altaUsuario(IN unNombre VARCHAR(45),
                             IN unCorreo VARCHAR(45),
                             IN unContraseña VARCHAR(45),
                             IN unIdUsuario INT UNSIGNED,
                             IN unCodigo INT UNSIGNED)
BEGIN
    INSERT INTO Usuario (nombre, correoElectronico, contraseña, codigo, idUsuario, fechaCreacion)
        VALUES  (unNombre, unCorreo, unContraseña, unIdUsuario, unCodigo, NOW());
END
$$

CALL `altaUsuarioNoValidado`("Pepito", "pepito@gmail.com", "contraseña", 32145432);
CALL `altaUsuario`("Pepito", "pepito@gmail.com", "contraseña", 1, 32145432);