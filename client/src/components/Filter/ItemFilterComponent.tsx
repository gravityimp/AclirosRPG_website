import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, Chip, InputAdornment, MenuItem, OutlinedInput, Paper, Select, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ItemFilter, RarityList } from "../../services/Item";
import { styles } from './styles';

interface Props {
    filter: ItemFilter;
    setFilter: (filter: ItemFilter) => void;
}

const ItemFilterComponent: FC<Props> = (props) => {

    const { filter, setFilter } = props;

    return (
        <Paper elevation={2} sx={styles.filterBox}>
            <Box sx={styles.search}>
                <TextField
                    label="Search"
                    placeholder="Search..."
                    sx={{ width: '100%' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                    }}
                    value={filter.name || ''}
                    onChange={(e) => {
                        if (e.target.value === "") {
                            const newFilter = { ...filter };
                            delete newFilter.name;
                            setFilter(newFilter);
                        } else {
                            setFilter({ ...filter, name: e.target.value });
                        }
                    }}
                />
            </Box>
            <Box sx={styles.filters}>
                <Autocomplete
                    multiple
                    sx={styles.input}
                    options={['weapon', 'armor', 'material', 'action']}
                    value={filter.type || []}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="TYPE"
                        />
                    )}
                    onChange={(e, value) => {
                        if (value.length === 0) {
                            const newFilter = { ...filter };
                            delete newFilter.type;
                            setFilter(newFilter);
                        } else {
                            setFilter({ ...filter, type: value });
                        }
                    }}
                />
                <Autocomplete
                    multiple
                    sx={styles.input}
                    options={['common', 'uncommon', 'rare', 'epic', 'legendary', 'artifact']}
                    value={filter.rarity || []}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="RARITY"
                        />
                    )}
                    onChange={(e, value) => {
                        if (value.length === 0) {
                            const newFilter = { ...filter };
                            delete newFilter.rarity;
                            setFilter(newFilter);
                        } else {
                            setFilter({ ...filter, rarity: value });
                        }
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        type="number"
                        label="LEVEL MIN"
                        sx={{ width: '100px', mx: '8px', minWidth: '100px', marginY: '8px' }}
                        value={filter.minLevel || 1}
                        InputProps={{
                            inputProps: {
                                min: 1,
                                max: 999
                            }
                        }}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                const newFilter = { ...filter };
                                delete newFilter.minLevel;
                                setFilter(newFilter);
                            } else {
                                setFilter({ ...filter, minLevel: parseInt(e.target.value) });
                            }
                        }}
                    />
                    <TextField
                        type="number"
                        label="LEVEL MAX"
                        sx={{ width: '100px', mx: '8px', minWidth: '100px', marginY: '8px' }}
                        value={filter.maxLevel || 1}
                        InputProps={{
                            inputProps: {
                                min: filter.minLevel || 1,
                                max: 999
                            }
                        }}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                const newFilter = { ...filter };
                                delete newFilter.maxLevel;
                                setFilter(newFilter);
                            } else {
                                setFilter({ ...filter, maxLevel: parseInt(e.target.value) });
                            }
                        }}
                    />
                </Box>
                <Button
                    sx={{ width: '15%', mx: '8px', minWidth: '200px', marginY: '8px' }}
                    size="large"
                    variant="contained"
                    onClick={() => {
                        if (filter.playerBound) {
                            const newFilter = { ...filter };
                            delete newFilter.playerBound;
                            setFilter(newFilter);
                        } else {
                            setFilter({ ...filter, playerBound: true });
                        }
                    }}
                >PLAYERBOUND</Button>
            </Box>
        </Paper >
    );
};


export default ItemFilterComponent;