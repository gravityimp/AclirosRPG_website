import { Paper, Box, TextField, InputAdornment } from "@mui/material";
import { FC } from "react";
import { Search } from "@mui/icons-material";
import { QuestFilter } from "../../services/Quest";
import { styles } from "./styles";

interface Props {
    filter: QuestFilter;
    setFilter: (filter: QuestFilter) => void;
}

const QuestFilterComponent: FC<Props> = (props) => {

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
        </Paper>
    );
};

export default QuestFilterComponent;