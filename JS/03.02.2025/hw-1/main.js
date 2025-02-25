/* start ex-1 */
const heroes = 
[
    { name: "Batman", power: 80 },       
    { name: "Flash", power: 90 },   
    { name: "Cat in Boots", power: 40 },   
    { name: "Wonder woman", power: 100 },
]


createList();
addToList(filterHeroes(heroes));

function createList() {
    const div = document.createElement("div");
    div.setAttribute("id", "hero-list");
    div.appendChild(document.createElement("ul"));
    document.body.appendChild(div);
}

function addToList(filteredHeroes) {
    const list = document.getElementById("hero-list");
    list.style.cssText = 
    `
        padding: 0;
        margin: 0
    `;
    for (const key in filteredHeroes) {
        const liElement = document.createElement("li");
        liElement.style.listStyleType="none";
        liElement.innerText = `Name: ${filteredHeroes[key].name}, power: ${filteredHeroes[key].power}`;
        list.appendChild(liElement);
    }
}

function filterHeroes(heroes, filteredHeroes = []) {
    for (const key in heroes) {
        if (heroes[key]["power"] > 50)
        {
            filteredHeroes.push(heroes[key]);
        }
    }
    return filteredHeroes;
}
/* end */


/* start ex-2 */

function createMask() {
    let inputName = getName();
    let inputColor = getColor();
    if (inputName == "" || inputColor == "")
    {
        return;
    }
    const mask = document.createElement("div");
    mask.classList.add("mask")
    mask.innerText = inputName;
    try {
        mask.style.backgroundColor = inputColor;
    } catch (error) {
        alert(error);
    }
    document.querySelector(".masks-collection").appendChild(mask);
    resetForm();
    event.preventDefault();
}

function getName() {
    let tempName = document.querySelector("form input[name='name']").value;
    return tempName;
}
function getColor() {
    let tempColor = document.querySelector("form input[name='color']").value;
    return tempColor;
}
function resetForm() {
    const form = document.querySelector("form");
    form.reset();
}

/* end */