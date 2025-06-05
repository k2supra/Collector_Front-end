export const UserStore=(()=>{
    let user = null;
return{
    setUser(data){
        user = data;
    },
    getUser(){
        return user;
    },
    buyTicket(event)
    {
        user["tickets"].push(event);
    },
    returnTicket(event)
    {
        if (!user['tickets'].includes(event)) {
            throw new Error(`there is no ticket for ${event.title}`);
        }
        user['tickets'].splice(user['tickets'].findIndex(event), 1)
    },
    getTickets()
    {
        return user["tickets"];
    }
}
})()