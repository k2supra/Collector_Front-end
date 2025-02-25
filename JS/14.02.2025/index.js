/* ex-1 */
const animal = 
{
    name: "", 
    type: "", 
    energy: 0, 
    action(callback)
    {
        console.log(callback(this));
    }
}

function eat(animal) {
    animal.energy += 10;
    return `${animal.name} ate. Energy: ${animal.energy}`;
}
function sleep(animal) {
    animal.energy += 20;
    return `${animal.name} fell asleep. Energy: ${animal.energy}`;
}
function walk(animal) {
    if (animal.energy >= 10) {
        animal.energy -= 10;
        return `${animal.name} walked around. Energy: ${animal.energy}`;
    }
   else return `${animal.name} too tired. Energy: ${animal.energy}`;
}

const zooManager = 
{
    animals: [],
    addAnimal(animal)
    {
        this.animals.push(animal);
    },
    showAnimals()
    {
        for (const item of this.animals) {
            console.log(item);
        }
    },
    performAction(animalName, actionCallBack)
    {
        const animal = this.animals.find(a => a.name.toLowerCase() === animalName.toLowerCase());
        if (animal) {
            animal.action(actionCallBack);
        }
        else console.log(`There is no animal like this -> ${animalName}`)
    }
}

const lion = Object.create(animal)
lion.name = "Lion";
lion.type = "Predator";
lion.energy = 100;


const turtle = Object.create(animal)
turtle.name = "Turtle";
turtle.type = "Reptiles";
turtle.energy = 20;

const monkey = Object.create(animal)
monkey.name = "Monkey";
monkey.type = "Primate";
monkey.energy = 70;


zooManager.addAnimal(lion);
zooManager.addAnimal(turtle);
zooManager.addAnimal(monkey);
zooManager.showAnimals()

function createButtonsHTML() {
    const block = document.createElement("div");
    document.body.appendChild(block)
    for (const animal of zooManager.animals) {
        const button = document.createElement("button");
        button.textContent = animal.name;
        button.addEventListener("click", (event) =>
        {
            const randomNumber = Math.floor(Math.random()*3)
            const actions = [eat, sleep, walk]
            zooManager.performAction(event.target.textContent, actions[randomNumber])
        })
        block.appendChild(button)
    }
}
createButtonsHTML();
/* end */

/* ex-2 */
class Person {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
}

class Chef extends Person {
    constructor(name) {
        super(name, "Chef");
    }
    cook(order, callback)
    {
        console.log(`The ${this.role} ${this.name} is cooking ${order}`);
        callback(order);
    }
}

class Waiter extends Person {
    constructor(name) {
        super(name, "Waiter");
    }
    takeOrder(order)
    {
        giveOrderToRestaurant(order);
    }
}


const restaurant = 
{
    menu: [],
    staff: [],
    addStaff(person)
    {
        this.staff.push(person);
    },
    makeOrder(order, callback)
    {
        console.log(`Your order is processing...`);
        callback(order);
    }
}

function addToMenu(order) {
    restaurant1.menu.push(order);
    updateList(restaurant1.menu[restaurant1.menu.length - 1]);
}
function giveOrderToChef(order) {
    chef1.cook(order, addToMenu);
}
function giveOrderToRestaurant(order) {
    restaurant1.makeOrder(order, giveOrderToChef)
}


function createFormForReastaurant() 
{
    const div = document.createElement("div");
    document.body.appendChild(div);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Order";

    const button = document.createElement("button");
    button.textContent = "Make Order!";
    button.addEventListener("click", () =>
    {
        const data = document.querySelector("input").value;
        if (data.length == 0) {
            alert("Enter an order name");
        }
        else waiter1.takeOrder(data);
    })

    const list = document.createElement("ul");

    div.appendChild(input);
    div.appendChild(button);
    div.appendChild(list);
}
createFormForReastaurant();

function updateList(order) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");

    li.textContent = order;

    ul.appendChild(li);
}


const waiter1 = new Waiter("Carl");
const chef1 = new Chef("Martin");

const restaurant1 = Object.create(restaurant);
restaurant1.menu = [];
restaurant1.staff = [],
restaurant1.addStaff = function(person)
{
    this.staff.push(person);
};
restaurant1.makeOrder = function(order, callback)
{
    console.log(`Your order is processing...`);
    callback(order);
}

restaurant1.addStaff(waiter1);
restaurant1.addStaff(chef1);

waiter1.takeOrder("Pizza");
waiter1.takeOrder("Pizza2");
waiter1.takeOrder("Pizza3");
/* end */