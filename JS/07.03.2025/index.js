const alienMessages = new Set([
    '🌌 Привіт, земляни! Ви нас чуєте?',
    '👾 Ми дружні! Хочемо дізнатися про ваш Wi-Fi!',
    '🚀 Летимо до вас на переговори!',
    '🌍 Чому ви називаєте себе Homo sapiens? 🤔',
    '🛸 Ми залишили слід у ваших полях... Вибачте! 🌾',
    '💡 Передайте нам вашу найкращу технологію!',
    '🔊 Земляни, ваші меми занадто складні! 😵',
    "🎶 Ми хочемо дізнатися про вашу музику! Що таке 'хардбас'?",
    '🔊 Земляни, ваші меми занадто складні! 😵',
    '🔊 Земляни, ваші меми занадто складні! 😵',
  ]);

const aliens = new Map();
let index = 0;
let delay = 1000;

function createAlien(name, message = null) {
    if (aliens.has(name)) {
        console.log(`Alien ${name} exists`);
        return;
    }
    if (message) {
        alienMessages.add(message)
    }
    else
    {
        if (index == alienMessages.size) {
            index = 0;
        }
        message = Array.from(alienMessages)[index];
        index++;
    }
    aliens.set(name, message);
    console.log(`Alien ${name} was created: ${message}`);
    setTimeout(() => updateDOM(name, message), delay);
    delay += 1000;
}

function updateDOM(name, message) {
    const div = document.getElementById("messages");
    const p = document.createElement("p");
    p.textContent = `${name} -> ${message}`;
    div.appendChild(p);
}

createAlien("Bob");
createAlien("Bob");
createAlien("Martin", "Hello fellas");
createAlien("a");
createAlien("s");
createAlien("d");
createAlien("f");
createAlien("g");
createAlien("h");
createAlien("q");
createAlien("w");
createAlien("e");
createAlien("r");


const aliensArray = ["Bob", "Alex", "Bob", "Frank", "Jacob", "Luis", "Porto", "Kolga"]

let counter = 0;
let limit = 5;
const interval = setInterval(()=>
{
    if (counter >= limit) {
        clearInterval(interval)
        return;
    }
    if (aliens.has(aliensArray[counter])) {
        limit++;
    }
    createAlien(aliensArray[counter]);
    counter++;
}, 3000)