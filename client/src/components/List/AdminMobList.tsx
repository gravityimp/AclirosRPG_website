import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Box, Fab, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../api/database";
import { getMobTypeColor, Mob, MobFilter } from "../../services/Mob";
import MobForm from "../Form/MobForm";
import EditModal from "../Modal/EditModal";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


const styles = {
    accordion: {
        margin: "8px 4px"
    }
};

const AdminMobList = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [mobList, setMobList] = useState<Mob[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [mobEdit, setMobEdit] = useState<Mob | null>(null);

    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [filter, setFilter] = useState<MobFilter>({});

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchMob = async () => {
        apiClient.get("api/mobs", {
            params: {
                page: page,
                limit: 20,
                ...filter
            }
        }).then(res => {
            setMobList(res.data.data);
            setLastPage(res.data.lastPage);
        });
    };

    useEffect(() => {
        fetchMob();
    }, [page, filter]);

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

    const deleteMob = (id: number) => {
        apiClient.delete(`api/mobs/${id}`).then(res => {
            fetchMob();
            enqueueSnackbar(`MOB DELETED [${id}]`, { variant: "success" });
        }).catch(err => {
            enqueueSnackbar("Something went wrong", { variant: "error" });
        });
    }

    const handleEditMode = (mob: Mob) => {
        setMobEdit(mob);
        setIsEditMode(true);
    };

    const handleClose = () => {
        setIsEditMode(false);
        setMobEdit(null);
        fetchMob();
    }

    return (
        <>
            {mobList.map((mob) => {
                return (
                    <Accordion key={mob.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Chip label={`ID: ${mob.id}`}/>
                                    <Typography 
                                        sx={{ 
                                            marginLeft: '8px', 
                                            color: getMobTypeColor(mob.type), 
                                            fontWeight: mob.type === "boss" || mob.type === "special" ? 'bold' : 'normal'
                                        }}>[LVL: {mob.level}] {mob.name}</Typography>
                                </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button color="success" onClick={() => navigate(`/mobs/${mob.id}`)}>SHOW</Button>
                            <Button color="primary" onClick={() => handleEditMode(mob)}>EDIT</Button>
                            <Button color="error" onClick={() => deleteMob(mob.id)}>DELETE</Button>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
            <EditModal isOpen={isEditMode} onClose={handleClose}>
                <MobForm editMob={mobEdit !== null ? mobEdit : undefined} closeModal={handleClose} />
            </EditModal>
            <Fab
                sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
                color="primary"
                onClick={() => setIsEditMode(true)}
            >
                <Add />
            </Fab>
        </>
    );
}
export default AdminMobList;