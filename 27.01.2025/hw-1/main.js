/* start ex-1 */
let products = ["bread", "milk", "apples", "chocolate", "banana", "chocolate"];
while (products.length != 0) {
    if (products[0] == "chocolate") {
        console.log(`Life is beautiful`);
        products.shift();
        continue;
    }
    console.log(`Adding ${products[0]} to the basket ...`);
    products.shift();
}
console.log("All products in the basket! Now I can go to the checkout.")
/* end */

/* start ex-2 */
multiplyNumbers(17)

function multiplyNumbers(num) {
    if (num < 1 || num > 100) {
        console.log("Enter a normal number");
    }
    else
    {
        for (let i = 1; i <= 10; i++) {
            console.log(`${num} * ${i} = ${num * i}`)
        }
    }
}
/* end */