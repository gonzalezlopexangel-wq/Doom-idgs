// --- ELEMENTOS DEL DOM ---
const form = document.querySelector("#formTarea");
const inputTitulo = document.querySelector("#inputTitulo");
const selectTag = document.querySelector("#selectTag");
const lista = document.querySelector("#listaTareas");
const buscador = document.querySelector("#inputBuscar");
const btnLimpiar = document.querySelector("#btnLimpiarBuscar");
const filtros = document.querySelectorAll(".chip");
const emptyState = document.querySelector("#emptyState");
const statTotal = document.querySelector("#statTotal");
const statVisibles = document.querySelector("#statVisibles");
const statFavs = document.querySelector("#statFavs");

// --- FUNCIONES AUXILIARES ---
function actualizarEstadisticas() {
    const tareas = document.querySelectorAll(".card");
    let total = tareas.length;
    let visibles = 0;
    let favoritas = 0;

    tareas.forEach(tarea => {
        const estilo = window.getComputedStyle(tarea);
        if (estilo.display !== "none") visibles++;
        if (tarea.dataset.fav === "1") favoritas++;
    });

    statTotal.textContent = total;
    statVisibles.textContent = visibles;
    statFavs.textContent = favoritas;

    actualizarEmptyState();
}

function actualizarEmptyState() {
    const tareas = document.querySelectorAll(".card");
    if (tareas.length === 0) {
        emptyState.classList.remove("is-hidden");
        return;
    }

    let hayVisibles = false;
    tareas.forEach(tarea => {
        const estilo = window.getComputedStyle(tarea);
        if (estilo.display !== "none") hayVisibles = true;
    });

    if (hayVisibles) emptyState.classList.add("is-hidden");
    else emptyState.classList.remove("is-hidden");
}

function aplicarFiltroYBusqueda() {
    const texto = buscador.value.toLowerCase();
    const filtroActivo = document.querySelector(".chip.is-active").dataset.filter;
    const tareas = document.querySelectorAll(".card");

    tareas.forEach(tarea => {
        const titulo = tarea.querySelector(".card__title").textContent.toLowerCase();
        let mostrar = titulo.includes(texto);

        // Aplicar filtro
        if (filtroActivo === "fav" && tarea.dataset.fav !== "1") mostrar = false;
        else if (filtroActivo !== "all" && filtroActivo !== "fav" && tarea.dataset.tag !== filtroActivo) mostrar = false;

        tarea.style.display = mostrar ? "block" : "none";
    });

    actualizarEstadisticas();
}

// --- CREAR NUEVA TAREA ---
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
    aplicarFiltroYBusqueda(); // Actualiza todo
});

// --- DELEGACIÓN DE EVENTOS PARA BOTONES ---
lista.addEventListener("click", function(e){
    const boton = e.target.closest("button");
    if(!boton) return;
    const tarea = boton.closest(".card");

    switch(boton.dataset.action){
        case "del":
            tarea.remove();
            aplicarFiltroYBusqueda();
            break;
        case "done":
            tarea.classList.toggle("is-done");
            break;
        case "fav":
            tarea.dataset.fav = tarea.dataset.fav === "0" ? "1" : "0";
            boton.textContent = tarea.dataset.fav === "1" ? "★" : "☆";
            break;
    }

    actualizarEstadisticas();
});

// --- FILTROS ---
filtros.forEach(boton => {
    boton.addEventListener("click", function(){
        filtros.forEach(b => b.classList.remove("is-active"));
        boton.classList.add("is-active");
        aplicarFiltroYBusqueda();
    });
});

// --- BUSCADOR EN TIEMPO REAL ---
buscador.addEventListener("input", aplicarFiltroYBusqueda);

// --- LIMPIAR BÚSQUEDA ---
btnLimpiar.addEventListener("click", function(){
    buscador.value = "";
    aplicarFiltroYBusqueda();
});

// --- INICIALIZACIÓN ---
aplicarFiltroYBusqueda();