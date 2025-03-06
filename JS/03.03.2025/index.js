const hints = [
    {location: "Crabsburger", clue: "Pants might be in the kitchen"},
    {location: "Squidward's house", clue: "Pants might be there, but there is a Patric"},
    {location: "Plancton`s bucket", clue: "Something starnge is going there"},
]

/**
 * displays keys of objects in array
 */
function showHints() {
    for (const item of hints) {
        console.log(Object.keys(item));
    }
}

/**
 * displays keys with it`s values of objects in array
 */
function displayHints() {
    for (const item of hints) {
        console.log(Object.entries(item));
    }
}

/**
 * displays key`s values of objects in array
 */
function showHintsData() {
    for (const item of hints) {
       console.log(Object.values(item))
    }
}

/**
 * return boolean value as a result of looking for a word 'pants'
 * @returns {boolean} 
 */
function checkPants() {
    const hasPants = hints.find((item) => item.clue.toLowerCase().includes("pants"));
    hasPants ? console.log(true) : console.log(false);
}


/**
 * The function `countWords` takes an array of objects with a `clue` property, splits each `clue` into
 * words, and counts the occurrences of each word in the array.
 */
function countWords() {
    const wordsCounter = hints.reduce((acc, item) =>
    {
        item.clue.split(" ").forEach(element => {
            acc[element] = (acc[element] || 0) + 1;
        });
        return acc;
    }, {})
    console.log(wordsCounter);
}


/**
 * The function `replaceWord` takes in two parameters, `oldWord` and `newWord`, and replaces all
 * occurrences of `oldWord` with `newWord` in the `clue` property of each item in the `hints` array.
 * @param oldWord - The `oldWord` parameter is the word that you want to replace in the `hints` array.
 * @param newWord - Thank you for providing the function `replaceWord(oldWord, newWord)`. To assist you
 * further, could you please provide the value of the `newWord` parameter that you would like to use
 * for the replacement?
 */
function replaceWord(oldWord, newWord) {
    for (const item of hints) {
        item.clue = item.clue.replaceAll(oldWord, newWord)
    }
    console.log(hints);
}


/**
 * The function filters hints based on whether the clue includes the word "pants" in lowercase.
 */
function fliterHints() {
    console.log(hints.filter(element => element.clue.toLowerCase().includes("pants")));
}


/**
 * The function `countWithReduce` uses the `reduce` method to count the number of elements in the
 * `hints` array and then logs the count to the console.
 */
function countWithReduce() {
    const number = hints.reduce((acc) =>
    {
        acc++;
        return acc;
    }, 0)
    console.log(number);
}


/**
 * The function `joinHints` takes an array of objects containing location and clue properties, maps
 * them to a string format, and joins them with a pipe symbol before logging the result.
 */
function joinHints() {
    let joined = hints.map(item => `${item.location}: ${item.clue}`).join(" | ");
    console.log(joined);
}

showHints()
displayHints()
showHintsData()
checkPants()
countWords();
replaceWord("be", "FFFFFF")
fliterHints()
countWithReduce()
joinHints()