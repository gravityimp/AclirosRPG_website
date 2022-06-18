
export interface Settings {
    canAcceptMessages: boolean;
    canAcceptPartyInvites: boolean;
    canAcceptTradeRequests: boolean;
    canAcceptFriendRequests: boolean;
}

export interface PlayData {
    isBanned: boolean;
    isOnline: boolean;
    timePlayed: string;
    lastOnline: string;
    lastOnlineUnix: number;
}

export interface RpgPlayer {
    level: number;
    xp: number;
    reqXp: number;
    strength: number;
    agillity: number;
    intelligence: number;
}

export interface PlayerQuests {
    completed: number[];
    active: number[];
}

export interface Player {
    uuid: string;
    name: string;
    settings: Settings;
    playData: PlayData;
    rpg: RpgPlayer;
    quests: PlayerQuests;
}

export interface PLayerFilter {
    name?: string;
    minLevel?: number;
    maxLevel?: number;
    isBanned?: boolean;
}
