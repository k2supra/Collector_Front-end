import './discoverMoreNFTS.css'

import nft1 from '../../../../assets/images/nft1.png'
import nft2 from '../../../../assets/images/nft2.png'
import nft3 from '../../../../assets/images/nft3.png'

import avatar from '../../../../assets/images/avatar.png'
import avatar2 from '../../../../assets/images/avatar2.png'
import avatar3 from '../../../../assets/images/avatar3.png'

import eye from '../../../../assets/images/eye.png'

function DiscoverMoreNFTS() {
    return <div className="discoverMoreNFTS">
        <div className="headline">
            <h4>Discover More NFTs</h4>
            <span>Explore new trending NFTs</span>
        </div>
        <div className="frames">
            <div className="NFTCard">
                <img src={nft1} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>Distant Galaxy</h5>
                        <div className="artist">
                            <img src={avatar} alt="avatar" />
                            <span className="name">MoonDancer</span>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <div className="price">
                            <span>Price</span>
                            <span className='priceValue'>1.63 ETH</span>
                        </div>
                        <div className="highestBid">
                            <span>Highest Bid</span>
                            <span className='highestBidValue'>0.33 wETH</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="NFTCard">
                <img src={nft2} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>Life on Edena</h5>
                        <div className="artist">
                            <img src={avatar2} alt="avatar" />
                            <span className="name">NebulaKid</span>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <div className="price">
                            <span>Price</span>
                            <span className='priceValue'>1.63 ETH</span>
                        </div>
                        <div className="highestBid">
                            <span>Highest Bid</span>
                            <span className='highestBidValue'>0.33 wETH</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="NFTCard forMobile">
                <img src={nft3} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>AstroFiction</h5>
                        <div className="artist">
                            <img src={avatar3} alt="avatar" />
                            <span className="name">Spaceone</span>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <div className="price">
                            <span>Price</span>
                            <span className='priceValue'>1.63 ETH</span>
                        </div>
                        <div className="highestBid">
                            <span>Highest Bid</span>
                            <span className='highestBidValue'>0.33 wETH</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button><img src={eye} alt="see all" />See All</button>
    </div>
}

export default DiscoverMoreNFTS;