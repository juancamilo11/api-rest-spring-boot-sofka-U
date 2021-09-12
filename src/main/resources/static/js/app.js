//Obtenemos el objeto form
const $form = document.getElementById('form-ingreso');

//Obtenemos los componentes de la tabla
const $table = document.querySelector('.users-table');
const $tableBody = document.querySelector('.users-table__body');
const $tableTemplate = document.getElementById('tbody-template').content;
const $tableFragment = document.createDocumentFragment();

const obtenerPersonas = async function(){
    try{
        let res = await fetch("http://localhost:8080/api/persona/listar"),
            json = await res.json();

        if(!res.ok) throw {status: res.status , statusText: res.statusText};

        json.forEach(usuario => {
            $tableTemplate.querySelector('.template__id').textContent = usuario.id;
            $tableTemplate.querySelector('.template__nombre').textContent = usuario.nombre;
            $tableTemplate.querySelector('.template__apellido').textContent = usuario.apellido;
            $tableTemplate.querySelector('.template__edad').textContent = usuario.edad;
            $tableTemplate.querySelector('.template__telefono').textContent = usuario.telefono;
            $tableTemplate.querySelector('.template__genero').textContent = usuario.genero;

            const $btnEditar = $tableTemplate.querySelector('.btn-editar'),
                $btnEliminar = $tableTemplate.querySelector('.btn-eliminar');

            $btnEditar.setAttribute('data-id', usuario.id);
            $btnEditar.setAttribute('data-nombre', usuario.nombre);
            $btnEditar.setAttribute('data-apellido', usuario.apellido);
            $btnEditar.setAttribute('data-edad', usuario.edad);
            $btnEditar.setAttribute('data-telefono', usuario.telefono);
            $btnEditar.setAttribute('data-genero', usuario.genero);

            $btnEliminar.setAttribute('data-id', usuario.id);

            let $clone = document.importNode($tableTemplate, true);
            $tableFragment.append($clone);
        })
        $tableBody.appendChild($tableFragment);
    }
    catch(error){
        let mensaje = error.statusText || "Ha ocurrido un error al intentar cargar la lista de personas.";
        alert(`Error ${error.status}: ${mensaje}`);
    }
}

const ingresarNuevaPersona = function(nombre,apellido,edad,telefono,genero) {
    fetch("http://localhost:8080/api/persona/guardar", {
        method:"POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({nombre, apellido, edad, telefono, genero})
    })
    .then(res => {
        if (res.ok) {
            location.reload();
            alert("Se ha ingresado la nueva persona exitosamente.");
        } else {
            Promise.reject("Se ha producido un error al intentar ingresar la nueva persona.");
        }
    })
    .catch(err => {
        error(err);
    })
}

const actualizarPersona = function(id,nombre,apellido,edad,telefono,genero){
    fetch(`http://localhost:8080/api/persona/actualizar`, {
        method:"PUT",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({id,nombre, apellido, edad, telefono, genero})
    })
    .then(res => {
        if (res.ok) {
            location.reload();
            alert("La persona con id "+ id + " se ha actualizado exitosamente.");
        } else {
            Promise.reject("Se ha producido un error al intentar actualizar la persona con id " + id);
        }
    })
    .catch(err => {
        error(err);
    })
}

const eliminarPersona = function(id) {
    fetch(`http://localhost:8080/api/persona/${id}`, {
        method:"DELETE",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({id})
    })
    .then(res => {
        if (res.ok) {
            location.reload();
            alert("La persona con id "+ id + " se ha removido del sistema exitosamente.");
        } else {
            Promise.reject("Se ha producido un error al intentar actualizar la persona con id " + id);
        }
    })
    .catch(err => {
        let mensaje = error.statusText || "Ha ocurrido un error";
        alert(`Error al intentar eliminar la persona: ${err}: ${mensaje}`);
    })
}

document.addEventListener('submit',function (e){
    if(e.target === $form) {
        e.preventDefault();
        const id = $form.id.value,
            nombre = $form.nombre.value,
            apellido = $form.apellido.value,
            edad = $form.edad.value,
            telefono = $form.telefono.value,
            genero = $form.genero.value;
        if(!id) {
            //Operación --> Guardar una nueva persona
            ingresarNuevaPersona(nombre,apellido,edad,telefono,genero);
        } else {
            //Operación --> Actualizar una persona
            actualizarPersona(id,nombre,apellido,edad,telefono,genero);
        }
    }
});

document.addEventListener('click',(event) => {
    if(event.target.matches('.btn-editar')) {
        const $btnIngreso = document.getElementById('btn-ingreso');
        const $btnEditPresionado = event.target;
        $btnIngreso.value = "Editar Usuario";

        $form.id.value = $btnEditPresionado.dataset.id;
        $form.nombre.value = $btnEditPresionado.dataset.nombre;
        $form.apellido.value = $btnEditPresionado.dataset.apellido;
        $form.edad.value = $btnEditPresionado.dataset.edad;
        $form.telefono.value = $btnEditPresionado.dataset.telefono;
        $form.genero.value = $btnEditPresionado.dataset.genero;

    } else if(event.target.matches('.btn-eliminar')) {
        const $btnElimPresionado = event.target,
            id = $btnElimPresionado.dataset.id;
        let confirmacion = window.confirm(`¿Desea eliminar al usuario con id: ${id}?`);
        if(confirmacion) {
            eliminarPersona(id);
        }
    }
});

window.addEventListener('load', obtenerPersonas);



