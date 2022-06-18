import { Box, Typography } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            sx={{ 
                width: '100%'
             }}
            {...other}
        >
            {value === index && (
                <Box sx={{ width: '100%' }}>{children}</Box>
            )}
        </Box>
    );
}

export default TabPanel;