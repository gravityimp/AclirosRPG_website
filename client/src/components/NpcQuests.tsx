import { Box, Chip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { apiClient } from "../api/database";
import { Quest, QuestStage } from "../services/Quest";


interface Props {
    npcId: number;
}

const NpcQuests: FC<Props> = ({ npcId }) => {

    const [quests, setQuests] = useState<string[]>([]);

    const fetchQuests = () => {
        const _quests: string[] = [];
        apiClient.get('api/quests').then(res => {
            res.data.forEach((q: Quest) => {
                q.stages.forEach((stage: QuestStage) => {
                    if(stage.stageNPCId === npcId) {
                        if(!_quests.includes(q.name)) {
                            _quests.push(q.name);
                        }
                    }
                })
            })
        });
        setQuests(_quests);
    }

    useEffect(() => {
        fetchQuests();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirecrion: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
            {quests.map(quest => (
                <Chip label={quest} key={quest} />
            ))}
        </Box>
    );
};

export default NpcQuests;