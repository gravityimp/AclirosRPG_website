import { Paper, Box, TextField, InputAdornment } from "@mui/material";
import { FC } from "react";
import { Search } from "@mui/icons-material";
import { NpcFilter } from "../../services/Npc";
import { styles } from './styles';


interface Props {
    filter: NpcFilter;
    setFilter: (filter: NpcFilter) => void;
}

const NpcFilterComponent: FC<Props> = (props) => {

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
        </Paper>
    );
};

export default NpcFilterComponent;