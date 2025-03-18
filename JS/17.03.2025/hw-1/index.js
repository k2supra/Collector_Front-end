const Button = 
{
    width: 2,
    height: 3,
    text: "Button Text",
    showInfo: function()
    {
        console.log(`Width: ${this.width}, Height: ${this.height}, Text: ${this.text}`);
        
    }
}

const BootstrapButton = Object.create(Button);
BootstrapButton.color = "red";
BootstrapButton.showInfo = function() {console.log(`${this.color} BootstrapButton`);}

console.log(Object.getPrototypeOf(BootstrapButton) === Button)

const Shape = 
{
    name: "shape",

    getName: function() {
        return this.name;
    },
    getInfo: function()
    {
        return `Figure ${this.getName()}`
    },
    getArea: function()
    {
        return null;
    },
    getPerimeter: function()
    {
        return null;
    }
}

const Square = Object.create(Shape);
Square.name = "square";
Square.side = 6;
Square.getArea = function() {return this.side ** 2};
Square.getPerimeter = function() {return this.side * 4};
Square.getInfo = function() {return this.name + " has 4 sides with " + this.side + " cm length"}

const Triangle = Object.create(Shape);
Triangle.name = "triangle";
Triangle.side1 = 6;
Triangle.side2 = 3;
Triangle.side3 = 4;
Triangle.getArea = function() {
    let p = this.getPerimeter() / 2; 
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
};
Triangle.getPerimeter = function() {return this.side1 + this.side2 + this.side3};
Triangle.getInfo = function() {return `${this.name} has 3 sides with ${this.side1}, ${this.side2} and ${this.side3} cm length`};

const Rectangle = Object.create(Shape);
Rectangle.name = "rectangle";
Rectangle.side1 = 6;
Rectangle.side2 = 5;
Rectangle.getArea = function() {return this.side1 * this.side2};
Rectangle.getPerimeter = function() {return (this.side1 + this.side2) * 2};
Rectangle.getInfo = function() {return this.name + " has 4 sides with " + this.side1 + " and " + this.side2 + " cm length"}

console.log(Object.getPrototypeOf(Rectangle) === Shape);


console.log(Square.getArea());

console.log(Rectangle.getInfo());

const ExtendedArray = Object.create(Array.prototype);
ExtendedArray.getString = function(separator = "|")
{
    return this.join(separator);
}
ExtendedArray.getHTML = function(tagName)
{
    if (tagName === "li") {
        return `<ul>\n  ${this.map(item => `<li>${item}</li>`).join("\n  ")}\n</ul>`;
    }
    return this.map(item => `<${tagName}>${item}</${tagName}>`).join("\n");
}

const myArray = Object.create(ExtendedArray);
myArray.push(1, 2, 3, 4, 5);
console.log(myArray.getHTML("div"));
console.log(myArray.getHTML("li"));

console.log(myArray.getString("<->"));

console.log(Object.getPrototypeOf(myArray) === ExtendedArray);

const Animal =
{
    species: "",
    makeSound()
    {
        console.log(`Animal makes sound`);
    }
}

const Pet = Object.create(Animal);
Pet.name = "Bib";
Pet.makeSound = function()
{
    console.log(`My pet ${this.name} sounds good`);
}
Pet.check = function() {console.log(Object.getPrototypeOf(this) === Animal)};

Pet.check()

const Instrument = 
{
    name: "",
    play()
    {
        console.log(`Plays ${this.name}`);
    }
}

const ElectricGuitar = Object.create(Instrument);
ElectricGuitar.name = "Muhehehe"
ElectricGuitar.amplifierPower = 10;
ElectricGuitar.play = function() {console.log(`Electro guitar ${this.name} with amplifier of ${this.amplifierPower} W`);}
ElectricGuitar.check = function() {console.log(Object.getPrototypeOf(this) === Instrument)};
ElectricGuitar.check()