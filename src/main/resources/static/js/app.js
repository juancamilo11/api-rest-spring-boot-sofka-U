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

const FetchingresarOActualizar = function(options) {
    const {method, url, success, error, data} = options;
    fetch(url,{
        method,
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            nombre: data.nombre,
            apellido: data.apellido,
            edad: data.edad,
            telefono: data.telefono,
            genero: data.genero
        })
    })
    .then(res => {
        if(res.ok) {
            success(res.json());
        } else {
            Promise.reject("Se ha producido un error al intentar ingresar el nuevo usuario");
        }
    })
    .catch(err => {
        error(err);
    })
}

const ingresarNuevaPersona = function(id,nombre,apellido,edad,telefono,genero) {
    FetchingresarOActualizar({
        method:'POST',
        url: 'http://localhost:8080/api/persona/guardar',
        success: function(data) {
            alert(`El usuario se ha creado correctamente!`);
            location.reload();
        },
        error: function(mensaje) {
            $table.insertAdjacentElement('afterend',`<p><b>${mensaje}</b></p>`);
        },
        data: {
            nombre,
            apellido,
            edad,
            telefono,
            genero
        }
    });
}

const actualizarPersona = function(id,nombre,apellido,edad,telefono,genero){
    FetchingresarOActualizar({
        method:'PUT',
        url: `http://localhost:8080/api/persona/${id}`,
        success: function(data) {
            alert(`El usuario se ha actualizado correctamente!`);
            location.reload();
        },
        error: function(mensaje) {
            $table.insertAdjacentElement('afterend',`<p><b>${mensaje}</b></p>`);
        },
        data: {
            nombre,
            apellido,
            edad,
            telefono,
            genero
        }
    });
}

const eliminarPersona = async function(id) {
    try{
        let res = await fetch(`http://localhost:8080/api/persona/${id}`, {method:"DELETE"});
        if(!res.ok) {
            throw {status: res.status , statusText: res.statusText}
        }
        location.reload();
    } catch(error) {
        let mensaje = error.statusText || "Ha ocurrido un error";
        alert(`Error al intentar eliminar la persona: ${error}: ${mensaje}`);
    }
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
            ingresarNuevaPersona(id,nombre,apellido,edad,telefono,genero);
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



