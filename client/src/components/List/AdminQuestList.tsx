import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Box, Fab } from "@mui/material";
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

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchQuests = async () => {
        apiClient.get("api/quests", {
            params: {
                page: page,
                limit: 20,
                ...filter
            }
        }).then(res => {
            setQuestList(res.data.data);
            setLastPage(res.data.lastPage);
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
        fetchQuests();
    }, [filter, page]);

    const deleteQuest = async (id: number) => {
        apiClient.delete(`api/quests/${id}`).then(res => {
            fetchQuests();
            enqueueSnackbar(`QUEST DELETED [${id}]`, { variant: "success" });
        }).then(res => {
            enqueueSnackbar("Something went wrong", {variant: 'error'});
        });
    };

    const handleEditMode = (quest: Quest) => {
        setQuestEdit(quest);
        setIsEditMode(true);
    };

    const handleClose = () => {
        setIsEditMode(false);
        setQuestEdit(null);
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%' }}>
                <QuestFilterComponent filter={filter} setFilter={setFilter} />
            </Box>
            {questList.map((quest) => {
                return (
                    <Accordion key={quest.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>ID: {quest.id} NAME: {quest.name}</Typography>
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
            <EditModal isOpen={isEditMode} onClose={handleClose}>
                <QuestForm editQuest={questEdit !== null ? questEdit : undefined} closeModal={handleClose} />
            </EditModal>
            <Fab
                sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
                color="primary"
                onClick={() => setIsEditMode(true)}
            >
                <Add />
            </Fab>
        </Box>
    );
}
export default AdminQuestList;