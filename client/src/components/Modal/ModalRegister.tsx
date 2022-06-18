import React, { FC, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

import RegisterForm from "../Form/RegisterForm";

const styles = {
  registerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

interface ModalRegisterProps {
  isOpen: boolean;
  handleClose: () => void;
  setToken: (token: any) => void;
  setUser: (user: any) => void;
}

const ModalLogin: FC<ModalRegisterProps> = (props) => {
  const { isOpen, handleClose, setToken, setUser } = props;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styles.registerBox}
    >
      <RegisterForm setToken={setToken} setUser={setUser} handleClose={handleClose} />
    </Modal>
  );
};

export default ModalLogin;
