import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import CreateAccount from './components/Screens/CreateAccount';
import Home from './components/Screens/Home';
import ArtistPage from './components/Screens/ArtistPage';
import Marketplace from './components/Screens/Marketplace/Marketplace';
import TopCreators from './components/Screens/TopCreators';
import ConnectWallet from './components/Screens/ConnectWallet';
import LoginAccount from './components/Screens/LoginAccount';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/artist-page/:id' element={<ArtistPage/>}/>
            <Route path='/marketplace' element={<Marketplace/>}/>
            <Route path='/rankings' element={<TopCreators/>}/>
            <Route path='/connect-wallet' element={<ConnectWallet/>}/>
            <Route path='/sign-up' element={<CreateAccount/>}/>
            <Route path='/login' element={<LoginAccount/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
