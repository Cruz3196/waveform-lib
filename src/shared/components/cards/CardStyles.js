const CardStyles = {
    CardContainer : {
        minHeight: "120px",  
        height: "auto",  
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        width: "100%"
    },
    CardStyle: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: "900px",
        height: "auto",
        padding: "15px",
        alignItems: "center",
        border: "none",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
    },
    CardImage: {
        width: "100%",
        maxWidth: "300px",
        height: "180px",
        objectFit: "cover",
    },
    TitleStyle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    DescriptionStyle: {
        fontSize: "14px",
        color: "#666",
    }
};

export default CardStyles;
