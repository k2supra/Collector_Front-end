const products = [
    { name: "Hoodie Oversize", price: 1200, img: "hoodie.jpg" },
    { name: "T-Shirt base", price: 600, img: "tshirt.jpg" },
    { name: "Suit Streetwear", price: 2000, img: "suit.jpg" },
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
    getModalWindow().style.display="none";
}
function showModalWindow() {
    getModalWindow().style.display="flex";
}


function getCartList() {
    return document.querySelector("#cart-content .list ul");
}


/* get card */
( () => {
    let buttons = document.querySelectorAll(".add-to-cart");
    for (const item of buttons) {
        item.addEventListener('click', function (event) {
            const getName = event.target.parentNode.parentNode.children[0].textContent;
            const getPrice = truncateString(event.target.parentNode.parentNode.children[1].textContent);
            let getImage = `${event.target.parentNode.parentNode.parentNode.children[0].getAttribute("src")}`.split("/")[1];

            createCartCard(products.find((item) => item.name == getName && item.price == getPrice && item.img == getImage));
        })
    }
})();

/* delete cart item */
function deleteItem(item)
{
    let productItem = item.parentNode;
    productItem.remove();
};

function createCartCard(item)
{
    let li = document.createElement("li");

    const cardItem = document.createElement("div");
    cardItem.classList.add("item");

    li.appendChild(cardItem);

    const img = document.createElement("img");
    img.setAttribute("src", `images/${item.img}`);

    cardItem.appendChild(img);

    const description = document.createElement("div");
    description.classList.add("description");
    
    const h4 = document.createElement("h4");
    h4.textContent = item.name;

    description.appendChild(h4);

    const price = document.createElement("span");
    price.textContent = item.price;

    description.appendChild(price);

    cardItem.appendChild(description);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "-"
    deleteButton.setAttribute("onclick", "deleteItem(this)");

    li.appendChild(deleteButton);

    getCartList().appendChild(li);
}

function truncateString(string) {
    return string.substring(0, string.length - 1);
}

function isItem(getName, getPrice, getImage) {
    return this.name == getName && item.price == getPrice && item.img == getImage;
}