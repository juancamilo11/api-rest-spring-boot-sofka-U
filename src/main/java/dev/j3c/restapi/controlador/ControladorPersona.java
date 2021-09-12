package dev.j3c.restapi.controlador;


import dev.j3c.restapi.entidad.Persona;
import dev.j3c.restapi.servicio.InterfazServiciosPersona;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;

@RestController
@RequestMapping("api/persona")
public class ControladorPersona {

    @Autowired
    private InterfazServiciosPersona servicio;

    @GetMapping(value = "/listar")
    private Iterable<Persona> listarPersonas() {
        return servicio.listar();
    }

    @PostMapping("/guardar")
    private Persona guardarPersona(@RequestBody Persona persona){
        return servicio.guardar(persona);
    }

    @PutMapping("/actualizar")
    private Persona actualizarPersona(@RequestBody Persona persona){
        return servicio.actualizar(persona);
    }

    @DeleteMapping(path="{id}")
    private void borrarPersona(@PathVariable("id") Integer id){
        servicio.borrar(id);
    }
}
