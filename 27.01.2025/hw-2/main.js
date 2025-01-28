// /* start ex-1 */
// const recipe = ["Take eggs", "Break them into the bowl", "Add salt and pepper", "Beat well", "Heat the pan", "Pour the eggs into the pan", "Cook until done"];
// for (const item in recipe) {
//     if (recipe[2] == recipe[item]) {
//         let choice = confirm("Want to add some salt?");
//         if (!choice) {
//             continue;
//         }
//     }
//     if (recipe[4] == recipe[item]) {
//         let choice = confirm("Are you hungry?");
//         if (choice) {
//             console.log("Well, then eat raw eggs 😅");
//             break;
//         }
//     }
//     console.log(recipe[item]);
// }
// /* end */

const { join } = require("path");

/* start ex-2 */
console.log(greetUser("Bob", 10));

function greetUser(name, age)
{
    switch(true)
    {
        case age > 0 && age < 18:
        {
            return `Hello, ${name}. You are young & have a lot of free time to learn JS`;
        }
        case age == 0:
        {
            return `Wow, ${name}. You maybe can\`t exist`;
        }
        case age >= 18 && age <= 30:
        {
            return `Hi, ${name}. It\`s time to learn JS and build your career`;
        }
        case age > 30:
        {
            return `Hi, ${name}. It\`s never too late to start a new hobby - why not JS?`;
        }
        default: break;
    }
}
/* end */

/* start ex-3 */
partyPlanner("Bob", "Ann")

function partyPlanner() {
    if (arguments.length == 0) {
        console.log("Party is canceled :(");
    }
    else
    {
        let guests = Array.from(arguments);
        console.log(`Guests: ${guests.join(", ")}`)
        console.log(`Amount: ${arguments.length}`);
    }
}
/* end */