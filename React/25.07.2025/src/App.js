import './App.css';
import { UserList } from './components/UserList';
import { Form } from './components/Form';

function App() {
  return (
    <div className="App">
      <UserList userList={[{name:'Bob', age:17},{name:'Alice', age:25},{name:'Alex', age:19}]}/>
      <Form></Form>
    </div>
  );
}

export default App;
