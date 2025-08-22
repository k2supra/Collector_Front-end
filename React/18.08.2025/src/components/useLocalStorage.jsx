export function useLocalStorage(key, initialValue) {
    let value = localStorage.getItem(key) || initialValue;
    const updateLSFunction = (newValue) =>
    {
        localStorage.setItem(key, newValue);
    }
    return [value, updateLSFunction]
}