import './NFTCardsSection.css'

import nft1 from '../../../../assets/images/nft1.png'
import nft2 from '../../../../assets/images/nft2.png'
import nft3 from '../../../../assets/images/nft3.png'

import avatar from '../../../../assets/images/avatar.png'
import { useState } from 'react'
import { updateNFTS } from '../../../RTK/userSlice'

import AddCardMW from './AddCardMW/AddCardMW'
import { useDispatch, useSelector } from 'react-redux'

function NFTCardsSection({userData}) {
    const [showAddCardMW, setShowAddCardMW] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.user.currentUser)
    
    let nftsData;
    if (userData?.nfts && userData?.nfts.length > 0) {
        nftsData = userData?.nfts;
    }

    return <div className="NFTCardSection">
        <div className="frames">
            {!nftsData ? <h1>No NFTs</h1> : nftsData.map((nft, index)=>
            <div className="NFTCard" key={index}>
                <img src={nft.imageUrl} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>{nft.title}</h5>
                        <div className="artist">
                            <img src={avatar} alt="avatar" />
                            <span className="name">{userData?.username}</span>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <div className="price">
                            <span>Price</span>
                            <span className='priceValue'>{nft.price}</span>
                        </div>
                        <div className="highestBid">
                            <span>Highest Bid</span>
                            <span className='highestBidValue'>{nft.highestBid}</span>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {currentUser?._id === userData?._id && <div className='NFTCard addNewCard' onClick={()=>setShowAddCardMW(true)}>
                <div className='symbol'>+</div>
            </div>}
            {showAddCardMW && <AddCardMW 
            close={()=>setShowAddCardMW(false)} 
            userId={userData?._id}
            onNFTAdded={(newNFT)=>{
                dispatch(updateNFTS(newNFT))
                setShowAddCardMW(false)
            }}/>}
            {/* <div className="NFTCard">
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
            </div> */}
            {/* <div className="NFTCard">
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
            </div> */}
        </div>
    </div>
}

export default NFTCardsSection;