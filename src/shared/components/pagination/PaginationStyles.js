const PaginationStyles = {
    pagination: {
        display: "flex",
        justifyContent: "center",
        listStyle: "none",
        padding: 0,
        marginTop: "15px",
    },
    pageItem: {
        margin: "0 5px",
    },
    pageButton: {
        border: "1px solid #0089cf",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
        backgroundColor: "white",
        color: "#0089cf",
    },
    activePageButton: {
        backgroundColor: "#0089cf",
        color: "white",
        fontWeight: "bold",
    },
    disabledPageButton: {
        backgroundColor: "#0089cf",
        color: "white",
        cursor: "not-allowed",
        opacity: 0.5,
    },
};

export default PaginationStyles;
