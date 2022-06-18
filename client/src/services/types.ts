
export interface Role {
    role: "user" | "admin";
}

export interface Location {
    x: number;
    y: number;
    z: number;
    pitch?: number;
    yaw?: number;
}

export interface ItemDrop {
    itemId: number;
    itemAmount: number;
    maxItemAmount?: number;
    chance: number;
}