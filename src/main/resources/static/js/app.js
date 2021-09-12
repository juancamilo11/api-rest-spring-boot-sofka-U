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

window.addEventListener('load', obtenerPersonas);



