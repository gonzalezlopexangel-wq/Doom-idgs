// --- CREAR NUEVA TAREA ---
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

    actualizarEstadisticas();
});

// --- ACCIONES DE BOTONES ---
lista.addEventListener("click", function(e){
    const boton = e.target.closest("button");
    if(!boton) return;

    const tarea = boton.closest(".card");

    // ELIMINAR
    if(boton.dataset.action === "del"){
        tarea.remove();
        actualizarEstadisticas();
    }

    // MARCAR COMPLETADA
    if(boton.dataset.action === "done"){
        tarea.classList.toggle("is-done");
        actualizarEstadisticas();
    }

    // MARCAR FAVORITA
    if(boton.dataset.action === "fav"){
        tarea.dataset.fav = tarea.dataset.fav === "0" ? "1" : "0";
        boton.textContent = tarea.dataset.fav === "1" ? "★" : "☆";
        actualizarEstadisticas();
    }
});

// --- FILTROS DE CATEGORÍAS ---
const filtros = document.querySelectorAll(".chip");

filtros.forEach(function(boton){
    boton.addEventListener("click", function(){
        const filtro = boton.dataset.filter;
        const tareas = document.querySelectorAll(".card");

        // Cambiar botón activo
        filtros.forEach(b => b.classList.remove("is-active"));
        boton.classList.add("is-active");

        // Mostrar/ocultar según filtro
        tareas.forEach(function(tarea){
            if(filtro === "all"){
                tarea.style.display = "block";
            } else if(filtro === "fav"){
                tarea.style.display = tarea.dataset.fav === "1" ? "block" : "none";
            } else {
                tarea.style.display = tarea.dataset.tag === filtro ? "block" : "none";
            }
        });

        actualizarEstadisticas();
    });
});

// --- BUSCADOR EN TIEMPO REAL ---
const buscador = document.querySelector("#inputBuscar");

buscador.addEventListener("input", function(){
    const texto = buscador.value.toLowerCase();
    const tareas = document.querySelectorAll(".card");
    const filtroActivo = document.querySelector(".chip.is-active").dataset.filter;

    tareas.forEach(function(tarea){
        const titulo = tarea.querySelector(".card__title").textContent.toLowerCase();
        let mostrar = titulo.includes(texto);

        // Aplicar filtro activo
        if(filtroActivo === "fav" && tarea.dataset.fav !== "1") mostrar = false;
        if(filtroActivo !== "all" && filtroActivo !== "fav" && tarea.dataset.tag !== filtroActivo) mostrar = false;

        tarea.style.display = mostrar ? "block" : "none";
    });

    actualizarEstadisticas();
});

// --- LIMPIAR BÚSQUEDA ---
const btnLimpiar = document.querySelector("#btnLimpiarBuscar");

btnLimpiar.addEventListener("click", function(){
    buscador.value = "";

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

    actualizarEstadisticas();
});

// --- ESTADÍSTICAS ---
function actualizarEstadisticas(){
    const tareas = document.querySelectorAll(".card");
    const statTotal = document.querySelector("#statTotal");
    const statVisibles = document.querySelector("#statVisibles");
    const statFavs = document.querySelector("#statFavs");

    let total = tareas.length;
    let visibles = 0;
    let favoritas = 0;

    tareas.forEach(tarea => {
        if(tarea.style.display !== "none") visibles++;
        if(tarea.dataset.fav === "1") favoritas++;
    });

    statTotal.textContent = total;
    statVisibles.textContent = visibles;
    statFavs.textContent = favoritas;
}

// Llamada inicial para mostrar estadísticas correctas
actualizarEstadisticas();