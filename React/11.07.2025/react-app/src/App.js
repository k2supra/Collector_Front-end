import './App.css';
import { User } from './components/User';
import { SetUsersIntoUl } from './components/User';

function App() {
  return (
    <div className="App">
      <ul>
        <SetUsersIntoUl />
      </ul>
      <User name='Bob' age={18} email='bobthecoder@gmail.com' hobby='cycling'/>
    </div>
  );
}

export default App;
