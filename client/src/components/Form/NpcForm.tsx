import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { apiClient } from "../../api/database";
import { Npc } from "../../services/Npc";
import { styles } from "./styles";

interface Props {
    closeModal: () => void;
    editNpc?: Npc;
}

const NpcForm: FC<Props> = (props) => {

    const { closeModal, editNpc } = props;
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState(editNpc?.name || "");
    const [location, setLocation] = useState(editNpc?.location || { x: 0, y: 0, z: 0 });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(name === "") {
            enqueueSnackbar("Name is required", { variant: "error" });
            return;
        }
        if (editNpc) {
            await apiClient.put(`api/npc/${editNpc.id}`, { name, location });
            enqueueSnackbar(`MODIFIED NPC [ID: ${editNpc.id}]`, { variant: "success" });
            closeModal();
        } else {
            await apiClient.post("api/npc", { name, location });
            enqueueSnackbar(`CREATED NEW NPC`, { variant: "success" });
            closeModal();
        }
    };

    return (
        <Box sx={styles.box}>
            <form style={{ overflowY: "auto", width: "100%" }}>
                <TextField
                    label="Name"
                    placeholder="Bob"
                    sx={styles.formInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">Name:</InputAdornment>
                        )
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        sx={{ width: '30%' }}
                        label="X"
                        type="number"
                        value={location.x}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === "") {
                                setLocation({ ...location, x: 0 });
                            } else {
                                setLocation({ ...location, x: parseInt(e.target.value) });
                            }
                        }}
                    />
                    <TextField
                        sx={{ width: '30%' }}
                        label="Y"
                        type="number"
                        value={location.y}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === "") {
                                setLocation({ ...location, y: 0 });
                            } else {
                                setLocation({ ...location, y: parseInt(e.target.value) });
                            }
                        }}
                    />
                    <TextField
                        sx={{ width: '30%' }}
                        label="Z"
                        type="number"
                        value={location.z}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === "") {
                                setLocation({ ...location, z: 0 });
                            } else {
                                setLocation({ ...location, z: parseInt(e.target.value) });
                            }
                        }}
                    />
                </Box>
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
    );
}
export default NpcForm;