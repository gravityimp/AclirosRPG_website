import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Box, Fab, Chip } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/database";
import { Quest, QuestFilter } from "../../services/Quest";
import QuestFilterComponent from "../Filter/QuestFilterComponent";
import QuestForm from "../Form/QuestForm";
import EditModal from "../Modal/EditModal";


const styles = {
    accordion: {
        margin: "8px 4px"
    }
};

const AdminQuestList = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [questList, setQuestList] = useState<Quest[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [questEdit, setQuestEdit] = useState<Quest | null>(null);

    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [filter, setFilter] = useState<QuestFilter>({});

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
    };

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
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
    }, [isLoading]);

    useEffect(() => {
        setPage(0);
        fetchQuests();
    }, [filter]);

    useEffect(() => {
        fetchQuests();
    }, [page]);

    const deleteQuest = async (id: number) => {
        apiClient.delete(`api/quests/${id}`).then(res => {
            setPage(0);
            enqueueSnackbar(`QUEST DELETED [${id}]`, { variant: "success" });
        }).then(res => {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
        });
    };

    const handleEditMode = (quest: Quest) => {
        setQuestEdit(quest);
        setIsEditMode(true);
    };

    const handleClose = () => {
        setIsEditMode(false);
        setQuestEdit(null);
        setPage(0);
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%' }}>
                <QuestFilterComponent filter={filter} setFilter={setFilter} />
            </Box>
            {
                questList.length === 0 && (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px' }}>
                        <Typography variant="h4">No Quests Found</Typography>
                    </Box>
                )
            }
            {questList.map((quest) => {
                return (
                    <Accordion key={quest.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Chip label={`ID: ${quest.id}`} />
                                <Typography
                                    sx={{
                                        marginLeft: '8px',
                                    }}>{quest.name}</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button color="success" onClick={() => navigate(`/quests/${quest.id}`)}>SHOW</Button>
                            <Button color="primary" onClick={() => handleEditMode(quest)}>EDIT</Button>
                            <Button color="error" onClick={() => deleteQuest(quest.id)}>DELETE</Button>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
            <EditModal isOpen={isEditMode} onClose={handleClose} title={questEdit !== null ? `Edit Quest [${questEdit.id}]` : 'Create Quest'}>
                <QuestForm editQuest={questEdit !== null ? questEdit : undefined} closeModal={handleClose} />
            </EditModal>
            <Fab
                sx={{ position: 'fixed', bottom: '16px', right: '16px' }}
                color="primary"
                onClick={() => setIsEditMode(true)}
            >
                <Add />
            </Fab>
        </Box>
    );
}
export default AdminQuestList;