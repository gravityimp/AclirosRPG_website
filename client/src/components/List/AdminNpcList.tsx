import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Box, Fab } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/database";
import { Npc, NpcFilter } from "../../services/Npc";
import NpcFilterComponent from "../Filter/NpcFilterComponent";
import NpcForm from "../Form/NpcForm";
import EditModal from "../Modal/EditModal";


const styles = {
    accordion: {
        margin: "8px 4px"
    }
};

const AdminNpcList = () => {

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const [npcList, setNpcList] = useState<Npc[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [npcEdit, setNpcEdit] = useState<Npc | null>(null);

    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [filter, setFilter] = useState<NpcFilter>({});

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchNpc = async () => {
        apiClient.get("api/npc", {
            params: {
                page: page,
                limit: 20,
                ...filter
            }
        }).then(res => {
            setNpcList(res.data.data);
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
        fetchNpc();
    }, [filter, page]);

    const deleteNpc = async (id: number) => {
        apiClient.delete(`api/npc/${id}`).then(res => {
            fetchNpc();
            enqueueSnackbar(`NPC DELETED [${id}]`, { variant: "success" });
        }).catch(err => {
            enqueueSnackbar("Something went wrong", {variant: 'error'});
        });
    };

    const handleEditMode = (npc: Npc) => {
        setNpcEdit(npc);
        setIsEditMode(true);
    };

    const handleClose = () => {
        setIsEditMode(false);
        setNpcEdit(null);
        fetchNpc();
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%' }}>
                <NpcFilterComponent filter={filter} setFilter={setFilter} />
            </Box>
            {npcList.map((npc) => {
                return (
                    <Accordion key={npc.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>ID: {npc.id} NAME: {npc.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button color="success" onClick={() => navigate(`/npc/${npc.id}`)}>SHOW</Button>
                            <Button color="primary" onClick={() => handleEditMode(npc)}>EDIT</Button>
                            <Button color="error" onClick={() => deleteNpc(npc.id)}>DELETE</Button>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
            <EditModal isOpen={isEditMode} onClose={handleClose}>
                <NpcForm editNpc={npcEdit !== null ? npcEdit : undefined} closeModal={handleClose} />
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
export default AdminNpcList;