/* eslint-disable react-hooks/exhaustive-deps */
import './heading.css'

import searchIcon from '../../../../assets/images/searchIcon.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

const usersIDArray = 
[
    '68dfd2966dff33e74b88403d',
    '68dfd2d56dff33e74b884047',
    '68dfd3a06dff33e74b884051',
]

function Heading() {
    const [inputIdValue, setInputIdValue] = useState('')
    const [selectOption, setSelectOption] = useState('user');
    const [debounce, setDebounce] = useState('');
    const [foundUser, setFoundUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    useEffect(()=>
    {
        const handler = setTimeout(()=>
        {
            setDebounce(inputIdValue)
        }, 500)
        return ()=>clearTimeout(handler)
    }, [inputIdValue])

    useEffect( ()=>
    {
        if (!debounce) {
            setFoundUser(null);
            return;
        }
        setLoading(true);

        
        (async () =>
        {
            try {
                const res = await fetch(`${API_URL}:${PORT}/find-user-by-id/${inputIdValue}`)
    
                if(!res.ok) throw new Error ({error: 'Error while finding user by id'})
                
                const data = await res.json();
    
                setFoundUser(data)
                setLoading(false)
            } catch (err) {
                console.error(err);
            }
        })()
    }, [debounce])

    return <div className="heading">
        <div className="headingData">
            <h4>Browse Marketplace</h4>
            <span>Browse through more than 50k NFTs on the NFT Marketplace.</span>
        </div>
        <div className="inputWrapper">
            <input 
            type="text" 
            value={inputIdValue}
            placeholder={selectOption === 'user' ? 'Search user by ID' : 'Search your favourite NFTs'}
            onChange={(e)=>setInputIdValue(e.target.value)}/>
            <select value={selectOption} onChange={(e)=>setSelectOption(e.target.value)}>
                <option value="user">user</option>
                <option value="nft">nft</option>
            </select>
            <img src={searchIcon} alt="search" />
        </div>
        <div className="mockIDs">
            {usersIDArray.map((u, index)=>
            <button className='mockUserID' key={index} onClick={async () => {
                const text = u || "";

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
            }}>{u.slice(0, 4)}...{u.slice(-3)}</button>
            )}
        </div>
        {inputIdValue && (
            !loading && foundUser ? (
                <div className='foundSection'>
                    <div className="artistInfo" onClick={() => navigate(`/artist-page/${foundUser._id}`)}>
                        <img src={foundUser?.avatarUrl} alt="avatar" />
                        <div className="usernameAndID">
                            <span className='username'>{foundUser.username}</span>
                            <span className='id'>{foundUser._id}</span>
                        </div>
                    </div>
                </div>
            ) : (
                (
                    <div className='foundSection'>
                        <h3 className='notFound'>No user found :⟮</h3>
                    </div>
                )
            )
        )}
    </div>
}

export default Heading