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
// import avatar2 from '../../../../../assets/images/avatar2.png'
// import avatar3 from '../../../../../assets/images/avatar3.png'
// import avatar4 from '../../../../../assets/images/avatar4.png'
// import avatar5 from '../../../../../assets/images/avatar5.png'
// import avatar6 from '../../../../../assets/images/avatar6.png'
// import avatar7 from '../../../../../assets/images/avatar7.png'

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11];

function EditProfileMW({close, userData, onUpdatedUser}) {
    const [selectedImage, setSelectedImage] = useState(avatars.find(i=>i===userData?.avatarUrl))
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
                avatarUrl: selectedImage
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
                <div className="avatarCollection">
                    {avatars.map((item, index)=>
                    { return <img 
                    src={item} 
                    alt='avatar' 
                    key={index} 
                    className={`avatar ${item === selectedImage ? 'selected' : ''}`}
                    onClick={()=>setSelectedImage(item)}/>})}
                </div>
                {console.log('************', avatar1 === userData?.avatarUrl)
                }
                {/* process.env.PUBLIC_URL + '/images/avatar.png' === userData?.avatarUrl */}
                {/* <img src={process.env.PUBLIC_URL + '/images/avatar2.png'}/> */}
                <input 
                type="text" 
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
                placeholder='Username'/>
                <textarea
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                placeholder='Bio'></textarea>
                <button>Update</button>
            </form>
        </div>
    </div>
}

export default EditProfileMW;