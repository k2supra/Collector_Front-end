const Car = 
{
    brand: "",
    model: "",
    year: 0,
    getInfo()
    {
        return;
    }
}

const ElectricCar = Object.create(Car);
ElectricCar.brand = "SangYoung";
ElectricCar.model = "Y3K";
ElectricCar.year = 2025;
ElectricCar.capacity = 500;
ElectricCar.getInfo = function() {console.log(`${this.brand} ${this.model} ${this.year} ${this.capacity}`);}
ElectricCar.getInfo()
console.log(Object.getPrototypeOf(ElectricCar) === Car);


const Book = 
{
    title: "",
    author: "",
    year: 0,
    getSummary()
    {
        return;
    }
}

const EBook1 = Object.create(Book);
EBook1.title = "title1";
EBook1.author = "author1";
EBook1.year = 2025;
EBook1.filesize = 5;
EBook1.getSummary = function() {console.log(`${this.title} ${this.author} ${this.year} ${this.filesize}`);}

const EBook2 = Object.create(Book);
EBook2.title = "title2";
EBook2.author = "author2";
EBook2.year = 2021;
EBook2.filesize = 2;
EBook2.getSummary = function() {console.log(`${this.title} ${this.author} ${this.year} ${this.filesize}`);}

const Book3 = Object.create(Book);
Book3.title = "title3";
Book3.author = "author3";
Book3.year = 2022;
Book3.filesize = 56;
Book3.getSummary = function() {console.log(`${this.title} ${this.author} ${this.year} ${this.filesize}`);}

const books = [EBook1, EBook2, Book3];
for (const item of books) {
    item.getSummary()
}


const BankAccount = 
{
    owner: "",
    balance: 100,
    deposit(amount)
    {
        this.balance += amount;
    },
    withdraw(amount)
    {
        this.balance -= amount;
    }
}

const SavingsAccount = Object.create(BankAccount);
SavingsAccount.interestRate = 10;
SavingsAccount.addInterest = function() {this.balance += this.balance * (this.interestRate / 100)}
console.log(Object.getPrototypeOf(SavingsAccount) === BankAccount);