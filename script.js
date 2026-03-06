// crear nueva tarea
const form = document.querySelector("#formTarea");
const inputTitulo = document.querySelector("#inputTitulo");
const selectTag = document.querySelector("#selectTag");
const lista = document.querySelector("#listaTareas");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const titulo = inputTitulo.value.trim();
    const categoria = selectTag.value;

    if(titulo === "") return;

    const tarea = document.createElement("li");
    tarea.classList.add("card");
    tarea.dataset.tag = categoria;
    tarea.dataset.fav = "0";

    tarea.innerHTML = `
        <div class="card__head">
            <span class="badge">${categoria}</span>
            <div class="actions">
                <button class="icon" type="button" data-action="fav">☆</button>
                <button class="icon" type="button" data-action="done">✓</button>
                <button class="icon danger" type="button" data-action="del">🗑</button>
            </div>
        </div>
        <p class="card__title">${titulo}</p>
    `;

    lista.appendChild(tarea);

    inputTitulo.value = "";
});


// acciones de botones eliminar, marcar completada y favorita
lista.addEventListener("click", function(e){

    const boton = e.target.closest("button");
    if(!boton) return;

    const tarea = boton.closest(".card");

    // eliminar
    if(boton.dataset.action === "del"){
        tarea.remove();
    }

    // marcar completada
    if(boton.dataset.action === "done"){
        tarea.classList.toggle("is-done");
    }

    // favorita
    if(boton.dataset.action === "fav"){
        tarea.dataset.fav = tarea.dataset.fav === "0" ? "1" : "0";
        boton.textContent = tarea.dataset.fav === "1" ? "★" : "☆";
    }

});

// filtros DE CATEGORÍAS
// filtrar por categoría
const filtros = document.querySelectorAll(".chip");

filtros.forEach(function(boton){

    boton.addEventListener("click", function(){

        const filtro = boton.dataset.filter;
        const tareas = document.querySelectorAll(".card");

        // cambiar botón activo
        filtros.forEach(b => b.classList.remove("is-active"));
        boton.classList.add("is-active");

        tareas.forEach(function(tarea){

            if(filtro === "all"){
                tarea.style.display = "block";
            }

            else if(filtro === "fav"){
                if(tarea.dataset.fav === "1"){
                    tarea.style.display = "block";
                }else{
                    tarea.style.display = "none";
                }
            }

            else{
                if(tarea.dataset.tag === filtro){
                    tarea.style.display = "block";
                }else{
                    tarea.style.display = "none";
                }
            }

        });

    });

});

//Buscador de tareas
const buscador = document.querySelector("#inputBuscar");

buscador.addEventListener("input", function(){

    const texto = buscador.value.toLowerCase();
    const tareas = document.querySelectorAll(".card");

    tareas.forEach(function(tarea){

        const titulo = tarea.querySelector(".card__title").textContent.toLowerCase();

        if(titulo.includes(texto)){
            tarea.style.display = "block";
        }else{
            tarea.style.display = "none";
        }

    });

});

// Limpier busquedad
const btnLimpiar = document.querySelector("#btnLimpiarBuscar");

btnLimpiar.addEventListener("click", function(){

    // vaciar input
    const buscador = document.querySelector("#inputBuscar");
    buscador.value = "";

    // mostrar todas las tarjetas según el filtro activo
    const filtroActivo = document.querySelector(".chip.is-active").dataset.filter;
    const tareas = document.querySelectorAll(".card");

    tareas.forEach(function(tarea){

        if(filtroActivo === "all"){
            tarea.style.display = "block";
        } else if(filtroActivo === "fav"){
            tarea.style.display = tarea.dataset.fav === "1" ? "block" : "none";
        } else {
            tarea.style.display = tarea.dataset.tag === filtroActivo ? "block" : "none";
        }

    });

});