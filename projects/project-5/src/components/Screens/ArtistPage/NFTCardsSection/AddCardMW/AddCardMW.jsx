import { useEffect, useState } from 'react'
import './addCardMW.css'

import nft1 from '../../../../../assets/images/nft1.png'
import nft2 from '../../../../../assets/images/nft2.png'
import nft3 from '../../../../../assets/images/nft3.png'
import nft4 from '../../../../../assets/images/nft4.png'
import nft5 from '../../../../../assets/images/nft5.png'

const nfts = [nft1, nft2, nft3, nft4, nft5]

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

function AddCardMW({close, userId, onNFTAdded}) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState(null)
    useEffect(()=>
    {
        document.body.style.overflow='hidden';
        return ()=>document.body.style.overflow='auto'
    },[])
    const handleSubmit = async (e)=>
        {
            e.preventDefault();
            if(!selectedImage) {alert('Select an image'); return}
            if(!title) {alert('Enter a title'); return}
            if(!price) {alert('Enter a price'); return}
    
            const newNFT = 
            {
                title,
                price,
                highestBid: '0',
                imageUrl: selectedImage
            }
    
            try {                
                const res = await fetch(`${API_URL}:${PORT}/artist-page/${userId}/nfts`,
                    {
                        method: 'POST',
                        headers:{'Content-Type':'application/json'},
                        body: JSON.stringify(newNFT),
                    }
                )
    
                const data = await res.json()
                if (res.ok) {
                    onNFTAdded(data);
                    close()
                }
                else
                {
                    alert(data?.error || 'Error creating NFT')
                }
            } catch (err) {
                console.error(err);
            }
        }
    return <div className="addCardMW" onClick={(e) => e.stopPropagation()}>
        <div className="addCardMWContent">
            <button onClick={close} className='close'>⨉</button>
            <div className="images">
                {nfts.map((img, i)=>
                <img
                key={i} 
                src={img} 
                alt="nft"
                className={selectedImage===img?'selected':''} 
                onClick={()=>setSelectedImage(img)}/>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <button type='submit'>Create</button>
            </form>
        </div>
    </div>
}

export default AddCardMW