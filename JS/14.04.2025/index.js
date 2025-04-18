const formInput = document.querySelector(".input-form");
const input = formInput.getElementsByTagName("input")[0];

input.addEventListener("input", ()=>
{
    if (/\d/g.test(input.value)) {
        input.value = input.value.slice(0, input.value.length - 1)
    }
})

const modalWindowButton = document.querySelector(".modal-window-button");
const modalWindow = document.querySelector(".modal-window");
const openButton = modalWindowButton.querySelector("#openmw");
const closeButton = modalWindowButton.querySelector("#closemw");

openButton.addEventListener("click", ()=>
{
    modalWindow.style.display = "flex";
})
closeButton.addEventListener("click", ()=>
{
    modalWindow.style.display = "none";
})

const football = document.querySelector(".football");
const field = football.querySelector(".football-field");
const ball = field.querySelector(".ball");

field.addEventListener("click", (event)=>
{
    const fieldSize = field.getBoundingClientRect();
    const ballSize = 100;

    let clickX = event.clientX - fieldSize.left;
    let clickY = event.clientY - fieldSize.top;

    let ballX = clickX - ballSize / 2;
    let ballY = clickY - ballSize / 2;

    const maxX = field.clientWidth - ballSize;
    const maxY = field.clientHeight - ballSize;

    if (ballX < 0) ballX = 0;
    if (ballY < 0) ballY = 0;
    if (ballX > maxX) ballX = maxX;
    if (ballY > maxY) ballY = maxY;

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
})

const traficLight = document.querySelector(".trafic-light");
const lights = traficLight.querySelectorAll(".light");
const button = traficLight.getElementsByTagName("button")[0];
let lightIndex = 0;
let prevIndex = 2;

button.addEventListener("click", ()=>
{
    if (lightIndex == 3) {
        lightIndex = 0;
    }
    if (prevIndex == 3) {
        prevIndex = 0;
    }
    lights[prevIndex].style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    lights[lightIndex].style.backgroundColor = lights[lightIndex].id;
    lightIndex++;
    prevIndex++;
})

const books = document.querySelector(".books");
const lis = books.querySelectorAll("li");

lis.forEach(el =>
{
    el.addEventListener("click", ()=>
        {
            lis.forEach(element => 
            {
                if (el === element) {
                    el.style.backgroundColor = "orange";
                }
                else
                {
                    element.style.backgroundColor = "transparent";
                }
            }
            )
            
        }
    )
}
)

const containers = document.querySelectorAll(".tooltip-container");

containers.forEach(container => {
    const button = container.querySelector("button");
    const tooltip = container.querySelector(".tooltip");

    button.addEventListener("mouseenter", () => {
        tooltip.classList.add("show");

        const buttonRect = button.getBoundingClientRect();
        const tooltipContainerRect = container.getBoundingClientRect();
        console.log(tooltip.getBoundingClientRect().height);
        

        const fitsTop = tooltipContainerRect.height - tooltip.getBoundingClientRect().height - 5 > 0;

        if (fitsTop) {
            tooltip.style.top = button.offsetHeight - 5 + "px";
            console.log("+++");
            
        } else {
            tooltip.style.top = button.offsetHeight + 5 + "px";
        }

        tooltip.style.left = (tooltipContainerRect.width - tooltip.getBoundingClientRect().width) / 2 + "px";
    });

    button.addEventListener("mouseleave", () => {
        tooltip.classList.remove("show");
    });
});
