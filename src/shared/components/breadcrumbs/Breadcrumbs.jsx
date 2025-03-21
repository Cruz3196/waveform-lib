import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs