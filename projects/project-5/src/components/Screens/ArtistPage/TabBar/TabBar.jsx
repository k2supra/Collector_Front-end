import './tabBar.css'

function TabBar({activeTab, setActiveTab}) {
    return <div className="tabBar">
        <div className="tabs">
            <input type="radio" id="Created" name="tabs" checked={activeTab === 'created'} onChange={()=>setActiveTab('created')} hidden />
            <label htmlFor="Created" className="tab">Created</label>
            <input type="radio" id="Owned" name="tabs" checked={activeTab === 'owned'} onChange={()=>setActiveTab('owned')} hidden />
            <label htmlFor="Owned" className="tab">Owned</label>
            <input type="radio" id="Collections" name="tabs" checked={activeTab === 'collections'} onChange={()=>setActiveTab('collections')} hidden />
            <label htmlFor="Collections" className="tab">Collection</label>
        </div>
    </div>
}

export default TabBar