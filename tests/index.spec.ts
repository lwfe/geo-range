import { isWithinTargets } from "../lib";

describe("isWithinTargets", () => {
  const DEFAULT_RANGE_IN_KM = 5;

  test("Case 1: In range (São Paulo)", () => {
    const point: [number, number] = [-23.55052, -46.633308]; // São Paulo
    const targets: [number, number][] = [[-23.556788, -46.639674]]; // Near in São Paulo
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(true);
  });

  test("Case 2: Out of range (São Paulo to Rio de Janeiro)", () => {
    const point: [number, number] = [-23.55052, -46.633308]; // São Paulo
    const targets: [number, number][] = [[-22.9035, -43.2096]]; // Rio de Janeiro
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(false);
  });

  test("Case 3: Many targets, one inside (Nova York)", () => {
    const point: [number, number] = [40.712776, -74.005974]; // New York
    const targets: [number, number][] = [
      [40.715697, -73.994851],
      [48.8566, 2.3522],
    ]; // New York e Paris
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(true);
  });

  test("Case 4: Many targets, all out (Los Angeles)", () => {
    const point: [number, number] = [34.052235, -118.243683]; // Los Angeles
    const targets: [number, number][] = [
      [35.6895, 139.6917],
      [48.8566, 2.3522],
    ]; // Tokyo e Paris
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(false);
  });

  test("Case 5: Custom range (10 km in Londres)", () => {
    const point: [number, number] = [51.5074, -0.1278]; // London
    const targets: [number, number][] = [[51.515, -0.13]]; // Near in London
    const rangeInKm = 10;
    expect(isWithinTargets({ point, targets, rangeInKm })).toBe(true);
  });

  test("Case 6: Targets near each other (Paris)", () => {
    const point: [number, number] = [48.8566, 2.3522]; // Paris
    const targets: [number, number][] = [
      [48.8566, 2.3522],
      [48.8565, 2.3521],
    ]; // Near
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(true);
  });

  test("Case 7: Exactly in the range limit (São Francisco)", () => {
    const point: [number, number] = [37.7749, -122.4194]; // San Francisco
    const targets: [number, number][] = [[37.8044, -122.2711]]; // Oakland
    expect(
      isWithinTargets({ point, targets, rangeInKm: 13.438146696949902 })
    ).toBe(true);
  });

  test("Caso 8: Alvos no mesmo ponto (Sydney)", () => {
    const point: [number, number] = [-33.8688, 151.2093]; // Sydney
    const targets: [number, number][] = [
      [-33.8688, 151.2093],
      [-33.8688, 151.2093],
    ]; // Same location
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(true);
  });

  test("Caso 9: Alvo a uma grande distância (Tóquio para São Francisco)", () => {
    const point: [number, number] = [35.6895, 139.6917]; // Tokyo
    const targets: [number, number][] = [[37.7749, -122.4194]]; // San Francisco
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(false);
  });

  test("Caso 10: Ambos os pontos no hemisfério sul (Buenos Aires e Adelaide)", () => {
    const point: [number, number] = [-34.6037, -58.3816]; // Buenos Aires
    const targets: [number, number][] = [[-34.9285, 138.6007]]; // Adelaide
    expect(
      isWithinTargets({ point, targets, rangeInKm: DEFAULT_RANGE_IN_KM })
    ).toBe(false);
  });
});
