export const createTicketProxy =(ticket, userRole)=>{
    return new Proxy(ticket,{
        get(target, prop){
            if(prop === 'price' && userRole !=='admin'){
                console.warn('price is hidden for non-admins')
                return 'Access is restricted'
            }
            if (prop === 'title' && userRole === 'anonym') {
                console.warn('title is hidden for anonymous users');
                return 'Access is restricted';
            }
            return target[prop]
        }
    })
}