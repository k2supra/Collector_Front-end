class UserManager {
    #users;
    constructor() {
        this.#users = [];
    }
    addUser(user)
    {
        this.#users.push(user);
    }
    addUsers(users)
    {
        users.forEach(user => {
            this.#users.push(user);
        });
    }
    removeUser(username)
    {
        this.#users = this.#users.filter(user => user.name !== username);
    }
    listUsers()
    {
        this.#users.forEach(element => {
            element.showInfo();
        });
    }
}
class User {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    showInfo()
    {
        console.log(`Fullname: ${this.name} ${this.surname}, Age: ${this.age}`);
    }
}

const bob = new User("Bob", "Wallington", 45);
const martin = new User("Martin", "Ton", 25);
const alice = new User("Alice", "Solha", 19);
const carl = new User("Carl", "Grate", 53);

const userManager = new UserManager;
userManager.addUsers([bob, martin, alice, carl]);

userManager.listUsers();

userManager.removeUser("Alice")

userManager.listUsers();




function wordsFromText(source = "") {
    let data = source.match(/\b\w+\b|[.,!?]/g);
    return data;
}
function correctCase(newWord = "", proto) {
    let tempNewWord = "";
    for (let index = 0; index < newWord.length; index++) {
        if (!(/[a-z]/.test(newWord[index]) && /[a-z]/.test(proto[index]))) {
            tempNewWord += newWord[index].toUpperCase();
        }
        else
        {
            tempNewWord += newWord[index];          
        }
    }
    return tempNewWord;
}

function mergeWords(newWords = []) {
    let output = "";
    let index = 0;
  
    newWords.forEach(element => {
        if (/[.,!?]/g.test(newWords[index + 1])) {
            output += element;
        }
        else
        {
            output += `${element} `;
        }
        index++;
    });

    return output;
}

function changeWords(source, oldWords = [], newWords = []) {
    let sourceWords = wordsFromText(source);
    sourceWords = sourceWords.map(word => 
    {
        if (oldWords.includes(word.toLowerCase())) {
            let newWord = newWords[oldWords.findIndex(x => x === word.toLowerCase())];
            return correctCase(newWord, word);
        }
        return word;
    }
    );

    return mergeWords(sourceWords);
}


let text = "Cat runs. Dog runs. Cat jumps.";
let searchWords = ["cat", "dog"];
let replaceWords = ["bird", "fish"];

console.log(changeWords(text, searchWords, replaceWords));


let arr1 = [1, 2, 3, 4, 5];
let arr2 = [3, 4, 5, 6, 7];
let arr3 = [5, 6, 7, 8, 9];
let arr4 = [7, 8, 9, 10, 11];

let sortedGlobalArray = arr1.concat([arr2, arr3, arr4]).flat().sort((number1, number2) => number2 - number1);

let uniqueElements = Array.from(
    sortedGlobalArray.reduce((set, element) => set.add(element), new Set())
)

let uniqueElements2 = sortedGlobalArray.filter(number => sortedGlobalArray.indexOf(number) === sortedGlobalArray.lastIndexOf(number))

let sameElements = sortedGlobalArray.filter(number => sortedGlobalArray.indexOf(number) !== sortedGlobalArray.lastIndexOf(number)).reduce((acc, item) =>
{
    if (!acc.includes(item)) {
        acc.push(item)
    }
    return acc;
}, [])

let primeUniqueNumbers = sortedGlobalArray.reduce((acc, item) =>
{
    for (let index = 2; index <= Math.sqrt(item); index++) {
        if (item % index === 0) {
            return acc;
        }
    }
    acc.push(item);
    return acc;
}, []).filter(number => sortedGlobalArray.indexOf(number) === sortedGlobalArray.lastIndexOf(number))

console.log(sortedGlobalArray);
console.log(uniqueElements);
console.log(uniqueElements2);
console.log(sameElements);
console.log(primeUniqueNumbers);
