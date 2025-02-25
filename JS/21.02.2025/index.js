/* ex - 1 */
const character1 = 
{
    name: "Bob",
    age: 50,
    profession: "developer",
    mysterySolved: false,
}
const character2 = 
{
    name: "Martin",
    age: 20,
    profession: "developer",
    mysterySolved: false,
}
const character3 = 
{
    name: "Alice", 
    age: 18,
    profession: "developer",
    mysterySolved: false,
    isCar: 0,
}

const characters = [character1, character2, character3];

function showNameAndAge() {
    characters.forEach(character => {
        console.log(`Name->${character.name}, Age->${character.age}`)
    });
}

function deleteProperty(property) {
    characters.forEach(character => {
        if (property in character) {
            delete character[property];
            console.log(`Deleted '${property}' from ${character.name}`)
        }
        else console.log(`There is no '${property}' to delete from ${character.name}`)
    });
}

function checkProperty(property) {
    characters.forEach(character => {
        if (property in character) {
            console.log(`The property '${property}' is in the ${character.name}`)
        }
        else console.log(`There is no '${property}' in the ${character.name}`)
    });
}

function showPropertiesAndValues(object) {
    for (const item in object) {
        console.log(`${item}->${object[item]}`)
    }
}

function showProperties(object) {
    for (const item in object) {
        console.log(`${item}`)
    }
}

showNameAndAge()
deleteProperty("mysterySolved")
checkProperty("musterySolved")

const newObject = Object.create(character1);
newObject.isPlane = false;

showPropertiesAndValues(newObject);

/* end */

/* ex - 2 */
const people = ["John", "Sarah", "Michael", "Anna"];

function showElementByIndex() {
    for (let index = 0; index < arguments.length; index++) {
        console.log(`Array[${arguments[index]}] -> ${people[arguments[index]]}`)
    }
}
function throughArray() {
    for (const item of people) {
        console.log(`${item} is taking part in investigation`)
    }
}

showElementByIndex(1, 3)
throughArray()

const person1 = 
{
    name: "Mark",
    surname: "Robbin",
    age: 15,
    showExactInfo(param) {
        console.log(`The ${param} is ${this[param]}`)
    }
}

person1.showExactInfo("age")

const person2 = Object.create(person1);
person2.hobby = "walking";

showProperties(person2);
/* end */