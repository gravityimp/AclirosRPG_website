import { Search } from "@mui/icons-material";
import { Autocomplete, Box, InputAdornment, Paper, TextField } from "@mui/material";
import { FC } from "react";
import { MobFilter } from "../../services/Mob";
import { styles } from './styles';

interface Props {
    filter: MobFilter;
    setFilter: (filter: MobFilter) => void;
}

const MobFilterComponent: FC<Props> = (props) => {

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
                    options={['normal', 'elite', 'boss', 'special']}
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
                    options={['friendly', 'hostile', 'passive']}
                    value={filter.hostility || []}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="HOSTILITY"
                        />
                    )}
                    onChange={(e, value) => {
                        if (value.length === 0) {
                            const newFilter = { ...filter };
                            delete newFilter.hostility;
                            setFilter(newFilter);
                        } else {
                            setFilter({ ...filter, hostility: value });
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
            </Box>
        </Paper>
    );
};

export default MobFilterComponent;

