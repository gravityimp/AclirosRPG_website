import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../api/database";
import { Npc, NpcFilter } from "../../../services/Npc";
import NpcFilterComponent from "../../Filter/NpcFilterComponent";

const styles = {
    accordion: {
        margin: "8px 4px",
        width: '100%'
    },
    chip: {
        marginX: "4px"
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        textAlign: 'center',
    },
    body: {
        marginLeft: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
    }
};

const villagerHead = "https://i.pinimg.com/736x/51/b9/b3/51b9b3db5da0b94626e90b1655730fff--minecraft-quilt-play-minecraft.jpg";

const NpcList = () => {

    const [npcList, setNpcList] = useState<Npc[]>([]);
    const [filter, setFilter] = useState<NpcFilter>({});
    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchNpcs = async () => {
        setIsLoading(true);
        let response: any;
        try {
            response = await apiClient.get("api/npc", {
                params: {
                    page: page,
                    limit: 20,
                    ...filter
                }
            });
        } catch (error) {

        }
        if (page === 0) {
            setNpcList(response.data.data);
            setLastPage(response.data.lastPage);
        } else {
            setNpcList([...npcList, ...response.data.data]);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchNpcs();
    }, [page, filter]);

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        const options = {
            root: document,
        }
        const callback = function(entries: any, observer: any) {
            if(entries[0].isIntersecting) {
                if(page < lastPage) {
                    setPage(page + 1);
                }
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(lastElement.current);
    }, [isLoading])

    return (
        <Paper 
            elevation={6} 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'start', 
                alignItems: 'center', 
                width: '90%',
                heigth: 'fit-content',
                minHeight: '70vh',
                margin: '16px',
                padding: '16px'
            }}
        >
            <NpcFilterComponent filter={filter} setFilter={setFilter} />
            {npcList.map((npc) => {
                return (
                    <Accordion key={npc.id} sx={styles.accordion} elevation={4}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>{npc.name}</Typography>
                            <Button 
                                variant="contained" 
                                sx={{ marginLeft: 'auto', marginRight: '16px' }}
                                color="primary"
                                onClick={() => navigate('/npc/'+npc.id)}
                            >SHOW</Button>
                        </AccordionSummary>
                        <AccordionDetails sx={styles.details}>
                            <img style={{ width: '64px', height: '64px' }} src={villagerHead} alt="img" />
                            <Box sx={styles.body}>
                                <Typography variant="h4">{npc.name}</Typography>
                                <Box>
                                    <Chip sx={styles.chip} label={`X: ${npc.location.x}`} />
                                    <Chip sx={styles.chip} label={`Y: ${npc.location.y}`} />
                                    <Chip sx={styles.chip} label={`Z: ${npc.location.z}`} />
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            {
                npcList.length === 0 &&
                 (
                    <Typography variant="h3" sx={{ justifySelf: 'center', marginY: 'auto', fontWeight: "bold" }}>No Npc found</Typography>
                 )
            }
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
        </Paper>
    );
};

export default NpcList;