import React, { FC, useState } from "react";
import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";

import LoginForm from "../Form/LoginForm";
import { styles } from './styles';
import { Close } from "@mui/icons-material";

interface ModalLoginProps {
  isOpen: boolean;
  handleClose: () => void;
  setToken: (token: any) => void;
  setUser: (user: any) => void;
  title?: string;
}

const ModalLogin: FC<ModalLoginProps> = (props) => {
  const { isOpen, handleClose, setToken, setUser, title } = props;

  return (
    <Modal sx={styles.modal} open={isOpen} onClose={handleClose}>
      <Paper elevation={6} sx={styles.paperModal}>
        <Box sx={styles.topBar}>
          <Typography sx={{ marginLeft: "8px" }} variant="h4">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <LoginForm setToken={setToken} setUser={setUser} handleClose={handleClose} />
      </Paper>
    </Modal>
  );
};

export default ModalLogin;
