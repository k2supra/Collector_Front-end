/* start ex - 1 */
let age = +prompt("Enter your age");

switch (true) {
    case age <= 10:
        console.log("You`re a baby");
        break;
    case age > 10 && age <= 18:
        console.log("You`re a teenager");
        break;
    case age > 18 && age <= 60:
        console.log("You`re an adult");
        break;
    case age > 60:
        console.log("You`re a pensioner");
        break;
    default:
        console.warn("Incorrect");
        break;
}
/* end */

/* start ex - 2 */
let number = +prompt("Enter a number from 0 to 9")
switch (number) {
    case 0:
        alert(")")
        break;
    case 1:
        alert("!")
        break;    
    case 2:
        alert("@")
        break;
    case 3:
        alert("#")
        break;
    case 4:
        alert("$")
        break;
    case 5:
        alert("%")
        break;
    case 6:
        alert("^")
        break;    
    case 7:
        alert("&")
        break;
    case 8:
        alert("*")
        break;
    case 9:
        alert("(")
        break;
    default:
        alert("WRONG NUMBER")
        break;
}
/* end */

/* start ex - 3 */
const number_check = prompt("Enter a three-digit number");

if(!+number_check || number_check.length != 3)
{
    alert("ERROR");
}
else
{
    let set_number = new Set(number_check);
    (set_number.size == number_check.length) ? console.log("Unique digits") : console.log("Not all digits are unique")
}
/* end */

/* start ex - 4 */
const year = +prompt("Enter a year:");

if (!isNaN(year) && year > 0) {
    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 !== 0)) {
        console.log(`${year} is a leap year.`);
    } else {
        console.log(`${year} isn't a leap year.`);
    }
} else {
    console.warn("Enter a real year");
}
/* end */

/* start ex - 5 */
let palindrome_number = prompt("Enter a number (palindrom)")
if (+palindrome_number && palindrome_number.length == 5) {
    let reversed = palindrome_number.split('').reverse().join('');
    if (palindrome_number == reversed) {
        alert(`${palindrome_number} is palindrome`);
    }
    else
    {
        alert(`${palindrome_number} is not palindrome`);
    }
}
else
{
    alert("ERROR")
}

/* end */