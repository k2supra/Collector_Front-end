import './marketplaceSection.css'

import nft1 from '../../../../assets/images/nft1.png'
import nft2 from '../../../../assets/images/nft2.png'
import nft3 from '../../../../assets/images/nft3.png'

import avatar from '../../../../assets/images/avatar.png'
import avatar2 from '../../../../assets/images/avatar2.png'
import avatar3 from '../../../../assets/images/avatar3.png'


function MarketplaceSection() {
    return <div className="marketplaceSection">
        <div className="tabs">
            <input type="radio" id="nft" name="tabs" defaultChecked hidden />
            <label htmlFor="nft" className="tab">NFT</label>
            <input type="radio" id="collections" name="tabs" hidden />
            <label htmlFor="collections" className="tab">Collections</label>
        </div>
        <div className="cardsSection">
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
            <div className="NFTCard">
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
    </div>
}

export default MarketplaceSection