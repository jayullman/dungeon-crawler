export const UP_KEY = 38;
export const RIGHT_KEY = 39;
export const DOWN_KEY = 40;
export const LEFT_KEY = 37;

export const NORTH = 'NORTH';
export const SOUTH = 'SOUTH';
export const EAST = 'EAST';
export const WEST = 'WEST';

export const DIRECTIONS = [NORTH, SOUTH, EAST, WEST];

export const TILE_BOSS_ROOM = 0;
export const TILE_ROOM = 2;
export const TILE_HALL = 3;
export const TILE_WALL = 1;
export const TILE_DOOR = 4;
export const TILE_LOCKED_DOOR = 5;
export const TILE_HERO = 9;
export const TILE_MONSTER = 7;
export const TILE_BOSS = 8;
export const TILE_KEY = 11;
export const TILE_WEAPON = 10;
export const TILE_ARMOR = 14;
export const TILE_HEALTH = 6;
export const TILE_HIDDEN = 12;
export const TILE_TORCH = 13;

export const WEAPON_NAMES = [
  'Mace',
  'Greatsword',
  'Dagger',
  'Axe',
  'Club',
  'Spear'
];

export const ARMOR_NAMES = [
  'Armor',
  'Cape',
  'Helmet'
]

export const ADVERBS = [
  'Incomparable',
  'Great',
  'Absolute',
  'Outrageous',
  'Awe-inspiring'
];

export const NOUNS =[
  'Awesomeness',
  'Power',
  'Domination',
];



// map and viewport values
export const MAP_WIDTH = 100;
export const MAP_HEIGHT = 100;
export const VIEWPORT_HEIGHT = 20;
export const VIEWPORT_WIDTH = 30;

export const STARTING_ARMOR_TILES = 5;
export const STARTING_WEAPON_TILES = 5;
export const STARTING_HEALTH_TILES = 5;
export const STARTING_TORCH_TILES = 5;
export const STARTING_MONSTER_TILES = 20;


export const STARTING_BOSS_STRENGTH = 20;
export const STARTING_BOSS_DEFENSE = 8;
export const STARTING_BOSS_HEALTH = 50;



// number of room tiles needed to have playable map
export const MINIMUM_PLAYABLE_SPACE = 4000;


// GAMEPLAY
// TODO: add xp from killing monster
export const XP_FROM_MONSTER = 20;

// value added to hero's health when healed
export const HEAL_VALUE = 15;
