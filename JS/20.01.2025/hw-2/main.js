/* start of code for task 1 () - works only in browser*/
alert("Welcome");
const userName = prompt("What is your name?");
console.log("Name:", userName);
const isConfirmed = confirm("Are you sure that you name is " + userName + " ?")
if (isConfirmed) {
    console.log("It is " + userName)
}
else
{
    console.warn("It is not " + userName)
}
/* end of code */

let book = 
{
    title: "Objects and arrays",
    author: "IT Step",
    year: 2024,
    genre: "Science"

}
for (const element in book) {
    console.log(element, book[element])
}

let array = new Array("red", "yellow", "green", "orange", "Brown");
console.log("First element: " + array[0] + ". Last element: " + array[array.length - 1])