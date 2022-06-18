import { ItemDrop } from "./types";

export interface Drop {
    experience?: number;
    items?: ItemDrop[];
}

export interface Equipment {
    main: string;
    off: string;
    head: string;
    chest: string;
    legs: string;
    feet: string;
}

export interface Mob {
    id: number;
    name: string;
    type: string;
    mobType: string;
    hostility: string;
    isBaby: boolean;
    level: number;
    health: number;
    damage: number;
    equipment: Equipment;
    drops?: Drop;
    skills?: string[];
}

export interface MobFilter {
    name?: string;
    type?: string[];
    hostility?: string[];
    minLevel?: number;
    maxLevel?: number;
}

export const getMobTypeColor = (type: string) =>{
    switch(type){
        case "normal":
            return "#FF5555";
        case "elite":
            return "#AA00AA";
        case "boss":
            return "#AA0000";
        case "special":
            return "#FFAA00";
        default:
            return "#FF5555";
    }
}