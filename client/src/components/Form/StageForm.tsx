import { Add, Close } from "@mui/icons-material";
import { Autocomplete, Box, Button, Chip, Divider, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Item } from "../../services/Item";
import { Npc } from "../../services/Npc";
import { Quest, QuestStage } from "../../services/Quest";
import { styles } from "./styles";
import { minecraftItems } from "../../static/minecraftItems";
import { useSnackbar } from "notistack";


interface Props {
    closeModal: () => void;
    editStage?: QuestStage;
    allItems: Item[];
    allNpcs: Npc[];
    allQuests: Quest[];
    stages: QuestStage[];
    setStages: (stages: QuestStage[]) => void;
}

const StageForm: FC<Props> = (props) => {

    const { closeModal, editStage, allItems, allQuests, allNpcs, setStages, stages } = props;

    const { enqueueSnackbar } = useSnackbar();

    const [stageName, setStageName] = useState(editStage?.stageName || "");
    const [stageNPCId, setStageNPCId] = useState(editStage?.stageNPCId || 0);
    const [stageType, setStageType] = useState(editStage?.stageType || "talk");
    const [stageDialog, setStageDialog] = useState(editStage?.stageDialog || ["Dialog"]);
    const [stageRewards, setStageRewards] = useState(editStage?.stageRewards || []);

    const [addDialog, setAddDialog] = useState("");
    const [addReward, setAddReward] = useState(allItems[0] ? allItems[0] : {
        id: 0,
        name: "Item",
        type: "material",
        item: "stone",
        rarity: "common",
        lore: "",
        playerBound: false,
    });
    const [addRewardAmount, setAddRewardAmount] = useState(
        minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === addReward.name.toLocaleLowerCase())?.stackSize || 1
    );

    const buildStage = () => {
        const _stage: QuestStage = {
            stageName,
            stageNPCId,
            stageType,
            stageDialog,
        }
        if(stageRewards.length > 0) {
            _stage.stageRewards = stageRewards;
        }
        return _stage;
    };

    const handleSubmit = () => {
        if(stageName === "") {
            enqueueSnackbar("Stage name cannot be empty", { variant: "error" });
            return;
        }
        const stage = buildStage();
        if (editStage) {
            setStages(stages.map((s) => s.stageName === editStage.stageName ? stage : s));
            enqueueSnackbar(`MODIFIED STAGE [${stageName}]`, { variant: "success" });
            closeModal();
            return;
        }
        enqueueSnackbar(`ADDED STAGE [${stageName}]`, { variant: "success" });
        setStages([...stages, stage]);
        closeModal();
    };

    return (
        <Box sx={styles.box}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '16px' }}>
                <Typography variant="h3">Stage Editor</Typography>
                <IconButton
                    sx={{ marginRight: '5%', marginLeft: 'auto' }}
                    onClick={closeModal}
                ><Close /></IconButton>
            </Box>
            <Box sx={{ overflowY: 'auto', width: '90%', display: 'flex', flexDirection: 'column', marginTop: '16px', alignItems: 'center' }}>
                <TextField
                    disabled={editStage ? true : false}
                    sx={{ marginY: '4px', width: '80%' }}
                    label="Stage Name"
                    placeholder="Stage 1"
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">Stage Name:</InputAdornment>
                        )
                    }}
                />
                <Autocomplete
                    options={allNpcs}
                    disableClearable
                    sx={{ marginY: '4px', width: '80%' }}
                    getOptionLabel={(option) => option.name}
                    value={allNpcs.find((npc) => npc.id === stageNPCId)}
                    onChange={(e, v) => setStageNPCId(v?.id || 0)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Stage NPC"
                        />
                    )}
                />
                <Select
                    sx={{ marginY: '4px', width: '80%' }}
                    label="Stage Type"
                    value={stageType}
                    onChange={(e) => setStageType(e.target.value)}
                >
                    <MenuItem value="kill">Kill</MenuItem>
                    <MenuItem value="geather">Geather</MenuItem>
                    <MenuItem value="talk">Talk</MenuItem>
                    <MenuItem value="find">Find</MenuItem>
                </Select>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '80%' }}>
                    <Divider sx={{ width: '120%', marginTop: '16px' }}/>
                    <Typography sx={{ marginBottom: '16px', marginTop: '8px' }} variant="h3">Dialog</Typography>
                    {
                        stageDialog.map((dialog, index) => {
                            if (stageDialog.length > 1) {
                                return (
                                    <Chip
                                        sx={{ width: '100%', marginY: '4px' }}
                                        label={`${index}: ${dialog}`}
                                        onDelete={() => setStageDialog(stageDialog.filter((_dialog, _index) => _index !== index))}
                                    />
                                )
                            } else {
                                return (
                                    <Chip sx={{ width: '100%', marginY: '4px' }} label={`${index}: ${dialog}`} />
                                )
                            }
                        })
                    }
                    <TextField
                        sx={{ marginTop: '8px', marginBottom: '4px', width: '100%' }}
                        label="Add Stage Dialog"
                        placeholder="Dialog 1"
                        value={addDialog}
                        onChange={(e) => setAddDialog(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setStageDialog([...stageDialog, addDialog]);
                                setAddDialog("");
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">Stage Name:</InputAdornment>
                            )
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '80%' }}>
                    <Divider sx={{ width: '120%', marginTop: '16px' }}/>
                    <Typography sx={{ marginBottom: '16px', marginTop: '8px' }} variant="h3">Stage Rewards</Typography>
                    {
                        stageRewards && stageRewards.length > 0 && stageRewards?.map((reward, idx) => {
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: '4px' }}>
                                    <Autocomplete
                                        sx={{ marginX: '4px', width: '100%' }}
                                        autoSelect={true}
                                        disableClearable={true}
                                        options={allItems}
                                        getOptionLabel={(option) => option.name}
                                        value={allItems.find((item) => item.id === reward.itemId)}
                                        onChange={(e, v) => {
                                            setStageRewards(stageRewards.map((_reward, _idx) => {
                                                if (_idx === idx) {
                                                    return {
                                                        ..._reward,
                                                        itemId: v?.id || 0,
                                                    }
                                                } else {
                                                    return _reward;
                                                }
                                            }))
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
                                        value={reward.itemAmount}
                                        onChange={(e) => {
                                            setStageRewards(stageRewards.map((_reward, _idx) => {
                                                if (_idx === idx) {
                                                    return {
                                                        ..._reward,
                                                        amount: parseInt(e.target.value),
                                                    }
                                                } else {
                                                    return _reward;
                                                }
                                            }))
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                                max: minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === addReward.name.toLocaleLowerCase())?.stackSize || 1
                                            }
                                        }}
                                    />
                                    <IconButton
                                        sx={{ marginX: '4px' }}
                                        onClick={() => {
                                            setStageRewards(stageRewards.filter((_reward, _idx) => _idx !== idx));
                                        }}
                                    ><Close /></IconButton>
                                </Box>
                            )
                        })
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginY: '4px' }}>
                        <Autocomplete
                            sx={{ marginX: '4px', width: '100%' }}
                            disableClearable={true}
                            autoSelect
                            options={allItems}
                            getOptionLabel={(option) => option.name}
                            value={addReward}
                            onChange={(e, v) => setAddReward(v)}
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
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: minecraftItems.find(mi => mi.displayName.toLocaleLowerCase() === addReward.name.toLocaleLowerCase())?.stackSize || 1
                                }
                            }}
                        />
                        <IconButton
                            sx={{ marginX: '4px' }}
                            onClick={() => setStageRewards([...stageRewards, { itemId: addReward.id, itemAmount: addRewardAmount }])}
                        ><Add /></IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '16px'}}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ width: '30%', marginX: '4px' }}
                        onClick={handleSubmit}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ width: '30%', marginX: '4px' }}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default StageForm;