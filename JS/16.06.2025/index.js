const widthScale = 1.5 // width scale multiplier
const heightPadding = 20 // extra height
const borderRadius = 5 // border radius
const shadowBlurRadius = 10 // blur radius
const shadowColor = `rgba(0, 0, 0, 0.5)` // color
const opacity = 0.8 // opacity parameter

function createBox(width, height) {
    return {
    width: width * widthScale,
    height: height + heightPadding,
    borderRadius: borderRadius,
    shadow: `0 0 ${shadowBlurRadius}px ${shadowColor}`,
    opacity: opacity
    };
}

// function createBox(width, height) {
//     return {
//     width: width * 1.5,
//     height: height + 20,
//     borderRadius: 5,
//     shadow: `0 0 10px rgba(0, 0, 0, 0.5)`,
//     opacity: 0.8
//     };
// }


// bad example
function calculatePrice(price, status)
{
    let finalPrice = price;
    if (status === `VIP`) {
        finalPrice -= finalPrice * 10 / 100;
    }
    else if(status === `member`)
    {
        finalPrice -= finalPrice * 5 / 100;
    }
    return finalPrice + 100;
}

// good example

const discountVIP = 10;
const discountMember = 5;
const fine = 100;

function calculatePrice(price, status)
{
    let finalPrice = price;
    if (status === `VIP`) {
        finalPrice -= finalPrice * discountVIP / 100;
    }
    else if(status === `member`)
    {
        finalPrice -= finalPrice * discountMember / 100;
    }
    return finalPrice + fine;
}



function findSuspiciousNumbers(data)
{
    const numberRegex = /\b\d+(\.\d+)?\b/g;
    const constRegex = /const\s+([a-zA-Z_$][a-zA-Z_$0-9]*)\s*=\s*(\d+(\.\d+)?)/g;

    const constNumbers = new Set();
    let constMatch;
    while ((constMatch = constRegex.exec(data)) !== null) {
        constNumbers.add(constMatch[2])
    }

    const suspiciousNumbers = [];
    let match;
    while ((match = numberRegex.exec(data)) !== null) {
        if (!constNumbers.has(match[0])) {
            suspiciousNumbers.push(
                {
                    value: match[0],
                    index: match.index,
                    context: data.slice(match.index - 10, match.index + 10)
                }
            ) 
        }
    }
    console.log(suspiciousNumbers);
}
findSuspiciousNumbers(`const data = 456; const fff = 56; ff; 45+6`)