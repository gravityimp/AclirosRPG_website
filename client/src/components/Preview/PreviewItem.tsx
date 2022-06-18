import { Box, Typography } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { Item, getRarityColor, ItemType } from "../../services/Item";

const styles = {
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#141414",
    width: "fit-content",
    minWidth: '250px',
    maxWidth: '300px',
    heigth: "content",
    borderRadius: "8px",
    padding: "16px",
    transition: "width height 0.5s ease-in-out",
    marginX: 'auto'
  },
  itemImage: {
    width: "128px",
    height: "128px",
    borderRadius: "8px",
    margin: "8px"
    //backgroundColor: "#1F1F1F"
  },
  section: {
    marginTop: "2px",
    marginBottom: "2px",
    alignSelf: "start"
  },
  sectionIn: {
    marginTop: "4px",
    marginBottom: "4px",
    alignSelf: "start"
  }
};

interface PreviewItemInterface {
  item: Item;
}

const PreviewItem: FC<PreviewItemInterface> = ({ item }) => {
  const getItemImage = () => {
    const name = item.item.replace(new RegExp(" ", "g"), "_");
    const url = "https://mc.nerothe.com/img/1.17.1/" + name + ".png";
    return url;
  };

  const getTypography = (left: string, value: string) => {
    return (
      <Box
        sx={{ color: "#555555", display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {left}
        <Typography sx={{ color: getRarityColor(item.rarity) }}>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={styles.itemBox}>
      <img
        style={{ ...styles.itemImage }}
        src={getItemImage()}
        alt={item.item}
      />
      <Box sx={styles.section}>
        <Typography
          sx={{
            color: getRarityColor(item.rarity),
            fontWeight: "bold",
            fontSize: "16px",
            alignSelf: "end",
            textAlign: "center"
          }}
        >
          {item.name}
        </Typography>
      </Box>
      {item.requirements && (
        <Box sx={styles.sectionIn}>
          {item.requirements?.level &&
            getTypography("✔ Req. Level:", `${item.requirements.level}`)}
          {item.requirements?.strength &&
            getTypography("✔ Req. Strength:", `${item.requirements.strength}`)}
          {item.requirements?.agillity &&
            getTypography("✔ Req. Agillity:", `${item.requirements.agillity}`)}
          {item.requirements?.intelligence &&
            getTypography(
              "✔ Req. Intelligence:",
              `${item.requirements.intelligence}`
            )}
        </Box>
      )}
      <Box sx={styles.sectionIn}>
        {item.type === ItemType.WEAPON && (
          <>
            {item?.weapon?.maxDmg &&
              getTypography(
                "Damage: ",
                `${item.weapon.minDmg}-${item.weapon.maxDmg}`
              )}
            {item?.weapon?.maxMagicDmg &&
              getTypography(
                "Magic Damage: ",
                `${item.weapon.minMagicDmg}-${item.weapon.maxMagicDmg}`
              )}
            {item?.weapon?.critChance &&
              getTypography("Crit. Chance: ", `${item.weapon.critChance}%`)}
            {item?.weapon?.vampirism &&
              getTypography("Vampirism: ", `${item.weapon.vampirism}%`)}
          </>
        )}
        {item.type === ItemType.ARMOR && (
          <>
            {item?.armor?.armor &&
              getTypography("Armor: ", `${item.armor?.armor}`)}
            {item?.armor?.armorMagic &&
              getTypography("Magic Armor: ", `${item.armor.armorMagic}`)}
            {item?.armor?.health &&
              getTypography("Health: ", `${item.armor.health}`)}
            {item?.armor?.resistance &&
              getTypography("Resistance: ", `${item.armor.resistance}`)}
            {item?.armor?.regeneration &&
              getTypography("Regeneration: ", `${item.armor.regeneration}`)}
          </>
        )}
      </Box>

      {item.playerBound && (
        <Box sx={styles.section}>
          <Typography sx={{ color: "#AA0000", fontWeight: "bold" }}>
            Item is bound to player
          </Typography>
        </Box>
      )}

      <Box sx={styles.section}>
        <Typography
          sx={{ alignSelf: "start", color: getRarityColor(item.rarity) }}
        >
          {item.id}-0-0
        </Typography>
      </Box>
    </Box>
  );
};

export default PreviewItem;
