import React from 'react';
import Table from 'react-bootstrap/Table';

const PostTable = () => {
    const tableTitle = ["Author", "Comment", "Signal", "Date Added"];

    return (
        <div className="post-table-container">
            <h2 className="table-header">Latest Comments</h2> {/* Title above the table */}
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        {tableTitle.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tableTitle.map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default PostTable;
