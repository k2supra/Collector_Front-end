class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}
class ProductValidator {
    constructor(product)
    {
        this.product = product;
    }
    test()
    {
        if (this.product.name.length !== 0 && this.product.price > 0) {
            return true;
        }
        return false;
    }
}

class DataBase {
    static save(product)
    {
        throw new Error("Must be chosen any type of database");
    }
}
class MySQLDatabase extends DataBase{
    constructor()
    {
        super()
        this.dataStorage = [];
    }
    save(product)
    {
        this.dataStorage.push(product);
        console.log('Saved to SQL DB');
    }
}
class MongoDatabase extends DataBase{
    constructor()
    {
        super()
        this.dataStorage = [];
    }
    save(product)
    {
        this.dataStorage.push(product);
        console.log('Saved to Mongo DB');
    }
}
class FirebaseDatabase extends DataBase {
    constructor() {
        super();
        this.dataStorage = [];
    }

    save(product) {
        this.dataStorage.push(product);
        console.log("Saved to Firebase DB");
    }
}

class ProductRepository {
    constructor(database) {
        this.database = database;
    }
    save(product)
    {
        this.database.save(product);
    }
}

class PaymentMethod {
    pay(amount)
    {
        throw new Error("Must be chosen any type of payment");
    }
}

class ApplePay extends PaymentMethod{
    pay(amount)
    {
        console.log(`Payed via Apple Pay --- ${amount}`);
        NotificationService.notify('User -- spent money via Apple Pay')
    }
}
class GooglePay extends PaymentMethod{
    pay(amount)
    {
        console.log(`Payed via Google Pay --- ${amount}`);
        NotificationService.notify('User -- spent money via Google Pay')
    }
}
class StripePay extends PaymentMethod {
    pay(amount) {
        console.log(`Payed via Stripe --- ${amount}`);
        NotificationService.notify('User -- spent money via Stripe');
    }
}

class NotificationService {
    static notify(data)
    {
        console.log(data);
    }
}


class ApiClient {
    fetchProducts() {
        throw new Error("Must implement fetchProducts");
    }
}
class RestApiClient extends ApiClient{
    fetchProducts() {
        return new Promise(resolve => resolve([new Product('API Product 1', 500, 'toys'), new Product('API Product 2', 700, 'garden')]))
    }
}

class ProductService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.productsList = [];
    }
    fetchProducts()
    {
        return this.apiClient.fetchProducts().then(res => {this.productsList = res});     
    }
}

export {Product, ProductValidator, MongoDatabase, ProductRepository, GooglePay, RestApiClient, ProductService}