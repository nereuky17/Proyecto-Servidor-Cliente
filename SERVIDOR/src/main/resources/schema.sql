-- Crear tabla expediente
CREATE TABLE EXPEDIENTE (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255)
);

-- Crear tabla documento
CREATE TABLE documento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    expediente_id BIGINT,
    FOREIGN KEY (expediente_id) REFERENCES expediente(id)
);