import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import CreateAccount from './components/Screens/CreateAccount';
import Home from './components/Screens/Home';
import ArtistPage from './components/Screens/ArtistPage';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/sign-up' element={<CreateAccount/>}/>
            <Route path='/artist-page' element={<ArtistPage/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
