import './NFTCardsSection.css'

import { useState } from 'react'
import { updateNFTS } from '../../../RTK/userSlice'

import AddCardMW from './AddCardMW/AddCardMW'
import { useDispatch, useSelector } from 'react-redux'

function NFTCardsSection({userData, activeTab}) {
    const [showAddCardMW, setShowAddCardMW] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.user.currentUser)
    
    let nftsData = [];

    if (activeTab === 'created') nftsData = userData?.nfts?.created || [];
    if (activeTab === 'owned') nftsData = userData?.nfts?.owned || [];
    if (activeTab === 'collections') nftsData = userData?.nfts?.collections || [];

    return <div className="NFTCardSection">
        <div className="frames">
            {nftsData.length === 0 ? <h1>No NFTs {activeTab}</h1> : nftsData.map((nft, index)=>
            <div className="NFTCard" key={index}>
                <img src={nft.imageUrl} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>{nft.title}</h5>
                        <div className="artist">
                            <img src={userData?.avatarUrl} alt="avatar" />
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
            {currentUser?._id === userData?._id && activeTab === 'created' && <div className='NFTCard addNewCard' onClick={()=>setShowAddCardMW(true)}>
                <div className='symbol'>+</div>
            </div>}
            {showAddCardMW && <AddCardMW 
            close={()=>setShowAddCardMW(false)} 
            userId={userData?._id}
            onNFTAdded={(newNFT)=>{
                dispatch(updateNFTS(newNFT))
                setShowAddCardMW(false)
            }}/>}
        </div>
    </div>
}

export default NFTCardsSection;