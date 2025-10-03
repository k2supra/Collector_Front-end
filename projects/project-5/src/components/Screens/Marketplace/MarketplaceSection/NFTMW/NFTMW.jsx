import { useEffect } from 'react';
import './nftmw.css'

import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../../../RTK/fetchBalance';
import { fetchMarketplaceForSale } from '../../../../RTK/fetchMarketplaceForSale';

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

function NFTMW({nftData, close, marketplace}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.user.currentUser)
    useEffect(()=>
    {
        document.body.style.overflow='hidden';
        return ()=>document.body.style.overflow='auto'
    },[])
    return <div className="nftmw">
        <div className="NFTCard">
                <img src={nftData?.imageUrl} alt="NFT" className='NFTImage'/>
                <div className="NFTInfo">
                    <div className="artistInfo">
                        <h5 className='NFTName'>{nftData?.title}</h5>
                        <div className="artist">
                            <img src={marketplace?.avatarUrl} alt="avatar" />
                            <span className="name">{marketplace.username}</span>
                        </div>
                    </div>
                    <div className="additionalInfo">
                        <div className="price">
                            <span>Price</span>
                            <span className='priceValue'>{nftData?.price} ETH</span>
                        </div>
                        <div className="highestBid">
                            <span>Highest Bid</span>
                            <span className='highestBidValue'>{nftData?.highestBid} wETH</span>
                        </div>
                    </div>
                </div>
            </div>
        <div className="controls">
            <button onClick={close}>⨉</button>
            <button onClick={async ()=>
                {
                    const freshBalance = await dispatch(fetchBalance(currentUser._id)).unwrap();
                    if(+freshBalance >= +nftData.price)
                    {
                        try {
                            console.log("start fetch...");
                            const res = await fetch(`${API_URL}:${PORT}/buy/${marketplace._id}/${currentUser._id}/${nftData._id}`, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                            })
                            // const data = await res.json().catch(() => ({}));
                            console.log("got response:", res.status);

                            if (res.ok) {
                                alert('Succesfully bought. Congratulations')
                            }
                            else
                            {
                                alert('Something went wrong: '/*  + (data?.message || res.status) */);
                            }
                        } catch (err) {
                            console.error(err);                            
                        }
                        finally
                        {
                            close();
                            dispatch(fetchMarketplaceForSale());
                        }
                    }
                    else
                    {
                        alert('You don`t have enough balance')
                    }
                }
            }>Buy</button>
        </div>
    </div>
}

export default NFTMW