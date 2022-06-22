import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles.css";
import myBackground from './static/rpgBack.jpg';

import ModalLogin from "./components/Modal/ModalLogin";
import ModalRegister from "./components/Modal/ModalRegister";
import ItemList from "./components/List/Entities/ItemList";
import MobList from "./components/List/Entities/MobList";
import QuestList from "./components/List/Entities/QuestList";
import { Box } from "@mui/system";
import NpcList from "./components/List/Entities/NpcList";
import NpcPage from "./pages/EnityPages/NpcPage";
import MobPage from "./pages/EnityPages/MobPage";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import ItemPage from "./pages/EnityPages/ItemPage";
import { apiClient } from "./api/database";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [modal, setModal] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user") || "{}"));

  useEffect(() => {
    let _roles: string[] = []
    if (user && localStorage.getItem("user")) {
      apiClient.get(`api/players/${user.uuid}/roles`).then(res => {
        res.data.forEach((role: any) => {
          _roles.push(role.role)
        });
        setRoles(_roles);
      });
    }
  }, [user]);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    }}
    >
      <Navbar roles={roles} user={user} setUser={setUser} modal={modal} setModal={setModal} setToken={setToken} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: '5%'
      }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/players/:name" element={<AccountPage />} />

          <Route path="/items" element={<ItemList />} />
          <Route path="/items/:itemId" element={<ItemPage />} />

          <Route path="/npc" element={<NpcList />} />
          <Route path="/npc/:npcId" element={<NpcPage />} />

          <Route path="/quests" element={<QuestList />} />
          {/* <Route path="/quests/:questId" element={<QuestPage />} /> */}

          <Route path="/mobs" element={<MobList />} />
          <Route path="/mobs/:mobId" element={<MobPage />} />

          {
            user && roles.includes('admin') && (
              <Route path="/admin" element={<AdminPage />} />
            )
          }

          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </Box>
      <ModalLogin
        isOpen={modal === "login"}
        handleClose={() => setModal(null)}
        setToken={setToken}
        setUser={setUser}
        title="Sign in"
      />
      <ModalRegister
        isOpen={modal === "register"}
        handleClose={() => setModal(null)}
        setToken={setToken}
        setUser={setUser}
        title="Sign up"
      />
    </Box>
  );
}
