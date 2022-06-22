
export const styles = {
    modal: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    paperModal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        width: "70%",
        maxWidth: "600px",
        minHeight: "70vh",
        height: "fit-content",
        "@media (max-width: 650px)": {
            width: "100%",
            paddingLeft: "32px",
            paddingRight: "32px"
        }
    },
    topBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px"
    }
};