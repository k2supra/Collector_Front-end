import './App.css';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import Home from './components/Screens/Home';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
