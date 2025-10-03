/* eslint-disable no-unused-vars */
import './leadersList.css'

import { useNavigate } from 'react-router-dom'

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

function LeadersList() {
    const navigate = useNavigate()
    return <div className="leadersList">
        <div className="tabs">
            <input type="radio" id="1d" name="tabs" defaultChecked hidden />
            <label htmlFor="1d" className="tab">1d</label>
            <input type="radio" id="7d" name="tabs" hidden />
            <label htmlFor="7d" className="tab">7d</label>
            <input type="radio" id="30d" name="tabs" hidden />
            <label htmlFor="30d" className="tab">30d</label>
            <input type="radio" id="allTime" name="tabs" hidden />
            <label htmlFor="allTime" className="tab">All Time</label>
        </div>
        <ul className="list">
            <li className="header">
                <span>Artist</span>
                <span className='forTabletAndDesktop change'>Change</span>
                <span className='forDesktop sold'>NFTs Sold</span>
                <span className='volume'>Volume</span>
            </li>
            <li className="leaderItem" onClick={()=>navigate('/artist-page/68dfd2966dff33e74b88403d')}>
                <div className="artist">
                    <img src={avatar11} alt="Animakid" className="avatar" />
                    <span className='name'>Animakid</span>
                </div>
                <span className='forTabletAndDesktop change green'>+0.7%</span>
                <span className='forDesktop sold'>93</span>
                <span className="volume">15 ETH</span>
            </li>
            <li className="leaderItem">
                <div className="artist" onClick={()=>navigate('/artist-page/68dfd2d56dff33e74b884047')}>
                    <img src={avatar2} alt="Afan Gem" className="avatar" />
                    <span className='name'>Afan Gem</span>
                </div>
                <span className='forTabletAndDesktop change green'>+2%</span>
                <span className='forDesktop sold'>563</span>
                <span className="volume">14 ETH</span>
            </li>
            <li className="leaderItem" onClick={()=>navigate('/artist-page/68dfd3a06dff33e74b884051')}>
                <div className="artist">
                    <img src={avatar3} alt="BBhg" className="avatar" />
                    <span className='name'>BBhg</span>
                </div>
                <span className='forTabletAndDesktop change red'>-1.1%</span>
                <span className='forDesktop sold'>602</span>
                <span className="volume">14 ETH</span>
            </li>
            <li className="leaderItem" onClick={()=>navigate('/artist-page/68dfd3c36dff33e74b884058')}>
                <div className="artist">
                    <img src={avatar4} alt="AlexTheBest" className="avatar" />
                    <span className='name'>AlexTheBest</span>
                </div>
                <span className='forTabletAndDesktop change green'>+7%</span>
                <span className='forDesktop sold'>74</span>
                <span className="volume">13 ETH</span>
            </li>
            <li className="leaderItem" onClick={()=>navigate('/artist-page/68dfd3e36dff33e74b88405f')}>
                <div className="artist">
                    <img src={avatar5} alt="AndriiTheBest" className="avatar" />
                    <span className='name'>AndriiTheBest</span>
                </div>
                <span className='forTabletAndDesktop change green'>+1.41%</span>
                <span className='forDesktop sold'>63</span>
                <span className="volume">12 ETH</span>
            </li>
        </ul>
    </div>
}

export default LeadersList