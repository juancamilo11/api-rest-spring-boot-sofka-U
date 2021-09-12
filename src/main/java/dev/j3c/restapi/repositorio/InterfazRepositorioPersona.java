package dev.j3c.restapi.repositorio;

import dev.j3c.restapi.entidad.Persona;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfazRepositorioPersona extends CrudRepository<Persona,Integer> {

}