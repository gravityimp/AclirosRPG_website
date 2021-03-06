import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Box, Stack, Fab, Chip } from "@mui/material";
import { Add, ConnectingAirportsOutlined, ExpandMore, LocalDining } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { getRarityColor, Item, ItemFilter } from "../../services/Item";
import ItemForm from "../Form/ItemForm";
import EditModal from "../Modal/EditModal";
import { apiClient } from "../../api/database";
import ItemFilterComponent from "../Filter/ItemFilterComponent";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const styles = {
    accordion: {
        margin: "8px 4px",
        width: '90%',
        padding: '2px',
    }
};

const AdminItemList = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [items, setItems] = useState<Item[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [itemEdit, setItemEdit] = useState<Item | null>(null);

    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [filter, setFilter] = useState<ItemFilter>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchItems = async () => {
        setIsLoading(true);
        let response: any;
        try {
            response = await apiClient.get("api/items", {
                params: {
                    page: page,
                    limit: 20,
                    ...filter
                }
            });
            if (page === 0) {
                setItems(response.data.data);
                setLastPage(response.data.lastPage);
            } else {
                setItems([...items, ...response.data.data]);
            }
        } catch (error) {
            return;
        } finally {
            setIsLoading(false);
        }  
    };

    useEffect(() => {
        setPage(0);
        fetchItems();
    }, [filter]);

    useEffect(() => {
        fetchItems();
    }, [page]);

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        const options = {
            root: document,
        }
        var callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting) {
                if (page < lastPage) {
                    setPage(page+1);
                }
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(lastElement.current);
    }, [isLoading]);

    const deleteItem = (id: number) => {
        apiClient.delete(`api/items/${id}`).then(res => {
            setPage(0);
            enqueueSnackbar(`ITEM DELETED [${id}]`, { variant: "success" });
        }).catch(err => {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
        });
    }

    const handleEditMode = (item: Item) => {
        setItemEdit(item);
        setIsEditMode(true);
    };

    const handleClose = () => {
        setIsEditMode(false);
        setItemEdit(null);
        setPage(0);
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%' }}>
                <ItemFilterComponent filter={filter} setFilter={setFilter} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    items.length === 0 && (
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px' }}>
                            <Typography variant="h4">No Items Found</Typography>
                        </Box>
                    )
                }
                {items.map((item) => {
                    return (
                        <Accordion key={item.id} sx={styles.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Chip label={`ID: ${item.id}`} />
                                    <Typography
                                        sx={{
                                            marginLeft: '8px',
                                            color: getRarityColor(item.rarity),
                                        }}>{item.name}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button color="success" onClick={() => navigate(`/items/${item.id}`)}>SHOW</Button>
                                <Button color="primary" onClick={() => handleEditMode(item)}>EDIT</Button>
                                <Button color="error" onClick={() => deleteItem(item.id)}>DELETE</Button>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
                <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
            </Box>
            <EditModal isOpen={isEditMode} onClose={handleClose} title={itemEdit === null ? 'Create Item' : `Edit Item [${itemEdit.id}]`}>
                <ItemForm editItem={itemEdit !== null ? itemEdit : undefined} closeModal={handleClose} />
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

export default AdminItemList;