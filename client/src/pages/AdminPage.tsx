import { Paper, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import AdminItemList from "../components/List/AdminItemList";
import AdminMobList from "../components/List/AdminMobList";
import AdminNpcList from "../components/List/AdminNpcList";
import AdminPlayerList from "../components/List/AdminPlayerList";
import AdminQuestList from "../components/List/AdminQuestList";
import TabPanel from "../components/TabPanel";


const AdminPage = () => {

    const [adminTab, setAdminTab] = useState<number>(0);

    function a11yProps(index: number) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Paper elevation={3} sx={{
            width: '80%',
            height: '70vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            padding: '16px',
            margin: '16px',
        }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={adminTab}
                onChange={(e: any, newValue: number) => setAdminTab(newValue)}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Items" {...a11yProps(0)} />
                <Tab label="Mobs" {...a11yProps(1)} />
                <Tab label="Spawners" {...a11yProps(2)} />
                <Tab label="Npc" {...a11yProps(3)} />
                <Tab label="Quests" {...a11yProps(4)} />
                <Tab label="Players" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={adminTab} index={0}>
                <AdminItemList/>
            </TabPanel>
            <TabPanel value={adminTab} index={1}>
                <AdminMobList/>
            </TabPanel>
            <TabPanel value={adminTab} index={2}>
                SPAWNERS
            </TabPanel>
            <TabPanel value={adminTab} index={3}>
                <AdminNpcList/>
            </TabPanel>
            <TabPanel value={adminTab} index={4}>
                <AdminQuestList/>
            </TabPanel>
            <TabPanel value={adminTab} index={5}>
                <AdminPlayerList/>
            </TabPanel>
        </Paper>
    );
};

export default AdminPage;