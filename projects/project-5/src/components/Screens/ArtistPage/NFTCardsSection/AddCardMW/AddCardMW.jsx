import { useEffect, useState } from 'react'
import './addCardMW.css'

import nft1 from '../../../../../assets/images/nft1.png'
import nft2 from '../../../../../assets/images/nft2.png'
import nft3 from '../../../../../assets/images/nft3.png'

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
    
            const newNFT = 
            {
                title,
                price,
                highestBid: '0',
                imageUrl: selectedImage
            }
    
            try {                
                const res = await fetch(`http://192.168.1.16:5000/artist-page/${userId}/nfts`,
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
                {[nft1, nft2, nft3].map((img, i)=>
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