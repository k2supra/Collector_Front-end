/* start ex-1 */
const participants = 
[
    {name: "Oleg", score: 85},
    {name: "Maryna", score: 92},
    {name: "Vlad", score: 78},
]


// sortByScore(participants)
bubbleSortDescending(participants)

createList();
for (const element of participants) {
    addListElement(element.name, element.score, getList())
}

function sortByScore(array) {
    return array.sort((a, b) => a.score - b.score)
}
function bubbleSortDescending(array) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let index = 0; index < array.length - 1; index++) {
            if (array[index].score < array[index + 1].score) {
                let temp = array[index + 1];
                array[index + 1] = array[index];
                array[index] = temp;
                sorted = false;
            }
        }
    }
    return array;
}
function createList() {
    let ol = document.createElement("ol");
    document.querySelector("div.list").appendChild(ol);
}
function getList() {
    const list = document.querySelector("div.list ol");
    return list;
}
function addListElement(name, score, ol) {
    let li = document.createElement("li");
    li.innerText = `${name}: ${score}`;
    ol.appendChild(li);
}
/* end */

/* start ex-2 */


function assistant() {
    let request = `${document.querySelector(".assistant input").value}`.toLowerCase();
    switch (request) {
        case "joke":
            console.log("JOKE -> " + getRandomJoke());
            break;
        case "time":
            console.log("TIME -> " + new Date().toLocaleTimeString());
            break;
        case "date":
            console.log("Date -> " + new Date().toLocaleDateString());
            break;
        default:
            break;
    }
}

const jokes = 
[
    "What was the spider doing on the computer?... He was making a web-site!",
    "What did the computer have during his break time?... He had a byte!",
    "What is the computer's favorite snack to eat?... Microchips!"
];

function getRandomJoke() {
    let random = Math.floor(Math.random()*jokes.length);
    return jokes[random];
}
/* end */