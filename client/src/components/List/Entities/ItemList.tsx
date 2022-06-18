import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../api/database";
import { Item, ItemFilter } from "../../../services/Item";
import ItemFilterComponent from "../../Filter/ItemFilterComponent";
import PreviewItem from "../../Preview/PreviewItem";
import Masonry from 'react-masonry-css';

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
    1100: 3,
    880: 2,
    590: 1
};

const ItemList = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [filter, setFilter] = useState<ItemFilter>({});

    const lastElement = useRef<any>();
    const observer = useRef<any>();

    const fetchItems = async () => {
        apiClient.get("api/items", {
            params: {
                page: page,
                limit: 20,
                ...filter
            }
        }).then(res => {
            setItems(res.data.data);
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
        fetchItems();
    }, [filter, page]);

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
                                        <Box key={`${item.name}_${item.id}`} sx={{ minWidth: '200px', maxWidth: '300px', width: 'fit-content', marginY: '16px', marginX: 'auto' }}>
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