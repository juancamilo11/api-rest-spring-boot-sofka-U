package dev.j3c.restapi.servicio;

import dev.j3c.restapi.entidad.Persona;
import dev.j3c.restapi.repositorio.InterfazRepositorioPersona;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiciosPersona implements InterfazServiciosPersona{

    @Autowired
    private InterfazRepositorioPersona data;

    @Override
    public List<Persona> listar() {
        return (List<Persona>) data.findAll();
    }

    @Override
    public Persona listarId(int id) {
        Optional<Persona> opcional = data.findById(id);
        return opcional.orElse(new Persona());
    }

    @Override
    public Persona guardar(Persona persona) {
        return data.save(persona);
    }

    @Override
    public void borrar(int id) {
        boolean existe = data.existsById(id);
        if(existe) {
            data.deleteById(id);
        }
    }

    @Override
    public Persona actualizar(Persona persona) {
        return data.save(persona);
    }
}
