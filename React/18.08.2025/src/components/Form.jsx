import { useLocalStorage } from "./useLocalStorage";

export function Form() {
    const [inputValue, setInputValue] = useLocalStorage('inputName', 'testName')
    return(<form onSubmit={(e)=>e.preventDefault()}
    style={{width:'300px', display:'flex', flexDirection:'column', gap:'8px', margin:'15px auto'}}>
        <input type="text" placeholder="Name" defaultValue={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        <button
        style={{backgroundColor:'lightblue', color:'white', border:'0', borderRadius:'16px', padding:'8px 16px'}}
        >Just 'Next' button</button>
    </form>)
}