import { ExpandMore } from "@mui/icons-material";
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, Button, Chip, Divider, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../api/database";
import { Quest, QuestFilter } from "../../../services/Quest";
import QuestFilterComponent from "../../Filter/QuestFilterComponent";


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
        marginX: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

const QuestList = () => {
    const [questList, setQuestList] = useState<Quest[]>([]);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [filter, setFilter] = useState<QuestFilter>({});
    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchQuests = async () => {
        setIsLoading(true);
        let response: any;
        try {
            response = await apiClient.get("api/quests", {
                params: {
                    page: page,
                    limit: 20,
                    ...filter
                }
            });
        } catch (error) {

        }
        if (page === 0) {
            setQuestList(response.data.data);
            setLastPage(response.data.lastPage);
        } else {
            setQuestList([...questList, ...response.data.data]);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchQuests();
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
    }, [isLoading]);

    return (
        <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', width: '90%', padding: '16px', margin: '16px', height: 'fit-content', minHeight: '70vh' }}>
            <QuestFilterComponent filter={filter} setFilter={setFilter}/>
            {questList.map((quest) => {
                return (
                    <Accordion key={quest.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>{quest.name}</Typography>
                            <Button 
                                variant="contained" 
                                sx={{ marginLeft: 'auto', marginRight: '16px' }} 
                                color="primary"
                                onClick={() => navigate('/quests/'+quest.id)}
                            >SHOW</Button>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{...styles.body, alignItems: 'flex-start'}}>
                                <Typography>{quest.description}</Typography>
                            </Box>
                            <Box sx={{...styles.details, justifyContent: 'center'}}>
                                <Box sx={styles.body}>
                                    <Typography variant="h6">Quest Level</Typography>
                                    <Chip label={`${quest.requiredLevel || 1}`} />
                                </Box>
                                <Box sx={styles.body}>
                                    {
                                        quest.requiredQuests && quest.requiredQuests.length > 0 && <Typography variant="h6">Required Quests</Typography>
                                    }
                                    <Box sx={styles.details}>
                                        {
                                            quest.requiredQuests && quest.requiredQuests.map((q) => {
                                                return (
                                                    <Chip key={q} label={questList.find(_q => _q.id === q)?.name} />
                                                );
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                                {
                                    quest.stages.length === 0 && (
                                        <Typography>This quest has no stages</Typography>
                                    )
                                }
                                {
                                    quest.stages.map((stage) => {
                                        return (
                                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                <Typography sx={{ margin: '8px' }}>{stage.stageName}</Typography>
                                                <Chip sx={{ margin: '8px' }} label={`TYPE: ${stage.stageType}`}/>
                                                <Chip sx={{ margin: '8px' }} label={`NPC: ${stage.stageNPCId}`}/>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            {
                questList.length === 0 &&
                 (
                    <Typography variant="h3" sx={{ justifySelf: 'center', marginY: 'auto', fontWeight: "bold" }}>No Quests found</Typography>
                 )
            }
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
        </Paper >
    );
};

export default QuestList;