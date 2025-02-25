/* start ex - 1 */
let price = +prompt("Enter price")
switch (true) {
    case price >= 200 && price < 300:
        console.log(price - (price * 0.03));
        break;
    case price >= 300 && price < 500:
        console.log(price - (price * 0.05));
        break;
    case price >= 500:
        console.log(price - (price * 0.07));
        break;
    default:
        break;
}
/* end */

/* start ex - 2 */
const questions = 
[
    {question: "2+2 \nA: 1 \nB: 2 \nC: 4 \nD: 8 ", answer: "C"},
    {question: "1+0 \nA: 1 \nB: 2 \nC: 4 \nD: 8 ", answer: "A"},
    {question: "8+2 \nA: 10 \nB: 12 \nC: 44 \nD: 38 ", answer: "A"},
    {question: "7+2 \nA: 8 \nB: 9 \nC: 6 \nD: 18 ", answer: "B"},
    {question: "0+12 \nA: 1 \nB: 2 \nC: 44 \nD: 12 ", answer: "D"}
]

let score = 0;

questions.forEach(q => {
    let answer = prompt(q.question);
    if (answer.toUpperCase() === q.answer) {
        score++;
    }
    else
    {
        alert("Wrong answer");
    }
});
alert(`Your score is ${score}`)
/* end */

/* start ex - 3 */
// Житель Кодовця: Початкові дані
let hungerLevel = 10; // Рівень голоду (від 0 до 10)
let wallet = 100; // Гроші в кишені (в одиницях валюти "кодак")
let pizzaAvailable = null; // Чи є піца в піцерії
let mood = "😐"; // Настрій на початок дня

// 1. Чи ти реально голодний? (Оператор !==)
if (hungerLevel !== 0) {
    console.log("🍕 Я дуже хочу піцу! Голодування — це не про мене!");
} else {
    console.log("👌 Я ситий і готовий до кодування!");
}

// 2. Зайшов у піцерію, але піци немає (Оператор ??)
let availablePizza = pizzaAvailable ?? "На жаль, сьогодні без піци... 😢";
console.log(`🔍 Результат пошуку піци: ${availablePizza}`);

// 3. Грошей у тебе вистачає, але чи хочеш ти витрачати? (Оператор &&)
let buyPizza = wallet >= 50 && hungerLevel > 5;
if (buyPizza) {
    console.log("💸 Трата виправдана, піца того варта!");
    wallet -= 50; // Витрати на піцу
    hungerLevel -= 7; // Піца зменшує голод
    mood = "😋"; // Піца підняла настрій
} else {
    console.log("🤑 Ні-ні, гроші краще зберегти!");
}

// 4. А раптом є щось дешевше? (Оператор ||)
let snackPrice = wallet < 50 || "Закуска не по кишені...";
console.log(`🥪 Альтернатива піці: ${ snackPrice === true ? 'Взяв дешеву закуску' : snackPrice}`);

// 5. Друзі кличуть на прогулянку, але чи підеш? (Оператор +=)
let energyLevel = 8; // Енергія на початку дня
energyLevel -= 5; // Витратив енергію на пошук піци
console.log(`🚶‍♂️ Енергія після пошуків: ${ energyLevel }`);
if (energyLevel > 3) {
    console.log("💪 Йду гуляти! Енергії вистачить!");
    energyLevel += 3; // Підзарядився на прогулянці
} else {
    console.log("😴 Лежу вдома, сил немає...");
}

// 6. Роздуми: чи був цей день успішним? (Оператор || і ?? разом)
let daySummary = mood === "😋" || "День був звичайним";
let finalMood = daySummary ?? "Взагалі все було сумно...";
console.log(`📅 Підсумок дня: ${ finalMood }`);

// 7. Бонус: знайдена піца! (Оператор *=)
if (pizzaAvailable) {
    hungerLevel *= 0.5; // Зменшується голод вдвічі
    console.log(`🍕 Голод тепер на рівні: ${ hungerLevel }`);
} else {
    console.log("❌ Піцу так і не знайшов...");
}

// Завершення дня
console.log("🌙 Лягаю спати. Мій гаманець: " + wallet + ", настрій: " + mood);

/* end */