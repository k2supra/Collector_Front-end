export const logExecution = (fn)=>
{
    return (...args)=>{
        console.log('Start');
        const result = fn(...args);
        console.log(`Finish`);
        return result;
    }
}