const { console } = require("inspector");
const { start } = require("repl");

/* ex-1 */
const pizzaShop = 
{
    chef: "Marko",
    takeOrder(pizzaName, callback)
    {
        console.log(`Pizzayolo ${this.chef}, took order of pizza ${pizzaName}`);
        callback.call(this, pizzaName); 
    }
}
function orderReady(pizzaName) {
    console.log(`Pizza ${pizzaName} is ready!`);
}

pizzaShop.takeOrder("Classic", orderReady);
/* end */


/* ex-2 */
const theatre = 
{
    actors: ["Bob", "Martin", "Alice"],
    assignRole(name, callback)
    {
        if (this.actors.includes(name)) {
            callback.call(this, name);
        }
        else
        {
            console.log("There is no actor with this name");
        }
    }
}
function setRole(name) {
    console.log(`${name} plays the role of Gamlet`);
}

theatre.assignRole("Bob", setRole)
/* end */


/* ex-3 */
const taxiDriver = 
{
    name: "Bob",
    pickUpPassenger(passengerName, callback)
    {
        console.log(`${this.name} picked up a passenger ${passengerName}. ${callback.call(this, startTravel())}`)
    }
}
function startTravel() {
    return `Travel started!`
}

taxiDriver.pickUpPassenger("Martin", startTravel)
/* end */


/* ex-4 */
const concert = 
{
    artist: "Boris",
    startShow(name, callback)
    {
        callback.call(this, name);
    }
}

function singSong(name) {
    console.log(`${this.artist} is singing the song: ${name}`);
}
concert.startShow("ALALALALALAALAL", singSong)
/* end */