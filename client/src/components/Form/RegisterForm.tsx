import { Close, AccountCircle, Lock } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { apiClient } from "../../api/database";
import EditModal from "../Modal/EditModal";
import { styles } from './newstyles';

interface Props {
  setToken: (token: any) => void;
  setUser: (user: any) => void;
  handleClose: () => void;
}

const RegisterForm: FC<Props> = ({ setToken, setUser, handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [checkedTerms, setCheckedTerms] = React.useState<boolean>(false);

  const [playerName, setPlayerName] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [codeInput, setCodeInput] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTerms(event.target.checked);
  };

  const validateEmail = () => {
    if (!email.includes("@")) return "Email shoud contain @";
    if (email.length < 6) return "Email should be at least 6 characters long!";
    return "Looking Good!";
  };

  const validatePassword = () => {
    if (password.length < 6)
      return "Password should be at least 6 characters long!";
    return "Looking Good!";
  };

  const validatePasswordConfirm = () => {
    if (passwordConfirm !== password) return "Passwords do not match";
    return "Looking Good!";
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (codeInput === "") {
      setError("Please enter player code");
      enqueueSnackbar("Player Code is empty", {
        variant: "error"
      });
      return;
    }
    if (
      validatePassword() !== "Looking Good!" ||
      validateEmail() !== "Looking Good!" ||
      validatePasswordConfirm() !== "Looking Good!"
    ) {
      return;
    }
    apiClient.post("api/users/register", {
      email,
      password,
      userCode: codeInput
    }).then(res => {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      handleClose();
      enqueueSnackbar("REGISTERED", {
        variant: "success"
      });
    }).catch(err => {
      setError(err.response.data.message);
      enqueueSnackbar(err.response.data.message, {
        variant: "error"
      });
    });
  };

  const generatePlayer = (e: any) => {
    e.preventDefault();
    apiClient.post("api/players/generate", { name: playerName }).then(res => {
      setCode(res.data.userCode);
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
          sx={styles.alert}
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
              <Close />
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      <Paper elevation={4} sx={{ ...styles.input, margin: '16px', padding: '16px' }}>
        <Typography variant="h5" sx={{ width: '100%', textAlign: 'center' }}>Generate Player</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            label="New Player Name"
            type="text"
            placeholder="PlayerName"
            sx={{ marginX: '8px' }}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <Button
            variant="contained"
            sx={styles.button}
            onClick={generatePlayer}
          >GENERATE</Button>
          <Typography sx={{ marginLeft: '8px' }}>{code}</Typography>
        </Box>
      </Paper>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TextField
          label="Email"
          placeholder="test@test.ts"
          sx={styles.input}
          error={validateEmail() !== "Looking Good!"}
          helperText={validateEmail()}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
          FormHelperTextProps={{
            style: {
              color: validateEmail() === "Looking Good!" ? "#0E5835" : "red"
            }
          }}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="TesT_123"
          sx={styles.input}
          error={validatePassword() !== "Looking Good!"}
          helperText={validatePassword()}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
          FormHelperTextProps={{
            style: {
              color:
                validatePassword() === "Looking Good!" ? "#0E5835" : "red"
            }
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="TesT_123"
          sx={styles.input}
          error={validatePasswordConfirm() !== "Looking Good!"}
          helperText={validatePasswordConfirm()}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
          FormHelperTextProps={{
            style: {
              color:
                validatePasswordConfirm() === "Looking Good!"
                  ? "#0E5835"
                  : "red"
            }
          }}
        />
        <Box sx={styles.checkboxGroup}>
          <Checkbox checked={checkedTerms} onChange={handleChange} />
          <Typography>Accept Terms of usage</Typography>
        </Box>
        <TextField
          label="Code"
          type="text"
          placeholder="AB4CK4"
          sx={styles.input}
          value={codeInput}
          onChange={(e) => {
            if (e.target.value.length < 7) {
              setCodeInput(e.target.value.toLocaleUpperCase());
            }
          }}
        />
        <Button
          variant="contained"
          color="success"
          sx={styles.button}
          disabled={
            validateEmail() !== "Looking Good!" ||
            validatePassword() !== "Looking Good!" ||
            validatePasswordConfirm() !== "Looking Good!" ||
            checkedTerms !== true
          }
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
