function createTrackbar() {
    document.body.insertAdjacentHTML("afterbegin", 
        `
            <input type="range">
        `
    )
}
createTrackbar()

const slidesWrapper = document.querySelector(".slides-wrapper");
const images = ["GTR.jpg", "JDM1.jpg", "GTR.jpg", "JDM1.jpg"];

function createSlides() {
    images.forEach(element => {
        slidesWrapper.insertAdjacentHTML("beforeend", `
            <div class="slide"><img src="images/${element.toString()}" alt="car" /></div>
        `)
    });
}
createSlides();

let sliderIndex = 0;
const totalSlides = images.length;
const prevArrow = document.querySelector(".previous");
const nextArrow = document.querySelector(".next");

function updateArrows() {
    prevArrow.classList.toggle("arrow-disabled", sliderIndex === 0);
    nextArrow.classList.toggle("arrow-disabled", sliderIndex === totalSlides - 1);
}

function showSlide(index) {
    if (index < 0) {
    sliderIndex = 0;
    } else if (index >= totalSlides) {
    sliderIndex = totalSlides - 1;
    } else {
    sliderIndex = index;
    }

    const offset = -sliderIndex * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;
    updateArrows()
}

function prevSlide() {
    showSlide(sliderIndex - 1);
}

function nextSlide() {
    showSlide(sliderIndex + 1);
}

showSlide(0);


const accordions = document.querySelectorAll(".block");

accordions.forEach(element => {
    element.addEventListener("click", () => {
        const currentInfo = element.querySelector(".info");
        const isActive = currentInfo.classList.contains("active");

        accordions.forEach(el => el.querySelector(".info").classList.remove("active"));

        if (!isActive) {
            currentInfo.classList.add("active");
        }
    });
});


const newsContainer = document.getElementById("news-container");
const loading = document.getElementById("loading");

const newsData = [
    "New 1: Incredible news:/ this is a test message",
    "New 2: Incredible news:/ this is a test message",
    "New 3: Incredible news:/ this is a test message",
    "New 4: Incredible news:/ this is a test message",
    "New 5: Incredible news:/ this is a test message",
    "New 6: Incredible news:/ this is a test message",
    "New 7: Incredible news:/ this is a test message",
    "New 8: Incredible news:/ this is a test message",
    "New 9: Incredible news:/ this is a test message",
    "New 10: Incredible news:/ this is a test message"
];

let newsIndex = 0;
const batchSize = 3;

let isLoading = false;

function loadNews() {
    if (isLoading) return;

    isLoading = true;
    loading.style.display = "block";

    setTimeout(() => {
        for (let i = 0; i < batchSize && newsIndex < newsData.length; i++) {
            const newsItem = document.createElement("div");
            newsItem.className = "news";
            newsItem.textContent = newsData[newsIndex];
            newsContainer.appendChild(newsItem);
            newsIndex++;
        }

        loading.style.display = "none";
        isLoading = false;
    }, 500);
}

loadNews();


window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 250) {
    if (newsIndex < newsData.length) {
        loadNews();
    }
    }
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const table = document.querySelector("table");
const title = document.querySelector("h2");

function createCalendar() {
    const monthInput = document.getElementById("month").value;
    const yearInput = document.getElementById("year").value;
    
    const firstDate = new Date(!yearInput ? new Date().getFullYear() : yearInput, !monthInput ? new Date().getMonth() : monthInput -1);
    const lastDate = new Date(!yearInput ? new Date().getFullYear() : yearInput, !monthInput ? new Date().getMonth()+1 : monthInput, 0);
    
    let startIndex = days.findIndex(el => el == firstDate.toString().split(" ")[0].trim());

    const rows = (startIndex >= 4 ? 6 : 5);
    title.textContent = `${firstDate.getFullYear()}, ${months[firstDate.getMonth()]}`;

    table.innerHTML = "";
    table.insertAdjacentHTML("beforeend", `
        <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
        </tr>    
    `)
    
    for (let index = 0; index < rows; index++) {
        const tr = document.createElement("tr");
        for (let index = 0; index < 7; index++) {
            const td = document.createElement("td");
            tr.appendChild(td);
        }
        table.children[0].appendChild(tr);
    }

    let currentRow = 1;
    let currentCol = startIndex;
    
    for (let index = 1; index <= lastDate.getDate(); index++) {
        table.children[0].children[currentRow].children[currentCol].textContent = index;
        currentCol++;
        
        if (currentCol == 7) {
            currentRow++;
            currentCol = 0;
        }
    }
}
