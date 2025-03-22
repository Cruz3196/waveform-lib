import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import useFetchPosts from "../cards/useFetchPosts"; // Fetch posts from Firebase
import postTableStyles from "./postTableStyles";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader

const PostTable = () => {
    const posts = useFetchPosts(); // Fetch posts dynamically
    const [loading, setLoading] = useState(true);

    // Effect to detect when posts are loaded and simulate delay
    useEffect(() => {
        const delay = setTimeout(() => {
            if (posts.length > 0) {
                setLoading(false);
            }
        }, 3000); // 3 seconds delay

        return () => clearTimeout(delay); // Cleanup timeout
    }, [posts]);

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
                    {loading ? (
                        // Show skeleton loaders if still loading with delay
                        Array(5).fill(0).map((_, index) => (
                            <tr key={index}>
                                <td style={postTableStyles.thTd}>
                                    <Skeleton width="100px" />
                                </td>
                                <td style={postTableStyles.thTd}>
                                    <Skeleton count={1} />
                                </td>
                                <td style={postTableStyles.thTd}>
                                    <Skeleton width="80px" />
                                </td>
                                <td style={postTableStyles.thTd}>
                                    <Skeleton width="150px" />
                                </td>
                            </tr>
                        ))
                    ) : (
                        // Show only the first 10 posts when they are loaded
                        posts.slice(0, 10).map((post, index) => (
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
                                <td style={postTableStyles.thTd}>
                                    {post.created
                                        ? new Date(post.created.seconds * 1000).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            timeZoneName: "short",
                                        })
                                        : "N/A"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default PostTable;
