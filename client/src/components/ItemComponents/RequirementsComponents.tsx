import { Box, TextField } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { RequirementsDetails } from "../../services/Item";

const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  group: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  input30: {
    width: "75px",
    margin: "8px"
  },
  input: {
    margin: "8px"
  }
};

interface RequirementsComponentProps {
  requirementsDetails: RequirementsDetails;
  setRequirementsDetails: (details: RequirementsDetails) => void;
}

const RequirementsComponent: FC<RequirementsComponentProps> = (props) => {
  const { requirementsDetails, setRequirementsDetails } = props;

  const [level, setLevel] = useState<number>(0);
  const [str, setStr] = useState<number>(0);
  const [agl, setAgl] = useState<number>(0);
  const [int, setInt] = useState<number>(0);

  const buildRequirements = () => {
    const requirements: RequirementsDetails = {};
    if (level !== 0) {
      requirements.level = level;
    }
    if (str !== 0) {
      requirements.strength = str;
    }
    if (agl !== 0) {
      requirements.agillity = agl;
    }
    if (int !== 0) {
      requirements.intelligence = int;
    }
    setRequirementsDetails(requirements);
  };

  useEffect(() => {
    buildRequirements();
  }, [level, str, agl, int]);

  return (
    <Box sx={styles.section}>
      <TextField
        sx={styles.input}
        disabled={level === 0}
        label="Level"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        value={level > 200 ? 200 : level}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === "") {
            setLevel(0);
          } else {
            setLevel(parseInt(e.target.value));
          }
        }}
        onClick={(e) => {
          if (level === 0) {
            setLevel(1);
          }
        }}
      />
      <Box sx={styles.group}>
        <TextField
          sx={styles.input30}
          disabled={str === 0}
          label="Str"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={str > 100 ? 100 : str}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setStr(0);
            } else {
              setStr(parseInt(e.target.value));
            }
          }}
          onClick={(e) => {
            if (str === 0) {
              setStr(1);
            }
          }}
        />
        <TextField
          sx={styles.input30}
          disabled={agl === 0}
          label="Agl"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={agl > 100 ? 100 : agl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setAgl(0);
            } else {
              setAgl(parseInt(e.target.value));
            }
          }}
          onClick={(e) => {
            if (agl === 0) {
              setAgl(1);
            }
          }}
        />
        <TextField
          sx={styles.input30}
          disabled={int === 0}
          label="Int"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={int > 100 ? 100 : int}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setInt(0);
            } else {
              setInt(parseInt(e.target.value));
            }
          }}
          onClick={(e) => {
            if (int === 0) {
              setInt(1);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default RequirementsComponent;
