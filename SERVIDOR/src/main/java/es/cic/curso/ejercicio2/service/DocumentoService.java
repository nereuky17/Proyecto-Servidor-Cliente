package es.cic.curso.ejercicio2.service;

import es.cic.curso.ejercicio2.entity.Documento;
import es.cic.curso.ejercicio2.repository.DocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepository;

    public long crear(Documento documento) {
        Documento savedDocumento = documentoRepository.save(documento);
        System.out.println(savedDocumento);
        return savedDocumento.getId();
    }

    public Documento leer(Long id) {
        return documentoRepository.findById(id).orElse(null);
    }

    public void actualizar(Documento documento) {
        Documento documentoExistente = documentoRepository.findById(documento.getId())
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        // Actualiza los campos necesarios
        documentoExistente.setTitulo(documento.getTitulo());
        documentoExistente.setContenido(documento.getContenido());

        // Guarda el documento actualizado
        documentoRepository.save(documentoExistente);
    }

    public void borrar(Long id) {
        documentoRepository.deleteById(id);
    }

    public List<Documento> listar() {
        return (List<Documento>) documentoRepository.findAll();
    }
}
