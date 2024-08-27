-- Insertar expedientes en la tabla expediente
INSERT INTO expediente (nombre) VALUES ('Expediente 1');
INSERT INTO expediente (nombre) VALUES ('Expediente 2');
INSERT INTO expediente (nombre) VALUES ('Expediente 3');

-- Insertar documentos en la tabla documento
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Documento 1', 'Contenido del Documento Expediente 1', 1);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Documento 2', 'Contenido del Documento Expediente 1', 1);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Documento 3', 'Contenido del Documento Expediente 2', 2);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Documento 4', 'Contenido del Documento Expediente 3', 3);