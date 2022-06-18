import { Box, Divider, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../api/database";
import ItemDropTable from "../../components/ItemDropTable";
import PreviewItem from "../../components/Preview/PreviewItem";
import StatTable from "../../components/StatTable";
import { Item, testItem } from "../../services/Item";

const styles = {
    paper: {
        width: '80%',
        minHeight: '70vh',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        margin: '16px',
        padding: '16px',
    },
    box: {
        width: '100%',
        marginTop: '10%',
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        gridTemplateRows: '1fr',
        justifyItems: 'start',
        alignItems: 'start',
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    itemDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
        marginX: '16px'
    }
};

const ItemPage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [itemData, setItemData] = useState<Item>();

    const [stats, setStats] = useState<string[]>([]);
    const [values, setValues] = useState<any[]>([]);
    const [statsR, setStatsR] = useState<string[]>([]);
    const [valuesR, setValuesR] = useState<any[]>([]);

    useEffect(() => {
        if (params.itemId) {
            apiClient.get(`api/items/${parseInt(params.itemId)}`).then(res => {
                setItemData(res.data);
                const _item: Item = res.data;
                const _s = [
                    'Name',
                    'Type',
                    'Item',
                    'Rarity',
                    'Player Bound',
                ];

                const _v = [
                    _item.name,
                    _item.type,
                    _item.item,
                    _item.rarity,
                    _item.playerBound.toString(),
                ];

                if (_item.weapon?.minDmg) {
                    _s.push('Damage');
                    _v.push(`${_item.weapon.minDmg} - ${_item.weapon.maxDmg}`);
                }
                if (_item.weapon?.minMagicDmg) {
                    _s.push('Magic Damage');
                    _v.push(`${_item.weapon.minMagicDmg} - ${_item.weapon.maxMagicDmg}`);
                }
                if (_item.weapon?.critChance) {
                    _s.push('Crit Chance');
                    _v.push(`${_item.weapon.critChance}%`);
                }
                if (_item.weapon?.vampirism) {
                    _s.push('Vampirism');
                    _v.push(`${_item.weapon.vampirism}%`);
                }
                if (_item.armor?.armor) {
                    _s.push("Armor");
                    _v.push(`${_item.armor.armor}`);
                }
                if (_item.armor?.armorMagic) {
                    _s.push("Magic Armor");
                    _v.push(`${_item.armor.armorMagic}`);
                }
                if (_item.armor?.resistance) {
                    _s.push("Resistance");
                    _v.push(`${_item.armor.resistance}`);
                }
                if (_item.armor?.regeneration) {
                    _s.push("Regeneration");
                    _v.push(`${_item.armor.regeneration}`);
                }
                if (_item.armor?.health) {
                    _s.push("Health");
                    _v.push(`${_item.armor.health}`);
                }
                if (_item.lore.length > 0) {
                    _s.push("Lore");
                    _v.push(_item.lore);
                }
                setStats(_s);
                setValues(_v);

                const _sR = []
                const _vR = []

                if (_item.requirements?.level) {
                    _sR.push("Level");
                    _vR.push(`${_item.requirements.level}`);
                }
                if (_item.requirements?.strength) {
                    _sR.push("Strength");
                    _vR.push(`${_item.requirements.strength}`);
                }
                if (_item.requirements?.agillity) {
                    _sR.push("Agillity");
                    _vR.push(`${_item.requirements.agillity}`);
                }
                if (_item.requirements?.intelligence) {
                    _sR.push("Intelligence");
                    _vR.push(`${_item.requirements.intelligence}`);
                }
                setStatsR(_sR);
                setValuesR(_vR);

            }).catch(err => {
                navigate('/');
                enqueueSnackbar(`NO ITEM WITH ID ${params.itemId} FOUND`, { variant: "error" });
            });
        }
    }, []);

    return (
        <Paper elevation={6} sx={styles.paper}>
            <Box sx={styles.box}>
                <Box sx={styles.itemBox}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h4">Preview</Typography>
                    <PreviewItem item={itemData || testItem} />
                </Box>
                <Box sx={styles.itemDetails}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h4">Item Details</Typography>
                    <StatTable
                        name="General"
                        stats={stats}
                        values={values}
                    />
                    {
                        itemData?.requirements && (
                            <StatTable
                                name="Requirements"
                                stats={statsR}
                                values={valuesR}
                            />
                        )
                    }
                </Box>
            </Box>
            {
                itemData && (
                    <ItemDropTable itemId={itemData?.id} />
                )
            }

        </Paper>
    );
}

export default ItemPage;