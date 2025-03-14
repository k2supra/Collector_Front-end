const foresights = 
[
    "🌿 A great opportunity is coming your way soon!",
    "✨ You will meet someone who will change your life for the better.",
    "🌿 Financial success is on the horizon – stay patient and work hard!",
    "❤️ Love and happiness will find you when you least expect it.",
    "✨ A new adventure is waiting for you – take the leap!",
    "🌿 Your hard work will soon be rewarded in unexpected ways.",
    "🌿 Peace and harmony will bring you clarity in an important decision.",
    "✨ A long-held dream of yours is closer to coming true than you think.",
    "🌿 You will learn something new that will open doors to great possibilities.",
    "❤️ Trust your instincts – they will guide you to success!"
]


function getRandomNumber() {
    return Math.floor(Math.random() * foresights.length)
}
function getDate() {
    return new Date().toLocaleDateString();
}
function setRandomPrediction() {
    const prediction = document.createElement("p");
    prediction.innerText = `Chosing the best prediction ...`;
    const data = foresights[getRandomNumber()];
    setTimeout(() => 
    {
        if (data.startsWith("❤️")) 
        {
            prediction.style.color = "red";
        }
        else if (data.startsWith("✨")) 
        {
            prediction.style.color = "violet";
        }
        else
        {
            prediction.style.color = "green";
        }
        prediction.innerText = `${getDate()} -> ${data}`;
        
        prediction.classList.add("fade-in");
    }, 2000);
    document.getElementById("foresights").appendChild(prediction);
};

const textData = "🌿 A great opportunity is coming your way soon! ✨ You will meet someone who will change your life for the better.,🌿 Financial success is on the horizon – stay patient and work hard!,❤️ Love and happiness will find you when you least expect it.,✨ A new adventure is waiting for you – take the leap!,🌿 Your hard work will soon be rewarded in unexpected ways.,🌿 Peace and harmony will bring you clarity in an important decision.,✨ A long-held dream of yours is closer to coming true than you think.,🌿 You will learn something new that will open doors to great possibilities.,❤️ Trust your instincts – they will guide you to success!";


function countWords(text = "") {
    let words = text.toLocaleLowerCase();
    words = words.replace(/[🌿✨❤️!.,–]/g, "").trim().split(" ");
    let wordsCounter = {};
    words.forEach(word => {
        wordsCounter[word] = (wordsCounter[word] || 0) + 1;
    });
   
    return wordsCounter;
}
function getSingleWords(data) {
    for (const key in data) {
        if (data[key] == 1) {
            console.log(key);
        }
    }
}
countWords(textData)
getSingleWords(countWords(textData))