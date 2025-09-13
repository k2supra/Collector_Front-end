import BannerAndProfilePicture from "./ArtistPage/BannerAndProfilePicture/BannerAndProfilePicture";
import ArtistInfo from "./ArtistPage/ArtistInfo/ArtistInfo";
import TabBar from "./ArtistPage/TabBar/TabBar";
import NFTCardsSection from './ArtistPage/NFTCardsSection/NFTCardsSection'

function ArtistPage(params) {
    return <div className="artistPage">
        <BannerAndProfilePicture/>
        <ArtistInfo/>
        <TabBar/>
        <NFTCardsSection/>
    </div>
}

export default ArtistPage;