import { Modal } from "@mui/material";
import { FC } from "react";

const styles = {
    modal: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
  };

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
}

const EditModal: FC<EditModalProps> = (props) => {

    const { isOpen, onClose, children } = props;

    return (
        <Modal open={isOpen} onClose={onClose} sx={styles.modal}>
            {children}
        </Modal>
    );
};

export default EditModal;