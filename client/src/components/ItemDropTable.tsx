import { AllOutSharp, Co2Sharp, MonochromePhotosTwoTone } from "@mui/icons-material";
import { TableContainer, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/database";
import { Mob } from "../services/Mob";
import { ItemDrop } from "../services/types";

interface Props {
    itemId: number;
}

const ItemDropTable: FC<Props> = (props) => {

    const { itemId } = props;

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [mobData, setMobData] = useState<Mob[]>([]);
    const [dropData, setDropData] = useState<ItemDrop[]>([]);

    const fetchMobs = async () => {
        let allDrops: ItemDrop[] = [];
        let allMobs: Mob[] = [];
        apiClient.get("api/mobs").then(res => {
            const mobs: Mob[] = res.data;
            mobs.forEach(mob => {
                mob.drops?.items && mob.drops?.items?.forEach((drop: ItemDrop) => {
                    if (drop.itemId === itemId) {
                        allDrops.push(drop);
                        allMobs.push(mob);

                    }
                });
            });
            setDropData(allDrops);
            setMobData(allMobs);
        }).catch(err => {
            enqueueSnackbar(`Something went wrong`, { variant: "error" });
        });
    };

    useEffect(() => {
        fetchMobs();
    }, []);

    if (dropData.length === 0) {
        return (
            <Typography
                sx={{ width: '100%', textAlign: 'center', fontWeight: 'bold', margin: '16px' }}
                variant="h5"
            >This item can't be obtained via mob drops :(</Typography>
        );
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
                        dropData?.map((drop, index) => {
                            return (
                                <TableRow
                                    key={drop.itemId}
                                    sx={{
                                        borderBottom: index !== dropData.length - 1 ? '2px solid black' : '2px solid transparent',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/mobs/' + mobData[index].id);
                                    }}
                                >
                                    <TableCell component="th" sx={{ fontWeight: 'bold', paddingLeft: '0', width: '100%' }}>{mobData[index]?.name || "Item"}</TableCell>
                                    <TableCell component="th" sx={{ paddingLeft: '0', width: '10%' }}>{drop.itemAmount}-{drop.maxItemAmount || drop.itemAmount}</TableCell>
                                    <TableCell component="th" sx={{ paddingLeft: '0', width: '10%' }}>{drop.chance.toFixed(3)}%</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemDropTable;