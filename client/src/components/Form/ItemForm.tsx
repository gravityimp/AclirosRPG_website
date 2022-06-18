import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  Item,
  WeaponDetails,
  ArmorDetails,
  ActionDetails,
  RequirementsDetails,
  RarityList,
  ItemType
} from "../../services/Item";
import WeaponComponent from "../ItemComponents/WeaponComponent";
import ArmorComponent from "../ItemComponents/ArmorComponent";
import RequirementsComponent from "../ItemComponents/RequirementsComponents";
import PreviewItem from "../Preview/PreviewItem";
import { useSnackbar } from "notistack";
import { minecraftItems } from "../../static/minecraftItems";
import axios from "axios";
import { styles } from "./styles";

interface ItemFormProps {
  closeModal: () => void;
  editItem?: Item;
}

const ItemForm: FC<ItemFormProps> = ({ closeModal, editItem }) => {
  const [itemType, setItemType] = useState<string>(ItemType.MATERIAL);
  const [weaponDetails, setWeaponDetails] = useState<WeaponDetails>({});
  const [armorDetails, setArmorDetails] = useState<ArmorDetails>({});
  const [actionDetails, setActionDetails] = useState<ActionDetails>({ actionType: "xp" });
  const [requirementsDetails, setRequirementsDetails] = useState<
    RequirementsDetails
  >({});

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [item, setItem] = useState<any>(minecraftItems[0]);
  const [rarity, setRarity] = useState<string>(RarityList.COMMON);
  const [lore, setLore] = useState<string>("");
  const [playerBound, setPlayerBound] = useState<boolean>(false);

  const [inputItemValue, setInputItemValue] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: any) => {
    setItemType(e.target.value);
  };

  const validateName = () => {
    if (name.length === 0 || name.length > 25) return false;
    return true;
  };

  const buildItem = () => {
    const build: Item = {
      id: id,
      name: name,
      type: itemType,
      item: item.displayName.toLocaleLowerCase(),
      rarity: rarity,
      lore: lore,
      playerBound: playerBound
    };
    if (itemType !== null) {
      build.type = itemType;
      if (itemType === "weapon") build.weapon = weaponDetails;
      if (itemType === "armor") build.armor = armorDetails;
      if (itemType === "action") build.action = actionDetails;
    }
    if (Object.keys(requirementsDetails).length !== 0) {
      build.requirements = requirementsDetails;
    }
    return build;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateName()) {
      enqueueSnackbar("Name of Item should be set(<26)!", {
        variant: "error",
        autoHideDuration: 2000
      });
      return;
    }
    const req = buildItem();
    if (!editItem) {
      const response = await axios.post("http://localhost:8000/api/items/", req);
      enqueueSnackbar(`CREATED NEW ITEM`, {
        variant: "success",
        autoHideDuration: 2000
      });
    } else {
      const response = await axios.put(`http://localhost:8000/api/items/${editItem.id}`, req);
      enqueueSnackbar(`MODIFIED ITEM [ID: ${editItem.id}]`, {
        variant: "success",
        autoHideDuration: 2000
      });
    }
    closeModal();
  };

  const getRarity = (value: string) => {
    switch (value) {
      case "common":
        return RarityList.COMMON;
      case "uncommon":
        return RarityList.UNCOMMON;
      case "rare":
        return RarityList.RARE;
      case "epic":
        return RarityList.EPIC;
      case "legendary":
        return RarityList.LEGENDARY;
      case "artifact":
        return RarityList.ARTIFACT;
      default:
        return RarityList.COMMON;
    };
  };

  function loadItem() {
    if (!editItem) return;

    setId(editItem.id);
    setName(editItem.name);
    setItem(minecraftItems.find(item => item.displayName.toLocaleLowerCase() === editItem.item.toLocaleLowerCase()));
    setItemType(editItem.type);
    setRarity(getRarity(editItem.rarity));
    setPlayerBound(editItem.playerBound);
    setLore(editItem.lore);
    setRequirementsDetails(editItem.requirements ? editItem.requirements : {});
    setWeaponDetails(editItem.weapon ? editItem.weapon : {});
    setArmorDetails(editItem.armor ? editItem.armor : {});
    setActionDetails(editItem.action ? editItem.action : { actionType: "xp" });
  }

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <Box sx={styles.box}>
      <Box sx={styles.itemPreview}>
        <PreviewItem item={buildItem()} />
      </Box>
      <Box sx={styles.formBox}>
        <Box sx={styles.top}>
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </Box>
        <Typography sx={styles.formTitle}>Item Builder</Typography>
        <form style={{ overflowY: "auto", width: "100%" }}>
          <Divider sx={{ width: "90%", margin: "8px auto" }} />
          <Box sx={styles.general}>
            <Typography sx={styles.sectionTitle}>General</Typography>
            <TextField
              label="Name"
              placeholder="The Mighty Sword"
              sx={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Name:</InputAdornment>
                )
              }}
            />
            <Select
              value={rarity}
              onChange={(e: any) => setRarity(e.target.value)}
              sx={styles.formInput}
            >
              <MenuItem value={RarityList.COMMON}>common</MenuItem>
              <MenuItem value={RarityList.UNCOMMON}>uncommon</MenuItem>
              <MenuItem value={RarityList.RARE}>rare</MenuItem>
              <MenuItem value={RarityList.EPIC}>epic</MenuItem>
              <MenuItem value={RarityList.LEGENDARY}>legendary</MenuItem>
              <MenuItem value={RarityList.ARTIFACT}>artifact</MenuItem>
            </Select>
            <Autocomplete
              autoSelect
              disableClearable
              value={item}
              onChange={(event: any, newValue: any) => {
                setItem(newValue);
              }}
              inputValue={inputItemValue}
              onInputChange={(event, newInputValue) => {
                setInputItemValue(newInputValue);
              }}
              options={minecraftItems}
              getOptionLabel={(option) => option.displayName}
              sx={styles.formInput}
              renderInput={(params) => <TextField {...params} label="Item" />}
            />
            <Button
              sx={{
                ...styles.formInput,
                backgroundColor: playerBound ? "#004FA3" : "#7A7A7A",
                ":hover": {
                  backgroundColor: playerBound ? "#003B7A" : "#474747"
                }
              }}
              variant="contained"
              onClick={() => setPlayerBound(!playerBound)}
            >
              PlayerBound
            </Button>
            {itemType !== ItemType.MATERIAL &&
              itemType !== ItemType.RECIPE && (
                <RequirementsComponent
                  requirementsDetails={requirementsDetails}
                  setRequirementsDetails={setRequirementsDetails}
                />
              )}
          </Box>
          <Divider sx={{ width: "90%", margin: "8px auto" }} />
          <Box sx={styles.specific}>
            <Typography sx={styles.sectionTitle}>Type Specific</Typography>
            <Select
              id="select-item-type"
              value={itemType}
              onChange={handleChange}
              sx={styles.formInput}
            >
              <MenuItem value={ItemType.WEAPON}>weapon</MenuItem>
              <MenuItem value={ItemType.ARMOR}>armor</MenuItem>
              <MenuItem value={ItemType.MATERIAL}>material</MenuItem>
              <MenuItem value={ItemType.ACTION}>special</MenuItem>
              <MenuItem value={ItemType.RECIPE}>recipe</MenuItem>
            </Select>
            {itemType === ItemType.WEAPON && (
              <WeaponComponent
                weaponDetails={weaponDetails}
                setWeaponDetails={setWeaponDetails}
              />
            )}
            {itemType === ItemType.ARMOR && (
              <ArmorComponent
                armorDetails={armorDetails}
                setArmorDetails={setArmorDetails}
              />
            )}
          </Box>
          <Divider sx={{ width: "90%", margin: "8px auto" }} />
          <Box sx={styles.buttons}>
            <Button
              variant="contained"
              color="success"
              sx={styles.button}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.button}
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ItemForm;
