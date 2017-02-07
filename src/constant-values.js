export const UP_KEY = 38;
export const RIGHT_KEY = 39;
export const DOWN_KEY = 40;
export const LEFT_KEY = 37;
export const RETURN_KEY = 13;

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

export const TILE_WIDTH = 30;
export const TILE_HEIGTH = 30;

export const STARTING_ARMOR_TILES = 4;
export const STARTING_WEAPON_TILES = 4;
export const STARTING_HEALTH_TILES = 7;
export const STARTING_TORCH_TILES = 5;
export const STARTING_MONSTER_TILES = 15;

export const STARTING_BOSS_STRENGTH = 20;
export const STARTING_BOSS_DEFENSE = 8;
export const STARTING_BOSS_HEALTH = 50;

export const STARTING_MONSTER_MAX_HEALTH = 15;
export const STARTING_MONSTER_STRENGTH = 5;

export const STARTING_HERO_HEALTH = 20;
export const STARTING_HERO_STRENGTH = 4;
export const STARTING_HERO_DEFENSE = 0;
export const STARTING_MAX_HEALTH = 20;
export const STARTING_NEXT_XP_LEVEL = 50;
export const STARTING_TORCH_VALUE = 12;

// the most a weapon can boost attack value
export const MAX_WEAPON_ATTACK_BONUS = 2;

// the most armor can boost defense value
export const MAX_ARMOR_DEFENSE_BONUS = 2;

export const STARTING_WEAPON = 'Fists';
export const STARTING_ARMOR = 'Dirty Rags';
// number of room tiles needed to have playable map
export const MINIMUM_PLAYABLE_SPACE = 4000;

// GAMEPLAY
// TODO: add xp from killing monster
export const XP_FROM_MONSTER = 20;

// value added to hero's health when healed
export const HEAL_VALUE = 15;

export const STARTING_STATE = {
  map: [],
  viewPort: [],
  visibilityArray: [],
  // for testing, array of all true values
  revealedMap: [],
  heroPosition: {},
  hero: {
    health: STARTING_HERO_HEALTH,
    maxHealth: STARTING_MAX_HEALTH,
    strength: STARTING_HERO_STRENGTH,
    defense: STARTING_HERO_DEFENSE,
    hasKey: false,
    XP: 0,
    nextXPLevel: STARTING_NEXT_XP_LEVEL,
    level: 1,
    torchValue: STARTING_TORCH_VALUE,
    weapons: [STARTING_WEAPON],
    armor: [STARTING_ARMOR]
  },
  tileUnderHero: TILE_ROOM,
  // monsters property will hold an array of monster objects which
  // will describe their type, health, and map location
  monsters: [],
  boss: {
    strength: STARTING_BOSS_STRENGTH,
    health: STARTING_BOSS_HEALTH,
    defense: STARTING_BOSS_DEFENSE
  },
  playerDied: false,
  playerWon: false,
  showInstructions: false,
  showDamage: false,
  lastDamageByMonster: 0,
  lastAttackedMonsterCurrentHealth: 0,
  lastAttackedMonsterMaxHealth: 0,
  lastMoveDirectionAttempt: ""
};
