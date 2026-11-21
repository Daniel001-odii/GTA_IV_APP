import { CheatCode } from '../types/cheat';

export type CheatDatasetKey = 'gta5' | 'gta6';

export interface CheatDatasetConfig {
  id: CheatDatasetKey;
  gameTitle: string;
  badgeLabel: string;
  notice: string;
  cheats: CheatCode[];
}

/**
 * ============================================================================
 * ACTIVE CHEAT DATASET SWITCH
 * ============================================================================
 * Currently populated with authentic GTA V cheat codes across PlayStation,
 * Xbox, and PC so every screen and controller icon sequence works out of the box.
 *
 * When official GTA VI cheat codes are released:
 *   1. Paste/update entries inside `GTA6_CHEAT_CODES` below (or replace `GTA5_CHEAT_CODES`).
 *   2. Change `ACTIVE_CHEAT_DATASET` from `'gta5'` to `'gta6'`.
 * Every screen (All, Categories, Favorites, Details, Search) updates automatically!
 */
export const ACTIVE_CHEAT_DATASET: CheatDatasetKey = 'gta6';

/**
 * Authentic Grand Theft Auto V Cheat Codes (PS / Xbox / PC).
 * Button identifiers are platform-independent:
 *   TRIANGLE -> PS Triangle / Xbox Y
 *   SQUARE   -> PS Square   / Xbox X
 *   CROSS    -> PS Cross    / Xbox A
 *   CIRCLE   -> PS Circle   / Xbox B
 *   L1 / R1  -> PS L1 / R1  / Xbox LB / RB
 *   L2 / R2  -> PS L2 / R2  / Xbox LT / RT
 *   DPAD_UP / DPAD_DOWN / DPAD_LEFT / DPAD_RIGHT
 */
