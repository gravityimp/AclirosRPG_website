import { Remove } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { ArmorDetails } from "../../services/Item";

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

interface ArmorComponentProps {
  armorDetails: ArmorDetails;
  setArmorDetails: (item: ArmorDetails) => void;
}

const ArmorComponent: FC<ArmorComponentProps> = (props) => {
  const { armorDetails, setArmorDetails } = props;

  const [armor, setArmor] = useState<number>(0);
  const [armorMagic, setArmorMagic] = useState<number>(0);
  const [resistance, setResistance] = useState<number>(0);
  const [regeneration, setRegeneration] = useState<number>(0);
  const [health, setHealth] = useState<number>(0);

  function loadArmorDetails() {
    setArmor(armorDetails?.armor ? armorDetails.armor : 0);
    setArmorMagic(armorDetails?.armorMagic ? armorDetails.armorMagic : 0);
    setResistance(armorDetails?.resistance ? armorDetails.resistance : 0);
    setRegeneration(armorDetails?.regeneration ? armorDetails.regeneration : 0);
    setHealth(armorDetails?.health ? armorDetails.health : 0);
  }

  function buildArmorDetails() {
    const item: ArmorDetails = {};

    if (armor !== 0) {
      item.armor = armor;
    }
    if (armorMagic !== 0) {
      item.armorMagic = armorMagic;
    }
    if (armor === 0 && armorMagic === 0) {
      item.armor = 1;
    }
    if (resistance !== 0) {
      item.resistance = resistance;
    }
    if (regeneration !== 0) {
      item.regeneration = regeneration;
    }
    if (health !== 0) {
      item.health = health;
    }
    setArmorDetails(item);
  }

  useEffect(() => {
    loadArmorDetails();
  }, []);

  useEffect(() => {
    buildArmorDetails();
  }, [armor, armorMagic, resistance, regeneration, health]);

  return (
    <>
      <Box
        sx={styles.group}
        onClick={() => {
          if (armor === 0) {
            setArmor(1);
          }
        }}
      >
        <TextField
          disabled={armor === 0}
          label="Armor"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={armor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setArmor(0);
            } else {
              setArmor(parseInt(e.target.value));
            }
          }}
        />
      </Box>
      <Box
        sx={styles.group}
        onClick={() => {
          if (armorMagic === 0) {
            setArmorMagic(1);
          }
        }}
      >
        <TextField
          disabled={armorMagic === 0}
          label="Magic Armor"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={armorMagic}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setArmorMagic(0);
            } else {
              setArmorMagic(parseInt(e.target.value));
            }
          }}
        />
      </Box>
      <Box
        sx={styles.group}
        onClick={() => {
          if (resistance === 0) {
            setResistance(1);
          }
        }}
      >
        <TextField
          disabled={resistance === 0}
          label="Resistance"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={resistance}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setResistance(0);
            } else {
              setResistance(parseInt(e.target.value));
            }
          }}
        />
      </Box>
      <Box sx={styles.group}>
        <TextField
          disabled={regeneration === 0}
          label="Regeneration"
          type="number"
          InputProps={{
            inputProps: { min: 0 }
          }}
          value={regeneration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setRegeneration(0);
            } else {
              setRegeneration(parseInt(e.target.value));
            }
          }}
          onClick={() => {
            if (regeneration === 0) setRegeneration(1);
          }}
        />
      </Box>
      <Box sx={styles.group}>
        <TextField
          disabled={health === 0}
          label="Health"
          type="number"
          InputProps={{
            inputProps: { min: 0 }
          }}
          value={health}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
              setHealth(0);
            } else {
              setHealth(parseInt(e.target.value));
            }
          }}
          onClick={() => {
            if (health === 0) setHealth(1);
          }}
        />
      </Box>
    </>
  );
};

export default ArmorComponent;
