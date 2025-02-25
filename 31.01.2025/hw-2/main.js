function changeColor()
{
    document.querySelector(".changing-color").addEventListener("click", function(event) {
        if (event.target.tagName === "P") {
            event.target.style.color = "red";
        }
    });
    console.log();
}

document.addEventListener("DOMContentLoaded", function(event)
{
    hideWindow();
})
function showWindow()
{
    document.getElementById("modal-window").style.visibility = "visible";
}
function hideWindow()
{
    document.getElementById("modal-window").style.visibility = "hidden";
}