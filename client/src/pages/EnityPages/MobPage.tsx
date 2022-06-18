import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../api/database";
import MobsDropTable from "../../components/MobsDropTable";
import StatTable from "../../components/StatTable";
import { getMobTypeColor, Mob } from "../../services/Mob";
import { minecraftMobs } from "../../static/minecraftMobs";


const styles = {
    flexColCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        width: '70%',
        height: 'fit-content',
        minHeight: '70vh',
        justifyContent: 'start',
    },
    justifyStart: {
        justifySelf: 'start'
    },
    alignSelf: {
        alignSelf: 'start',
        marginLeft: '8px'
    }
}

interface Props {
    mob?: Mob;
    mobId?: number;
}

//const book = "https://lh3.googleusercontent.com/r4D7ZEMRtfiCMUTPHcCReXnwNaj_OZ6koqq7nYqFOGB4iW0IpEepYSroEjWTQqIGLHfBRWYDF8KXfhVhiodQyg";

const MobPage: FC<Props> = (props) => {

    const { mob, mobId } = props;

    const [mobData, setMobData] = useState<Mob>();

    const params = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (params.mobId) {
            apiClient.get(`api/mobs/${parseInt(params.mobId)}`).then(res => {
                setMobData(res.data);                
            }).catch(err => {
                navigate("/");
                enqueueSnackbar(`NO MOB WITH ID ${params.mobId} FOUND`, { variant: "error" });   
            });
        }
    }, []);

    return (
        <Paper elevation={6} sx={{ ...styles.flexColCenter, ...styles.paper, marginY: '16px' }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    marginY: '8px', 
                    color: getMobTypeColor(mobData?.type || "") ,
                    fontWeight: mobData?.type === "boss" || mobData?.type === "special" ? 'bold' : 'normal'
                }}
                >[LVL: {mobData?.level}] {mobData?.name}</Typography>
            <img style={{ width: '128px', height: '128px' }} src={minecraftMobs.find((m) => m.name.toLocaleLowerCase() === mobData?.mobType)?.image} alt="img" />
            <StatTable
                name="General"
                stats={['Name', 'Level', 'Health', 'Damage', 'Type', 'Mob', 'Hostile', 'IsBaby', 'Exprerience']}
                values={[mobData?.name, mobData?.level, mobData?.health, mobData?.damage, mobData?.type, mobData?.mobType, mobData?.hostility, mobData?.isBaby.toString(), mobData?.drops?.experience || 0]}
            />
            <MobsDropTable
                items={mobData?.drops?.items || []}
            />
        </Paper>
    )
};

export default MobPage;

