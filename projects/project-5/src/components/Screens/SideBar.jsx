import SideBarComponent from "./SideBarComponent/SideBarComponent"

function SideBar({close}) {
    return <div className="sideBar" onClick={close}>
        <SideBarComponent close={close}/>
    </div>
}

export default SideBar