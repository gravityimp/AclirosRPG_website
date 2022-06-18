export const styles = {
    box: {
      maxWidth: "60%",
      height: '60%',
      width: '60%',
      padding: "8px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      ["@media (max-width:599px)"]: {
        // eslint-disable-line no-useless-computed-key
        width: "95%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto"
      }
    },
    itemPreview: {
      display: "flex",
      flexDirection: "colum",
      justifyContent: "center",
      alignItems: "center",
      width: "40%"
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    },
    general: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    specific: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "height .5s"
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    top: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "end",
      alignItems: "center"
    },
    formTitle: {
      fontSize: "34px",
      fontWeight: "bold",
      margin: "4px 4px 16px 4px"
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "4px 4px 16px 4px"
    },
    formInput: {
      margin: "8px",
      width: "80%",
      maxWidth: "250px"
    },
    button: {
      width: "30%",
      margin: "8px"
    }
  };