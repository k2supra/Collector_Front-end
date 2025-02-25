let p = document.querySelector(".changing-text").querySelector("p");
p.innerText = "TEXT CHANGED"


function addItem()
{
    event.preventDefault();
    const input = document.querySelector(".dynamic-list form input");
    const data = input?.value;
    if(!data)
    {
        console.log("Wrong input");
        return;
    }
    const li = document.createElement("li");
    li.textContent = data;
    
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.onclick = function()
    {
        li.remove();
    }

    li.appendChild(button);

    document.getElementById("list").appendChild(li);
    input.value = "";
}


let number = true;
function changeSrc()
{
    const img = document.getElementById("changable");
    number ? img.setAttribute("src", "images/logo.png") : img.setAttribute("src", "images/graph_laptop.png");
    number = !number;
}