import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul 
            className="pagination"
                style={{ display: "flex", justifyContent: "center" }}
            >
                {pageNumbers.map((number) => (
                    <li 
                        key={number} 
                        className={`page-item ${currentPage === number ? "active" : ""}`}
                    >
                        <button 
                        onClick={() => setCurrentPage(number)} 
                        className="page-link"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
