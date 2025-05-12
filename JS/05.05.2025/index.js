const ul = document.querySelector("ul");
const numbered = document.getElementsByClassName("numbers")[0];
const buttons = document.querySelectorAll(".controls button");
const checkbox = document.querySelector("input[type='checkbox']");
const searchInput = document.getElementById("search");


const template = [
    "1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "2Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "3Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "4Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "5Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "6Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "7Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "8Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "9Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "10Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "11Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "12Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "13Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
    "14Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad maxime dolorum quaerat, corporis dicta numquam!",
]
let data = [...template];


const maxDataPerPage = 10;
let currentPage = 1;
let fetching = checkbox.checked;
let totalPages = fetching ? 10 : Math.ceil(data.length / maxDataPerPage);
let abortController = null;

const searchPosts = debounce(async function () {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        data = [...template];
        totalPages = Math.ceil(data.length / maxDataPerPage);
        setButtons();
        changeActiveButton();
        await renderData();
        return;
    }
    if (abortController) abortController.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    const fetches = [];
    for (let i = 1; i <= 100; i++) {
        fetches.push(
            fetch(`https://jsonplaceholder.typicode.com/posts/${i}`, { signal })
                .then(res => res.json())
                .catch(err => {
                    if (err.name === "AbortError") return null;
                    throw err;
                })
        );
    }

    const results = await Promise.all(fetches);
    const filtered = results
        .filter(p => p && p.body.toLowerCase().includes(query))
        .map(p => p.body);

    data = filtered;
    totalPages = Math.ceil(data.length / maxDataPerPage);
    currentPage = 1;
    setButtons();
    changeActiveButton();
    await renderData();
}, 500);


async function getPostsByFetch() {
    if(abortController) abortController.abort();
    abortController = new AbortController();
    
    const signal = abortController.signal;

    data.splice(0);
    const fetches = [];
    for (let index = (currentPage * maxDataPerPage - maxDataPerPage) + 1; index <= currentPage * maxDataPerPage; index++) {
        fetches.push(
            fetch(`https://jsonplaceholder.typicode.com/posts/${index}`, {signal})
            .then(res => res.json())
            .catch(error => 
            {
                if (error.name == "AbortError") {
                    console.log("Canceled");
                    return null;
                }
                else throw error;
            }
            )
        );
    }

    const dataArr = await Promise.all(fetches);
    
    dataArr.forEach(d => {
        if(d) data.push(d.body);
    }); 
}

function clearList() {
    ul.innerHTML = "";
}

async function renderData()
{
    if(fetching) await getPostsByFetch();
    clearList();
    
    let start = fetching ? 0 : maxDataPerPage * currentPage - maxDataPerPage;
    let end = fetching ? 10 : maxDataPerPage * currentPage;

    for (let index = start; index < end && index < data.length; index++) {
        ul.insertAdjacentHTML("beforeend", `<li>${data[index]}</li>`);
    } 
}


function prev() {
    currentPage -= 1;
    changeActiveButton(numbered.children[currentPage]);
    renderData()
}
function next() {
    currentPage += 1;
    changeActiveButton(numbered.children[currentPage-2]);
    renderData()
}

function renderPage() {
    const temp = currentPage;
    currentPage = +event.target.id;
    changeActiveButton(numbered.children[temp - 1], numbered.children[event.target.id - 1])
    renderData();
}

function setButtons() {
    numbered.innerHTML = "";

    for (let index = 0; index < totalPages; index++) {
        numbered.insertAdjacentHTML("beforeend", 
            `
                <button id="${index+1}" ${index==0? "class='active'" : ''} onclick="renderPage()">${index+1}</button>
            `
        )
    }
}

function changeActiveButton(btn1 = numbered.children[0], btn2 = numbered.children[currentPage-1]) {    
    btn1.classList.remove("active");
    btn2.classList.add("active");

    buttons[0].disabled = (currentPage == 1) ? true : false;
    
    buttons[buttons.length-1].disabled = (currentPage == totalPages) ? true : false;
}

function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

renderData()
setButtons();
changeActiveButton();

buttons[0].disabled = currentPage === 1;
buttons[buttons.length-1].disabled = currentPage === totalPages;

buttons[0].addEventListener("click", prev)
buttons[buttons.length-1].addEventListener("click", next)

checkbox.addEventListener("change", async () => {
    fetching = checkbox.checked;
    currentPage = 1;

    if (fetching) {
        totalPages = 10;
    } else {
        data = [...template];
        totalPages = Math.ceil(data.length / maxDataPerPage);
        console.log(totalPages);
        
    }

    setButtons();
    changeActiveButton();
    await renderData();
});
searchInput.addEventListener("input", searchPosts);