document.addEventListener("DOMContentLoaded", ()=>
{
    const form = document.getElementsByTagName("form")[0];
    const fullName = form.fullname;
    const email = form.email;
    const phone = form.phone;
    const eventName = form.eventName;
    const visitedBefore = form.visitedBefore;
    const prevEvent = form.prevevent;
    const groups = document.querySelectorAll(".group");


    visitedBefore.forEach(element => {
        element.addEventListener("click", ()=>
        {
            if (element.value !== "no") {
                groups[6].hidden = false;
            }
            else
            {
                groups[6].hidden = true;
            }
        })
    });
    
    function checkName(name) {
        return /[a-zA-Z0-9]{3,}/.test(name);
    }
    function checkEmail(email) {
        return /^[a-zA-Z0-9+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
    }
    function checkPhone(phone) {
        return /^(\+?\d{1,3})?[-\s]?\d{2,}([-\s]?\d+){8,}$/.test(phone);
    }
    function checkPrevEvent(prevevent) {
       
        return prevevent != "";
    }
    function checkAge(birthDateValue) {
        const birth = new Date(birthDateValue);
        const today = new Date();
        
        if (today.getFullYear() - birth.getFullYear() >= 18) {
            if (today.getMonth() > birth.getMonth() ||  (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())) 
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else 
        {
            return false;
        }
    }
    function checkAgreement() {
        const agreement = form.agreement;
        return agreement.checked;
    }

    const inputs = [fullName, email, phone, prevEvent];
    const checks = [checkName, checkEmail, checkPhone, checkPrevEvent];

    for (let index = 0; index < inputs.length-1; index++) {
        inputs[index].addEventListener("input", ()=>
        {
            if (checks[index](inputs[index].value.trim())) {
                inputs[index].classList.remove("invalid");
                inputs[index].classList.add("valid");
            }
            else
            {
                inputs[index].classList.remove("valid");
                inputs[index].classList.add("invalid");
            }
        })
    }

    visitedBefore.forEach(element => {
        element.addEventListener("change", ()=>
        {
            switch (visitedBefore.value) {
                case "yes":
                    checkValue(prevEvent, checkPrevEvent);
                    prevEvent.addEventListener("input", ()=>
                    {
                        checkValue(prevEvent, checkPrevEvent);
                    })
                    break;
                case "no":
                    return;

                default:
                    break;
            }
        })
    });
    
    function checkValue(req, reqCheck) {
        if (reqCheck(req.value)) {
            req.classList.remove("invalid");
            req.classList.add("valid");
        }
        else
        {
            req.classList.remove("valid");
            req.classList.add("invalid");
        }
    }
    function checkValues() {
        let isOK = true;
        const isPrev = (visitedBefore.value == "no") ? 1 : 0;
        
        for (let index = 0; index < inputs.length - isPrev; index++) {
            if (!checks[index](inputs[index].value)) {
                inputs[index].classList.add("invalid");
                isOK = false;
            }
        }
        return isOK;
    }

    function Person(name, email, phone, event, birthdate, visitedBefore, prevEvent) {
        this.fullname = name;
        this.email = email;
        this.phone = phone;
        this.event = event;
        this.birthDate = birthdate;
        this.visitedBefore = visitedBefore;
        if (visitedBefore == "yes") {
            this.prevEvent = prevEvent;
        }
    }

    form.addEventListener("submit", (event)=>
    {
        event.preventDefault();
        const birthDate = form.birthdate.value;
        
        if (checkValues() && checkAge(birthDate) && checkAgreement()) {
            const person = new Person(fullName.value, email.value, phone.value, eventName.value, birthDate, visitedBefore.value, prevEvent.value);
            console.log(person);
        }
        else
        {
            return;
        }
        
    })
})