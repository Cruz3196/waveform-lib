const CardStyles = {
    CardContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        marginTop: "30px",
        marginBottom: "30px",
        backgroundColor: "#f5f5f5",
      },
      Cardbody: {
        border: "none",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        backgroundColor: "white",
        overflow: "hidden",
        height: "350px"
      },
      ImageColumn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px",
        
      },
      CardImage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",  // Set a fixed height to ensure visibility
        padding: "15px",
      },
      ContentColumn: {
        paddingLeft: "20px", // Added extra padding to push content right
      },
      TitleStyle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
        textAlign: "left",
      },
      DescriptionStyle: {
        fontSize: "14px",
        color: "#666",
        textAlign: "left",
      }
};  

export default CardStyles;
