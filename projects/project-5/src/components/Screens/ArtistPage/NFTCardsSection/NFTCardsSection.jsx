import './NFTCardsSection.css'

import nft1 from '../../../../assets/images/nft1.png'
import nft2 from '../../../../assets/images/nft2.png'
import nft3 from '../../../../assets/images/nft3.png'

import avatar from '../../../../assets/images/avatar.png'


function NFTCardsSection() {
    return <div className="NFTCardSection">
        <div className="frames">
            <div className="NFTCard">
                <img src={nft1} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>Distant Galaxy</h5>
                        <div className="artist">
                            <img src={avatar} alt="avatar" />
                            <span className="name">Animakid</span>
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
                            <img src={avatar} alt="avatar" />
                            <span className="name">Animakid</span>
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
                            <img src={avatar} alt="avatar" />
                            <span className="name">Animakid</span>
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
            <div className="NFTCard forTabletAndDesktop">
                <img src={nft1} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>Distant Galaxy</h5>
                        <div className="artist">
                            <img src={avatar} alt="avatar" />
                            <span className="name">Animakid</span>
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
            <div className="NFTCard forTabletAndDesktop">
                <img src={nft2} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>Life on Edena</h5>
                        <div className="artist">
                            <img src={avatar} alt="avatar" />
                            <span className="name">Animakid</span>
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
            <div className="NFTCard forTabletAndDesktop">
                <img src={nft3} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>AstroFiction</h5>
                        <div className="artist">
                            <img src={avatar} alt="avatar" />
                            <span className="name">Animakid</span>
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

export default NFTCardsSection;