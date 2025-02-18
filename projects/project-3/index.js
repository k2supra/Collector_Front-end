class CurrencyExchangeAPI
{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
        this.url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/`;
        this.cachedDataStorage = [];
        this.counter = 0;
    }

    cacheData(sourceKey, sourceData) {
        this.cachedDataStorage.push({key: sourceKey, requestDate: sourceData["time_last_update_utc"], data: sourceData["conversion_rates"]});
    };

    async getData(currencyFrom)
    {
        if (this.cachedDataStorage.find(item => item.key == currencyFrom)) {
            console.log("++++++");
            console.log(this.cachedDataStorage)
            return this.cachedDataStorage.find(item => item.key == currencyFrom).data;
        }
        else 
        {
            console.log("----");
            const data = await fetch(this.url + currencyFrom).then(response =>
            {
                if(!response.ok) console.warn("::::::::::SOMETHING WENT WRONG::::::::::");
                return response.json();
            }
            )
            this.cacheData(currencyFrom, data);
            console.log("Counter:::::::", this.counter += 1)
            return this.getData(currencyFrom);
        }
        // const data = await fetch(this.url + currencyFrom).then(response =>
        // {
        //     if(!response.ok) console.warn("::::::::::SOMETHING WENT WRONG::::::::::");
        //     return response.json();
        // }
        // )
        // return data;
    }
    async getExchangeRate(currencyFrom, currencyTo)
    {
        const data = await this.getData(currencyFrom);
        return data[currencyTo.toUpperCase()];
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
        for (const item of Object.keys(data)) {
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


const apiUrl = new CurrencyExchangeAPI("18ae28784faa4c6af04597a2");

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

