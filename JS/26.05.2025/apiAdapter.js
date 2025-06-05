const oldAPI ={
    getEvents:()=>[{title:'Old consert', price:300, date:'2025-05-31'}]
}
export const newAPIAdapter = {
    fetchEvents:()=>{
        const oldData = oldAPI.getEvents();
        return oldData.map(e=>({
            ...e,
            isOld:true
        }))
    }
}