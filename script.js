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