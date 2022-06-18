import { Remove } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { WeaponDetails } from "../../services/Item";

const styles = {
  group: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "16px"
  },
  input30: {
    width: "30%"
  }
};

interface WeaponComponentProps {
  weaponDetails: WeaponDetails;
  setWeaponDetails: (item: WeaponDetails) => void;
}

const WeaponComponent: FC<WeaponComponentProps> = (props) => {
  const { weaponDetails, setWeaponDetails } = props;

  const [minDmg, setMinDmg] = useState<number>(0);
  const [maxDmg, setMaxDmg] = useState<number>(0);
  const [minMagicDmg, setMinMagicDmg] = useState<number>(0);
  const [maxMagicDmg, setMaxMagicDmg] = useState<number>(0);
  const [vampirism, setVampirism] = useState<number>(0);
  const [critChance, setCritChance] = useState<number>(0);

  function loadDetails() {
    setMinDmg(weaponDetails?.minDmg !== undefined ? weaponDetails.minDmg : 0);
    setMaxDmg(weaponDetails?.maxDmg !== undefined ? weaponDetails.maxDmg : 0);
    setMinMagicDmg(
      weaponDetails?.minMagicDmg !== undefined ? weaponDetails.minMagicDmg : 0
    );
    setMaxMagicDmg(
      weaponDetails?.maxMagicDmg !== undefined ? weaponDetails.maxMagicDmg : 0
    );
    setVampirism(
      weaponDetails?.vampirism !== undefined ? weaponDetails.vampirism : 0
    );
    setCritChance(
      weaponDetails?.critChance !== undefined ? weaponDetails.critChance : 0
    );
  }

  function buildWeaponDetails() {
    const item: WeaponDetails = {};
    if (minDmg !== 0 || maxDmg !== 0) {
      item.minDmg = minDmg;
      item.maxDmg = maxDmg;
    }
    if (minMagicDmg !== 0 || maxMagicDmg !== 0) {
      item.minMagicDmg = minMagicDmg;
      item.maxMagicDmg = maxMagicDmg;
    }
    if (
      minDmg === 0 &&
      maxDmg === 0 &&
      minMagicDmg === 0 &&
      maxMagicDmg === 0
    ) {
      item.minDmg = 0;
      item.maxDmg = 1;
    }
    if (vampirism !== 0) {
      item.vampirism = vampirism;
    }
    if (critChance !== 0) {
      item.critChance = critChance;
    }
    setWeaponDetails(item);
  }

  useEffect(() => {
    loadDetails();
  }, []);

  useEffect(() => {
    buildWeaponDetails();
  }, [minDmg, maxDmg, minMagicDmg, maxMagicDmg, vampirism, critChance]);

  return (
    <>
      <Box
        sx={styles.group}
        onClick={() => {
          if (minDmg === 0 && maxDmg === 0) {
            setMinDmg(1);
            setMaxDmg(1);
          }
        }}
      >
        <TextField
          sx={styles.input30}
          disabled={minDmg === 0 && maxDmg === 0}
          label="Min. Damage"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={minDmg > 100 ? 100 : minDmg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setMinDmg(0);
            } else {
              setMinDmg(parseInt(e.target.value));
            }
          }}
        />
        <Remove />
        <TextField
          sx={styles.input30}
          disabled={minDmg === 0 && maxDmg === 0}
          label="Max. Damage"
          type="number"
          InputProps={{ inputProps: { min: minDmg } }}
          value={maxDmg > 100 ? 100 : maxDmg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setMaxDmg(0);
            } else {
              setMaxDmg(parseInt(e.target.value));
            }
          }}
        />
      </Box>
      <Box
        sx={styles.group}
        onClick={() => {
          if (minMagicDmg === 0 && maxMagicDmg === 0) {
            setMinMagicDmg(1);
            setMaxMagicDmg(1);
          }
        }}
      >
        <TextField
          sx={styles.input30}
          disabled={minMagicDmg === 0 && maxMagicDmg === 0}
          label="Min. Magic Damage"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={minMagicDmg > 100 ? 100 : minMagicDmg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setMinMagicDmg(0);
            } else {
              setMinMagicDmg(parseInt(e.target.value));
            }
          }}
        />
        <Remove />
        <TextField
          sx={styles.input30}
          disabled={minMagicDmg === 0 && maxMagicDmg === 0}
          label="Max. Magic Damage"
          type="number"
          InputProps={{ inputProps: { min: minMagicDmg } }}
          value={maxMagicDmg > 100 ? 100 : maxMagicDmg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setMaxMagicDmg(0);
            } else {
              setMaxMagicDmg(parseInt(e.target.value));
            }
          }}
        />
      </Box>
      <Box sx={styles.group}>
        <TextField
          disabled={vampirism === 0}
          label="Vampirism"
          type="number"
          InputProps={{
            inputProps: { min: 0, max: 100 },
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          value={vampirism > 100 ? 100 : vampirism}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setVampirism(0);
            } else {
              setVampirism(parseInt(e.target.value));
            }
          }}
          onClick={() => {
            if (vampirism === 0) setVampirism(1);
          }}
        />
      </Box>
      <Box sx={styles.group}>
        <TextField
          disabled={critChance === 0}
          label="Crit. Chance"
          type="number"
          InputProps={{
            inputProps: { min: 0, max: 100 },
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          value={critChance > 100 ? 100 : critChance}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setCritChance(0);
            } else {
              setCritChance(parseInt(e.target.value));
            }
          }}
          onClick={() => {
            if (critChance === 0) setCritChance(1);
          }}
        />
      </Box>
    </>
  );
};

export default WeaponComponent;
