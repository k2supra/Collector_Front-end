let username: string
let age: number
let isAdmin: boolean
let	skills: string[]
let	role: "admin" | "user" | "guest"

function sum(a:number, b:number):number {
    return a + b
}
function getFirstElement<T>(arr: T[]): T
{
    return arr[0];
}

interface User 
{
    id: number,
    name: string,
    email?: string,
}

type PartialUser = Partial<User>;


const partialUser : PartialUser =
{
    id: 5,
    email: 'text'
}

async function fetchData<T>(url: string): Promise<T>
{
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error('Error')
        }
        return await resp.json() as T
    } catch (error) {
        throw error;
    }
}

type Message =
| { type: "text"; content: string }
| { type: "image"; url: string }
| { type: "video"; url: string; duration: number };


function renderMessage(msg: Message): string
{
    switch (msg.type) {
        case 'text':
            return 'Text' + msg.content
        case 'image':
            return 'Text' + msg.url
        case 'video':
            return 'Text' + msg.url + ` - ${msg.duration}`
    
        default:
            return 'Unknown type'
    }
}

type ApiResponse<T> = {
    status: "success" | "error";
    data: T | null;
    error?: string;
}

let userResponse : ApiResponse<User> =
{
    status: 'success',
    data:
    {
        id: 7,
        name: 'Bob'
    }
}

type Product = 
{
    name: string,
    inStock: boolean,
    amount: number
}

let productResponse : ApiResponse<Product> =
{
    status: 'success',
    data:
    {
        name: 'Product 1',
        amount: 4,
        inStock: true
    }
}