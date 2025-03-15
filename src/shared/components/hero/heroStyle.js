const heroStyle = {
    heroContainer : {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: "center", 
        height: "450px",
        marginTop: "3rem",
        padding: "10px",
    }, 
    heroTitleContainer:{
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
    },
    heroTitle:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "bold",
        color: "#0089cf",
    },
    heroSearchContainer:{
        width: "100%",
        display: "flex",
        justifyContent: "space-between", 
        marginTop: "20px", 
        flexWrap: "wrap" 
    },
    heroInfoContainer:{
        minHeight: "120px",  
        height: "auto",  
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        backgroundColor: "white",
    }
}

export default heroStyle;