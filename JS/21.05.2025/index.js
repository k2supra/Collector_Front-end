class Rule {
    constructor(name, func, errorText) {
        this.name = name;
        this.errorText = errorText;
        this.func = func;
    }
    isValid(value)
    {
        return this.func(value);
    }
}
class ConsoleLogger {
    log(errorText)
    {
        console.error(errorText);        
    }
}
class AlertLogger {
    log(errorText)
    {
        alert(errorText);        
    }
}
class DomLogger {
    log(errorText)
    {
        document.body.insertAdjacentHTML("beforeend", 
            `
                <div class='errorBlock'>${errorText}</div>
            `
        )
        setTimeout(()=>{document.querySelector(".errorBlock").remove()}, 2000)     
    }
}
class Logger {
    constructor(logger) {
        this.logger = logger;
    }
    log(value)
    {
        this.logger.log(value);
    }
}
class Validator {
    constructor(logger = Logger, rules = []) {
        this.logger = logger;
        this.rules = rules;
    }
    validate(form)
    {
        let isValidForm = true;
        for (const rule of this.rules) {
            const input = form.elements[rule.name];
            if (!rule.isValid(input.value)) {
                this.logger.log(rule.errorText)
                isValidForm = false;
            }
        }
        return isValidForm;
    }
}
class Processor {
    constructor(obj = Validator, func) {
        this.validator = obj;
        this.func = func;
    }
    attach(formSelector)
    {
        const form = document.querySelector(formSelector);
        form.addEventListener("submit", (e)=>
        {
            e.preventDefault();
            const isValid = validator.validate(form);
            if(isValid) this.func(form);
        })
    }
}


const rules = 
[
    new Rule("name", val => /^[a-zA-Z]{5,15}$/.test(val), "Name must be 5-15 letters"),
    new Rule("birthYear", val => /^\d{4}$/.test(val.split("-")[0]) && +val.split("-")[0] >= 1900 && +val.split("-")[0] <= new Date().getFullYear(), "Birth year must be 1900 - current year"),
    new Rule("eyeColor", val => val!=undefined, "Invalid eye color"),
    new Rule("hairColor", val => val!=undefined, "Invalid hair color"),
    new Rule("height", val => !isNaN(val) && +val > 0 && +val <= 2.6, "Height must be between 0 and 2.60"),
    new Rule("weight", val => !isNaN(val) && +val > 0 && +val <= 300, "Weight must be between 0 and 300"),
]

const consoleLogger = new ConsoleLogger;
const alertLogger = new AlertLogger;
const domLogger = new DomLogger;

const logger = new Logger(domLogger)

const validator = new Validator(logger, rules);

const processorFunc = (form)=>
{
    const data = {};
    for (const element of form.elements) {
        if(element.id) data[element.id] = element.value;
    }
    document.getElementById('result').innerText += `\n` + JSON.stringify(data, null, 2);

    form.reset();
}

const processor = new Processor(validator, processorFunc)

processor.attach("form")
