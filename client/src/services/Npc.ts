import { Location } from "./types";

export interface Npc {
    id: number;
    name: string;
    location: Location
    skin?: string;
}

export interface NpcFilter {
    name?: string;
}