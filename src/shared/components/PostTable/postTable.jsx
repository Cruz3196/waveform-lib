import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import useFetchPosts from "../cards/useFetchPosts"; // Fetch posts from Firebase
import postTableStyles from "./postTableStyles";

const PostTable = () => {
    const posts = useFetchPosts(); // Fetch posts dynamically

    return (
        <div style={postTableStyles.tableContainer}>
            <h2 style={postTableStyles.tableHeading}>Latest Comments</h2>
            <Table responsive bordered hover style={postTableStyles.table}>
                <thead>
                    <tr>
                        <th style={postTableStyles.thTd}>Author</th>
                        <th style={postTableStyles.thTd}>Comment</th>
                        <th style={postTableStyles.thTd}>Signal</th>
                        <th style={postTableStyles.thTd}>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={index}>
                            <td style={postTableStyles.thTd}>{post.username || "Unknown"}</td>
                            <td style={postTableStyles.thTd}>{post.description}</td>
                            <td style={postTableStyles.thTd}>
                                <Link
                                    to={`/post/${post.id}`}
                                    style={{ textDecoration: "none", color: "blue" }}
                                >
                                    {post.title}
                                </Link>
                            </td>
                            <td style={postTableStyles.thTd}>{post.date || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PostTable;
