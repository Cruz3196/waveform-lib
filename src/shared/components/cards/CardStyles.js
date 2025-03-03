const CardStyles = {
    CardContainer : {
        minHeight: "120px",  
        height: "auto",  
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        marginTop: "30px",
        marginBottom: "30px"
    },
    Cardbody: {         
        border: "none",
        padding: "0", 
        margin: "0"
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
