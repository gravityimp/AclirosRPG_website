import { Badge, Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useSnackbar } from "notistack";
import PlayerFilter from "../components/Filter/ItemFilterComponent";
import { ItemFilter } from "../services/Item";
import ItemFilterComponent from "../components/Filter/ItemFilterComponent";
import { useState } from "react";

const DashboardPage = () => {

    const { enqueueSnackbar } = useSnackbar();

    const handleCopy = () => {
        navigator.clipboard.writeText('AclirosRPG.minehut.gg');
        enqueueSnackbar("IP Copied to clipboard", { variant: "success" });
    };

    return (
        <Paper elevation={3} sx={{
            width: '80%',
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            margin: '16px',
        }}>
            <Badge badgeContent={<AssignmentTurnedInIcon sx={{ color: 'gray' }} />}>
                <Typography
                    variant="h2"
                    sx={{
                        fontStyle: 'italic', 
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        justifySelf: 'start'
                    }}
                    onClick={handleCopy}
                >AclirosRPG</Typography>
            </Badge>
            <Box sx={{ alignSelf: 'start' }}>
                <Typography>AclirosRPG - is minecraft rpg server.</Typography>
            </Box>
        </Paper>
    );
};

export default DashboardPage;
