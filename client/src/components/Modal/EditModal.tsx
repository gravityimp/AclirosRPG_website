import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { styles } from "./styles";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: any;
}

const EditModal: FC<EditModalProps> = (props) => {

    const { isOpen, onClose, children, title } = props;

    return (
        <Modal sx={styles.modal} open={isOpen} onClose={onClose}>
            <Paper elevation={6} sx={styles.paperModal}>
                <Box sx={styles.topBar}>
                    <Typography sx={{ marginLeft: "8px" }} variant="h4">
                        {title}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
                {children}
            </Paper>
        </Modal>
    );
};

export default EditModal;