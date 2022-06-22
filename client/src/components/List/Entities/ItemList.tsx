import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../api/database";
import { Item, ItemFilter } from "../../../services/Item";
import ItemFilterComponent from "../../Filter/ItemFilterComponent";
import PreviewItem from "../../Preview/PreviewItem";
import Masonry from 'react-masonry-css';
import { useNavigate } from "react-router-dom";

const styles = {
    itemList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        width: '90%',
        padding: '16px',
        margin: '16px'
    }
}

const breakpoints = {
    default: 4,
    1300: 3,
    1000: 2,
    650: 1
};

const ItemList = () => {

    const navigate = useNavigate();
    //functoin to 

    const [items, setItems] = useState<Item[]>([]);
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
        } catch (error) {
            return;
        }
        if (page === 0) {
            setItems(response.data.data);
            setLastPage(response.data.lastPage);
        } else {
            setItems([...items, ...response.data.data]);
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
        fetchItems();
    }, [filter]);

    useEffect(() => {
        fetchItems();
    }, [page]);

    return (
        <Paper elevation={6} sx={styles.itemList}>
            <ItemFilterComponent filter={filter} setFilter={setFilter} />
            {
                items.length === 0
                    ? (
                        <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '16px', padding: '16px', width: '100%', minHeight: '30vh' }}>
                            <Typography variant="h4">No Items found</Typography>
                        </Paper>
                    )
                    : (
                        <Paper elevation={4} sx={{ width: '100%', margin: '16px', padding: '16px' }}>
                            <Masonry
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                                breakpointCols={breakpoints}
                            >
                                {items.map((item) => {
                                    return (
                                        <Box 
                                            key={`${item.name}_${item.id}`} 
                                            sx={{ minWidth: '200px', maxWidth: '250px', width: 'fit-content', marginY: '16px', marginX: 'auto', cursor: 'pointer'}}
                                            onClick={() => navigate('/items/'+item.id)}
                                        >
                                            <PreviewItem key={item.id} item={item} />
                                        </Box>
                                    );
                                })}
                            </Masonry>
                        </Paper>
                    )
            }
            <div ref={lastElement} style={{ height: '10px', width: '100%', backgroundColor: 'transparent' }} />
        </Paper>
    )
};

export default ItemList;