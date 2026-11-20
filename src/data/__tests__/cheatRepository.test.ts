import {
  cheatRepository,
  LocalCheatRepository,
  resolveCheatInstruction,
} from '../cheatRepository';
import {
  ACTIVE_CHEAT_DATASET,
  CHEAT_CODE_DATASETS,
  GTA5_CHEAT_CODES,
} from '../cheatCodesConfig';
import { CheatCode } from '../../types/cheat';

describe('cheatRepository & swappable GTA V / GTA VI dataset config', () => {
  it('loads 30 authentic GTA V cheats from the swappable CHEAT_CODE_DATASETS config object', () => {
    expect(ACTIVE_CHEAT_DATASET).toBe('gta5');
    expect(CHEAT_CODE_DATASETS.gta5.cheats).toBe(GTA5_CHEAT_CODES);
    expect(CHEAT_CODE_DATASETS.gta6).toBeDefined();

    const allCheats = cheatRepository.getAllCheats();
    expect(allCheats.length).toBe(30);

    for (const cheat of allCheats) {
      expect(cheat.verified).toBe(true);
      expect(cheat.isAvailable).toBe(true);
      expect(cheat.combinations.playstation?.length).toBeGreaterThan(0);
      expect(cheat.combinations.xbox?.length).toBeGreaterThan(0);
      expect(cheat.combinations.pc?.length).toBeGreaterThan(0);
    }
  });

  it('resolves authentic PlayStation, Xbox, and PC GTA V codes', () => {
    const health = cheatRepository.getCheatById('max-health-armor');
    expect(health).toBeDefined();

    const ps = resolveCheatInstruction(health!, 'playstation');
    expect(ps.mode).toBe('verified');
    expect(ps.buttons?.[0]).toBe('CIRCLE');

    const xbox = resolveCheatInstruction(health!, 'xbox');
    expect(xbox.mode).toBe('verified');
    expect(xbox.buttons?.[1]).toBe('L1');

    const pc = resolveCheatInstruction(health!, 'pc');
    expect(pc.mode).toBe('verified');
    expect(pc.pcCommand).toBe('TURTLE');
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
        playstation: ['L1', 'R1', 'TRIANGLE'],
        xbox: ['L1', 'R1', 'TRIANGLE'],
        pc: 'TURTLE',
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

  it('supports search across title, description, PC code, keywords, and category names', () => {
    expect(
      cheatRepository.queryCheats({ search: 'TURTLE' }).map((c) => c.id)
    ).toContain('max-health-armor');

    expect(
      cheatRepository.queryCheats({ search: 'buzzard' }).map((c) => c.id)
    ).toContain('spawn-buzzard');

    expect(
      cheatRepository.queryCheats({ search: 'Weapons & Ammo' }).length
    ).toBeGreaterThan(0);

    expect(
      cheatRepository.queryCheats({ search: 'zzzz-nonexistent-query' })
    ).toEqual([]);
  });

  it('groups cheats cleanly per category and finds related cheats', () => {
    const vehicles = cheatRepository.getCheatsByCategory('vehicles');
    expect(vehicles.length).toBeGreaterThanOrEqual(8);
    expect(vehicles.every((v) => v.category === 'vehicles')).toBe(true);

    const health = cheatRepository.getCheatById('max-health-armor')!;
    const related = cheatRepository.getRelatedCheats(health);
    expect(related.length).toBeGreaterThan(0);
    expect(
      related.every((r) => r.category === health.category && r.id !== health.id)
    ).toBe(true);
  });
});
