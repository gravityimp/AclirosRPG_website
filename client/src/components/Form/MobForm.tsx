import { Close } from "@mui/icons-material";
import { Autocomplete, Box, Button, IconButton, InputAdornment, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { apiClient } from "../../api/database";
import { Item } from "../../services/Item";
import { Drop, Equipment, Mob } from "../../services/Mob";
import { minecraftItems } from "../../static/minecraftItems";
import { minecraftMobs } from "../../static/minecraftMobs";
import { styles } from "./styles";

interface Props {
    closeModal: () => void;
    editMob?: Mob;
}

const MobForm: FC<Props> = (props) => {

    const { closeModal, editMob } = props;

    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState<string>(editMob?.name || "");
    const [type, setType] = useState<string>(editMob?.type || "normal");
    const [mobType, setMobType] = useState<string>(editMob?.mobType || "creeper");
    const [hostility, setHostility] = useState<string>(editMob?.hostility || "passive");
    const [isBaby, setIsBaby] = useState<boolean>(editMob?.isBaby || false);
    const [level, setLevel] = useState<number>(editMob?.level || 1);
    const [health, setHealth] = useState<number>(editMob?.health || 10);
    const [damage, setDamage] = useState<number>(editMob?.damage || 0);
    const [equipment, setEquipment] = useState<Equipment>(editMob?.equipment || {
        main: "air",
        off: "air",
        head: "air",
        chest: "air",
        legs: "air",
        feet: "air",
    });
    const [drop, setDrop] = useState<Drop>(editMob?.drops || {});

    const [allItems, setAllItems] = useState<Item[]>([]);

    useEffect(() => {
        apiClient.get("api/items").then((res) => {
            setAllItems(res.data);
        });
    });

    const buildMob = () => {
        const _mob: Mob = {
            id: 0,
            name,
            type,
            mobType,
            hostility,
            isBaby,
            level,
            health,
            damage,
            equipment,
            drops: drop,
        };
        return _mob;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const _mob = buildMob();
        if (name === "") {
            enqueueSnackbar("Name is required", { variant: "error" });
            return;
        }
        if (editMob) {
            apiClient.put(`api/mobs/${editMob.id}`, _mob).then((res) => {
                enqueueSnackbar(`MODIFIED MOB [ID: ${editMob.id}]`, { variant: "success" });
                closeModal();
                return;
            }).catch((err) => {
                enqueueSnackbar(`ERROR MODIFYING MOB [ID: ${editMob.id}]`, { variant: "error" });
                return;
            });
            return;
        } else {
            apiClient.post("api/mobs", _mob).then((res) => {
                enqueueSnackbar(`CREATED NEW MOB`, { variant: "success" });
                closeModal();
            }).catch((err) => {
                enqueueSnackbar(`ERROR CREATING MOB`, { variant: "error" });
            });
        }
    };

    return (
        <Box sx={styles.box}>
            <Box sx={styles.formBox}>
                <form style={{ overflowY: "auto", width: "100%" }}>
                    <TextField
                        sx={styles.formInput}
                        label="Name"
                        placeholder="Bobby"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">Name:</InputAdornment>
                            )
                        }}
                    />
                    <Select
                        defaultValue={"normal"}
                        value={type}
                        onChange={(e: any) => setType(e.target.value)}
                        sx={styles.formInput}
                    >
                        <MenuItem value={"normal"}>Normal</MenuItem>
                        <MenuItem value={"elite"}>Elite</MenuItem>
                        <MenuItem value={"boss"}>Boss</MenuItem>
                        <MenuItem value={"special"}>Special</MenuItem>
                    </Select>
                    <Autocomplete
                        disableClearable
                        sx={styles.formInput}
                        options={minecraftMobs}
                        getOptionLabel={(option) => option.name}
                        defaultValue={minecraftMobs[0] || { id: 0, name: mobType }}
                        onChange={(e, v) => setMobType(v?.name.toLocaleLowerCase() || "")}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Mob Type"
                            />
                        )}
                    />
                    <Select
                        value={hostility}
                        label="Hostility"
                        onChange={(e: any) => setHostility(e.target.value)}
                        sx={styles.formInput}
                    >
                        <MenuItem value={"friendly"}>Friendly</MenuItem>
                        <MenuItem value={"hostile"}>Hostile</MenuItem>
                        <MenuItem value={"passive"}>Passive</MenuItem>
                    </Select>
                    <Button
                        sx={{
                            ...styles.formInput,
                            backgroundColor: isBaby ? "#004FA3" : "#7A7A7A",
                            ":hover": {
                                backgroundColor: isBaby ? "#003B7A" : "#474747"
                            }
                        }}
                        variant="contained"
                        onClick={() => setIsBaby(!isBaby)}
                    >BABY</Button>
                    <TextField
                        sx={styles.formInput}
                        label="Level"
                        type="number"
                        value={level}
                        InputProps={{
                            inputProps: { min: 1 },
                            startAdornment: (
                                <InputAdornment position="start">Level:</InputAdornment>
                            )
                        }}
                        onChange={(e: any) => {
                            if (e.target.value === "") {
                                setLevel(1);
                            } else {
                                setLevel(parseInt(e.target.value));
                            }
                        }}
                    />
                    <TextField
                        sx={styles.formInput}
                        label="Health"
                        type="number"
                        value={health}
                        InputProps={{
                            inputProps: { min: 1 },
                            startAdornment: (
                                <InputAdornment position="start">Health:</InputAdornment>
                            )
                        }}
                        onChange={(e: any) => {
                            if (e.target.value === "") {
                                setHealth(1);
                            } else {
                                setHealth(parseInt(e.target.value));
                            }
                        }}
                    />
                    <TextField
                        sx={styles.formInput}
                        label="Damage"
                        type="number"
                        value={damage}
                        InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                                <InputAdornment position="start">Damage:</InputAdornment>
                            )
                        }}
                        onChange={(e: any) => {
                            if (e.target.value === "") {
                                setDamage(0);
                            } else {
                                setDamage(parseInt(e.target.value));
                            }
                        }}
                    />
                    <Stack spacing="8px">
                        <Autocomplete
                            sx={styles.formInput}
                            options={minecraftItems}
                            getOptionLabel={(option) => option.name}
                            defaultValue={minecraftItems[0]}
                            onChange={(e, v) => setEquipment({ ...equipment, main: v?.displayName.toLocaleLowerCase() || "air" })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Main Hand"
                                />
                            )}
                        />
                        <Autocomplete
                            sx={styles.formInput}
                            options={minecraftItems}
                            getOptionLabel={(option) => option.name}
                            defaultValue={minecraftItems[0]}
                            onChange={(e, v) => setEquipment({ ...equipment, off: v?.displayName.toLocaleLowerCase() || "air" })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Off Hand"
                                />
                            )}
                        />
                        <Autocomplete
                            sx={styles.formInput}
                            options={minecraftItems.filter((i) => i?.enchantCategories?.includes("armor_head") || i.name === "air")}
                            getOptionLabel={(option) => option.name}
                            defaultValue={minecraftItems.find((i) => i.name === "air") || minecraftItems[0]}
                            onChange={(e, v) => setEquipment({ ...equipment, head: v?.displayName.toLocaleLowerCase() || "air" })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Head"
                                />
                            )}
                        />
                        <Autocomplete
                            sx={styles.formInput}
                            options={minecraftItems.filter((i) => i?.enchantCategories?.includes("armor_chest") || i.name === "air")}
                            getOptionLabel={(option) => option.name}
                            defaultValue={minecraftItems.find((i) => i.name === "air") || minecraftItems[0]}
                            onChange={(e, v) => setEquipment({ ...equipment, chest: v?.displayName.toLocaleLowerCase() || "air" })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Chest"
                                />
                            )}
                        />
                        <Autocomplete
                            sx={styles.formInput}
                            options={minecraftItems.filter((i) => (i?.enchantCategories?.includes("armor") && i?.name?.includes("leggings")) || i.name === "air")}
                            getOptionLabel={(option) => option.name}
                            defaultValue={minecraftItems.find((i) => i.name === "air") || minecraftItems[0]}
                            onChange={(e, v) => setEquipment({ ...equipment, legs: v?.displayName.toLocaleLowerCase() || "air" })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Legs"
                                />
                            )}
                        />
                        <Autocomplete
                            sx={styles.formInput}
                            options={minecraftItems.filter((i) => i?.enchantCategories?.includes("armor_feet") || i.name === "air")}
                            getOptionLabel={(option) => option.name}
                            defaultValue={minecraftItems.find((i) => i.name === "air") || minecraftItems[0]}
                            onChange={(e, v) => setEquipment({ ...equipment, feet: v?.displayName.toLocaleLowerCase() || "air" })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Feet"
                                />
                            )}
                        />
                    </Stack>
                    <TextField
                        sx={styles.formInput}
                        label="Experience"
                        type="number"
                        value={drop.experience}
                        InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                                <InputAdornment position="start">Exp:</InputAdornment>
                            )
                        }}
                        onChange={(e: any) => {
                            if (e.target.value === "") {
                                setDrop({
                                    ...drop,
                                    experience: 0
                                });
                            } else {
                                setDrop({
                                    ...drop,
                                    experience: parseInt(e.target.value)
                                });
                            }
                        }}
                    />
                    <Stack spacing="8px">
                        {
                            drop.items && drop.items.length > 0 && drop.items.map((item, index) => (
                                <Box key={item.itemId} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: '8px' }}>
                                    <Autocomplete
                                        sx={{ marginX: '4px', width: '80%' }}
                                        autoSelect={true}
                                        disableClearable={true}
                                        options={allItems}
                                        getOptionLabel={(option) => option.name}
                                        value={allItems.find((i) => i.id === item.itemId)}
                                        onChange={(e, v) => {
                                            if (drop.items) {
                                                const newItems = [...drop.items];
                                                newItems[index] = {
                                                    itemId: v.id,
                                                    itemAmount: item.itemAmount || 1,
                                                    maxItemAmount: item.maxItemAmount || 1,
                                                    chance: item.chance || 1
                                                };
                                                setDrop({
                                                    ...drop,
                                                    items: newItems
                                                });
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Drop Item"
                                            />
                                        )}
                                    />
                                    <TextField
                                        sx={{ marginX: '4px' }}
                                        label="Min"
                                        type="number"
                                        value={item.itemAmount || 1}
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                                max: minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === allItems.find(i => i.id === item.itemId)?.name)?.stackSize || 1
                                            },
                                        }}
                                        onChange={(e: any) => {
                                            if (e.target.value === "") {
                                                if (!drop?.items) return;
                                                setDrop({
                                                    ...drop,
                                                    items: [...drop.items].map((i, idx) => {
                                                        if (idx === index) {
                                                            return {
                                                                ...i,
                                                                itemAmount: 1
                                                            }
                                                        }
                                                        return i;
                                                    })
                                                })
                                            } else {
                                                if (!drop?.items) return;
                                                setDrop({
                                                    ...drop,
                                                    items: [...drop.items].map((i, idx) => {
                                                        if (idx === index) {
                                                            const a = {
                                                                ...i,
                                                                itemAmount: parseInt(e.target.value)
                                                            };
                                                            if (item.maxItemAmount) {
                                                                if (item?.maxItemAmount < a.itemAmount) {
                                                                    a.maxItemAmount = item.itemAmount;
                                                                }
                                                            } else {
                                                                a.maxItemAmount = a.itemAmount;
                                                            }
                                                            return a;
                                                        }
                                                        return i;
                                                    })
                                                })
                                            }
                                        }}
                                    />
                                    <TextField
                                        sx={{ marginX: '4px' }}
                                        label="Max"
                                        type="number"
                                        value={item.maxItemAmount || 1}
                                        InputProps={{
                                            inputProps: {
                                                min: item.itemAmount || 1,
                                                max: minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === allItems.find(i => i.id === item.itemId)?.name)?.stackSize || 1
                                            },
                                        }}
                                        onChange={(e: any) => {
                                            if (e.target.value === "") {
                                                if (!drop?.items) return;
                                                setDrop({
                                                    ...drop,
                                                    items: [...drop.items].map((i, idx) => {
                                                        if (idx === index) {
                                                            return {
                                                                ...i,
                                                                maxItemAmount: item.itemAmount || 1
                                                            }
                                                        }
                                                        return i;
                                                    })
                                                })
                                            } else {
                                                if (!drop?.items) return;
                                                setDrop({
                                                    ...drop,
                                                    items: [...drop.items].map((i, idx) => {
                                                        if (idx === index) {
                                                            return {
                                                                ...i,
                                                                maxItemAmount: parseInt(e.target.value)
                                                            }
                                                        }
                                                        return i;
                                                    })
                                                })
                                            }
                                        }}
                                    />
                                    <TextField
                                        sx={{ marginX: '4px' }}
                                        label="Chance"
                                        type="number"
                                        value={item.chance || 1}
                                        InputProps={{
                                            inputProps: {
                                                min: 0.001,
                                                max: 100
                                            }
                                        }}
                                        onChange={(e: any) => {
                                            if (e.target.value === "") {
                                                if (!drop?.items) return;
                                                setDrop({
                                                    ...drop,
                                                    items: [...drop.items].map((i, idx) => {
                                                        if (idx === index) {
                                                            return {
                                                                ...i,
                                                                chance: 0.001
                                                            }
                                                        }
                                                        return i;
                                                    })
                                                })
                                            } else {
                                                if (!drop?.items) return;
                                                setDrop({
                                                    ...drop,
                                                    items: [...drop.items].map((i, idx) => {
                                                        if (idx === index) {
                                                            return {
                                                                ...i,
                                                                chance: parseFloat(e.target.value)
                                                            }
                                                        }
                                                        return i;
                                                    })
                                                })
                                            }
                                        }}
                                    />
                                    <IconButton
                                        sx={{ marginX: '4px' }}
                                        onClick={() => {
                                            if (!drop?.items) return;
                                            setDrop({
                                                ...drop,
                                                items: [...drop.items].filter((i, idx) => idx !== index)
                                            });
                                        }}
                                    ><Close /></IconButton>
                                </Box>
                            ))
                        }
                        <Button
                            sx={{ width: '100%' }}
                            onClick={() => {
                                if (!drop?.items) {
                                    setDrop({
                                        ...drop,
                                        items: [{
                                            itemId: 0,
                                            itemAmount: 1,
                                            maxItemAmount: 1,
                                            chance: 1
                                        }]
                                    });
                                } else {
                                    setDrop({
                                        ...drop,
                                        items: [...drop.items, {
                                            itemId: 0,
                                            itemAmount: 1,
                                            maxItemAmount: 1,
                                            chance: 1
                                        }]
                                    });
                                }
                            }}
                        >ADD ITEM DROP</Button>
                    </Stack>
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
        </Box >
    )
};

export default MobForm;