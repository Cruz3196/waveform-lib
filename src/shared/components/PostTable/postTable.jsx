import React from 'react';
import Table from 'react-bootstrap/Table';
import postTableStyles from './postTableStyles';

const PostTable = () => {
    const tableTitle = ["Author", "Comment", "Signal", "Date Added"];
    const tableData = [
        { author: "r2guja", comment: "Opens fine in picoscope 7 T&M v7.1.29.19560.", signal: "Good timing-CKP & CMP signal-Seat-Leon Mk2 (1P)", date: "9 February 2025 17:59" },
        { author: "Szilágyi", comment: "pico file doesn't open in v7.1.47.4843", signal: "Good timing-CKP & CMP signal-Seat-Leon Mk2 (1P)", date: "9 February 2025 12:45" },
        { author: "alexjimnz", comment: "Este oscilograma es ejemplo de cómo se debe de ver un Problema Mecánico.", signal: "Faulty CMP sensor - CKP & CMP signal - Chevrolet - Lacetti 2002+", date: "7 February 2025 04:26" },
        { author: "lp4ik", comment: "A3/S3/Sportb./Lim./qu./Дата выпуска: 07.05.2010...", signal: "CKP & CMP signal-Skoda-Octavia 2 (1Z) 2004-2013", date: "4 February 2025 14:25" }
    ];

    return (
        <div style={postTableStyles.tableContainer}>
            <h2 style={postTableStyles.tableHeading}>Latest Comments</h2>
            <Table responsive bordered hover style={postTableStyles.table}>
                <thead>
                    <tr>
                        {tableTitle.map((title, index) => (
                            <th key={index} style={postTableStyles.thTd}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td style={postTableStyles.thTd}>{row.author}</td>
                            <td style={postTableStyles.thTd}>{row.comment}</td>
                            <td style={postTableStyles.thTd}>
                                <a href="#" style={postTableStyles.tableLink}>
                                    {row.signal}
                                </a>
                            </td>
                            <td style={postTableStyles.thTd}>{row.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PostTable;
