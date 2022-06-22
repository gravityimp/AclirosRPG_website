import { Add, Close, Edit } from "@mui/icons-material";
import { Autocomplete, Box, Button, Chip, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { apiClient } from "../../api/database";
import { Item } from "../../services/Item";
import { Npc } from "../../services/Npc";
import { Quest, QuestReward, QuestStage } from "../../services/Quest";
import { styles } from "./newstyles";
import { minecraftItems } from "../../static/minecraftItems";
import EditModal from "../Modal/EditModal";
import StageForm from "./StageForm";
import { useSnackbar } from "notistack";

interface Props {
    closeModal: () => void;
    editQuest?: Quest;
}

const QuestForm: FC<Props> = (props) => {

    const { closeModal, editQuest } = props;

    const { enqueueSnackbar } = useSnackbar();

    const [stageModal, setStageModal] = useState<boolean>(false);
    const [editStage, setEditStage] = useState<QuestStage | null>(editQuest?.stages[0] || null);

    const [name, setName] = useState(editQuest?.name || "");
    const [description, setDescription] = useState(editQuest?.description || "");

    const [requiredLevel, setRequiredLevel] = useState(editQuest?.requiredLevel || 0);
    const [requiredQuests, setRequiredQuests] = useState<Quest[]>([]);

    const [stages, setStages] = useState<QuestStage[]>(editQuest?.stages || [{
        stageName: "Stage 1",
        stageNPCId: 0,
        stageType: "talk",
        stageDialog: ["Dialog 1"],
        stageRewards: [],
    }]);
    const [rewards, setRewards] = useState(editQuest?.rewards || {
        experience: 0,
        permissions: [],
        items: [],
    });

    const [allQuests, setAllQuests] = useState<Quest[]>([]);
    const [allNpcs, setAllNpcs] = useState<Npc[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);

    const [permission, setPermission] = useState<string>("");
    const [addRewardItem, setAddRewardItem] = useState(allItems[0] ? allItems[0] : {
        id: 0,
        name: "Item",
        type: "material",
        item: "stone",
        rarity: "common",
        lore: "",
        playerBound: false,
    });
    const [addRewardAmount, setAddRewardAmount] = useState(
        minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === addRewardItem.name.toLocaleLowerCase())?.stackSize || 1
    );

    useEffect(() => {
        let _allQuests: Quest[] = [];
        apiClient.get("api/quests").then((res) => {
            setAllQuests(res.data);
            _allQuests = res.data;
            if (editQuest) {
                if (editQuest.requiredQuests) {
                    let _quests: Quest[] = [];
                    editQuest.requiredQuests.forEach((q) => {
                        const _quest = _allQuests.find((_q) => _q.id === q);
                        if (_quest) {
                            _quests.push(_quest);
                        }
                    });
                    setRequiredQuests(_quests);
                }
            }
        });
        apiClient.get("api/npc").then((res) => {
            setAllNpcs(res.data);
        });
        apiClient.get("api/items").then((res) => {
            setAllItems(res.data);
        });
        if (editQuest?.stages) {
            editQuest.stages.forEach((s) => {
                if (!s.stageRewards) {
                    s.stageRewards = [];
                }
            });
            setStages(editQuest.stages);
        }
        if (editQuest?.rewards) {
            setRewards({
                experience: editQuest.rewards.experience || 0,
                permissions: editQuest.rewards.permissions || [],
                items: editQuest.rewards.items || [],
            });
        }
    }, []);

    const buildQuest = () => {
        const _quest: Quest = {
            id: editQuest?.id || 0,
            name: name,
            description: description,
            stages: stages,
        }
        if (requiredLevel) {
            _quest.requiredLevel = requiredLevel;
        }
        if (requiredQuests.length > 0) {
            _quest.requiredQuests = requiredQuests.map((q) => q.id);
        } else {
            _quest.requiredQuests = [];
        }
        if (rewards) {
            const _rewards: QuestReward = {};
            if (rewards.experience) {
                _rewards.experience = rewards.experience;
            }
            if (rewards.permissions && rewards?.permissions?.length > 0) {
                _rewards.permissions = rewards.permissions;
            }
            if (rewards.items && rewards?.items?.length > 0) {
                _rewards.items = rewards.items;
            }
            if (Object.keys(_rewards).length > 0) {
                _quest.rewards = _rewards;
            }
        } else {
            _quest.rewards = {};
        }
        return _quest;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (name === "") {
            enqueueSnackbar("Quest name cannot be empty", { variant: "error" });
            return;
        }
        if (description.length === 0) {
            enqueueSnackbar("Quest description cannot be empty", { variant: "error" });
            return;
        }
        const _quest: Quest = buildQuest();
        if (editQuest) {
            apiClient.put(`api/quests/${editQuest.id}`, _quest).then((res) => {
                enqueueSnackbar(`MODIFIED QUEST [${editQuest.id}]`, { variant: "success" });
                closeModal();
            }).catch((err) => {
                enqueueSnackbar(`ERROR MODIFYING QUEST [${editQuest.id}]`, { variant: "error" });
            });
        } else {
            apiClient.post("api/quests", _quest).then((res) => {
                closeModal();
                enqueueSnackbar(`CREATED NEW QUEST ${name}`, { variant: "success" });
            }).catch((err) => {
                enqueueSnackbar(`ERROR CREATING QUEST ${name}`, { variant: "error" });
            });
        }
    }

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto"
            }}
        >
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
                    sx={styles.input}
                    label="Name"
                    placeholder="Kings Recruit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">Name:</InputAdornment>
                        )
                    }}
                />
                <TextField
                    sx={styles.input}
                    label="Description"
                    placeholder="King is looking for a new recruit"
                    multiline
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    sx={styles.input}
                    disabled={requiredLevel === 0}
                    label="Level"
                    type="number"
                    value={requiredLevel}
                    InputProps={{
                        inputProps: { min: 0 },
                        startAdornment: (
                            <InputAdornment position="start">Required Level:</InputAdornment>
                        )
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === "") {
                            setRequiredLevel(0);
                        } else {
                            setRequiredLevel(parseInt(e.target.value));
                        }
                    }}
                    onClick={(e) => {
                        if (requiredLevel === 0) {
                            setRequiredLevel(1);
                        }
                    }}
                />
                <Autocomplete
                    multiple
                    sx={styles.input}
                    options={allQuests.filter((q) => q.id !== editQuest?.id)}
                    getOptionLabel={(option) => option.name}
                    value={requiredQuests}
                    onChange={(e, v) => setRequiredQuests(v)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Required Quests"
                        />
                    )}
                />
                <Typography variant="h4" sx={{ marginBottom: '8px' }}>Stages</Typography>
                {
                    stages.map((stage, index) => {
                        return (
                            <Stack key={stage.stageName} direction="row" sx={{ display: "flex", alignItems: "center", padding: '8px', borderRadius: '4px', width: "90%", justifyContent: 'flex-start', bgcolor: 'orange', marginY: '8px' }}>
                                <Typography sx={{ width: "100%" }}>NAME: {stage.stageName}</Typography>
                                <Chip color="primary" label={stage.stageType} sx={{ marginLeft: '8px' }}/>
                                <IconButton
                                    color="primary"
                                    sx={{ justifySelf: "flex-end" }}
                                    onClick={() => {
                                        setEditStage(stage);
                                        setStageModal(true);
                                    }}
                                ><Edit /></IconButton>
                                <IconButton
                                    color="error"
                                    sx={{ justifySelf: 'flex-end' }}
                                    onClick={() => console.log("DELETE")}
                                ><Close /></IconButton>
                            </Stack>
                        );
                    })
                }
                <Button
                    sx={styles.button}
                    size="large"
                    variant="contained"
                    onClick={() => {
                        setEditStage(null);
                        setStageModal(true);
                    }}
                >NEW STAGE</Button>
                <Typography variant="h4">Rewards</Typography>
                <TextField
                    sx={styles.input}
                    disabled={rewards.experience === 0}
                    label="Experience"
                    type="number"
                    value={rewards.experience}
                    InputProps={{
                        inputProps: { min: 0 },
                        startAdornment: (
                            <InputAdornment position="start">Exp:</InputAdornment>
                        )
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === "") {
                            setRewards({
                                experience: 0,
                                permissions: rewards.permissions,
                                items: rewards.items,
                            });
                        } else {
                            setRewards({
                                experience: parseInt(e.target.value),
                                permissions: rewards.permissions,
                                items: rewards.items,
                            });
                        }
                    }}
                    onClick={(e) => {
                        if (rewards.experience === 0) {
                            setRewards({
                                experience: 1,
                                permissions: rewards.permissions,
                                items: rewards.items,
                            });
                        }
                    }}
                />
                {
                    rewards.permissions && rewards.permissions.length > 0 && rewards.permissions.map((permission, index) => {
                        return (
                            <Chip
                                sx={styles.input}
                                key={permission}
                                label={permission}
                                onDelete={() => {
                                    const newPermissions = rewards.permissions?.filter((p) => p !== permission);
                                    setRewards({
                                        experience: rewards.experience,
                                        permissions: newPermissions,
                                        items: rewards.items,
                                    });
                                }}
                            />
                        );
                    })
                }
                <TextField
                    sx={styles.input}
                    label="Add Permission"
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            if (rewards.permissions) {
                                const newPermissions = [...rewards.permissions, permission];
                                setRewards({
                                    experience: rewards.experience,
                                    permissions: newPermissions,
                                    items: rewards.items,
                                });
                                setPermission("");
                            }
                        }
                    }}
                />
                <Stack spacing="4px" sx={styles.input}>
                    {
                        rewards.items && allItems.length > 0 && rewards.items.length > 0 && rewards.items.map((item, index) => {
                            return (
                                <Box key={`${item.itemId}_{${index}}`} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: '8px' }}>
                                    <Autocomplete
                                        sx={{ marginX: '4px', width: '100%' }}
                                        autoSelect={true}
                                        disableClearable={true}
                                        options={allItems}
                                        getOptionLabel={(option) => option.name}
                                        value={allItems.find((i) => i.id === item.itemId)}
                                        onChange={(e, v) => {
                                            if (rewards.items) {
                                                const newItems = [...rewards.items];
                                                newItems[index] = { itemId: v.id, itemAmount: item.itemAmount || 1 };
                                                setRewards({
                                                    experience: rewards.experience,
                                                    permissions: rewards.permissions,
                                                    items: newItems,
                                                });
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Stage Reward Item"
                                            />
                                        )}
                                    />
                                    <TextField
                                        sx={{ marginX: '4px' }}
                                        type="number"
                                        label="Amount"
                                        value={item.itemAmount || 1}
                                        onChange={(e) => {
                                            if (rewards.items) {
                                                const newItems = [...rewards.items];
                                                newItems[index] = { itemId: newItems[index].itemId, itemAmount: parseInt(e.target.value) };
                                                setRewards({
                                                    experience: rewards.experience,
                                                    permissions: rewards.permissions,
                                                    items: newItems,
                                                });
                                            }
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                                max: 64//minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === allItems.find(ai => ai.id === item.itemId)?.name?.toLocaleLowerCase()) || 1,
                                            }
                                        }}
                                    />
                                    <IconButton
                                        sx={{ marginX: '4px' }}
                                        onClick={() => {
                                            if (rewards.items) {
                                                const newItems = [...rewards.items].filter((i) => i.itemId !== item.itemId);
                                                setRewards({
                                                    experience: rewards.experience,
                                                    permissions: rewards.permissions,
                                                    items: newItems,
                                                });
                                            }
                                        }}
                                    ><Close /></IconButton>
                                </Box>
                            )
                        })
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: '4px' }}>
                        <Autocomplete
                            sx={{ marginX: '4px', width: '100%' }}
                            disableClearable={true}
                            autoSelect
                            options={allItems}
                            getOptionLabel={(option) => option.name}
                            value={addRewardItem}
                            onChange={(e, v) => setAddRewardItem(v)}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Stage Reward Item"
                                />
                            )}
                        />
                        <TextField
                            sx={{ marginX: '4px' }}
                            type="number"
                            label="Amount"
                            value={addRewardAmount}
                            onChange={(e) => setAddRewardAmount(parseInt(e.target.value))}
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 64//minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === addRewardItem.name.toLocaleLowerCase())?.stackSize || 1
                                }
                            }}
                        />
                        <IconButton
                            sx={{ marginX: '4px' }}
                            onClick={() => {
                                if (rewards.items) {
                                    const newItems = [...rewards.items, { itemId: addRewardItem.id, itemAmount: addRewardAmount }];
                                    setRewards({
                                        experience: rewards.experience,
                                        permissions: rewards.permissions,
                                        items: newItems,
                                    });
                                }
                            }}
                        ><Add /></IconButton>
                    </Box>
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
            <EditModal isOpen={stageModal} onClose={() => setStageModal(false)} title={`Edit Stage`}>
                <StageForm
                    closeModal={() => setStageModal(false)}
                    allItems={allItems}
                    allNpcs={allNpcs}
                    allQuests={allQuests}
                    stages={stages}
                    setStages={setStages}
                    editStage={editStage !== null ? editStage : undefined}
                />
            </EditModal>
        </Box >
    )
};

export default QuestForm;