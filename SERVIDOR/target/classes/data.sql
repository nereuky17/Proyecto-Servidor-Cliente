-- Insertar expedientes en la tabla expediente
INSERT INTO expediente (nombre) VALUES ('Expediente de Finanzas');
INSERT INTO expediente (nombre) VALUES ('Expediente de Recursos Humanos');
INSERT INTO expediente (nombre) VALUES ('Expediente de Marketing');

-- Insertar documentos en la tabla documento
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Informe Financiero Q1', 'Este documento contiene el informe financiero del primer trimestre.', 1);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Presupuesto Anual', 'Este documento detalla el presupuesto anual aprobado para el año fiscal.', 1);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Política de Contratación', 'Este documento describe la política de contratación de la empresa.', 2);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Evaluación de Desempeño', 'Este documento contiene los resultados de la evaluación de desempeño anual.', 2);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Plan de Marketing 2023', 'Este documento detalla el plan de marketing para el año 2023.', 3);
INSERT INTO documento (titulo, contenido, expediente_id) VALUES ('Análisis de Competencia', 'Este documento contiene un análisis detallado de la competencia en el mercado.', 3);