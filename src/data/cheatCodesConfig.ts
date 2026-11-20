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
export const ACTIVE_CHEAT_DATASET: CheatDatasetKey = 'gta5';

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
  {
    id: 'max-health-armor',
    title: 'Max Health & Armor',
    shortDescription: 'Refill 100% health, body armor, and repair your current vehicle.',
    description:
      'Instantly restores your health bar and body armor to maximum capacity. When activated inside a vehicle, also fully repairs exterior and engine damage.',
    category: 'health-armor',
    imageKey: 'street-duo',
    keywords: ['heal', 'hp', 'vest', 'repair', 'turtle', 'health', 'armor'],
    popularityScore: 100,
    featured: true,
    combinations: {
      playstation: ['CIRCLE', 'L1', 'TRIANGLE', 'R2', 'CROSS', 'SQUARE', 'CIRCLE', 'DPAD_RIGHT', 'SQUARE', 'L1', 'L1', 'L1'],
      xbox: ['CIRCLE', 'L1', 'TRIANGLE', 'R2', 'CROSS', 'SQUARE', 'CIRCLE', 'DPAD_RIGHT', 'SQUARE', 'L1', 'L1', 'L1'],
      pc: 'TURTLE',
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Activating cheats disables trophies and achievements for the current session.',
  },
  {
    id: 'invincibility',
    title: 'Invincibility (5 Minutes)',
    shortDescription: 'Become immune to bullets, explosions, and crash damage for 5 minutes.',
    description:
      'Grants complete invulnerability to gunfire, melee attacks, fire, falls, and explosions for 5 real-time minutes. Re-enter once the timer runs out to reactivate.',
    category: 'health-armor',
    imageKey: 'hero-vice',
    keywords: ['god mode', 'immortal', 'painkiller', 'invulnerable', 'shield'],
    popularityScore: 99,
    featured: true,
    combinations: {
      playstation: ['DPAD_RIGHT', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      xbox: ['DPAD_RIGHT', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      pc: 'PAINKILLER',
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Timer lasts 5 minutes; does not protect vehicles from exploding.',
  },
  {
    id: 'give-weapons-ammo',
    title: 'Give Weapons & Extra Ammo',
    shortDescription: 'Equip a full weapon wheel including RPG, rifle, shotgun, SMG, and grenades.',
    description:
      'Unlocks a complete combat loadout — Knife, Pistol, Assault Rifle, SMG, Pump Shotgun, Sniper Rifle, RPG, and Grenades — along with generous reserve ammo.',
    category: 'weapons-ammo',
    imageKey: 'collage-cover',
    keywords: ['guns', 'weapons', 'ammo', 'toolup', 'arsenal', 'rpg', 'rifle'],
    popularityScore: 98,
    featured: true,
    combinations: {
      playstation: ['TRIANGLE', 'R2', 'DPAD_LEFT', 'L1', 'CROSS', 'DPAD_RIGHT', 'TRIANGLE', 'DPAD_DOWN', 'SQUARE', 'L1', 'L1', 'L1'],
      xbox: ['TRIANGLE', 'R2', 'DPAD_LEFT', 'L1', 'CROSS', 'DPAD_RIGHT', 'TRIANGLE', 'DPAD_DOWN', 'SQUARE', 'L1', 'L1', 'L1'],
      pc: 'TOOLUP',
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Enter repeatedly to top up reserve ammunition.',
  },
  {
    id: 'lower-wanted-level',
    title: 'Lower Wanted Level',
    shortDescription: 'Immediately remove one wanted star to shake police pursuit.',
    description:
      'Drops your active police Wanted Level by one star each time you enter the combination. Repeat to clear your wanted status completely.',
    category: 'wanted-level',
    imageKey: 'convertible-skyline',
    keywords: ['cops', 'police', 'stars', 'lawyerup', 'clear', 'escape', 'wanted'],
    popularityScore: 97,
    featured: true,
    combinations: {
      playstation: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT'],
      xbox: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT'],
      pc: 'LAWYERUP',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'raise-wanted-level',
    title: 'Raise Wanted Level',
    shortDescription: 'Add one wanted star instantly to escalate police chases.',
    description:
      'Increases your Wanted Level by one star per input, up to the maximum 5-star police and NOOSE tactical response.',
    category: 'wanted-level',
    imageKey: 'convertible-skyline',
    keywords: ['stars', 'police', 'fugitive', 'chase', 'heat', 'wanted'],
    popularityScore: 86,
    featured: false,
    combinations: {
      playstation: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      xbox: ['R1', 'R1', 'CIRCLE', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      pc: 'FUGITIVE',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-buzzard',
    title: 'Spawn Buzzard Chopper',
    shortDescription: 'Summon an armed Buzzard attack helicopter equipped with missiles and miniguns.',
    description:
      'Drops a nimble Buzzard attack helicopter right in front of your character. Activate in an open street, beach, or parking lot so there is clearance for the rotors.',
    category: 'vehicles',
    imageKey: 'collage-cover',
    keywords: ['helicopter', 'chopper', 'buzzard', 'buzzoff', 'fly', 'aircraft'],
    popularityScore: 96,
    featured: true,
    combinations: {
      playstation: ['CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L1', 'L2', 'R1', 'TRIANGLE', 'CIRCLE', 'TRIANGLE'],
      xbox: ['CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L1', 'L2', 'R1', 'TRIANGLE', 'CIRCLE', 'TRIANGLE'],
      pc: 'BUZZOFF',
    },
    verified: true,
    isAvailable: true,
    usageNote: 'Requires flat open space in front of your character to spawn.',
  },
  {
    id: 'spawn-comet',
    title: 'Spawn Comet Sports Car',
    shortDescription: 'Spawn a Pfister Comet high-speed two-door sports coupe.',
    description:
      'Instantly spawns a sleek Pfister Comet sports car ahead of you for rapid highway escapes and city cruising.',
    category: 'vehicles',
    imageKey: 'convertible-skyline',
    keywords: ['car', 'comet', 'sports', 'supercar', 'pfister', 'vehicle'],
    popularityScore: 94,
    featured: true,
    combinations: {
      playstation: ['R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'L1', 'L2', 'CROSS', 'CROSS', 'SQUARE', 'R1'],
      xbox: ['R1', 'CIRCLE', 'R2', 'DPAD_RIGHT', 'L1', 'L2', 'CROSS', 'CROSS', 'SQUARE', 'R1'],
      pc: 'COMET',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-rapid-gt',
    title: 'Spawn Rapid GT',
    shortDescription: 'Spawn a Dewbauchee Rapid GT grand touring sports car.',
    description:
      'Drops a high-acceleration Dewbauchee Rapid GT sports coupe directly in front of your character.',
    category: 'vehicles',
    imageKey: 'convertible-skyline',
    keywords: ['car', 'rapidgt', 'coupe', 'sports', 'fast', 'vehicle'],
    popularityScore: 88,
    featured: false,
    combinations: {
      playstation: ['R2', 'L1', 'CIRCLE', 'DPAD_RIGHT', 'L1', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CIRCLE', 'R2'],
      xbox: ['R2', 'L1', 'CIRCLE', 'DPAD_RIGHT', 'L1', 'R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'CIRCLE', 'R2'],
      pc: 'RAPIDGT',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-pcj-600',
    title: 'Spawn PCJ-600 Motorcycle',
    shortDescription: 'Summon a Shitzu PCJ-600 street sportbike built for weaving through traffic.',
    description:
      'Spawns a fast street motorcycle ideal for alley escapes, stunts, and high-speed lane splitting.',
    category: 'vehicles',
    imageKey: 'collage-cover',
    keywords: ['motorcycle', 'bike', 'pcj', 'rocket', 'sportbike', 'wheelie'],
    popularityScore: 89,
    featured: false,
    combinations: {
      playstation: ['R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'DPAD_RIGHT', 'L2', 'L1', 'L1'],
      xbox: ['R1', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'DPAD_RIGHT', 'L2', 'L1', 'L1'],
      pc: 'ROCKET',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-sanchez',
    title: 'Spawn Sanchez Dirt Bike',
    shortDescription: 'Spawn a Maibatsu Sanchez off-road motocross bike.',
    description:
      'Spawns a rugged dirt bike capable of tearing up mountain trails, beaches, and steep terrain.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['dirt bike', 'sanchez', 'offroad', 'motocross', 'motorcycle'],
    popularityScore: 82,
    featured: false,
    combinations: {
      playstation: ['CIRCLE', 'CROSS', 'L1', 'CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'R1', 'R2', 'L2', 'L1', 'L1'],
      xbox: ['CIRCLE', 'CROSS', 'L1', 'CIRCLE', 'CIRCLE', 'L1', 'CIRCLE', 'R1', 'R2', 'L2', 'L1', 'L1'],
      pc: 'OFFROAD',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-bmx',
    title: 'Spawn BMX Bicycle',
    shortDescription: 'Drop a stunt BMX bike right in front of you.',
    description:
      'Spawns a nimble BMX bicycle for skatepark tricks, bunny hops, and quiet city exploration.',
    category: 'vehicles',
    imageKey: 'street-duo',
    keywords: ['bmx', 'bicycle', 'bike', 'bandit', 'stunt'],
    popularityScore: 81,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'TRIANGLE', 'R1', 'R2'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'TRIANGLE', 'R1', 'R2'],
      pc: 'BANDIT',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-stunt-plane',
    title: 'Spawn Stunt Plane',
    shortDescription: 'Summon a Mallard acrobatic stunt plane for barrel rolls and sky tricks.',
    description:
      'Spawns a lightweight Mallard stunt plane ahead of you. Best triggered on beaches, airfields, or wide highways.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['plane', 'mallard', 'barnstorm', 'fly', 'aircraft', 'stunt'],
    popularityScore: 84,
    featured: false,
    combinations: {
      playstation: ['CIRCLE', 'DPAD_RIGHT', 'L1', 'L2', 'DPAD_LEFT', 'R1', 'L1', 'L1', 'DPAD_LEFT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      xbox: ['CIRCLE', 'DPAD_RIGHT', 'L1', 'L2', 'DPAD_LEFT', 'R1', 'L1', 'L1', 'DPAD_LEFT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE'],
      pc: 'BARNSTORM',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-limo',
    title: 'Spawn Stretch Limo',
    shortDescription: 'Summon a luxury Dundreary Stretch limousine.',
    description:
      'Spawns a full-length VIP limousine directly in front of your character.',
    category: 'vehicles',
    imageKey: 'convertible-skyline',
    keywords: ['limo', 'stretch', 'vinewood', 'luxury', 'car'],
    popularityScore: 76,
    featured: false,
    combinations: {
      playstation: ['R2', 'DPAD_RIGHT', 'L2', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      xbox: ['R2', 'DPAD_RIGHT', 'L2', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      pc: 'VINEWOOD',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-trashmaster',
    title: 'Spawn Trashmaster Truck',
    shortDescription: 'Summon a heavy-duty Trashmaster garbage truck built to smash roadblocks.',
    description:
      'Spawns a massive Trashmaster truck capable of plowing straight through police barricades.',
    category: 'vehicles',
    imageKey: 'collage-cover',
    keywords: ['truck', 'garbage', 'trashmaster', 'trashed', 'heavy'],
    popularityScore: 72,
    featured: false,
    combinations: {
      playstation: ['CIRCLE', 'R1', 'CIRCLE', 'R1', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      xbox: ['CIRCLE', 'R1', 'CIRCLE', 'R1', 'DPAD_LEFT', 'DPAD_LEFT', 'R1', 'L1', 'CIRCLE', 'DPAD_RIGHT'],
      pc: 'TRASHED',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'spawn-caddy',
    title: 'Spawn Golf Caddy',
    shortDescription: 'Summon a compact golf cart for comical downtown escapes.',
    description:
      'Spawns a lightweight Caddy golf cart immediately in front of your character.',
    category: 'vehicles',
    imageKey: 'bay-jetskis',
    keywords: ['caddy', 'golf', 'cart', 'holein1', 'vehicle'],
    popularityScore: 70,
    featured: false,
    combinations: {
      playstation: ['CIRCLE', 'L1', 'DPAD_LEFT', 'R1', 'L2', 'CROSS', 'R1', 'L1', 'CIRCLE', 'CROSS'],
      xbox: ['CIRCLE', 'L1', 'DPAD_LEFT', 'R1', 'L2', 'CROSS', 'R1', 'L1', 'CIRCLE', 'CROSS'],
      pc: 'HOLEIN1',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'explosive-ammo',
    title: 'Explosive Ammo Rounds',
    shortDescription: 'Every fired bullet detonates on impact with an explosive blast.',
    description:
      'Converts all standard gunfire into high-explosive rounds that blow up vehicles and launch enemies on contact.',
    category: 'weapons-ammo',
    imageKey: 'collage-cover',
    keywords: ['bang', 'explosive', 'bullets', 'highex', 'ammo', 'firepower'],
    popularityScore: 95,
    featured: false,
    combinations: {
      playstation: ['DPAD_RIGHT', 'SQUARE', 'CROSS', 'DPAD_LEFT', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L1', 'L1', 'L1'],
      xbox: ['DPAD_RIGHT', 'SQUARE', 'CROSS', 'DPAD_LEFT', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L1', 'L1', 'L1'],
      pc: 'HIGHEX',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'flaming-bullets',
    title: 'Flaming Bullets',
    shortDescription: 'Ignite targets and vehicles with incendiary gunfire.',
    description:
      'Turns all fired bullets into incendiary rounds that set enemies and flammable surfaces on fire on hit.',
    category: 'weapons-ammo',
    imageKey: 'hero-vice',
    keywords: ['fire', 'flame', 'incendiary', 'burn', 'bullets', 'ammo'],
    popularityScore: 87,
    featured: false,
    combinations: {
      playstation: ['L1', 'R1', 'SQUARE', 'R1', 'DPAD_LEFT', 'R2', 'R1', 'DPAD_LEFT', 'SQUARE', 'DPAD_RIGHT', 'L1', 'L1'],
      xbox: ['L1', 'R1', 'SQUARE', 'R1', 'DPAD_LEFT', 'R2', 'R1', 'DPAD_LEFT', 'SQUARE', 'DPAD_RIGHT', 'L1', 'L1'],
      pc: 'INCENDIARY',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'explosive-melee',
    title: 'Explosive Melee Attacks',
    shortDescription: 'Every punch and kick triggers a massive concussive explosion.',
    description:
      'Supercharges unarmed punches and melee strikes so each blow detonates with explosive knockback.',
    category: 'weapons-ammo',
    imageKey: 'street-duo',
    keywords: ['punch', 'melee', 'fist', 'hothands', 'explosive'],
    popularityScore: 85,
    featured: false,
    combinations: {
      playstation: ['DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE', 'R1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L2'],
      xbox: ['DPAD_RIGHT', 'DPAD_LEFT', 'CROSS', 'TRIANGLE', 'R1', 'CIRCLE', 'CIRCLE', 'CIRCLE', 'L2'],
      pc: 'HOTHANDS',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'super-jump',
    title: 'Super Jump',
    shortDescription: 'Leap effortlessly onto rooftops, highways, and tall buildings.',
    description:
      'Multiplies your character’s jump height. Hold the jump button longer for maximum vertical launch.',
    category: 'player-abilities',
    imageKey: 'hero-vice',
    keywords: ['jump', 'leap', 'hoptoit', 'rooftop', 'parkour'],
    popularityScore: 93,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'TRIANGLE', 'TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'R1', 'R2'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'TRIANGLE', 'TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'R1', 'R2'],
      pc: 'HOPTOIT',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'fast-run',
    title: 'Fast Run',
    shortDescription: 'Outrun traffic on foot with turbo sprinting speed.',
    description:
      'Greatly boosts your sprinting velocity on foot for rapid urban escapes and traversal.',
    category: 'player-abilities',
    imageKey: 'street-duo',
    keywords: ['sprint', 'speed', 'run', 'catchme', 'fast'],
    popularityScore: 91,
    featured: false,
    combinations: {
      playstation: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L2', 'L1', 'SQUARE'],
      xbox: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'L2', 'L1', 'SQUARE'],
      pc: 'CATCHME',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'fast-swim',
    title: 'Fast Swim',
    shortDescription: 'Swim across bays and underwater reefs at blazing speed.',
    description:
      'Significantly increases swimming speed both at the water surface and underwater.',
    category: 'player-abilities',
    imageKey: 'bay-jetskis',
    keywords: ['swim', 'water', 'ocean', 'gotgills', 'dive'],
    popularityScore: 79,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'DPAD_RIGHT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'L2', 'DPAD_RIGHT'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'DPAD_RIGHT', 'DPAD_RIGHT', 'R2', 'DPAD_LEFT', 'L2', 'DPAD_RIGHT'],
      pc: 'GOTGILLS',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'slow-motion-aim',
    title: 'Slow-Motion Aim',
    shortDescription: 'Engage bullet-time precision while aiming down sights (up to 3 levels).',
    description:
      'Slows down time whenever you aim a firearm. Enter up to 3 times to deepen the slow-motion effect; enter a 4th time to disable.',
    category: 'player-abilities',
    imageKey: 'hero-vice',
    keywords: ['deadeye', 'slowmo', 'aim', 'bullet time', 'precision'],
    popularityScore: 88,
    featured: false,
    combinations: {
      playstation: ['SQUARE', 'L2', 'R1', 'TRIANGLE', 'DPAD_LEFT', 'SQUARE', 'L2', 'DPAD_RIGHT', 'CROSS'],
      xbox: ['SQUARE', 'L2', 'R1', 'TRIANGLE', 'DPAD_LEFT', 'SQUARE', 'L2', 'DPAD_RIGHT', 'CROSS'],
      pc: 'DEADEYE',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'recharge-special-ability',
    title: 'Recharge Special Ability',
    shortDescription: 'Instantly refill your character’s special ability gauge to 100%.',
    description:
      'Immediately tops up your active protagonist’s special ability meter with zero cooldown wait.',
    category: 'health-armor',
    imageKey: 'hero-vice',
    keywords: ['special', 'meter', 'powerup', 'stamina', 'recharge'],
    popularityScore: 83,
    featured: false,
    combinations: {
      playstation: ['CROSS', 'CROSS', 'SQUARE', 'R1', 'L1', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS'],
      xbox: ['CROSS', 'CROSS', 'SQUARE', 'R1', 'L1', 'CROSS', 'DPAD_RIGHT', 'DPAD_LEFT', 'CROSS'],
      pc: 'POWERUP',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'change-weather',
    title: 'Change Weather',
    shortDescription: 'Cycle through sunny skies, rain, thunder, fog, overcast, and snow.',
    description:
      'Rotates the world weather preset each time you input the code: Extra Sunny → Clear → Cloudy → Smoggy → Overcast → Rainy → Thundery → Clearing → Snowing.',
    category: 'weather-environment',
    imageKey: 'bay-jetskis',
    keywords: ['rain', 'storm', 'sun', 'snow', 'makeitrain', 'weather'],
    popularityScore: 90,
    featured: false,
    combinations: {
      playstation: ['R2', 'CROSS', 'L1', 'L1', 'L2', 'L2', 'L2', 'SQUARE'],
      xbox: ['R2', 'CROSS', 'L1', 'L1', 'L2', 'L2', 'L2', 'SQUARE'],
      pc: 'MAKEITRAIN',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'moon-gravity',
    title: 'Moon Gravity',
    shortDescription: 'Lower world gravity for floaty mega-jumps and huge vehicle airtime.',
    description:
      'Reduces gravity across the map. Launch cars off ramps or jump on foot for low-gravity airtime. Re-enter to restore normal physics.',
    category: 'weather-environment',
    imageKey: 'bay-jetskis',
    keywords: ['gravity', 'moon', 'floater', 'low gravity', 'float'],
    popularityScore: 87,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'R1', 'L1', 'DPAD_RIGHT', 'DPAD_LEFT', 'L1', 'DPAD_LEFT'],
      xbox: ['DPAD_LEFT', 'DPAD_LEFT', 'L1', 'R1', 'L1', 'DPAD_RIGHT', 'DPAD_LEFT', 'L1', 'DPAD_LEFT'],
      pc: 'FLOATER',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'slippery-cars',
    title: 'Slippery Cars (Drift Mode)',
    shortDescription: 'Slash tire traction on every vehicle for wild street drifts.',
    description:
      'Reduces road grip across all vehicles so every corner breaks into an exaggerated drift slide.',
    category: 'gameplay-world',
    imageKey: 'convertible-skyline',
    keywords: ['drift', 'slide', 'snowday', 'traction', 'tires', 'cars'],
    popularityScore: 84,
    featured: false,
    combinations: {
      playstation: ['TRIANGLE', 'R1', 'R1', 'DPAD_LEFT', 'R1', 'L1', 'R2', 'L1'],
      xbox: ['TRIANGLE', 'R1', 'R1', 'DPAD_LEFT', 'R1', 'L1', 'R2', 'L1'],
      pc: 'SNOWDAY',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'slow-motion-world',
    title: 'Slow-Motion Gameplay',
    shortDescription: 'Slow down the entire world across 3 progressive cinematic tiers.',
    description:
      'Slows down global physics, traffic, and combat. Enter up to 3 times for deeper slow motion, then a 4th time to resume normal speed.',
    category: 'gameplay-world',
    imageKey: 'collage-cover',
    keywords: ['slowmo', 'slow motion', 'cinematic', 'time', 'world'],
    popularityScore: 82,
    featured: false,
    combinations: {
      playstation: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'SQUARE', 'R2', 'R1'],
      xbox: ['TRIANGLE', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_RIGHT', 'SQUARE', 'R2', 'R1'],
      pc: 'SLOWMO',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'give-parachute',
    title: 'Give Parachute',
    shortDescription: 'Equip a deployable parachute onto your character instantly.',
    description:
      'Adds a parachute directly to your inventory ready for rooftop BASE jumps and mid-air bailouts.',
    category: 'miscellaneous',
    imageKey: 'bay-jetskis',
    keywords: ['parachute', 'skydive', 'glide', 'chute', 'jump'],
    popularityScore: 85,
    featured: false,
    combinations: {
      playstation: ['DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'R2', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1'],
      xbox: ['DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'R2', 'DPAD_LEFT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1'],
      pc: 'SKYDIVE',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'skyfall',
    title: 'Skyfall',
    shortDescription: 'Teleport high into the sky for an instant high-altitude freefall.',
    description:
      'Launches your character thousands of feet into the air to skydive across the map. Note: parachutes cannot be deployed during Skyfall — pair with Invincibility to survive impact!',
    category: 'miscellaneous',
    imageKey: 'hero-vice',
    keywords: ['skyfall', 'fly', 'skydive', 'fall', 'altitude'],
    popularityScore: 92,
    featured: false,
    combinations: {
      playstation: ['L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      xbox: ['L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'L1', 'L2', 'R1', 'R2', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT'],
      pc: 'SKYFALL',
    },
    verified: true,
    isAvailable: true,
  },
  {
    id: 'drunk-mode',
    title: 'Drunk Mode',
    shortDescription: 'Toggle wobbly camera sway and stumbling controls for pure comedy.',
    description:
      'Activates intoxicated camera wobble and erratic movement physics. Re-enter the code at any time to return to normal.',
    category: 'miscellaneous',
    imageKey: 'street-duo',
    keywords: ['drunk', 'liquor', 'wobble', 'funny', 'party'],
    popularityScore: 78,
    featured: false,
    combinations: {
      playstation: ['TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'DPAD_LEFT'],
      xbox: ['TRIANGLE', 'DPAD_RIGHT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'SQUARE', 'CIRCLE', 'DPAD_LEFT'],
      pc: 'LIQUOR',
    },
    verified: true,
    isAvailable: true,
  },
];

/**
 * ============================================================================
 * GTA VI CHEAT CODES OBJECT (READY FOR UPDATE)
 * ============================================================================
 * Paste verified GTA VI cheat codes here and set `ACTIVE_CHEAT_DATASET = 'gta6'`
 * above to populate the entire app automatically!
 */
export const GTA6_CHEAT_CODES: CheatCode[] = [];

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

export function getActiveCheatDataset(): CheatDatasetConfig {
  const selected = CHEAT_CODE_DATASETS[ACTIVE_CHEAT_DATASET];
  if (selected.cheats.length > 0) {
    return selected;
  }
  return CHEAT_CODE_DATASETS.gta5;
}
