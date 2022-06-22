import { AccountCircle, Close, Lock } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  Typography,
  TextField,
  Alert,
  Button,
  IconButton,
  Paper
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { apiClient } from "../../api/database";
import { styles } from './newstyles';

interface Props {
  setToken: (token: any) => void;
  setUser: (user: any) => void;
  handleClose: () => void;
}

const LoginForm: FC<Props> = ({ setToken, setUser, handleClose }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e: React.FormEvent) => {
    apiClient.post("api/users/login", { name, password }).then(res => {
      e.preventDefault();
      localStorage.setItem("token", res.data.accessToken);
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      handleClose();
      enqueueSnackbar("LOGGED IN", {
        variant: "success"
      });
    }).catch(err => {
      setError(err.response.data.message);
      enqueueSnackbar(err.response.data.message, {
        variant: "error"
      });
    });
  };

  return (
    <Box sx={styles.general}>
      {error !== null && (
        <Alert
          severity="error"
          sx={{
            padding: "8px 16px",
            width: "80%",
            textAlign: "center",
            margin: "12px 0"
          }}
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
              <Close />
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center"
        }}
      >
        <TextField
          label="Name"
          placeholder="Name"
          sx={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          sx={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" sx={styles.button} onClick={handleSubmit}>
          Sign in
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
