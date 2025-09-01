export function AdvancedProduct({product})
{
    return <div>Title: {product.title}, Price: {product.price}, Category: {product.category}</div>
}

function customValidator(props, propName, componentName)
{
    const product = props[propName]
    if (!product) {
        return new Error(`${propName} is required in ${componentName}`)
    }
    if (typeof product.title !== 'string' || product.title.trim() === '') {
        return new Error(`Invalid prop ${propName}.title in ${componentName}, it must be a non-empty string`);
    }
    if (typeof product.price !== 'number' || product.price <= 0) {
        return new Error(`Invalid prop ${propName}.price in ${componentName}, it must be a positive number`);
    }
    const categories = ['food', 'clothes', 'electronics'];
    if (!categories.includes(product.category)) {
        return new Error(`Invalid prop ${propName}.category in ${componentName}, it must be one of these categories - ${categories.join(', ')}`);
    }

    return null;
}

AdvancedProduct.propTypes =
{
    product: customValidator
}