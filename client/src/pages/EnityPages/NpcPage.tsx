import { Chip, Paper, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../api/database";
import NpcQuests from "../../components/NpcQuests";
import { Npc } from "../../services/Npc";
import { Quest } from "../../services/Quest";

const styles = {
    flexColCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexRowCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chip: {
        marginX: "4px"
    },
    paper: {
        width: '80%',
        height: '70vh',
        justifyContent: 'start',
    }
}

const villagerHead = "https://i.pinimg.com/736x/51/b9/b3/51b9b3db5da0b94626e90b1655730fff--minecraft-quilt-play-minecraft.jpg";

const NpcPage = () => {

    const navigate = useNavigate();
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();


    const [npcData, setNpcData] = useState<Npc>();
    const [allQuests, setAllQuests] = useState<Quest[]>([]);

    const fetchQuests = () => {
        apiClient.get("api/quests").then(res => {
            setAllQuests(res.data);
        });
    }

    useEffect(() => {
        if (params.npcId) {
            apiClient.get(`api/npc/${parseInt(params.npcId)}`).then(res => {
                setNpcData(res.data);
                fetchQuests();
                return;
            }).catch(err => {
                navigate('/');
                enqueueSnackbar(`Couldn't find npc with id ${params.npcId}`, { variant: 'error' })
                return;
            });
        }
    }, []);

    return (
        <Paper elevation={6} sx={{ ...styles.flexColCenter, ...styles.paper, margin: '16px' }}>
            <Typography variant="h2" sx={{ mt: '8px', mb: '16px', width: '100%', justifySelf: 'center', textAlign: 'center' }}>{npcData?.name}</Typography>
            <img style={{ width: '128px', height: '128px', marginTop: '16px' }} src={villagerHead} alt="img" />
            <Typography variant="h4" sx={{ mb: '8px' }}>Location</Typography>
            <Stack direction="row">
                <Chip sx={styles.chip} label={`X: ${npcData?.location.x}`} />
                <Chip sx={styles.chip} label={`Y: ${npcData?.location.y}`} />
                <Chip sx={styles.chip} label={`Z: ${npcData?.location.z}`} />
            </Stack>
            <NpcQuests npcId={npcData?.id || 0} />
        </Paper>
    );
};

export default NpcPage;