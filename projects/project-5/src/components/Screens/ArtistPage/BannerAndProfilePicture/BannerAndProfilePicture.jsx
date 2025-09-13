import './bannerAndProfilePicture.css'

import banner from '../../../../assets/images/banner.png'
import avatar8 from '../../../../assets/images/avatar8.png'

function BannerAndProfilePicture() {
    return <div className="bannerAndProfilePicture">
        <img src={banner} alt="banner" className="banner"/>
        <div className="profileImage">
            <img src={avatar8} alt="avatar" className="avatar"/>
        </div>
    </div>
}

export default BannerAndProfilePicture;