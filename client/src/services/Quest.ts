
export interface StageItemReward {
    itemId: number;
    itemAmount: number;
}

export interface QuestStage {
    stageName: string;
    stageNPCId: number;
    stageType: string;
    stageDialog: string[];
    stageRewards?: StageItemReward[];
}

export interface QuestReward {
    experience?: number;
    permissions?: string[];
    items?: StageItemReward[];
}

export interface Quest {
    id: number;
    name: string;
    description: string;
    requiredLevel?: number;
    requiredQuests?: number[];
    stages: QuestStage[];
    rewards?: QuestReward;
}

export interface QuestFilter {
    name?: string;
    minLevel?: number;
    maxLevel?: number;
}