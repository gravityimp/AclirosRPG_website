import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Box, Fab, Chip } from "@mui/material";
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

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchNpc = async () => {
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
        fetchNpc();
    }, [filter]);

    useEffect(() => {
        fetchNpc();
    }, [page]);

    const deleteNpc = async (id: number) => {
        apiClient.delete(`api/npc/${id}`).then(res => {
            setPage(0);
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
        setPage(0);
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%' }}>
                <NpcFilterComponent filter={filter} setFilter={setFilter} />
            </Box>
            {
                npcList.length === 0 && (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px' }}>
                            <Typography variant="h4">No Npc Found</Typography>
                        </Box>
                )
            }
            {npcList.map((npc) => {
                return (
                    <Accordion key={npc.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Chip label={`ID: ${npc.id}`} />
                                <Typography
                                    sx={{
                                        marginLeft: '8px',
                                    }}>{npc.name}</Typography>
                            </Box>
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
            <EditModal isOpen={isEditMode} onClose={handleClose} title={npcEdit !== null ? `Edit Npc [${npcEdit.id}]` : 'Create Npc'}>
                <NpcForm editNpc={npcEdit !== null ? npcEdit : undefined} closeModal={handleClose} />
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
export default AdminNpcList;