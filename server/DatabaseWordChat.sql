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

CALL `altaUsuarioNoValidado`("Pepito", "pepito@gmail.com", "contraseña", 32145432);