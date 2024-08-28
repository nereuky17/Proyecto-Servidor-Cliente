package es.cic.curso.ejercicio2.controller;

import es.cic.curso.ejercicio2.entity.Documento;
import es.cic.curso.ejercicio2.entity.Expediente;
import es.cic.curso.ejercicio2.repository.ExpedienteRepository;
import es.cic.curso.ejercicio2.service.ExpedienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expediente")
public class ExpedienteController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }

    @Autowired
    ExpedienteRepository expedienteRepository;
    @Autowired
    private ExpedienteService expedienteService;

    // Crear un nuevo expediente
    @PostMapping(value = "/crear")

    /*
     * curl -X POST http://localhost:8080/expediente/crear -H
     * "Content-Type: application/json" -d '{"nombre":"Expediente1"}'
     * 
     */

    @ResponseStatus(HttpStatus.CREATED)
    public Expediente crear(@RequestBody Expediente expediente) {
        return expedienteService.crear(expediente);
    }

    // Leer un expediente por su ID
    @GetMapping(value = "/{id}")
    public Expediente leer(@PathVariable Long id) {
        Expediente expediente = expedienteService.leer(id);
        if (expediente == null) {
            throw new RuntimeException("Expediente no encontrado para el ID: " + id);
        }
        return expediente;
    }

    // Listar todos los expedientes
    @GetMapping(value = "/listar")
    public List<Expediente> listar() {
        return expedienteRepository.findAll();
    }

    // Actualizar un expediente existente
    // curl -X PUT -H "Content-Type: application/json" -d '{"nombre": "Expediente
    // actualizado"}'
    // "http://localhost:8080/expediente/1"

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void actualizar(@PathVariable Long id, @RequestBody Expediente expediente) {
        expediente.setId(id);
        expedienteService.actualizar(expediente);
        System.out.println("Expediente " + id + " actualizado correctamente");
    }

    // Borrar un expediente por su ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable long id) {
        expedienteService.borrar(id);
        System.out.println("Expediente " + id + " borrado correctamente");

    }

    // DEVUELVE LOS DOCUMENTOS DE EXPEDIENTE

    @GetMapping("/{id}/documentos")
    public ResponseEntity<List<Documento>> obtenerDocumentosPorExpediente(@PathVariable Long id) {
        Expediente expediente = expedienteService.leer(id);
        if (expediente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<Documento> documentos = expediente.getDocumentos();

        return ResponseEntity.ok(documentos);
    }

    // Actualizar un documento existente dentro de un expediente
    @PutMapping("/{expedienteId}/documento/{documentoId}")
    @ResponseStatus(HttpStatus.OK)
    public void actualizarDocumento(@PathVariable Long expedienteId, @PathVariable Long documentoId,
            @RequestBody Documento documento) {
        Expediente expediente = expedienteService.leer(expedienteId);
        if (expediente == null) {
            throw new RuntimeException("Expediente no encontrado para el ID: " + expedienteId);
        }
        Documento doc = expediente.getDocumentos().stream()
                .filter(d -> d.getId().equals(documentoId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Documento no encontrado para el ID: " + documentoId));

        doc.setTitulo(documento.getTitulo());
        doc.setContenido(documento.getContenido());
        expedienteService.actualizar(expediente);
        System.out
                .println("Documento " + documentoId + " del expediente " + expedienteId + " actualizado correctamente");
    }
}
