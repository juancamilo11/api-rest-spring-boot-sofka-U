package dev.j3c.restapi.controlador;


import dev.j3c.restapi.entidad.Persona;
import dev.j3c.restapi.servicio.InterfazServiciosPersona;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/persona")
public class ControladorPersona {

    @Autowired
    private InterfazServiciosPersona servicio;

    @GetMapping(value = "/listar")
    private Iterable<Persona> listarPersonas() {
        return servicio.listar();
    }


}
