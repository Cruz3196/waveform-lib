import React, { useEffect, useState } from 'react';
import CustomSpinner from './CustomSpinner';

function Loader (){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <div>
            {loading && <CustomSpinner/>}
        </div>
    )
}

export default Loader;