import React from 'react';
import Table from 'react-bootstrap/Table';

const postTable = () => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <th key={index}>Table heading</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Array.from({ length: 4}).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
            </tbody>
        </Table>
    );
}

export default postTable;