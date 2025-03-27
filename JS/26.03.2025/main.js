const API_ADDRESS = 'https://akabab.github.io/starwars-api/api/all.json';
const dataUl = document.querySelector(".data");
const modalWindow = document.querySelector(".modal-window");
const modalWindowContent = modalWindow.querySelector(".modal-content");
const input = document.querySelector("input");

let characters = [];

fetch(API_ADDRESS)
    .then(res => res.json())
    .then(json => {
        characters = json;
        renderList(characters);
    });

function renderList(list) {
    dataUl.innerHTML = "";
    list.forEach(element => {
        dataUl.insertAdjacentHTML("beforeend", 
            `
            <li data-name="${element["name"]}" data-image="${element["image"]}" data-species="${element["species"]}" data-masters="${element["masters"]}">
                <h3>${element["name"]}</h3>
                <img src="${element["image"]}" alt="${element["name"]}" />
            </li>
            `
        );
    });

    dataUl.querySelectorAll("li").forEach(element => {
        element.addEventListener("click", () => {   
            let masters = element.getAttribute("data-masters");
            let span = masters && masters !== "undefined" ? `<span>Masters: ${masters}</span>` : "";

            modalWindowContent.innerHTML = `
                <h3>${element.getAttribute("data-name")}</h3>
                <span>Species: ${element.getAttribute("data-species")}</span>
                ${span}
                <img src="${element.getAttribute("data-image")}" alt="${element.getAttribute("data-name")}" />
            `;
            modalWindow.style.display = "flex";
        });
    });
}

modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
        modalWindow.style.display = "none";
    }
});

input.addEventListener("input", () => {
    const prompt = input.value.toLowerCase();
    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().includes(prompt)
    );
    renderList(filteredCharacters);
});
