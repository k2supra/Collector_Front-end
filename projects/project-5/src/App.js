import './App.css';

import NavBar from './components/NavBar/NavBar';
import HeroSection from './components/HeroSection/HeroSection';
import TrendingCollection from './components/TrendingCollection/TrendingCollection';
import TopRatedArtists from './components/TopRatedArtists/TopRatedArtists';
import BrowseCategories from './components/BrowseCategories/BrowseCategories';
import DiscoverMoreNFTS from './components/DiscoverMoreNFTS/DiscoverMoreNFTS';
import NFTHighlight from './components/NFTHighlight/NFTHighlight';
import HowItWorks from './components/HowItWorks/HowItWorks';
import SubscribeWidget from './components/SubscribeWidget/SubscribeWidget';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      {/* <NavBar/>
      <HeroSection/>
      <TrendingCollection/> 
      <TopRatedArtists/>
      <BrowseCategories/> 
      <DiscoverMoreNFTS/>
      <NFTHighlight/>
      <HowItWorks/>
      <SubscribeWidget/>*/}
      <Footer/>
    </div>
  );
}

export default App;
