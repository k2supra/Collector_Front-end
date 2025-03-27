const form = document.querySelector("form");

const inputNickname = form.querySelector("#nickname")
const inputEmail = form.querySelector("#email")
const inputPassword = form.querySelector("#password")
const inputPhoneNumber = form.querySelector("#phoneNumber")
const inputAge = form.querySelector("#age")
const inputWebsiteUrl = form.querySelector("#websiteUrl")

const button = form.querySelector("button");

const smallNickname = form.querySelector("small.nickname")
const smallEmail = form.querySelector("small.email")
const smallPassword = form.querySelector("small.password")
const smallPhoneNumber = form.querySelector("small.phoneNumber")
const smallAge = form.querySelector("small.age")
const smallWebsiteUrl = form.querySelector("small.websiteUrl")

const regexNickname = /[a-zA-Z0-9]{3,}/;
const regexEmail = /^[a-zA-Z0-9+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regexPhoneNumber = /^(\+?\d{1,3})?[-\s]?\d{2,}([-\s]?\d+){8,}$/;
const regexAge = /^[1-9]\d{1,}$/;
const regexWebsiteUrl = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/.*)?$/;

const inputs = [inputNickname, inputEmail, inputPassword, inputPhoneNumber, inputAge, inputWebsiteUrl];
const smalls = [smallNickname, smallEmail, smallPassword, smallPhoneNumber, smallAge, smallWebsiteUrl];
const regexs = [regexNickname, regexEmail, regexPassword, regexPhoneNumber, regexAge, regexWebsiteUrl];

function test(input, regex) {
    return regex.test(input);
}


for (let index = 0; index < 6; index++) {
    inputs[index].addEventListener("input", ()=>
    {
        if (!test(inputs[index].value, regexs[index])) {
            smalls[index].style.display = "block";
            inputs[index].setCustomValidity(false)
        }
        else
        {
            smalls[index].style.display = "none";
            inputs[index].setCustomValidity('')
        }
    })
}

function checkValues() {
    for (let index = 0; index < 6; index++)
    {
        if (test(inputs[index].value, regexs[index])) {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function CreateObject(name, email, password, phoneNumber, age, url = "") {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.age = age;
    this.url = url;

    this.showInfo = function()
    {
        console.log(`Name: ${this.name}\nEmail: ${this.email}\nPassword: ${this.password}\nPhone Number: ${this.phoneNumber}\nAge: ${this.age}\nUrl: ${this.url}`);
        console.log(`Password length: ${this.password.length}`);
    }
}

button.addEventListener("click", ()=>
{
    event.preventDefault();
    if (inputAge.value >= 18 && checkValues()) {
        const obj = new CreateObject(inputNickname.value,
            inputEmail.value,
            inputPassword.value,
            inputPhoneNumber.value,
            inputAge.value,
            inputWebsiteUrl.value,
        );
        obj.showInfo();
    }
    else
    {
        console.log("Wrong age");
    }
})

function changeType() {
    (inputPassword.type === "password") ? inputPassword.type = "text" : inputPassword.type = "password"
}