import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../api/database";
import { Mob, MobFilter } from "../../../services/Mob";
import MobFilterComponent from "../../Filter/MobFilterComponent";

const styles = {
    accordion: {
        margin: "8px 4px",
        width: '100%'
    }
};

const MobList = () => {

    const navigate = useNavigate();

    const [mobList, setMobList] = useState<Mob[]>([]);
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
        const callback = function(entries: any, observer: any) {
            if(entries[0].isIntersecting) {
                if(page < lastPage) {
                    setPage(page + 1);
                }
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(lastElement.current);
    }, []);

    return (
        <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', width: '90%', padding: '16px', margin: '16px', height: 'fit-content', minHeight: '70vh' }}>
            <MobFilterComponent filter={filter} setFilter={setFilter}/>
            {mobList.map((mob) => {
                return (
                    <Accordion key={mob.id} sx={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Typography>{mob.name}</Typography>
                            <Button 
                                variant="contained" 
                                sx={{ marginLeft: 'auto', marginRight: '16px' }}
                                 color="primary"
                                 onClick={() => navigate('/mobs/'+mob.id)}
                            >SHOW</Button>
                        </AccordionSummary>
                        <AccordionDetails>
                            Some mob
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            {
                mobList.length === 0 &&
                 (
                    <Typography variant="h3" sx={{ justifySelf: 'center', marginY: 'auto', fontWeight: "bold" }}>No MOBS found</Typography>
                 )
            }
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
        </Paper>
    );
};

export default MobList;