export function AtLeastOne({items}) {
    return <div>{items.map((i, index) => <div key={index}>{i}</div>)}</div>
}

function customValidator(props, propName) {
    if (Array.isArray(props[propName]) && props[propName].length >= 1) {
        return null;
    }
    return new Error('Must be an Array and have at least 1 item')
}

AtLeastOne.propTypes=
{
    items: customValidator
}