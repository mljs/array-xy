export default function getZones(from, to, numberOfPoints, exclusions) {
  if (!exclusions || exclusions.length === 0) {
    return [{ from, to, numberOfPoints }];
  }
  exclusions.forEach((a) => {
    if (a.from > a.to) {
      [a.to, a.from] = [a.from, a.to];
    }
  });

  exclusions.sort((a, b) => a.from - b.from);

  let total = to - from;
  let toRemove = exclusions.reduce(
    (previous, exclusion) => (previous += exclusion.to - exclusion.from),
    0
  );
  let unitsPerPoint = (total - toRemove) / numberOfPoints;
  let zones = [];
  let currentFrom = from;
  let totalPoints = 0;
  for (let exclusion of exclusions) {
    let currentNbPoints = Math.round(
      (exclusion.from - currentFrom) / unitsPerPoint
    );
    totalPoints += currentNbPoints;
    zones.push({
      from: currentFrom,
      to: exclusion.from,
      numberOfPoints: currentNbPoints
    });
    currentFrom = exclusion.to;
  }
  zones.push({
    from: currentFrom,
    to: to,
    numberOfPoints: numberOfPoints - totalPoints
  });
  return zones;
}
