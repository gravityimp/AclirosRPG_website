import { TableContainer, Box, Typography, Table, TableHead, TableCell, TableBody, TableRow, CircularProgress } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/database";
import { ItemDrop } from "../services/types";

interface Props {
    items: ItemDrop[];
}

const MobsDropTable: FC<Props> = (porps) => {

    const { items } = porps;

    const navigate = useNavigate();

    const [itemData, setItemData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchItemData = async () => {
        const itemIds = await items.map(item => item.itemId);
        for (const itemId of itemIds) {
            apiClient.get(`api/items/${itemId}`).then(res => {
                setItemData(prev => [...prev, res.data.name]);
            }).catch(err => {
                console.log(err);
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchItemData();
        setLoading(false);
    }, [items]);

    if(loading) {
        return <CircularProgress sx={{ margin: '16px' }}/>;
    }

    if(itemData.length === 0) {
        return (
            <Typography sx={{ margin: '16px' }}>This mob desn't have any drops :(</Typography>
        )
    }

    return (
        <TableContainer sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px' }} component={Box}>
            <Typography variant="h5" sx={{ alignSelf: 'start', width: '80%', margin: 'auto', fontWeight: '900' }}>Drop Table</Typography>
            <Table sx={{ minWidth: '300px', width: '80%' }}>
                <TableHead sx={{ borderBottom: '3px solid green' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '900', fontSize: '1.1rem', paddingLeft: '0', width: '100%' }}>Item</TableCell>
                        <TableCell sx={{ fontWeight: '900', fontSize: '1.1rem', paddingLeft: '0', width: '10%' }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: '900', fontSize: '1.1rem', paddingLeft: '0', width: '10%' }}>Chance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item, index) => {
                            return (
                                <TableRow
                                    key={item.itemId}
                                    sx={{
                                        borderBottom: index !== items.length - 1 ? '2px solid black' : '2px solid transparent',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/items/' + item.itemId);
                                    }}
                                >
                                    <TableCell component="th" sx={{ fontWeight: 'bold', paddingLeft: '0', width: '100%' }}>{itemData[index]}</TableCell>
                                    <TableCell component="th" sx={{ paddingLeft: '0', width: '10%' }}>{item.itemAmount}-{item.maxItemAmount || item.itemAmount}</TableCell>
                                    <TableCell component="th" sx={{ paddingLeft: '0', width: '10%' }}>{item.chance.toFixed(3)}%</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MobsDropTable;