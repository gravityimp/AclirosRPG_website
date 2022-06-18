import { Close, AccountCircle, Lock } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
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
    borderRadius: "8px"
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
  formTerms: {
    width: "100%",
    margin: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start"
  }
};

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
      localStorage.setItem("user", res.data.user);
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
      console.log(res.data);
      setCode(res.data.userCode);
    }).catch(err => {
      setError(err.response.data.message);
      enqueueSnackbar(err.response.data.message, {
        variant: "error"
      });
    });
  };

  return (
    <Box sx={styles.formBox}>
      <Typography sx={styles.formTitle}>Sign Up</Typography>
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
          sx={{ marginX: '8px' }}
          onClick={generatePlayer}
        >GENERATE</Button>
        <Typography sx={{ marginLeft: '8px' }}>{code}</Typography>
      </Box>
      <form
        onSubmit={handleSubmit}
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
            label="Email"
            placeholder="test@test.ts"
            sx={styles.formInput}
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
            sx={styles.formInput}
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
            sx={styles.formInput}
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
          <Box sx={styles.formTerms}>
            <Checkbox checked={checkedTerms} onChange={handleChange} />
            <Typography>Accept Terms of usage</Typography>
          </Box>
          <TextField
            label="Code"
            type="text"
            placeholder="AB4CK4"
            sx={styles.formInput}
            value={codeInput}
            onChange={(e) => {
              if(e.target.value.length < 7) {
                setCodeInput(e.target.value.toLocaleUpperCase());
              }
            }}
          />
          <Button
            variant="contained"
            color="success"
            sx={styles.formSubmit}
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
        </FormControl>
      </form>
    </Box>
  );
};

export default RegisterForm;
