const DEFAULT_RANGE_IN_KM = 5;

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Eather's Radius
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isWithinTargets({
  point,
  targets,
  rangeInKm = DEFAULT_RANGE_IN_KM,
}: {
  point: [number, number];
  targets: [number, number][];
  rangeInKm?: number;
}) {
  const [lat, lon] = point;
  const distances = targets.map(([lat2, lon2]) =>
    haversineDistance(lat, lon, lat2, lon2)
  );
  return distances.some((distance) => distance <= rangeInKm);
}

export { isWithinTargets };
