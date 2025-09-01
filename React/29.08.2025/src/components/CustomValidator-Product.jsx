import PropTypes from "prop-types";

export function Product({product}) {
    return <div>{product.title} - {product.price}</div>
}

function customValidator(props, propName) {
    if (typeof props[propName] === 'number' && props[propName] > 0) {
        return null;
    }
    return new Error('Must be a number and be more than 0')
}

Product.propTypes=
{
    product: PropTypes.shape(
        {
            title: PropTypes.string,
            price: customValidator
        }
    )
}