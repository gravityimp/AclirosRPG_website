import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Fab, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/database";
import { Player, PLayerFilter } from "../../services/Player";
import PlayerFilterComponent from "../Filter/PlayerFilterComponent";

const AdminPlayerList = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [players, setPlayers] = useState<Player[]>([]);
    const [filter, setFilter] = useState<PLayerFilter>({});
    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchPlayers = () => {
        apiClient.get('api/players', {
            params: {
                page: page,
                limit: 20
            }
        }).then(res => {
            setPlayers(res.data.data);
            setLastPage(res.data.lastPage);
        }).catch(err => {
            enqueueSnackbar("Something went wrong", {
                variant: 'error'
            });
        });
    };

    useEffect(() => {
        const options = {
            root: document,
        }
        const callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting) {
                if (page < lastPage) {
                    setPage(page + 1);
                }
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(lastElement.current);
    }, []);

    useEffect(() => {
        fetchPlayers();
    }, [page, filter]);

    const handlePlayerBan = (player: Player) => {
        const _ban: boolean = !player.playData.isBanned;
        const _player = { ...player, playData: { ...player.playData, isBanned: _ban } };
        apiClient.put(`api/players/${player.uuid}`, {
            ..._player
        }).then(res => {
            fetchPlayers();
            if(_ban) enqueueSnackbar(`PLAYER BANNED [${player.name}]`, { variant: "success" });
            else enqueueSnackbar(`PLAYER UNBANNED [${player.name}]`, { variant: "success" });
        }).catch(err => {
            enqueueSnackbar("Something went wrong", {
                variant: 'error'
            });
        });
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%' }}>
                <PlayerFilterComponent filter={filter} setFilter={setFilter} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {players.map((player) => {
                    return (
                       <Paper
                            key={player.uuid}
                            elevation={4} 
                            sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                flexDirection: 'row',
                                alignItems: 'center', 
                                height: '50px', 
                                marginY: '8px', 
                                padding: '16px',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/players/${player.name}`)}
                        >
                            <Typography>{player.name}</Typography>
                            <Button 
                                variant="contained" 
                                color={player.playData.isBanned === true ? "success" : "error"}
                                sx={{ marginLeft: 'auto' }}
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    handlePlayerBan(player);
                                }}
                            >{player.playData.isBanned === true ? 'UNBAN' : 'BAN'}</Button>
                       </Paper>
                    )
                })}
                <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
            </Box>
        </Box>
    );
};

export default AdminPlayerList;