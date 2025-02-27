let potions = [
    { name: "Potion of power", effect: "adds power", price: 100, quantity: 7},
    { name: "Potion of invisibility", effect: "adds invisibility", price: 40, quantity: 6},
    { name: "Potion of speed", effect: "increases speed", price: 30, quantity: 12},
    { name: "Potion of health", effect: "increases health", price: 120, quantity: 3},
    { name: "Potion of mana", effect: "adds mana", price: 50, quantity: 0}
];
potions.splice(1, 1);
potions.unshift({name: "Potion of knowledge", effect: "adds knowledge", price: 90, quantity: 2});

let extraPotions = [
    { name: "Potion of luck", effect: "adds luck", price: 120, quantity: 6 },
    { name: "Potion of courage", effect: "increases courage", price: 75, quantity: 7 }
];

potions = potions.concat(extraPotions);

potions.forEach(element => {
    if (element.name === "Potion of health") {
        element.quantity -= 2
    }
});

const stringPotions = potions.map(potion => 
{
    return `${potion.name}: ${potion.effect}(${potion.price}), quantity: ${potion.quantity} `
}
)

const potionsName = potions.map(potion => potion.name).join(", ")

potions.sort((p1, p2) => p1.price - p2.price);

console.log((potions.find(potion => potion.name == "Potion of mana")) ? true : false);

const more60 = potions.filter(potion => potion.price >= 60);

const filtered = potions.filter(potion => potion.price >= 70).sort((p1, p2) => p2.price - p1.price).slice(0, 3); 