import HeroSection from "./Home/HeroSection/HeroSection";
import TrendingCollection from "./Home/TrendingCollection/TrendingCollection";
import TopRatedArtists from "./Home/TopRatedArtists/TopRatedArtists";
import BrowseCategories from "./Home/BrowseCategories/BrowseCategories";
import DiscoverMoreNFTS from "./Home/DiscoverMoreNFTS/DiscoverMoreNFTS";
import NFTHighlight from "./Home/NFTHighlight/NFTHighlight";
import HowItWorks from "./Home/HowItWorks/HowItWorks";
import SubscribeWidget from "./Home/SubscribeWidget/SubscribeWidget";

function Home() {
    return<>
        <HeroSection/>
        <TrendingCollection/>
        <TopRatedArtists/>
        <BrowseCategories/>
        <DiscoverMoreNFTS/>
        <NFTHighlight/>
        <HowItWorks/>
        <SubscribeWidget/>
    </>
}

export default Home