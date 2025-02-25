/* ex-1 */
const programmersMeeting = 
{
    programmers: [],
    addProgrammer(programmer)
    {
        this.programmers.push(programmer);
    },
    startTask(programmerName, callback)
    {
        for (const person of this.programmers) {
            if(person.name === programmerName)
            {
                person.performTask(callback)
            }
        } 
    }
}

const programmer1 = 
{
    name: "Bob",
    specialization: "front-end developer",
    taskStatus: "none",
    performTask(callback)
    {
        this.taskStatus = "in progress";
        callback.call(this);
    }
}

const programmer2 = 
{
    name: "Mark",
    specialization: "back-end developer",
    taskStatus: "none",
    performTask(callback)
    {
        this.taskStatus = "in progress",
        callback.call(this);
    }
}

function writeCode() {
    console.log(`${this.name} is coding... status: ${this.taskStatus}`);
}
function debugCode() {
    console.log(`${this.name} - ${this.specialization}, is debugging the code... status: ${this.taskStatus}`);
}

programmersMeeting.addProgrammer(programmer1);
programmersMeeting.addProgrammer(programmer2);

// programmersMeeting.startTask("Bob", debugCode);
// programmersMeeting.startTask("Mark", writeCode);

const meetingDiv = document.createElement("div");
meetingDiv.classList.add("meetingDiv");

for (const programmer of programmersMeeting.programmers) {
    const button = document.createElement("button");
    button.textContent = programmer.name;
    button.addEventListener("click", (event) =>
    {
        console.log(programmersMeeting.startTask(event.target.textContent, writeCode))
    })
    meetingDiv.appendChild(button);
}

document.body.appendChild(meetingDiv)

/* end */

/* ex-2 */
const animal1 = 
{
    name: "animal1",
    speciality: "speciality1",
    energy: 170,
    performTrick(callback)
    {
        callback.call(this);
    }
}
const animal2 = 
{
    name: "animal2",
    speciality: "speciality2",
    energy: 200,
    performTrick(callback)
    {
        callback.call(this);
    }
}

function showFocus() {
    if(this.energy >= 20){
        console.log(`${this.name} is doing magic...`);
        this.energy -= 20;
    }
    else console.log(`${this.name} is tired`)
}
function showDance() {
    if(this.energy >= 50){
        console.log(`${this.name} is dancing...`);
        this.energy -= 50;
    }
    else console.log(`${this.name} is tired`)
}
function showStunt() {
    if (this.energy >= 70) {
        console.log(`${this.name} is doing crazy...`);
        this.energy -= 70;
    }
    else console.log(`${this.name} is tired`)
}

const animalFestival = 
{
    animals: [],
    addAnimal(animal)
    {
        this.animals.push(animal)
    },
    performShow(animalName, callback)
    {
        for (const animal of this.animals) {
            if(animal.name === animalName)
            {
                animal.performTrick(callback)
            }
        }
    }
}

animalFestival.addAnimal(animal1);
animalFestival.addAnimal(animal2);


const animalsDiv = document.createElement("div");
animalsDiv.classList.add("animalsDiv");

for (const animal of animalFestival.animals) {
    const button = document.createElement("button");
    button.textContent = animal.name;
    button.addEventListener("click", (event) =>
    {
        const actions = [showDance, showFocus, showStunt];
        const randomNumber = Math.floor(Math.random()*actions.length);
        animalFestival.performShow(event.target.textContent, actions[randomNumber]);
    })
    animalsDiv.appendChild(button);
}

document.body.appendChild(animalsDiv)

/* end */