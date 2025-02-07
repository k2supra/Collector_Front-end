hideModalWindow();

const products = [
    { name: "Hoodie Oversize", price: 1200, img: "hoodie.jpg" },
    { name: "T-Shirt base", price: 600, img: "tshirt.jpg" },
    { name: "Suit Streetwear", price: 2000, img: "suit.jpg" },
];

for (const element of products) {
    createCard(element.name, element.price, element.img);
}

function createCard(name, price, image) {
    const showcase = document.querySelector("div.showcase");

    const card = document.createElement("div");
    card.classList.add("card");

    showcase.appendChild(card);

    const img = document.createElement("img");
    img.setAttribute("src", `images/${image}`);

    card.appendChild(img);

    const description = document.createElement("div");
    description.classList.add("description");

    const h4 = document.createElement("h4");
    h4.textContent = name;

    const span = document.createElement("span");
    span.textContent = price;

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.textContent = "+"
    // addToCartButton.setAttribute("onclick", "addToCart()");

    span.appendChild(addToCartButton);

    description.appendChild(h4);
    description.appendChild(span);

    card.appendChild(description);
}

document.addEventListener("input", function()
{
    // console.log(filterProducts());
    clearItems();
    for (const item of filterProducts()) {
        createCard(item.name, item.price, item.img);
    }
})

function getPrompt() {
    const prompt = `${document.querySelector("div.settings input[name='filter']").value}`;
    return prompt.toLowerCase();
}

function filterProducts() {
    return products.filter(checkProduct);
}

function checkProduct(element) {
    return element.name.toLowerCase().includes(getPrompt());
}

function clearItems()
{
    let cards = document.querySelectorAll("div.showcase div.card");
    
    for (const item of cards) {
        item.remove();
    }
}

function getModalWindow() {
    return document.getElementById("cart");
}
function hideModalWindow() {
    getModalWindow().style.visibility="hidden";
}
function showModalWindow() {
    getModalWindow().style.visibility="visible";
}

function getCart() {
    return document.getElementById("cart-content");
}

addToCart();
function addToCart() {
    getCard();
}

function getCard() {
    let buttons = document.querySelectorAll(".add-to-cart");
    for (const item of buttons) {
        item.addEventListener('click', function (event) {
            // console.log(event.target.parentNode.parentNode.parentNode)
            const getName = event.target.parentNode.parentNode.children[0].textContent;
            const getPrice = truncateString(event.target.parentNode.parentNode.children[1].textContent);
            let getImage = `${event.target.parentNode.parentNode.parentNode.children[0].getAttribute("src")}`.split("/")[1];
            
            console.log("PROCE::::::::::::", getName, getPrice, getImage);
            console.log("FIND::::", products.find((item) => item.name == getName && item.price == getPrice && item.img == getImage));
            // return products.find((item) => item.name == getName && item.price == getPrice && item.img == getImage);
        })
    }
}
function truncateString(string) {
    return string.substring(0, string.length - 1);
}

function isItem(getName, getPrice, getImage) {
    return this.name == getName && item.price == getPrice && item.img == getImage;
}