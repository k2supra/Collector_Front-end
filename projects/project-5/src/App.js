import './App.css';

import NavBar from './components/NavBar/NavBar';
import HeroSection from './components/HeroSection/HeroSection';
import TrendingCollection from './components/TrendingCollection/TrendingCollection';
import TopRatedArtists from './components/TopRatedArtists/TopRatedArtists';
import BrowseCategories from './components/BrowseCategories/BrowseCategories';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <HeroSection/>
      <TrendingCollection/> 
      <TopRatedArtists/>
      <BrowseCategories/>
    </div>
  );
}

export default App;
