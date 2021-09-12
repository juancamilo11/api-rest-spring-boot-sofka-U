CREATE DATABASE bd_api_rest_sofka;

USE bd_api_rest_sofka;

CREATE TABLE `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `genero` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
