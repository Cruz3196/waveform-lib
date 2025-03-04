import React from "react";
import PaginationStyles from "./PaginationStyles";

const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={PaginationStyles.pagination}>
                {pageNumbers.map((number) => (
                    <li key={number} style={PaginationStyles.pageItem}>
                        <button
                            onClick={() => setCurrentPage(number)}
                            style={{
                                ...PaginationStyles.pageButton,
                                ...(currentPage === number ? PaginationStyles.activePageButton : {}),
                            }}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li style={PaginationStyles.pageItem}>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                        style={{
                            ...PaginationStyles.pageButton,
                            ...(currentPage === pageNumbers.length
                                ? PaginationStyles.disabledPageButton
                                : {}),
                        }}
                    >
                        »
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
