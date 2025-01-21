var personName = "Steve";
let personEmail = "stevebobs@gmail.com";
const personAge = 30;

console.log('person name', personName);
console.log('person email', personEmail);
console.log('person age', personAge);

try {
    personName = "Travis";
    personEmail = "bobthebuilder@gmail.com";
    personAge = 45;/* Error - impossible to change const value*/
} catch (error) {
    console.error("ERROR", error.message);
}


console.log('person name', personName);
console.log('person email', personEmail);
console.log('person age', personAge);