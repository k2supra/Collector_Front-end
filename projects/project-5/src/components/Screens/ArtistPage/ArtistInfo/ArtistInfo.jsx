/* eslint-disable react-hooks/exhaustive-deps */
import './artistInfo.css'

import copyLogo from '../../../../assets/images/copyLogo.png'
import plusLogo from '../../../../assets/images/plusLogo.png'
import globeLogo from '../../../../assets/images/globeLogo.png'
import discordLogo from '../../../../assets/images/discordLogo.png'
import youtubeLogo from '../../../../assets/images/youtubeLogo.png'
import twitterLogo from '../../../../assets/images/twitterLogo.png'
import instagramLogo from '../../../../assets/images/instagramLogo.png'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, updateUser } from '../../../RTK/userSlice'
import EditProfileMW from './EditProfileMW/EditProfileMW'

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

function ArtistInfo({userData, loading, error}) {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate()
    const [showEditProfileMW, setShowEditProfileMW] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [followButtonText, setFollowButtonText] = useState('Follow')

    useEffect(()=>
    {
        setShowLogout(userData?._id===currentUser?._id)

        if (userData?.followers.find(f=>f._id === currentUser?._id)) {
            setIsFollowed(true);
            setFollowButtonText('Followed')
        }
        else 
        {
            setIsFollowed(false);
            setFollowButtonText('Follow')
        }
    }, [userData])
    
    const handleFollow = async () =>
    {
        try {
            const res = await fetch(`${API_URL}:${PORT}/artist-page/${userData?._id}/followedBy/${currentUser?._id}`,
                {
                    method: 'POST',
                    headers:{'Content-Type':'application/json'},
                }
            )
            if(!res.ok) throw new Error('Error while following')
                setIsFollowed(true)
            setFollowButtonText('Followed')
        } catch (err) {
            console.error(err);            
        }
    }
    const handleUnfollow = async () =>
    {
        try {
            const res = await fetch(`${API_URL}:${PORT}/artist-page/${userData?._id}/unfollow/${currentUser?._id}`,
                {
                    method: 'POST',
                    headers:{'Content-Type':'application/json'},
                }
            )
            if(!res.ok) throw new Error('Error while following')
            setIsFollowed(false)
            setFollowButtonText('Follow')
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div style={{color: 'red'}}>{error}</div>
    if (!userData) return <div>No user data</div>

    return <div className="artistInfoSection">
        <h4 className="artistName">{userData.username}</h4>
        <div className="buttons">
            <button onClick={async () => {
            const text = userData?._id || "";

            try {
            if (navigator.clipboard && window.isSecureContext) {
                // Сучасний метод (працює в більшості браузерів, Android Chrome, нові Safari)
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback для старих/мобільних браузерів
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed"; // щоб не прокручувало
                textarea.style.opacity = 0;
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();

                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
            } catch (err) {
            console.error("Помилка копіювання:", err);
            alert("Не вдалося скопіювати ❌");
            }
        }}><img src={copyLogo} alt="id" />{userData._id.length>10 ? `${userData._id.slice(0, 4)}...${userData._id.slice(-3)}` : userData._id}</button>
            {!showLogout && <button onClick={()=>{
                if (!currentUser) navigate('/sign-up')
                isFollowed ? handleUnfollow() : handleFollow();
            }}>{isFollowed ? <span>✓</span> : <img src={plusLogo} alt="Follow" />}{followButtonText}</button>}
        </div>
        <div className="stats">
            <div className="statsItem">
                <h5>{userData?.stats?.volume || 0}</h5>
                <span>Volume</span>
            </div>
            <div className="statsItem">
                <h5>{userData?.stats?.sold || 0}</h5>
                <span>NFTs Sold</span>
            </div>
            <div className="statsItem" onClick={()=>navigate(`/artist-page/${userData?._id}/followers`)}>
                <h5>{userData?.followers.length || 0}</h5>
                <span>Followers</span>
            </div>
        </div>
        <div className="bio">
            Bio
            <span>{userData?.bio || 'No info'}</span>
        </div>
        <div className="webLinks">
            Links
            <div className="list">
                <img src={globeLogo} alt="internet" />
                <img src={discordLogo} alt="discord" />
                <img src={youtubeLogo} alt="youtube" />
                <img src={twitterLogo} alt="twitter" />
                <img src={instagramLogo} alt="instagram" />
            </div>
        </div>
        {showLogout && <div className='controls'>
            <button className='logout' onClick={()=>{dispatch(logout()); navigate('/'); setShowLogout(false)}}>Log out</button>
            <button className='edit' onClick={()=>{setShowEditProfileMW(true)}}>Edit</button>
            </div>}
        {showEditProfileMW && <EditProfileMW 
        close={()=>setShowEditProfileMW(false)} 
        userData={userData} 
        onUpdatedUser={(updatedUser)=>
        {
            dispatch(updateUser(updatedUser))
            setShowEditProfileMW(false);
        }
        }/>}
    </div>
}

export default ArtistInfo;