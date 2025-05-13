const form = document.querySelector("form");
const inputTitle = form.children[0];
const inputDescription = form.children[1];
const button = form.children[2];
const postsDiv = document.querySelector(".posts");
const postsOnLoad = document.querySelector(".postsOnLoad");
const modalWindow = document.querySelector(".modal-window");


let obj = {};

function displayPost()
{
    postsDiv.insertAdjacentHTML("beforeend", 
        `
            <div class="post">${obj.title}:${obj.description}->${obj.id}</div>
        `
    )
}

async function createPost() {
    let id = 0;
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(
            {
                title: inputTitle.value,
                description: inputDescription.value
            }
        ),
        headers:
        {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(r => 
    {
        for (const item in r) {
            obj[item] = r[item];
        } 
    }
    )
    displayPost(id);
}

function load10Posts() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    try {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        .then(r => r.json())
        .then(r => {r.forEach(element => {
            postsOnLoad.insertAdjacentHTML("beforeend", 
                `<div class="post" id="${element.id}"><span id="title">${element.title}</span>-><span id="description">${element.body}</span><button onclick="editPost()">Edit</button><button onclick="deletePost()">Delete</button></div><br>`
            )
        });
        loader.style.display = "none";
    }
    )
        .catch(er => alert("ERROR", er))
    } catch (error) {
        console.log("ERROR", error);
    }
}

function editPost()
{
    modalWindow.style.display = "flex";
    const [input1, input2, button] = modalWindow.querySelector("form").children;
    input1.value = event.target.closest(".post").querySelector("#title").innerText;
    input2.value = event.target.closest(".post").querySelector("#description").innerText;
    
    const id = event.target.closest(".post").id;
    
    button.onclick = async (e)=>
    {
        e.preventDefault();
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                method:"PUT",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                {
                    title: input1.value,
                    description: input2.value,
                    id
                })
            }
        )
        .then(resp => 
        {
            if (resp.ok) {
                alert("SUCCESS")
            }
        })
        .catch(er => alert("ERROR", er))
    } 
}

async function deletePost()
{
    const id = event.target.closest(".post").id;
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                method:"DELETE",
            }
        )
        .then(resp => 
        {
            if (resp.ok) {
                alert("SUCCESS")
            }
        })
    } catch (error) {
        console.log("ERROR", error);        
    }
}

function closeMW() {
    modalWindow.style.display = "none";
}

document.addEventListener("DOMContentLoaded", load10Posts);
button.addEventListener("click", (event)=>
{
    event.preventDefault();
    createPost()
})
