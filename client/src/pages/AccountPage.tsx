import styled from "@emotion/styled";
import { Circle, Settings } from "@mui/icons-material";
import { Box, Chip, Divider, IconButton, Paper, Slider, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../api/database";
import { Player } from "../services/Player";

const userImageURL = "https://crafatar.com/avatars/";

const styles = {
    paper: {
        width: '80%',
        minHeight: '70vh',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        margin: '16px',
        '@media (max-width: 650px)': {
            width: '96%',
            padding: '2px'
        },
        '@media (max-width: 500px)': {
            width: '100%',
            padding: '2px'
        }
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
        width: '100%',
        padding: '16px',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        padding: '16px',
        '@media (max-width: 650px)': {
            width: '96%',
            fontSize: '0.9rem'
        },
        '@media (max-width: 500px)': {
            width: '100%',
            fontSize: '0.8rem'
        }
    },
    playerData: {
        marginLeft: '16px'
    }
}

const Thumb = () => {
    return (<Box></Box>);
}

const AccountPage = () => {

    const navigate = useNavigate();
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [player, setPlayer] = useState<Player>();
    const [user, setUser] = useState<any>(localStorage.getItem("user"));

    useEffect(() => {
        apiClient.get(`api/players/name/${params.name}`).then(res => {
            setPlayer(res.data);
        }).catch(err => {
            navigate("/");
            enqueueSnackbar("PLAYER NOT FOUND", { variant: "error" });
        });
    }, []);

    return (
        <Paper elevation={2} sx={styles.paper}>
            <Paper elevation={4} sx={styles.flexRow}>
                <img src={`${userImageURL}${player?.uuid}`} alt="img" style={{ width: '196px', height: '196px', alignSelf: 'start' }} />
                <Box sx={{ ...styles.flexCol, ...styles.playerData }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        <Circle sx={{ marginX: '16px', color: player?.playData.isOnline ? '#00AA00' : '#AA0000' }} />{player?.name}
                    </Typography>
                    {
                        player?.playData.isBanned
                            ? <Chip label="BANNED" color="error" sx={{ fontStyle: 'italic', fontWeight: 'bold' }} />
                            : <Typography variant="body1" sx={{ fontStyle: 'italic' }}>{player?.playData.isOnline ? 'Online' : 'Not Online'}</Typography>
                    }
                    <Typography variant="body1" sx={{ marginTop: '16px' }}>Last Online: {player?.playData.lastOnline}</Typography>
                    <Typography variant="body1">Time Played: {player?.playData.timePlayed}</Typography>
                    <Typography variant="body1" sx={{ marginTop: '16px' }}>Uuid: {player?.uuid}</Typography>
                </Box>
                {
                    JSON.parse(user || "{}").uuid === player?.uuid &&
                    <IconButton
                        sx={{ marginRight: 0, marginLeft: 'auto' }}
                        onClick={() => console.log("KEKW")}
                    ><Settings /></IconButton>
                }
            </Paper>
            <Paper elevation={8} sx={{ ...styles.flexCol, margin: '16px', width: '100%' }}>
                <Box sx={{ color: '#FFAA00', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '100px', marginX: 'auto' }}>
                    <Typography sx={{ fontWeight: 'bold', marginX: 'auto', fontSize: '48px' }}>✦</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Level</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{player?.rpg.level}</Typography>
                </Box>
                <Slider
                    value={player?.rpg.xp || 1}
                    step={10}
                    min={0}
                    max={player?.rpg.reqXp || 100}
                    sx={{
                        color: '#24be24',
                        height: '8px',
                        '& .MuiSlider-thumb': {
                            display: 'none'
                        }
                    }}
                    marks={[{ value: 0, label: '0' }, { value: player?.rpg.xp || 1, label: `${player?.rpg.xp || 1}` }, { value: player?.rpg.reqXp || 100, label: `${player?.rpg.reqXp}` }]}
                />
                <Stack direction="row" spacing={6} sx={{ marginX: 'auto' }}>
                    <Box sx={{ color: '#AA0000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '100px' }}>
                        <Typography sx={{ fontWeight: 'bold', marginX: 'auto', fontSize: '48px' }}>✤</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Strength</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{player?.rpg.strength}</Typography>
                    </Box>
                    <Box sx={{ color: '#00AA00', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '100px' }}>
                        <Typography sx={{ fontWeight: 'bold', marginX: 'auto', fontSize: '48px' }}>❋</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Agillity</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{player?.rpg.agillity}</Typography>
                    </Box>
                    <Box sx={{ color: '#00AAAA', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '100px' }}>
                        <Typography sx={{ fontWeight: 'bold', marginX: 'auto', fontSize: '48px' }}>❉</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Intelligence</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{player?.rpg.intelligence}</Typography>
                    </Box>
                </Stack>
            </Paper>
        </Paper>
    );
};

export default AccountPage;