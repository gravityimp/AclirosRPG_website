import React, { FC, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

import LoginForm from "../Form/LoginForm";

const styles = {
  loginBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

interface ModalLoginProps {
  isOpen: boolean;
  handleClose: () => void;
  setToken: (token: any) => void;
  setUser: (user: any) => void;
}

const ModalLogin: FC<ModalLoginProps> = (props) => {
  const { isOpen, handleClose, setToken, setUser } = props;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={styles.loginBox}
      aria-labelledby="modal-login-login"
      aria-describedby="modal-login-description"
    >
      <LoginForm setToken={setToken} setUser={setUser} handleClose={handleClose} />
    </Modal>
  );
};

export default ModalLogin;
