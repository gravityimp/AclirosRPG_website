import { AccountCircle, Light, LocationOnTwoTone, Logout, MenuBook, More } from "@mui/icons-material";
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, ListItemIcon } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api/database";


interface Props {
    modal: string | null;
    setModal: (modal: string | null) => void;
    roles: any[];
    setToken: (token: string | null) => void;
    user: any;
    setUser: (user: any) => void;
}

const userImageURL = "https://crafatar.com/avatars/";

const Navbar: FC<Props> = (props) => {

    const { roles, modal, setModal, setToken, user, setUser } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const [myAvatar, setMyAvatar] = useState<string>("");

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        apiClient.post("api/users/logout").then(res => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(localStorage.getItem("user"));
            setToken(localStorage.getItem("token"));
        });
    }

    useEffect(() => {
        setMyAvatar(userImageURL + user?.uuid);
    }, [user]);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    >
                        ACLIROSRPG
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuBook />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem
                                sx={{
                                    color: location.pathname === '/items' ? '	#FFAA00' : 'black',
                                    cursor: location.pathname === '/items' ? 'default' : 'pointer'
                                }}
                                onClick={() => location.pathname === '/items' && navigate('/items')}
                            >
                                <Typography textAlign="center">Items</Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    color: location.pathname === '/mobs' ? '#FFAA00' : 'black',
                                    cursor: location.pathname === '/mobs' ? 'default' : 'pointer'
                                }}
                                onClick={() => location.pathname === '/mobs' && navigate('/mobs')}
                            >
                                <Typography textAlign="center">Mobs</Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    color: location.pathname === '/quests' ? '#FFAA00' : 'black',
                                    cursor: location.pathname === '/quests' ? 'default' : 'pointer'
                                }}
                                onClick={() => location.pathname === '/quests' && navigate('/quests')}
                            >
                                <Typography textAlign="center">Quests</Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    color: location.pathname === '/npc' ? '#FFAA00' : 'black',
                                    cursor: location.pathname === '/npc' ? 'default' : 'pointer'
                                }}
                                onClick={() => location.pathname === '/npc' && navigate('/npc')}
                            >
                                <Typography textAlign="center">Npc</Typography>
                            </MenuItem>
                        </Menu>
                    </Box >
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    >
                        ACLIROSRPG
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => {
                                if (location.pathname !== '/items') navigate('/items')
                            }}
                            sx={{
                                my: 2,
                                display: 'block',
                                color: location.pathname === '/items' ? '	#FFAA00' : 'white',
                                cursor: location.pathname === '/items' ? 'default' : 'pointer'
                            }}
                        >Items</Button>
                        <Button
                            onClick={() => {
                                if (location.pathname !== '/mobs') navigate('/mobs')
                            }}
                            sx={{
                                my: 2,
                                display: 'block',
                                color: location.pathname === '/mobs' ? '	#FFAA00' : 'white',
                                cursor: location.pathname === '/mobs' ? 'default' : 'pointer'
                            }}
                        >Mobs</Button>
                        <Button
                            onClick={() => {
                                if (location.pathname !== '/quests') navigate('/quests')
                            }}
                            sx={{
                                my: 2,
                                display: 'block',
                                color: location.pathname === '/quests' ? '	#FFAA00' : 'white',
                                cursor: location.pathname === '/quests' ? 'default' : 'pointer'
                            }}
                        >Quests</Button>
                        <Button
                            onClick={() => {
                                if (location.pathname !== '/npc') navigate('/npc')
                            }}
                            sx={{
                                my: 2,
                                display: 'block',
                                color: location.pathname === '/npc' ? '#FFAA00' : 'white',
                                cursor: location.pathname === '/npc' ? 'default' : 'pointer'
                            }}
                        >Npc</Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={myAvatar} alt="P" variant="square" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                user && localStorage.getItem("token") && localStorage.getItem("user")
                                    ? (<Box>
                                        <MenuItem onClick={() => { 
                                            navigate('/players/'+user.name);
                                            handleCloseUserMenu();
                                        }}>
                                            <ListItemIcon>
                                                <AccountCircle fontSize="small" />
                                            </ListItemIcon>
                                            <Typography textAlign="center">Account</Typography>
                                        </MenuItem>
                                        {
                                            roles.find((r: any) => r === 'admin')
                                                ? (
                                                    <MenuItem onClick={() => {
                                                        navigate('/admin');
                                                        handleCloseUserMenu();
                                                    }}>
                                                        <ListItemIcon>
                                                            <Light fontSize="small" />
                                                        </ListItemIcon>
                                                        <Typography textAlign="center">Admin</Typography>
                                                    </MenuItem>
                                                )
                                                : null
                                        }
                                        <MenuItem onClick={handleLogout} sx={{ color: '#FF5555' }}>
                                            <ListItemIcon>
                                                <Logout sx={{ color: '#FF5555' }} fontSize="small" />
                                            </ListItemIcon>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Box>)
                                    : (
                                        <Box>
                                            <MenuItem onClick={() => setModal('login')}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                <Typography textAlign="center">Login</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => setModal('register')}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                <Typography textAlign="center">Register</Typography>
                                            </MenuItem>
                                        </Box>
                                    )
                            }
                        </Menu>
                    </Box>
                </Toolbar >
            </Container >
        </AppBar >
    );
};
export default Navbar;