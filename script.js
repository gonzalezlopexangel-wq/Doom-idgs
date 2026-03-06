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
                <button class="icon" type="button">☆</button>
                <button class="icon" type="button">✓</button>
                <button class="icon danger" type="button">🗑</button>
            </div>
        </div>
        <p class="card__title">${titulo}</p>
    `;

    lista.appendChild(tarea);

    inputTitulo.value = "";
});