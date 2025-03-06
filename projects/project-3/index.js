window.addEventListener("load", () =>
{
        const animation = document.querySelector(".loading-player");
        animation.style.display="none";
})

class CurrencyExchangeAPI
{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
        this.url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/`;
        this.cachedDataStorage = this.getLocalStorageCache("convertionData", true) || [];
        this.cachedLastCurrencies = this.getLocalStorageCache("lastCurrency", true) || ["USD", "USD"];
    }
    /* setCacheData() - adds object of fetched data into 'cachedDataStorage' array */
    setCacheData(sourceKey, sourceData) {
        this.cachedDataStorage.push({key: sourceKey, requestDate: this.trimDate(sourceData["time_last_update_utc"]), data: sourceData["conversion_rates"]});
    };

    /* setLocalStorageCache() - sets cached data into the local storage */
    setLocalStorageCache(title, data, flag)
    {
        if (flag) {
            localStorage.setItem(title, JSON.stringify(data));
        }
        else
        {
            localStorage.setItem(title, data);
        }
    }

    /* getLocalStorageCache() - returns data from local storage */
    getLocalStorageCache(title, flag)
    {
        if (flag) {
            return JSON.parse(localStorage.getItem(title));
        }
        else
        {
            return localStorage.getItem(title);
        }
    }

    /* trimDate() - truncates to the desired date format, example: 'Fri Feb 28 2025'*/
    trimDate(date)
    {
        const trimmedDate = new Date(date.toString())
        return trimmedDate.toDateString();
    }

    /* isExpired() - checks if the requested data from cache is not expired */
    isExpired(requestedDate)
    {
        const todayDate = new Date().toDateString();
        return requestedDate != todayDate;
    }

    /* getData() - checks for data in the cache, if cache contains - checks the expire date and return the data.
     In case cache storage does not contain needed data, it fetches it from API and calls itself */
    async getData(currencyFrom)
    {
        const isItem = this.cachedDataStorage.find(item => item.key == currencyFrom);
        if (isItem) {
            if (!this.isExpired(isItem.requestDate)) {
                return isItem.data;
            }
            else
            {
                this.cachedDataStorage.splice(this.cachedDataStorage.findIndex(element => element.currencyFrom == isItem), 1)
                return this.getData(currencyFrom);
            }
        }
        else 
        {
            const data = await fetch(this.url + currencyFrom).then(response =>
            {
                if(!response.ok) console.warn("::::::::::SOMETHING WENT WRONG::::::::::");
                return response.json();
            }
            )
            this.setCacheData(currencyFrom, data);
            this.setLocalStorageCache("convertionData", this.cachedDataStorage, true);
            return this.getData(currencyFrom);
        }
    }

    /* getExchangeRate() - returns conversion rate of currencies */
    async getExchangeRate(currencyFrom, currencyTo)
    {
        const data = await this.getData(currencyFrom);
        return data[currencyTo.toUpperCase()];
    }

    /* convertCurrency() - returns final value of conversion */
    async convertCurrency(currencyFrom, currencyTo, amount)
    {
        const rate = await this.getExchangeRate(currencyFrom, currencyTo);
        return (rate * amount).toFixed(2);
    }

    /* setCurrency() - sets all currencies from fetched data as a list into droplist */
    async setCurrency()
    {

        const dataFrom = await this.getData(this.cachedLastCurrencies[0]);
        const dataTo = await this.getData(this.cachedLastCurrencies[1]);

        const selectFrom = document.getElementById("currencyFrom");
        const selectTo = document.getElementById("currencyTo");

        for (const item of Object.keys(dataFrom)) {
            createOption(selectFrom, item);
        }
        for (const item of Object.keys(dataTo)) {
            createOption(selectTo, item);
        }
    }
}

/* createOption() - adds data into a droplist */
function createOption(target, data) {
    const option = document.createElement("option");
    option.textContent = data;
    target.appendChild(option);
}


const currencyConverter = new CurrencyExchangeAPI("18ae28784faa4c6af04597a2");

currencyConverter.setCurrency();

/* adds events for input fields for automatic data(output value of converted currencies) refresh */
const inputs = document.getElementsByTagName("input");
for (const item of inputs) {
    item.addEventListener("input", async function(event)
    {
        const currencyFrom = document.querySelector("#currencyFrom").value;
        const currencyTo = document.querySelector("#currencyTo").value;
        const amount = event.target.value;

        if (event.target.id === "valueFrom") {
            const result = await currencyConverter.convertCurrency(currencyFrom, currencyTo, amount);
            document.getElementById("valueTo").value = result;
        } 
        else if (event.target.id === "valueTo") {
            const result = await currencyConverter.convertCurrency(currencyTo, currencyFrom, amount);
            document.getElementById("valueFrom").value = result;
        }
    })
}

const currencyFrom = document.getElementById("currencyFrom");
currencyFrom.addEventListener("change", () => 
{    
    currencyConverter.cachedLastCurrencies[0] = currencyFrom.value;
    currencyConverter.setLocalStorageCache("lastCurrency", currencyConverter.cachedLastCurrencies, true);
})

const currencyTo = document.getElementById("currencyTo");
currencyTo.addEventListener("change", () => 
{
    currencyConverter.cachedLastCurrencies[1] = currencyTo.value;
    currencyConverter.setLocalStorageCache("lastCurrency", currencyConverter.cachedLastCurrencies, true);
})

