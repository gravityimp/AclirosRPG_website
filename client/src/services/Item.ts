export interface Item {
  id: number;
  name: string;
  type: string;
  item: string;
  rarity: string;
  lore: string;
  playerBound: boolean;
  requirements?: RequirementsDetails;
  weapon?: WeaponDetails;
  armor?: ArmorDetails;
  action?: ActionDetails;
}

export interface RequirementsDetails {
  level?: number;
  strength?: number;
  agillity?: number;
  intelligence?: number;
}

export interface WeaponDetails {
  minDmg?: number;
  maxDmg?: number;
  minMagicDmg?: number;
  maxMagicDmg?: number;
  vampirism?: number;
  critChance?: number;
}

export interface ArmorDetails {
  armor?: number;
  armorMagic?: number;
  resistance?: number;
  regeneration?: number;
  health?: number;
}

export interface ActionDetails {
  actionType: "xp" | "tp";
  xpAmount?: number;
  tpLocation?: Location;
}

export enum RarityList {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  ARTIFACT = "artifact"
}

export enum ItemType {
  WEAPON = "weapon",
  ARMOR = "armor",
  MATERIAL = "material",
  ACTION = "action",
  RECIPE = "recipe"
}

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case RarityList.COMMON:
      return "#AAAAAA";
    case RarityList.UNCOMMON:
      return "#00AA00";
    case RarityList.RARE:
      return "#5555FF";
    case RarityList.EPIC:
      return "#AA00AA";
    case RarityList.LEGENDARY:
      return "#FFAA00";
    case RarityList.ARTIFACT:
      return "#FF5555";
    default:
      return "#AA0000";
  }
};

export interface ItemFilter {
  name?: string;
  type?: string[];
  rarity?: string[];
  playerBound?: boolean;
  minLevel?: number;
  maxLevel?: number;
}

export const testItem = {
  id: 0,
  name: "Super Apple",
  type: "material",
  item: "apple",
  rarity: "artifact",
  lore: "This is a super apple",
  playerBound: false,
}