import './App.css';

import { UserCard } from './components/User';
import { ToDoList } from './components/ToDoList';
import { ListOrSingle } from './components/ListOrSingle';
import { AtLeastOne } from './components/CustomValidator-AtLeastOne';
import { Product } from './components/CustomValidator-Product';
import { AdvancedProduct } from './components/CustomValidator-AdvancedProduct';


function App() {
  return (
    <div className="App">
      <UserCard user={{name: 'Bob', age: 18, email: 'bobemail@com'}}/>
      <UserCard user={{name: 'Mark', age: '18', email: 'markemail@com'}}/>
      <UserCard user={{name: 13426, age: 18, email: 1346}}/>
      <UserCard user={{name: 'Alice', age: 18, email: 'aliceemail@com'}}/>
      <UserCard user={{name: 'Kevin', age: '18', email: 8}}/>

      <h2>ToDo List</h2>
      <ToDoList todos={["Buy a bread", "Wash plates"]} />
      <ToDoList todos={[]} />
      <ToDoList todos={[123, "Wash plates"]} /> 

      <h2>List Or Single</h2>
      <ListOrSingle data={['banana', 'apple', 'cherry']}/>
      <ListOrSingle data={{value: 'bananaana'}}/>

      <h2>Custom Validator 1</h2>
      <AtLeastOne items={["item1"]}/>
      <AtLeastOne items={[]}/>

      <h2>Custom Validator 2</h2>
      <Product product={{title: 'Product 1', price: 500}}/>
      <Product product={{title: 'Product 2', price: '300'}}/>
      <Product product={{title: 'Product 3', price: -700}}/>

      <h2>Custom Validator 3</h2>
      <AdvancedProduct product={{title: 'Product 1', price: 500, category: 'food'}}/>
      <AdvancedProduct product={{title: 'Product 2', price: '500', category: 'test'}}/>
      <AdvancedProduct product={{title: 'Product 3', price: 500, category: 'test'}}/>
      <AdvancedProduct product={{title: 'Product 4', price: 500, category: 'electronics'}}/>
      <AdvancedProduct product={{title: 'Product 5', price: '500', category: 'food'}}/>
    </div>
  );
}

export default App;
