import { AccountCircle, Close, Lock } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  Typography,
  TextField,
  Alert,
  Button
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { apiClient } from "../../api/database";

const styles = {
  formBox: {
    width: "500px",
    height: "fit-content",
    padding: "8px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
  },
  signupBox: {
    width: "500px",
    height: "fit-content",
    padding: "8px",
    backgroundColor: "#85C0FF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px"
  },
  formTitle: {
    fontSize: "34px",
    fontWeight: "bold",
    margin: "4px 4px 16px 4px"
  },
  formInput: {
    margin: "8px",
    width: "100%"
  },
  formSubmit: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "80%",
    alignSelf: "center"
  },
  signupTitle: {
    fontSize: "22px",
    margin: "4px 4px 8px 4px"
  },
  signupButton: {
    marginTop: "4px",
    marginBottom: "8px",
    width: "50%",
    alignSelf: "center",
    maxWidth: "100px",
    backgroundColor: "#0063CC"
  }
};

interface Props {
  setToken: (token: any) => void;
  setUser: (user: any) => void;
  handleClose: () => void;
}

const LoginForm: FC<Props> = ({ setToken, setUser, handleClose }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = (e: React.FormEvent) => {
    console.log("here")
    apiClient.post("api/users/login", { name, password }).then(res => {
      e.preventDefault();
      localStorage.setItem("token", res.data.accessToken);
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
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
    <Box>
      <Box sx={styles.formBox}>
        <Typography sx={styles.formTitle}>Sign In</Typography>
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
            padding: "8px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <FormControl>
            <TextField
              label="Name"
              placeholder="Name"
              sx={styles.formInput}
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
              sx={styles.formInput}
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
            <Button variant="contained" sx={styles.formSubmit} onClick={handleSubmit}>
              Sign in
            </Button>
          </FormControl>
        </form>
      </Box>
      <Box sx={styles.signupBox}>
        <Typography sx={styles.signupTitle}>Don't have an account?</Typography>
        <Button variant="contained" sx={styles.signupButton} >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
