// const {Product, ProductValidator, MongoDatabase, ProductRepository, GooglePay, RestApiClient, ProductService} = require('./index.js')
import {Product, ProductValidator, MongoDatabase, ProductRepository, GooglePay, RestApiClient, ProductService} from './index.js'

const product1 = new Product('Product 1', 410, 'car');
const product2 = new Product('Product 2', 910, 'car');
const validator = new ProductValidator(product1);
const validator2 = new ProductValidator(product2);

const mongoDB = new MongoDatabase();
const repository = new ProductRepository(mongoDB);

repository.save(product1);
repository.save(product2);

const googlePay = new GooglePay;
googlePay.pay(300);

const productService = new ProductService(new RestApiClient);
productService.fetchProducts().then(()=>
{
    console.log(productService.productsList);
});