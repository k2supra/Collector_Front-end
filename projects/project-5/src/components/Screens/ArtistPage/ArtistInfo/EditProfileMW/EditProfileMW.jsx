import './editProfileMW.css'
import { useEffect, useState } from 'react';

const avatar1 = process.env.PUBLIC_URL + '/images/avatar1.png'
const avatar2 = process.env.PUBLIC_URL + '/images/avatar2.png'
const avatar3 = process.env.PUBLIC_URL + '/images/avatar3.png'
const avatar4 = process.env.PUBLIC_URL + '/images/avatar4.png'
const avatar5 = process.env.PUBLIC_URL + '/images/avatar5.png'
const avatar6 = process.env.PUBLIC_URL + '/images/avatar6.png'
const avatar7 = process.env.PUBLIC_URL + '/images/avatar7.png'
const avatar8 = process.env.PUBLIC_URL + '/images/avatar8.png'
const avatar9 = process.env.PUBLIC_URL + '/images/avatar9.png'
const avatar10 = process.env.PUBLIC_URL + '/images/avatar10.png'
const avatar11 = process.env.PUBLIC_URL + '/images/avatar11.png'

const banner1 = process.env.PUBLIC_URL + '/images/banner1.png'
const banner2 = process.env.PUBLIC_URL + '/images/banner2.png'

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11];
const banners = [banner1, banner2]

function EditProfileMW({close, userData, onUpdatedUser}) {
    const [selectedImage, setSelectedImage] = useState(avatars.find(i=>i===userData?.avatarUrl))
    const [selectedBanner, setSelectedBanner] = useState(banners.find(i=>i===userData?.bannerUrl))
    const [username, setUsername]=useState(userData?.username)
    const [bio, setBio]=useState(userData?.bio);
    useEffect(()=>
        {
            document.body.style.overflow='hidden';
            return ()=>document.body.style.overflow='auto'
        },[])

        const handleSubmit = async (e)=>
        {
            e.preventDefault();
            if(!selectedImage) {alert('Select an image'); return}
    
            const updatedUser = 
            {
                username,
                bio,
                avatarUrl: selectedImage,
                bannerUrl: selectedBanner,
            }
    
            try {                
                const res = await fetch(`${API_URL}:${PORT}/artist-page/${userData?._id}/update`,
                    {
                        method: 'POST',
                        headers:{'Content-Type':'application/json'},
                        body: JSON.stringify(updatedUser),
                    }
                )
    
                const data = await res.json()
                if (res.ok) {
                    onUpdatedUser(data);
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
    return <div className="editProfileMW">
        <div className="editProfileMWContent">
            <button className="close" onClick={close}>⨉</button>
            <form onSubmit={handleSubmit}>
                <label>
                    Banner
                    <div className="bannerCollection">
                        {banners.map((b, index)=>
                        <img src={b} 
                        alt="banner" 
                        className={`banner ${b === selectedBanner ? 'selected' : ''}`} 
                        onClick={()=>setSelectedBanner(b)}
                        key={index}/>
                        )}
                    </div>
                </label>
                <label>Avatar
                    <div className="avatarCollection">
                        {avatars.map((item, index)=>
                        { return <img 
                        src={item} 
                        alt='avatar' 
                        key={index} 
                        className={`avatar ${item === selectedImage ? 'selected' : ''}`}
                        onClick={()=>setSelectedImage(item)}/>})}
                    </div>
                </label>
                <label>Username
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder='Username'/>
                </label>
                <label>Bio
                    <textarea
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                    placeholder='Bio'></textarea>
                </label>
                <button>Update</button>
            </form>
        </div>
    </div>
}

export default EditProfileMW;