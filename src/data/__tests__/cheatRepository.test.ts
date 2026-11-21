import {
  cheatRepository,
  getCheatRepository,
  findCheatAnywhere,
  LocalCheatRepository,
  resolveCheatInstruction,
} from '../cheatRepository';
import {
  ACTIVE_CHEAT_DATASET,
  CHEAT_CODE_DATASETS,
  GTA5_CHEAT_CODES,
  GTA6_CHEAT_CODES,
} from '../cheatCodesConfig';
import { CheatCode } from '../../types/cheat';

describe('cheatRepository & swappable GTA V / GTA VI dataset config', () => {
  it('defaults to GTA VI with authentic D-pad codes and supports GTA V', () => {
    expect(ACTIVE_CHEAT_DATASET).toBe('gta6');
    expect(CHEAT_CODE_DATASETS.gta6.cheats).toBe(GTA6_CHEAT_CODES);
    expect(CHEAT_CODE_DATASETS.gta5.cheats).toBe(GTA5_CHEAT_CODES);

    // Default repository is GTA VI
    const gta6Cheats = cheatRepository.getAllCheats();
    expect(gta6Cheats.length).toBe(18);

    for (const cheat of gta6Cheats) {
      expect(cheat.verified).toBe(true);
      expect(cheat.isAvailable).toBe(true);
      // GTA VI uses D-pad combinations for PlayStation & Xbox
      expect(cheat.combinations.playstation?.length).toBeGreaterThan(0);
      expect(cheat.combinations.xbox?.length).toBeGreaterThan(0);
      expect(cheat.combinations.playstation).toEqual(cheat.combinations.xbox);
    }

    // GTA V repo is also available with 34 verified cheats from Red Bull
    const gta5Repo = getCheatRepository('gta5');
    const gta5Cheats = gta5Repo.getAllCheats();
    expect(gta5Cheats.length).toBe(34);
    for (const cheat of gta5Cheats) {
      expect(cheat.verified).toBe(true);
      expect(cheat.isAvailable).toBe(true);
      expect(cheat.phoneNumber).toBeDefined();
    }
  });

  it('resolves authentic GTA 6 phone D-pad sequences on PS5 and Xbox', () => {
    const moneyCheat = cheatRepository.getCheatById('gta6-cash-250k');
    expect(moneyCheat).toBeDefined();

    const ps = resolveCheatInstruction(moneyCheat!, 'playstation');
    expect(ps.mode).toBe('verified');
    expect(ps.buttons).toEqual([
      'DPAD_UP',
      'DPAD_RIGHT',
      'DPAD_DOWN',
      'DPAD_LEFT',
      'DPAD_UP',
      'DPAD_LEFT',
      'DPAD_DOWN',
      'DPAD_RIGHT',
    ]);

    const xbox = resolveCheatInstruction(moneyCheat!, 'xbox');
    expect(xbox.mode).toBe('verified');
    expect(xbox.buttons).toEqual(ps.buttons);

    // PC resolves to TBD for GTA VI cheats
    const pc = resolveCheatInstruction(moneyCheat!, 'pc');
    expect(pc.mode).toBe('tbd');
  });

  it('finds cheats anywhere across datasets using findCheatAnywhere', () => {
    const gta6Found = findCheatAnywhere('gta6-cash-250k');
    expect(gta6Found).toBeDefined();
    expect(gta6Found?.game).toBe('gta6');

    const gta5Found = findCheatAnywhere('max-health-armor');
    expect(gta5Found).toBeDefined();
    expect(gta5Found?.game).toBe('gta5');
  });

  it('strictly shows only categories with verified available cheats', () => {
    const sampleVerifiedCheat: CheatCode = {
      id: 'verified-test',
      title: 'Verified Health',
      shortDescription: 'Verified test cheat',
      description: 'Verified test description',
      category: 'health-armor',
      imageKey: 'street-duo',
      keywords: ['health'],
      popularityScore: 100,
      combinations: {
        playstation: ['DPAD_UP', 'DPAD_DOWN'],
        xbox: ['DPAD_UP', 'DPAD_DOWN'],
      },
      verified: true,
      isAvailable: true,
    };

    const unverifiedVehicleCheat: CheatCode = {
      ...sampleVerifiedCheat,
      id: 'unverified-car',
      category: 'vehicles',
      combinations: {},
      verified: false,
      isAvailable: false,
    };

    const customRepo = new LocalCheatRepository([
      sampleVerifiedCheat,
      unverifiedVehicleCheat,
    ]);

    const visible = customRepo.getVisibleCategories();
    expect(visible.map((c) => c.id)).toEqual(['health-armor']);
  });

  it('supports search across GTA 6 titles, descriptions, and keywords', () => {
    expect(
      cheatRepository.queryCheats({ search: '250k' }).map((c) => c.id)
    ).toContain('gta6-cash-250k');

    expect(
      cheatRepository.queryCheats({ search: 'Focus' }).map((c) => c.id)
    ).toContain('gta6-unlimited-focus');

    expect(
      cheatRepository.queryCheats({ search: 'Exploding Balls' }).map((c) => c.id)
    ).toContain('gta6-exploding-balls');

    expect(
      cheatRepository.queryCheats({ search: 'zzzz-nonexistent-query' })
    ).toEqual([]);
  });

  it('supports GTA 5 queries via getCheatRepository("gta5")', () => {
    const gta5Repo = getCheatRepository('gta5');
    expect(
      gta5Repo.queryCheats({ search: 'TURTLE' }).map((c) => c.id)
    ).toContain('max-health-armor');

    expect(
      gta5Repo.queryCheats({ search: 'buzzard' }).map((c) => c.id)
    ).toContain('spawn-buzzard');
  });
});
