class CurrencyExchangeAPI
{
    constructor()
    {
        this.apiKey = "f76f5f70a8795554c919c7fe";
        this.url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/`;
    }

    async getData(currencyFrom)
    {
        const data = await fetch(this.url + currencyFrom).then(response =>
        {
            if(!response.ok) console.warn("::::::::::SOMETHING WENT WRONG::::::::::");
            return response.json();
        }
        )
        return data;
    }
    async getExchangeRate(currencyFrom, currencyTo)
    {
        const data = await this.getData(currencyFrom);
        return data["conversion_rates"][currencyTo.toUpperCase()];
    }
    async convertCurrency(currencyFrom, currencyTo, amount)
    {
        const rate = await this.getExchangeRate(currencyFrom, currencyTo);
        return (rate * amount).toFixed(2);
    }
    async setCurrency()
    {
        const data = await this.getData("USD");
        const selectFrom = document.getElementById("currencyFrom");
        const selectTo = document.getElementById("currencyTo");
        for (const item of Object.keys(data["conversion_rates"])) {
            createOption(selectFrom, item);
            createOption(selectTo, item);
        }
    }
}

function createOption(target, data) {
    const option = document.createElement("option");
    option.textContent = data;
    target.appendChild(option);
}


const apiUrl = new CurrencyExchangeAPI();
apiUrl.setCurrency();


const selections = document.getElementsByTagName("input");
for (const item of selections) {
    item.addEventListener("input", async function(event)
    {
        const currencyFrom = document.querySelector("#currencyFrom").value;
        const currencyTo = document.querySelector("#currencyTo").value;
        const amount = event.target.value;

        if (event.target.id === "valueFrom") {
            const result = await apiUrl.convertCurrency(currencyFrom, currencyTo, amount);
            document.getElementById("valueTo").value = result;
        } 
        else if (event.target.id === "valueTo") {
            const result = await apiUrl.convertCurrency(currencyTo, currencyFrom, amount);
            document.getElementById("valueFrom").value = result;
        }
    })
}