export const GTA5_CHEAT_CODES: CheatCode[] = [
  // ── HEALTH & ARMOR ────────────────────────────────────────────────────────
  {
    id: 'invincibility',
    title: 'Invincibility (5 Minutes)',
    shortDescription: 'Become immune to all bullet, explosion, crash, and fire damage for 5 minutes.',
    description:
      'Grants complete invulnerability to gunfire, melee attacks, fire, falls, and explosions for 5 real-time minutes. Re-enter once the timer runs out to reactivate.',
    category: 'health-armor',
    imageKey: 'hero-vice',
    keywords: ['god mode', 'immortal', 'painkiller', 'invulnerable', 'shield', '1-999-724-6545537', '7246545537'],
    popularityScore: 100,
    featured: true,
    combinations: {
      playstation: ['DPAD_RIGHT', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      xbox: ['DPAD_RIGHT', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      pc: 'PAINKILLER',
      phone: '1-999-724-6545537',
    },
    phoneNumber: '1-999-724-6545537',
    verified: true,
    isAvailable: true,
    usageNote: 'Timer lasts 5 minutes; does not protect vehicles from exploding. In-Game Phone: 1-999-PAINKILLER (1-999-724-6545537).',
  },
  {
    id: 'max-health-armor',
    title: 'Max Health & Armor',
    shortDescription: 'Refill 100% health, body armor, and fully repair your current vehicle.',
    description:
      'Instantly restores your health bar and body armor to maximum capacity. When activated inside a vehicle, also fully repairs exterior and engine damage.',
    category: 'health-armor',
    imageKey: 'street-duo',
    keywords: ['heal', 'hp', 'vest', 'repair', 'turtle', 'health', 'armor', '1-999-887-853', '887853'],
    popularityScore: 99,
    featured: true,
    combinations: {
      playstation: ['CIRCLE', 'L1', 'TRIANGLE', 'R2', 'CROSS', 'SQUARE', 'CIRCLE', 'DPAD_RIGHT', 'SQUARE', 'L1', 'L1', 'L1'],
      xbox: ['CIRCLE', 'L1', 'TRIANGLE', 'R2', 'CROSS', 'SQUARE', 'CIRCLE', 'DPAD_RIGHT', 'SQUARE', 'L1', 'L1', 'L1'],
      pc: 'TURTLE',
      phone: '1-999-887-853',
    },
    phoneNumber: '1-999-887-853',
    verified: true,
    isAvailable: true,
    usageNote: 'Repairs current vehicle if inside one. In-Game Phone: 1-999-TURTLE (1-999-887-853).',
  },

  // ── WEAPONS & COMBAT ──────────────────────────────────────────────────────
  {
    id: 'give-weapons-ammo',
    title: 'Give Weapons & Extra Ammo',
    shortDescription: 'Equip a full weapon wheel including RPG, assault rifle, shotgun, SMG, and grenades.',
    description:
      'Unlocks a complete combat loadout — Knife, Pistol, Assault Rifle, SMG, Pump Shotgun, Sniper Rifle, RPG, and Grenades — along with generous reserve ammo.',
    category: 'weapons-ammo',
    imageKey: 'collage-cover',
    keywords: ['guns', 'weapons', 'ammo', 'toolup', 'arsenal', 'rpg', 'rifle', '1-999-866-587', '866587'],
    popularityScore: 98,
    featured: true,
    combinations: {
      playstation: ['TRIANGLE', 'R2', 'DPAD_LEFT', 'L1', 'CROSS', 'DPAD_RIGHT', 'TRIANGLE', 'DPAD_DOWN', 'SQUARE', 'L1', 'L1', 'L1'],
      xbox: ['TRIANGLE', 'R2', 'DPAD_LEFT', 'L1', 'CROSS', 'DPAD_RIGHT', 'TRIANGLE', 'DPAD_DOWN', 'SQUARE', 'L1', 'L1', 'L1'],
      pc: 'TOOLUP',
      phone: '1-999-866-587',
    },
    phoneNumber: '1-999-866-587',
    verified: true,
    isAvailable: true,
    usageNote: 'Enter repeatedly to top up reserve ammunition. In-Game Phone: 1-999-TOOLUP (1-999-866-587).',
  },
  {
    id: 'explosive-ammo',
    title: 'Explosive Ammo Rounds',
    shortDescription: 'Bullets explode on impact, destroying vehicles and knocking down crowds.',
    description:
      'Every projectile fired from your handguns, rifles, and shotguns detonates into a violent explosion on contact with any surface or target.',
    category: 'weapons-ammo',
    imageKey: 'collage-cover',
    keywords: ['bullets', 'ammo', 'highex', 'bang bang', 'explosive', 'rounds', '1-999-444-439', '444439'],
    popularityScore: 95,
    combinations: {
      playstation: ['DPAD_RIGHT', 'SQUARE', 'CROSS', 'DPAD_LEFT', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L1', 'L1', 'L1'],
      xbox: ['DPAD_RIGHT', 'SQUARE', 'CROSS', 'DPAD_LEFT', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L1', 'L1', 'L1'],
      pc: 'HIGHEX',
      phone: '1-999-444-439',
    },
    phoneNumber: '1-999-444-439',
    verified: true,
    isAvailable: true,
    usageNote: 'Gunshots detonate on impact. In-Game Phone: 1-999-HIGHEX (1-999-444-439).',
  },
  {
    id: 'explosive-melee',
    title: 'Explosive Melee Attacks',
    shortDescription: 'Punches and kicks produce concussive fiery explosions upon contact.',
    description:
      'Turns your fists and feet into high-explosive detonators. Any pedestrian, police officer, or vehicle struck will instantly erupt in a fiery blast.',
    category: 'weapons-ammo',
    imageKey: 'street-duo',
    keywords: ['punch', 'fist', 'hothands', 'boom', 'explosion', 'melee', '1-999-468-42637', '46842637'],
    popularityScore: 91,
    combinations: {
      playstation: ['DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE', 'R1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L2'],
      xbox: ['DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE', 'R1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L2'],
      pc: 'HOTHANDS',
      phone: '1-999-468-42637',
    },
    phoneNumber: '1-999-468-42637',
    verified: true,
    isAvailable: true,
    usageNote: 'Explosions can harm the player if too close. In-Game Phone: 1-999-HOTHANDS (1-999-468-42637).',
  },
  {
    id: 'flaming-bullets',
    title: 'Flaming Bullets (Incendiary)',
    shortDescription: 'Gunfire ignites targets, pedestrians, and surrounding foliage in flames.',
    description:
      'Enchants all fired ammunition with incendiary fire power. Targets, vehicles, and flammable surfaces catch fire immediately upon being hit.',
    category: 'weapons-ammo',
    imageKey: 'hero-vice',
    keywords: ['fire', 'incendiary', 'flame', 'burn', 'bullets', '1-999-4623-634279', '4623634279'],
    popularityScore: 90,
    combinations: {
      playstation: ['L1', 'R1', 'SQUARE', 'R1', 'DPAD_LEFT', 'R2', 'R1', 'DPAD_LEFT', 'SQUARE', 'DPAD_RIGHT', 'L1', 'L1'],
      xbox: ['L1', 'R1', 'SQUARE', 'R1', 'DPAD_LEFT', 'R2', 'R1', 'DPAD_LEFT', 'SQUARE', 'DPAD_RIGHT', 'L1', 'L1'],
      pc: 'FIRE',
      phone: '1-999-4623-634279',
    },
    phoneNumber: '1-999-4623-634279',
    verified: true,
    isAvailable: true,
    usageNote: 'Sets targets on fire. In-Game Phone: 1-999-INCENDIARY (1-999-4623-634279) or PC: FIRE.',
  },

  // ── WANTED LEVEL ──────────────────────────────────────────────────────────
  {
    id: 'lower-wanted-level',
    title: 'Lower Wanted Level',
    shortDescription: 'Immediately remove one wanted star to shake police pursuit.',
    description:
      'Drops your active police Wanted Level by one star each time you enter the combination. Repeat to clear your wanted status completely.',
    category: 'wanted-level',
    imageKey: 'convertible-skyline',
    keywords: ['cops', 'police', 'stars', 'lawyerup', 'clear', 'escape', 'wanted', '1-999-529-93787', '52993787'],
    popularityScore: 97,
    combinations: {
      playstation: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT'],
      xbox: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT'],
      pc: 'LAWYERUP',
      phone: '1-999-529-93787',
    },
    phoneNumber: '1-999-529-93787',
    verified: true,
    isAvailable: true,
    usageNote: 'Drops one star per entry. In-Game Phone: 1-999-LAWYERUP (1-999-529-93787).',
  },
  {
    id: 'raise-wanted-level',
    title: 'Raise Wanted Level',
    shortDescription: 'Add one star to your police Wanted Level for an immediate chase.',
    description:
      'Instantly increases your police heat by one wanted star each time it is keyed in. Stack up to 5 stars for maximum chaos.',
    category: 'wanted-level',
    imageKey: 'bay-jetskis',
    keywords: ['cops', 'police', 'stars', 'fugitive', 'chase', 'wanted', 'heat', '1-999-384-48483', '38448483'],
    popularityScore: 84,
    combinations: {
      playstation: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      xbox: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      pc: 'FUGITIVE',
      phone: '1-999-384-48483',
    },
    phoneNumber: '1-999-384-48483',
    verified: true,
    isAvailable: true,
    usageNote: 'Adds one star per entry. In-Game Phone: 1-999-FUGITIVE (1-999-384-48483).',
  },

  // ── PLAYER ABILITIES ──────────────────────────────────────────────────────
  {
    id: 'recharge-special-ability',
    title: 'Recharge Special Ability',
    shortDescription: 'Fill the unique special ability meter for Michael, Franklin, or Trevor.',
    description:
      'Instantly fills the yellow special ability bar — Michael’s bullet-time, Franklin’s precision driving slow-motion, or Trevor’s red-mist rage mode.',
    category: 'player-abilities',
    imageKey: 'gta6-tuning',
    keywords: ['special', 'ability', 'meter', 'powerup', 'franklin', 'michael', 'trevor', '1-999-769-3787', '7693787'],
    popularityScore: 85,
    combinations: {
      playstation: ['CROSS', 'CROSS', 'SQUARE', 'R1', 'L1', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS'],
      xbox: ['CROSS', 'CROSS', 'SQUARE', 'R1', 'L1', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS'],
      pc: 'POWERUP',
      phone: '1-999-769-3787',
    },
    phoneNumber: '1-999-769-3787',
    verified: true,
    isAvailable: true,
    usageNote: 'Refills special meter instantly. In-Game Phone: 1-999-POWERUP (1-999-769-3787).',
  },
  {
    id: 'super-jump',
    title: 'Super Jump',
    shortDescription: 'Leap several stories high and glide onto rooftops.',
    description:
      'Propels your character several stories into the sky on every jump. Hold the jump button down for extended air height.',
    category: 'player-abilities',
    imageKey: 'gta6-vice-city-night',
    keywords: ['jump', 'leap', 'high', 'hoptoit', 'bounce', '1-999-467-8648', '4678648'],
    popularityScore: 92,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'TRIANGLE', 'TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'R1', 'R2'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'TRIANGLE', 'TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'R1', 'R2'],
      pc: 'HOPTOIT',
      phone: '1-999-467-8648',
    },
    phoneNumber: '1-999-467-8648',
    verified: true,
    isAvailable: true,
    usageNote: 'Hold jump button for maximum height. In-Game Phone: 1-999-HOPTOIT (1-999-467-8648).',
  },
  {
    id: 'fast-run',
    title: 'Fast Run',
    shortDescription: 'Sprint at superhuman speeds across Los Santos and Blaine County.',
    description:
      'Dramatically accelerates on-foot sprint speed, allowing you to sprint past cars on city sidewalks and evade police sweeps with ease.',
    category: 'player-abilities',
    imageKey: 'street-duo',
    keywords: ['sprint', 'speed', 'run', 'fast', 'catchme', 'flash', 'athletics', '1-999-228-2463', '2282463'],
    popularityScore: 88,
    combinations: {
      playstation: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L2', 'L1', 'SQUARE'],
      xbox: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L2', 'L1', 'SQUARE'],
      pc: 'CATCHME',
      phone: '1-999-228-2463',
    },
    phoneNumber: '1-999-228-2463',
    verified: true,
    isAvailable: true,
    usageNote: 'Boosts sprinting speed. In-Game Phone: 1-999-CATCHME (1-999-228-2463).',
  },
  {
    id: 'fast-swim',
    title: 'Fast Swim',
    shortDescription: 'Triple swimming stroke velocity in open ocean and swimming pools.',
    description:
      'Allows your character to slice through water bodies at rapid speed without quickly draining lung capacity.',
    category: 'player-abilities',
    imageKey: 'bay-jetskis',
    keywords: ['water', 'ocean', 'swim', 'dive', 'gotgills', 'speed', '1-999-46844557', '46844557'],
    popularityScore: 73,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'DPAD_RIGHT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'L2', 'DPAD_RIGHT'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'DPAD_RIGHT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'L2', 'DPAD_RIGHT'],
      pc: 'GOTGILLS',
      phone: '1-999-46844557',
    },
    phoneNumber: '1-999-46844557',
    verified: true,
    isAvailable: true,
    usageNote: 'Significantly increases swimming speed. In-Game Phone: 1-999-GOTGILLS (1-999-46844557).',
  },
  {
    id: 'give-parachute',
    title: 'Give Parachute',
    shortDescription: 'Instantly equip a standard steerable parachute.',
    description:
      'Adds a ready-to-deploy parachute directly to your character inventory. Crucial before climbing cranes or triggering Skyfall.',
    category: 'player-abilities',
    imageKey: 'hero-vice',
    keywords: ['chute', 'skydive', 'parachute', 'fall', 'plane', '1-999-759-3483', '7593483'],
    popularityScore: 78,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'R2', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1'],
      xbox: ['DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'R2', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1'],
      pc: 'SKYDIVE',
      phone: '1-999-759-3483',
    },
    phoneNumber: '1-999-759-3483',
    verified: true,
    isAvailable: true,
    usageNote: 'Equips parachute instantly. In-Game Phone: 1-999-SKYDIVE (1-999-759-3483).',
  },
  {
    id: 'slow-motion-aim',
    title: 'Slow-Motion Aim (Dead Eye)',
    shortDescription: 'Slow down time when aiming down weapon sights (up to 3 levels).',
    description:
      'Activates cinematic bullet time whenever you hold your aim trigger. Enter up to 3 times to cycle through increasing slow-motion intensity, and enter a 4th time to disable.',
    category: 'player-abilities',
    imageKey: 'collage-cover',
    keywords: ['aim', 'deadeye', 'bullet time', 'slow motion', 'sniper', '1-999-332-3393', '3323393'],
    popularityScore: 87,
    combinations: {
      playstation: ['SQUARE', 'L2', 'R1', 'TRIANGLE', 'DPAD_LEFT', 'SQUARE', 'L2', 'DPAD_RIGHT', 'CROSS'],
      xbox: ['SQUARE', 'L2', 'R1', 'TRIANGLE', 'DPAD_LEFT', 'SQUARE', 'L2', 'DPAD_RIGHT', 'CROSS'],
      pc: 'DEADEYE',
      phone: '1-999-332-3393',
    },
    phoneNumber: '1-999-332-3393',
    verified: true,
    isAvailable: true,
    usageNote: 'Cycles through 3 slow levels, 4th resets. In-Game Phone: 1-999-DEADEYE (1-999-332-3393).',
  },
  {
    id: 'drunk-mode',
    title: 'Drunk Mode',
    shortDescription: 'Simulate heavy intoxication with blurred vision and wobbly physics.',
    description:
      'Makes your character stumble around with distorted camera sway and sluggish vehicle steering. Re-enter the cheat to return to sober mode.',
    category: 'player-abilities',
    imageKey: 'gta6-boat-party',
    keywords: ['drunk', 'booze', 'liquor', 'sober', 'beer', 'wobbly', '1-999-547867', '547867'],
    popularityScore: 68,
    combinations: {
      playstation: ['TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'DPAD_LEFT'],
      xbox: ['TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'DPAD_LEFT'],
      pc: 'LIQUOR',
      phone: '1-999-547867',
    },
    phoneNumber: '1-999-547867',
    verified: true,
    isAvailable: true,
    usageNote: 'Re-enter to toggle sober mode. In-Game Phone: 1-999-LIQUOR (1-999-547867).',
  },

  // ── GAMEPLAY & WORLD ──────────────────────────────────────────────────────
  {
    id: 'skyfall',
    title: 'Skyfall',
    shortDescription: 'Spawn miles high in the atmosphere and glide across the map.',
    description:
      'Immediately warps your character high above Los Santos into a supersonic freefall glide. You cannot open a parachute during Skyfall; aim for water or activate invincibility!',
    category: 'gameplay-world',
    imageKey: 'convertible-skyline',
    keywords: ['skyfall', 'freefall', 'altitude', 'fly', 'plane', 'glide', '1-999-759-3255', '7593255'],
    popularityScore: 94,
    combinations: {
      playstation: ['L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      xbox: ['L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      pc: 'SKYFALL',
      phone: '1-999-759-3255',
    },
    phoneNumber: '1-999-759-3255',
    verified: true,
    isAvailable: true,
    usageNote: 'Freefall glide from stratosphere. Cannot deploy parachute. In-Game Phone: 1-999-SKYFALL (1-999-759-3255).',
  },
  {
    id: 'slow-motion-world',
    title: 'Slow-Motion World',
    shortDescription: 'Slow down global game world simulation speed across 3 tiers.',
    description:
      'Slows the entire GTA V world down into dramatic cinematic matrix time. Enter up to 3 times for progressive slow levels; a 4th entry resets back to regular real-time speed.',
    category: 'gameplay-world',
    imageKey: 'gta6-vice-city-night',
    keywords: ['slowmo', 'matrix', 'bullet time', 'cinematic', 'time', '1-999-332-3393', '3323393'],
    popularityScore: 81,
    combinations: {
      playstation: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'SQUARE', 'R2', 'R1'],
      xbox: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'SQUARE', 'R2', 'R1'],
      pc: 'SLOWMO',
      phone: '1-999-332-3393',
    },
    phoneNumber: '1-999-332-3393',
    verified: true,
    isAvailable: true,
    usageNote: 'Cycles through 3 speeds, 4th resets. In-Game Phone: 1-999-SLOWMO (1-999-332-3393).',
  },
  {
    id: 'moon-gravity',
    title: 'Moon Gravity',
    shortDescription: 'Experience low lunar gravity when driving or jumping off ramps.',
    description:
      'Lowers gravity physics for vehicles and airborne bodies. Cars glide gently through the air after hitting ramps, floating gracefully across blocks before landing.',
    category: 'gameplay-world',
    imageKey: 'convertible-skyline',
    keywords: ['gravity', 'moon', 'float', 'floater', 'space', 'physics', '1-999-356-2837', '3562837'],
    popularityScore: 89,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'R1', 'L1', 'DPAD_RIGHT', 'DPAD_LEFT', 'L1', 'DPAD_LEFT'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'R1', 'L1', 'DPAD_RIGHT', 'DPAD_LEFT', 'L1', 'DPAD_LEFT'],
      pc: 'FLOATER',
      phone: '1-999-356-2837',
    },
    phoneNumber: '1-999-356-2837',
    verified: true,
    isAvailable: true,
    usageNote: 'Floats cars after launching. Enter in vehicle for best effect. In-Game Phone: 1-999-FLOATER (1-999-356-2837).',
  },

  // ── WEATHER & ENVIRONMENT ────────────────────────────────────────────────
  {
    id: 'change-weather',
    title: 'Change Weather',
    shortDescription: 'Cycle through 8 dynamic weather states from sunny to thunderstorm.',
    description:
      'Toggles in-game weather sequentially: Sunny, Clear, Cloudy, Smoggy, Overcast, Rainy, Thunderstorm, Clearing, and Snow.',
    category: 'weather-environment',
    imageKey: 'bay-jetskis',
    keywords: ['weather', 'rain', 'storm', 'snow', 'sun', 'makeitrain', '1-999-625-348-7246', '6253487246'],
    popularityScore: 86,
    combinations: {
      playstation: ['R2', 'CROSS', 'L1', 'L1', 'L2', 'L2', 'L2', 'SQUARE'],
      xbox: ['R2', 'CROSS', 'L1', 'L1', 'L2', 'L2', 'L2', 'SQUARE'],
      pc: 'MAKEITRAIN',
      phone: '1-999-625-348-7246',
    },
    phoneNumber: '1-999-625-348-7246',
    verified: true,
    isAvailable: true,
    usageNote: 'Cycles through 8 weather modes sequentially. In-Game Phone: 1-999-MAKEITRAIN (1-999-625-348-7246).',
  },

  // ── VEHICLES ─────────────────────────────────────────────────────────────
  {
    id: 'spawn-buzzard',
    title: 'Spawn Buzzard Attack Chopper',
    shortDescription: 'Drop a fully weaponized military Buzzard attack helicopter.',
    description:
      'Spawns a militarized Buzzard Attack Chopper armed with homing rocket pods and dual miniguns. Requires clear open ground to materialize.',
    category: 'vehicles',
    imageKey: 'hero-vice',
    keywords: ['buzzoff', 'helicopter', 'chopper', 'buzzard', 'rockets', '1-999-289-9633', '2899633'],
    popularityScore: 97,
    combinations: {
      playstation: ['CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L1', 'L2', 'R1', 'TRIANGLE', 'CIRCLE', 'TRIANGLE'],
      xbox: ['CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L1', 'L2', 'R1', 'TRIANGLE', 'CIRCLE', 'TRIANGLE'],
      pc: 'BUZZOFF',
      phone: '1-999-289-9633',
    },
    phoneNumber: '1-999-289-9633',
    verified: true,
    isAvailable: true,
    usageNote: 'Requires large clear area to spawn without obstruction. In-Game Phone: 1-999-BUZZOFF (1-999-289-9633).',
  },
  {
    id: 'spawn-comet',
    title: 'Spawn Comet Sports Car',
    shortDescription: 'Drop a high-speed Pfister Comet rear-engine luxury sports coupe.',
    description:
      'Spawns the classic Pfister Comet sports car, featuring agile rear-wheel drive handling and rapid acceleration through the streets of Los Santos.',
    category: 'vehicles',
    imageKey: 'convertible-skyline',
    keywords: ['car', 'comet', 'sports', 'porsche', 'pfister', 'supercar', '1-999-266-38', '26638'],
    popularityScore: 93,
    combinations: {
      playstation: ['R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'L1', 'L2', 'CROSS', 'CROSS', 'SQUARE', 'R1'],
      xbox: ['R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'L1', 'L2', 'CROSS', 'CROSS', 'SQUARE', 'R1'],
      pc: 'COMET',
      phone: '1-999-266-38',
    },
    phoneNumber: '1-999-266-38',
    verified: true,
    isAvailable: true,
    usageNote: 'High top speed rear-wheel drive coupe. In-Game Phone: 1-999-COMET (1-999-266-38).',
  },
  {
    id: 'spawn-rapid-gt',
    title: 'Spawn Rapid GT',
    shortDescription: 'Drop a premium Dewbauchee Rapid GT 2-door touring coupe.',
    description:
      'Spawns the British luxury grand tourer Dewbauchee Rapid GT, offering responsive acceleration, deep engine exhaust, and superior asphalt grip.',
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['rapidgt', 'aston', 'martin', 'coupe', 'car', 'supercar', '1-999-727-4348', '7274348'],
    popularityScore: 89,
    combinations: {
      playstation: ['R2', 'L1', 'CIRCLE', 'DPAD_RIGHT', 'L1', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CIRCLE', 'R2'],
      xbox: ['R2', 'L1', 'CIRCLE', 'DPAD_RIGHT', 'L1', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CIRCLE', 'R2'],
      pc: 'RAPIDGT',
      phone: '1-999-727-4348',
    },
    phoneNumber: '1-999-727-4348',
    verified: true,
    isAvailable: true,
    usageNote: 'Luxury grand tourer. In-Game Phone: 1-999-RAPIDGT (1-999-727-4348).',
  },
  {
    id: 'spawn-pcj-600',
    title: 'Spawn PCJ-600 Motorcycle',
    shortDescription: 'Drop a high-revving PCJ-600 Japanese racing motorbike.',
    description:
      'Spawns the legendary PCJ-600 sports bike. Exceptional weaving capability in dense highway traffic and fast straight-line wheelies.',
    category: 'vehicles',
    imageKey: 'street-duo',
    keywords: ['bike', 'motorcycle', 'rocket', 'pcj', 'speed', 'moto', '1-999-762-538', '762538'],
    popularityScore: 86,
    combinations: {
      playstation: ['R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'DPAD_RIGHT', 'L2', 'L1', 'L1'],
      xbox: ['R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'DPAD_RIGHT', 'L2', 'L1', 'L1'],
      pc: 'ROCKET',
      phone: '1-999-762-538',
    },
    phoneNumber: '1-999-762-538',
    verified: true,
    isAvailable: true,
    usageNote: 'Fast street motorbike. In-Game Phone: 1-999-ROCKET (1-999-762-538).',
  },
  {
    id: 'spawn-sanchez',
    title: 'Spawn Sanchez Dirt Bike',
    shortDescription: 'Drop a lightweight Maibatsu Sanchez all-terrain motocross dirt bike.',
    description:
      'Spawns a versatile Sanchez off-road bike built for Mount Chiliad trails, desert dunes, and dirt tracks across Blaine County.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['sanchez', 'dirt bike', 'motocross', 'offroad', 'trail', '1-999-633-7623', '6337623'],
    popularityScore: 90,
    combinations: {
      playstation: ['CIRCLE', 'CROSS', 'L1', 'CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'R1', 'R2', 'L2', 'L1', 'L1'],
      xbox: ['CIRCLE', 'CROSS', 'L1', 'CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'R1', 'R2', 'L2', 'L1', 'L1'],
      pc: 'OFFROAD',
      phone: '1-999-633-7623',
    },
    phoneNumber: '1-999-633-7623',
    verified: true,
    isAvailable: true,
    usageNote: 'Unbeatable all-terrain mountain climber. In-Game Phone: 1-999-OFFROAD (1-999-633-7623).',
  },
  {
    id: 'spawn-bmx',
    title: 'Spawn BMX Bicycle',
    shortDescription: 'Drop an agile pedal-powered trick BMX bicycle.',
    description:
      'Spawns a lightweight BMX bicycle. Bunny-hop over obstacles, cruise the skate parks of Venice/Vespucci Beach, or grind rail ledges.',
    category: 'vehicles',
    imageKey: 'street-duo',
    keywords: ['bmx', 'bicycle', 'bandit', 'bike', 'pedal', 'stunt', '1-999-226-348', '226348'],
    popularityScore: 82,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'TRIANGLE', 'R1', 'R2'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'TRIANGLE', 'R1', 'R2'],
      pc: 'BANDIT',
      phone: '1-999-226-348',
    },
    phoneNumber: '1-999-226-348',
    verified: true,
    isAvailable: true,
    usageNote: 'Hop with the jump button. In-Game Phone: 1-999-BANDIT (1-999-226-348).',
  },
  {
    id: 'spawn-stunt-plane',
    title: 'Spawn Stunt Plane (Mallard)',
    shortDescription: 'Drop an acrobatic Western Company Mallard stunt aeroplane.',
    description:
      'Spawns an ultra-maneuverable aerobatic stunt biplane capable of knife-edge flights under bridges, loops, and barrel rolls.',
    category: 'vehicles',
    imageKey: 'hero-vice',
    keywords: ['barnstorm', 'plane', 'aerobatic', 'mallard', 'airplane', 'stunt', 'flight', '1-999-227-678-676', '227678676'],
    popularityScore: 85,
    combinations: {
      playstation: ['CIRCLE', 'DPAD_RIGHT', 'L1', 'L2', 'DPAD_LEFT', 'R1', 'L1', 'L1', 'DPAD_LEFT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      xbox: ['CIRCLE', 'DPAD_RIGHT', 'L1', 'L2', 'DPAD_LEFT', 'R1', 'L1', 'L1', 'DPAD_LEFT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      pc: 'BARNSTORM',
      phone: '1-999-227-678-676',
    },
    phoneNumber: '1-999-227-678-676',
    verified: true,
    isAvailable: true,
    usageNote: 'Requires open runway or clear street. In-Game Phone: 1-999-BARNSTORM (1-999-227-678-676).',
  },
  {
    id: 'spawn-duster',
    title: 'Spawn Duster Aeroplane',
    shortDescription: 'Drop a classic vintage biplane crop duster for leisurely skies.',
    description:
      'Spawns the classic vintage single-engine Duster biplane aircraft. Cruise over Blaine County farms and canyons with vintage flair.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['duster', 'flyspray', 'biplane', 'aeroplane', 'crop duster', 'plane', '1-999-359-77729', '35977729'],
    popularityScore: 80,
    combinations: {
      playstation: ['DPAD_RIGHT', 'DPAD_LEFT', 'R1', 'R1', 'DPAD_LEFT', 'TRIANGLE', 'TRIANGLE', 'CROSS', 'CIRCLE', 'L1'],
      xbox: ['DPAD_RIGHT', 'DPAD_LEFT', 'R1', 'R1', 'DPAD_LEFT', 'TRIANGLE', 'TRIANGLE', 'CROSS', 'CIRCLE', 'L1'],
      pc: 'FLYSPRAY',
      phone: '1-999-359-77729',
    },
    phoneNumber: '1-999-359-77729',
    verified: true,
    isAvailable: true,
    usageNote: 'Vintage crop duster biplane. In-Game Phone: 1-999-FLYSPRAY (1-999-359-77729).',
  },
  {
    id: 'spawn-limo',
    title: 'Spawn Stretch Limousine',
    shortDescription: 'Drop an elongated luxury Dundreary Stretch executive limousine.',
    description:
      'Spawns a stretched VIP limousine with tinted windows. Perfect for rolling up in style to Los Santos nightclubs or penthouse suites.',
    category: 'vehicles',
    imageKey: 'convertible-skyline',
    keywords: ['limo', 'stretch', 'vinewood', 'luxury', 'vip', 'car', '1-999-846-39663', '84639663'],
    popularityScore: 76,
    combinations: {
      playstation: ['R2', 'DPAD_RIGHT', 'L2', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      xbox: ['R2', 'DPAD_RIGHT', 'L2', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      pc: 'VINEWOOD',
      phone: '1-999-846-39663',
    },
    phoneNumber: '1-999-846-39663',
    verified: true,
    isAvailable: true,
    usageNote: 'Long turning radius. In-Game Phone: 1-999-VINEWOOD (1-999-846-39663).',
  },
  {
    id: 'spawn-trashmaster',
    title: 'Spawn Trashmaster Truck',
    shortDescription: 'Drop a hulking 3-axle municipal Trashmaster garbage hauler.',
    description:
      'Spawns an indestructible heavy garbage truck. Capable of plowing straight through highway traffic barricades and civilian sedans without breaking a sweat.',
    category: 'vehicles',
    imageKey: 'street-duo',
    keywords: ['trash', 'garbage', 'truck', 'trashed', 'trashmaster', 'heavy', '1-999-872-7433', '8727433'],
    popularityScore: 74,
    combinations: {
      playstation: ['CIRCLE', 'R1', 'CIRCLE', 'R1', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      xbox: ['CIRCLE', 'R1', 'CIRCLE', 'R1', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      pc: 'TRASHED',
      phone: '1-999-872-7433',
    },
    phoneNumber: '1-999-872-7433',
    verified: true,
    isAvailable: true,
    usageNote: 'Massive mass plows through traffic. In-Game Phone: 1-999-TRASHED (1-999-872-7433).',
  },
  {
    id: 'spawn-caddy',
    title: 'Spawn Golf Caddy',
    shortDescription: 'Drop a small electric Los Santos Country Club golf cart.',
    description:
      'Spawns an open-air electric golf caddy cart. Fun for cruising fairways, narrow boardwalks, or downtown pedestrian malls.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['caddy', 'golf', 'cart', 'holein1', 'vehicle', 'club', '1-999-4653-461', '4653461'],
    popularityScore: 72,
    combinations: {
      playstation: ['CIRCLE', 'L1', 'DPAD_LEFT', 'R1', 'L2', 'CROSS', 'R1', 'L1', 'CIRCLE', 'CROSS'],
      xbox: ['CIRCLE', 'L1', 'DPAD_LEFT', 'R1', 'L2', 'CROSS', 'R1', 'L1', 'CIRCLE', 'CROSS'],
      pc: 'HOLEIN1',
      phone: '1-999-4653-461',
    },
    phoneNumber: '1-999-4653-461',
    verified: true,
    isAvailable: true,
    usageNote: 'Electric golf buggy. In-Game Phone: 1-999-HOLEIN1 (1-999-4653-461).',
  },
  {
    id: 'slippery-cars',
    title: 'Slippery Cars (Drift Mode)',
    shortDescription: 'Drastically reduce tire grip causing all vehicles to slide and drift.',
    description:
      'Tire friction is reduced to zero, causing every vehicle in the game world to slide sideways around every corner like driving on solid ice.',
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['drift', 'slide', 'snowday', 'ice', 'slippery', 'cars', '1-999-766-9329', '7669329'],
    popularityScore: 83,
    combinations: {
      playstation: ['TRIANGLE', 'R1', 'R1', 'DPAD_LEFT', 'R1', 'L1', 'R2', 'L1'],
      xbox: ['TRIANGLE', 'R1', 'R1', 'DPAD_LEFT', 'R1', 'L1', 'R2', 'L1'],
      pc: 'SNOWDAY',
      phone: '1-999-766-9329',
    },
    phoneNumber: '1-999-766-9329',
    verified: true,
    isAvailable: true,
    usageNote: 'Reduces vehicle tire traction for drifting. In-Game Phone: 1-999-SNOWDAY (1-999-766-9329).',
  },
  {
    id: 'spawn-duke-o-death',
    title: "Spawn Duke O'Death Car",
    shortDescription: "Drop the heavily armored Duke O'Death muscle car (Challenge Unlock).",
    description:
      "Spawns the bulletproof armored Duke O'Death muscle beast. Unlocked after completing the 'Duel' random event in Blaine County.",
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['deathcar', 'duke', 'armored', 'muscle', 'duel', '1-999-332-84227', '33284227'],
    popularityScore: 94,
    combinations: {
      pc: 'DEATHCAR',
      phone: '1-999-332-84227',
    },
    phoneNumber: '1-999-332-84227',
    verified: true,
    isAvailable: true,
    usageNote: "Unlocked after 'Duel' random event. Dial 1-999-332-84227 (DEATHCAR) on in-game phone on PS/Xbox/PC or enter console command DEATHCAR on PC.",
  },
  {
    id: 'spawn-dodo-seaplane',
    title: 'Spawn Dodo Seaplane',
    shortDescription: 'Drop a twin-float amphibious Dodo seaplane (Challenge Unlock).',
    description:
      'Spawns the versatile amphibious Dodo seaplane capable of touching down on open water and airport runways. Unlocked after completing the Seaplane event challenge.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['extinct', 'dodo', 'seaplane', 'water', 'amphibious', 'plane', '1-999-398-4628', '3984628'],
    popularityScore: 84,
    combinations: {
      pc: 'EXTINCT',
      phone: '1-999-398-4628',
    },
    phoneNumber: '1-999-398-4628',
    verified: true,
    isAvailable: true,
    usageNote: 'Unlocked after Seaplane challenge. Dial 1-999-398-4628 (EXTINCT) on in-game phone on PS/Xbox/PC or enter console command EXTINCT on PC.',
  },
  {
    id: 'spawn-kraken-sub',
    title: 'Spawn Kraken Submarine',
    shortDescription: 'Drop a deep-sea exploration Kraken submersible (Challenge Unlock).',
    description:
      'Spawns the Kraken mini-submersible to explore sunken shipwrecks and seabed mysteries along the San Andreas coastline. Unlocked after completing the Wildlife Photography challenge.',
    category: 'vehicles',
    imageKey: 'gta6-vice-city-night',
    keywords: ['bubbles', 'kraken', 'submarine', 'sub', 'underwater', 'dive', 'ocean', '1-999-282-2537', '2822537'],
    popularityScore: 83,
    combinations: {
      pc: 'BUBBLES',
      phone: '1-999-282-2537',
    },
    phoneNumber: '1-999-282-2537',
    verified: true,
    isAvailable: true,
    usageNote: 'Unlocked after Wildlife Photography challenge. Dial 1-999-282-2537 (BUBBLES) on in-game phone on PS/Xbox/PC or enter console command BUBBLES on PC.',
  },
];

/**
 * ============================================================================
 * GTA VI CHEAT CODES OBJECT (READY FOR UPDATE)
 * ============================================================================
 * Paste verified GTA VI cheat codes here and set `ACTIVE_CHEAT_DATASET = 'gta6'`
 * above to populate the entire app automatically!
 */
export const GTA6_CHEAT_CODES: CheatCode[] = [
  // ── GAMEPLAY / MONEY ──────────────────────────────────────────────────────
  {
    id: 'gta6-cash-250k',
    title: '$250,000 Cash',
    shortDescription: 'Instantly adds $250,000 to your in-game wallet.',
    description:
      'The only money cheat in GTA 6. Opens your phone and enters via D-pad sequence while holding L1+R1 (PS5) or LB+RB (Xbox). Disables saving and trophies for the session.',
    category: 'gameplay-world',
    imageKey: 'gta6-boobie-phone',
    keywords: ['money', 'cash', 'funds', '250k', 'wallet', 'quick win'],
    popularityScore: 100,
    featured: true,
    combinations: {
      playstation: ['DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT'],
      xbox: ['DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Complete the main story (all 91 missions). Disables saving and trophies for the session.',
  },
  // ── PLAYER ABILITIES ──────────────────────────────────────────────────────
  {
    id: 'gta6-unlimited-focus',
    title: 'Unlimited Focus',
    shortDescription: 'Your Focus ability never depletes.',
    description:
      'Keeps Jason\'s and Lucia\'s Focus meter permanently full — slow-motion shooting and precision aiming never run out for the session.',
    category: 'player-abilities',
    imageKey: 'gta6-lucia-training',
    keywords: ['focus', 'slow motion', 'aiming', 'quick win'],
    popularityScore: 92,
    featured: true,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Complete the main story. Disables saving and trophies.',
  },
  {
    id: 'gta6-body-armor',
    title: 'Body Armor',
    shortDescription: 'Instantly adds full body armor to your loadout.',
    description:
      'Equips a full set of body armor on Jason or Lucia, absorbing damage before health is affected.',
    category: 'health-armor',
    imageKey: 'gta6-lucia-training',
    keywords: ['armor', 'armour', 'vest', 'protection', 'health'],
    popularityScore: 95,
    featured: true,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Complete 100 workouts. Disables saving and trophies.',
  },
  {
    id: 'gta6-raise-heat',
    title: 'Raise Heat Level',
    shortDescription: 'Raises your heat level across the map.',
    description:
      'Increases Jason\'s or Lucia\'s heat level, drawing the attention of local gangs and law enforcement across Leonida.',
    category: 'wanted-level',
    imageKey: 'gta6-vice-city-night',
    keywords: ['heat', 'wanted', 'police', 'attention', 'level'],
    popularityScore: 70,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP'],
      xbox: ['DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_UP'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Lose a 3-star Wanted level 25 times. Disables saving and trophies.',
  },
  {
    id: 'gta6-raise-wanted',
    title: 'Raise Wanted Level',
    shortDescription: 'Instantly raises your police Wanted level.',
    description:
      'Bumps up the star-based Wanted level, sending law enforcement after you at a higher response tier.',
    category: 'wanted-level',
    imageKey: 'gta6-vice-city-night',
    keywords: ['wanted', 'stars', 'police', 'cops', 'level', 'heat'],
    popularityScore: 72,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_UP'],
      xbox: ['DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_UP'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Lose a 3-star Wanted level 50 times. Disables saving and trophies.',
  },
  // ── WEAPONS / AMMO ────────────────────────────────────────────────────────
  {
    id: 'gta6-max-ammo',
    title: 'Max Ammo',
    shortDescription: 'Fills all weapons to maximum ammo capacity.',
    description:
      'Tops up every weapon in your current loadout to its maximum ammo count instantly.',
    category: 'weapons-ammo',
    imageKey: 'gta6-jason-lucia',
    keywords: ['ammo', 'bullets', 'max', 'reload', 'weapons'],
    popularityScore: 88,
    featured: true,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Win 25 bronze medals at shooting ranges. Disables saving and trophies.',
  },
  {
    id: 'gta6-infinite-ammo',
    title: 'Infinite Ammo',
    shortDescription: 'Ammo never runs out for any weapon.',
    description:
      'Grants unlimited ammunition across all weapons — you still need to reload, but the counter never hits zero.',
    category: 'weapons-ammo',
    imageKey: 'gta6-jason-lucia',
    keywords: ['ammo', 'infinite', 'unlimited', 'bullets', 'weapons'],
    popularityScore: 94,
    featured: true,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_DOWN'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_DOWN'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Win 25 silver medals at shooting ranges. Disables saving and trophies.',
  },
  {
    id: 'gta6-no-reload',
    title: 'No Reload',
    shortDescription: 'Fire continuously — no reloading ever required.',
    description:
      'Combines infinite ammo with no reload animation, letting you fire without interruption. The gold-tier shooting range reward.',
    category: 'weapons-ammo',
    imageKey: 'gta6-jason-lucia',
    keywords: ['reload', 'ammo', 'infinite', 'fire', 'weapons'],
    popularityScore: 96,
    featured: true,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Win 25 gold medals at shooting ranges. Disables saving and trophies.',
  },
  // ── COMBAT ────────────────────────────────────────────────────────────────
  {
    id: 'gta6-attack-force',
    title: 'Attack Force',
    shortDescription: 'Bullets and melee hits launch enemies into the air.',
    description:
      'Every bullet, punch, or kick sends targets flying on impact — a quick-win cheat available immediately after finishing the story.',
    category: 'player-abilities',
    imageKey: 'gta6-jason-lucia',
    keywords: ['ragdoll', 'launch', 'force', 'melee', 'bullets', 'physics'],
    popularityScore: 85,
    featured: true,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_DOWN'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Complete the main story. Disables saving and trophies.',
  },
  {
    id: 'gta6-exploding-balls',
    title: 'Exploding Balls',
    shortDescription: 'Sports balls explode violently on impact.',
    description:
      'Any sport ball — footballs, basketballs, baseballs — detonates like a grenade when it hits a surface or enemy. Chaos in Vice City\'s parks.',
    category: 'miscellaneous',
    imageKey: 'gta6-boat-party',
    keywords: ['exploding', 'balls', 'football', 'sports', 'chaos', 'fun'],
    popularityScore: 80,
    featured: false,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Hit 20 enemies with explosive damage. Disables saving and trophies.',
  },
  {
    id: 'gta6-vehicle-force',
    title: 'Vehicle Force',
    shortDescription: 'Vehicle collisions send targets flying.',
    description:
      'Ramming enemies or pedestrians with any vehicle launches them dramatically into the air. Essential for anyone who prefers to run rather than shoot.',
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['vehicle', 'car', 'ragdoll', 'launch', 'ram', 'crash'],
    popularityScore: 78,
    featured: false,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_DOWN'],
      xbox: ['DPAD_DOWN', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_DOWN'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Kill 25 enemies with a vehicle. Disables saving and trophies.',
  },
  // ── VEHICLE SPAWNS ────────────────────────────────────────────────────────
  {
    id: 'gta6-spawn-boomazoom',
    title: 'Spawn Maibatsu Boomazoom',
    shortDescription: 'Spawns the Maibatsu Boomazoom at your location.',
    description:
      'Drops a Maibatsu Boomazoom directly in front of you. Earned by completing five shopping challenges.',
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['vehicle', 'spawn', 'car', 'maibatsu', 'boomazoom', 'shopping'],
    popularityScore: 60,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_LEFT'],
      xbox: ['DPAD_LEFT', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_UP', 'DPAD_LEFT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Complete 5 shopping challenges in the Progress menu. Disables saving and trophies.',
  },
  {
    id: 'gta6-spawn-pumper',
    title: 'Spawn MTL Pumper',
    shortDescription: 'Spawns the MTL Pumper fire truck.',
    description:
      'Delivers a full-sized MTL Pumper fire engine to your position. Available once discovered in the Progress menu.',
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['vehicle', 'spawn', 'fire truck', 'pumper', 'mtl'],
    popularityScore: 55,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP'],
      xbox: ['DPAD_LEFT', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Discover it in the Progress menu. Disables saving and trophies.',
  },
  {
    id: 'gta6-spawn-bulldozer',
    title: 'Spawn HVY Bulldozer',
    shortDescription: 'Spawns a heavy HVY Bulldozer construction vehicle.',
    description:
      'Summons an HVY Bulldozer — perfect for flattening anything in Vice City. Available once discovered in the Progress menu.',
    category: 'vehicles',
    imageKey: 'gta6-tuning',
    keywords: ['vehicle', 'spawn', 'bulldozer', 'hvy', 'construction'],
    popularityScore: 58,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_DOWN'],
      xbox: ['DPAD_LEFT', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_DOWN'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Discover it in the Progress menu. Disables saving and trophies.',
  },
  // ── WEATHER / ENVIRONMENT ─────────────────────────────────────────────────
  {
    id: 'gta6-cycle-weather',
    title: 'Cycle Weather',
    shortDescription: 'Cycles through all available weather conditions.',
    description:
      'Each activation steps through the next weather state in the rotation — sunny, overcast, rain, thunderstorm, and more across Leonida.',
    category: 'weather-environment',
    imageKey: 'gta6-vice-city-night',
    keywords: ['weather', 'rain', 'storm', 'sunny', 'environment', 'cycle'],
    popularityScore: 75,
    featured: false,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_RIGHT'],
      xbox: ['DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Complete the main story (quick win). Disables saving and trophies.',
  },
  // ── SCREEN FILTERS ────────────────────────────────────────────────────────
  {
    id: 'gta6-filter-cataclysm',
    title: 'Cataclysm Filter',
    shortDescription: 'Fills the world with thick, murky smoke.',
    description:
      'Applies the Cataclysm screen filter — the entire world is engulfed in dark, smoky haze. Great for cinematic screenshots.',
    category: 'miscellaneous',
    imageKey: 'gta6-lucia-nightclub',
    keywords: ['filter', 'screen', 'smoke', 'dark', 'cataclysm', 'photo mode'],
    popularityScore: 62,
    featured: false,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT'],
      xbox: ['DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Discover Martha\'s Vamos in the Progress menu. Disables saving and trophies.',
  },
  {
    id: 'gta6-filter-dollhouse',
    title: 'Dollhouse Filter',
    shortDescription: 'Vivid tilt-shift filter with a narrow letterbox.',
    description:
      'Applies the Dollhouse visual filter — a hyper-vivid tilt-shift look with a narrow widescreen aspect ratio, turning Vice City into a toy-box diorama.',
    category: 'miscellaneous',
    imageKey: 'gta6-lucia-nightclub',
    keywords: ['filter', 'screen', 'tilt-shift', 'dollhouse', 'photo mode', 'vivid'],
    popularityScore: 60,
    featured: false,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT'],
      xbox: ['DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_DOWN', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Spend 8 hours with your partner in-game. Disables saving and trophies.',
  },
  {
    id: 'gta6-filter-faded-glory',
    title: 'Faded Glory Filter',
    shortDescription: 'Colour CRT TV retro filter.',
    description:
      'Applies the Faded Glory screen filter — a washed-out, colour CRT television effect that turns Vice City into a 1980s home video.',
    category: 'miscellaneous',
    imageKey: 'gta6-lucia-nightclub',
    keywords: ['filter', 'screen', 'retro', 'crt', 'faded', 'photo mode'],
    popularityScore: 58,
    featured: false,
    combinations: {
      playstation: ['DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      xbox: ['DPAD_DOWN', 'DPAD_DOWN', 'DPAD_UP', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_UP', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT'],
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Unlock: Rob 50 stores with your partner. Disables saving and trophies.',
  },
];

export const CHEAT_CODE_DATASETS: Record<CheatDatasetKey, CheatDatasetConfig> = {
  gta5: {
    id: 'gta5',
    gameTitle: 'Grand Theft Auto V',
    badgeLabel: 'GTA V Active',
    notice:
      'Currently populated with verified GTA V cheat codes. Update GTA6_CHEAT_CODES and flip ACTIVE_CHEAT_DATASET in src/data/cheatCodesConfig.ts when GTA VI codes are ready.',
    cheats: GTA5_CHEAT_CODES,
  },
  gta6: {
    id: 'gta6',
    gameTitle: 'Grand Theft Auto VI',
    badgeLabel: 'GTA VI Verified',
    notice: 'Verified Grand Theft Auto VI cheat codes active.',
    cheats: GTA6_CHEAT_CODES,
  },
};

export function getCheatDataset(key: CheatDatasetKey): CheatDatasetConfig {
  return CHEAT_CODE_DATASETS[key] ?? CHEAT_CODE_DATASETS.gta6;
}

export function getActiveCheatDataset(datasetKey: CheatDatasetKey = ACTIVE_CHEAT_DATASET): CheatDatasetConfig {
  const selected = CHEAT_CODE_DATASETS[datasetKey];
  if (selected && selected.cheats.length > 0) {
    return selected;
  }
  return CHEAT_CODE_DATASETS.gta6;
}
