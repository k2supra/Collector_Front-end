/* start ex-1 */
const door =
{
    isOpen: false,
    open: function() {
        this.isOpen = !this.isOpen;
        button.textContent = (this.isOpen) ? ("Opened", doorhtml.style.backgroundColor = "green") : ("Closed", doorhtml.style.backgroundColor = "red");
    },
    init: function() {
        doorhtml.style.backgroundColor = "red";
        button.textContent = "Closed";
    }
}

let button = document.getElementById("doorButton");
let doorhtml = document.querySelector(".door");

door.init();

button.addEventListener("click", () => 
{
    door.open();
})
/* end */

/* start ex-2 */
const actor = 
{
    role: 'Gamlet',
    changeRole: function(newRole) {
        this.role = newRole;
    },
    init: function() {
        h3.textContent = this.role;
    }
}
const h3 = document.querySelector("h3");

actor.init();

document.getElementById("changeRoleButton").addEventListener("click", function() {
    const text = document.querySelector("input[type='text']").value;
    actor.changeRole(text);
    actor.init();
});
/* end */

/* start ex-3 */
const pets = ["Cat", "Dog"];

const petManager =
{
    addPet: function(newPet) {
        if(newPet.length != 0)
        {
            pets.push(newPet);
        }
        this.updateList();
    },
    updateList: function() {
        const list = document.getElementById("petsList");
        list.innerHTML = "";
        pets.forEach(pet => {
            const li = document.createElement("li");
            li.textContent = pet;
            list.appendChild(li);
        });
    }
}

document.getElementById("addPetButton").addEventListener("click", function()
{
    const data = document.getElementById("petName").value;
    petManager.addPet(data);
    document.getElementById("petName").value = ""
})
/* end */