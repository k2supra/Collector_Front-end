import PropTypes from "prop-types";

export function ListOrSingle({data})
{
    if (Array.isArray(data)) 
    {
        return <ul>
            {data.map((i, index)=><li key={index}>{i}</li>)}
        </ul>
    }
    if (data && data.value) 
    {
        return <div>{data.value}</div>
    }
    
    return <div>No data</div>
}

ListOrSingle.propTypes=
{
    data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({value: PropTypes.string})])
}