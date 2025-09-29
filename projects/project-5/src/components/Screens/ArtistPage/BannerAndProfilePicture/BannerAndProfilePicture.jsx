import './bannerAndProfilePicture.css'

import banner from '../../../../assets/images/banner.png'
import avatar8 from '../../../../assets/images/avatar8.png'
import { useSelector } from 'react-redux'

function BannerAndProfilePicture({userData}) {
    const currentUser = useSelector(state=>state.user.currentUser)
    return <div className="bannerAndProfilePicture">
        <img src={banner} alt="banner" className="banner"/>
        <div className="profileImage">
            <img src={userData?.avatarUrl} alt="avatar" className="avatar circle"/>
        </div>
    </div>
}

export default BannerAndProfilePicture;