export default function getZones(from, to, numberOfPoints, exclusions = []) {
  if (from > to) {
    [from, to] = [to, from];
  }

  // in exclusions from and to have to be defined
  exclusions = exclusions.filter(
    (exclusion) => exclusion.from !== undefined && exclusion.to !== undefined,
  );

  exclusions = JSON.parse(JSON.stringify(exclusions));
  // we ensure that from before to
  exclusions.forEach((exclusion) => {
    if (exclusion.from > exclusion.to) {
      [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
    }
  });

  exclusions.sort((a, b) => a.from - b.from);

  // we will rework the exclusions in order to remove overlap and outside range (from / to)
  exclusions.forEach((exclusion) => {
    if (exclusion.from < from) exclusion.from = from;
    if (exclusion.to > to) exclusion.to = to;
  });
  for (let i = 0; i < exclusions.length - 1; i++) {
    if (exclusions[i].to > exclusions[i + 1].from) {
      exclusions[i].to = exclusions[i + 1].from;
    }
  }
  exclusions = exclusions.filter((exclusion) => exclusion.from < exclusion.to);

  if (!exclusions || exclusions.length === 0) {
    return [{ from, to, numberOfPoints }];
  }

  // need to deal with overlapping exclusions and out of bound exclusions

  let toRemove = exclusions.reduce(
    (previous, exclusion) => (previous += exclusion.to - exclusion.from),
    0,
  );
  let total = to - from;
  let unitsPerPoint = (total - toRemove) / numberOfPoints;
  let zones = [];
  let currentFrom = from;
  let totalPoints = 0;
  for (let exclusion of exclusions) {
    let currentNbPoints = Math.round(
      (exclusion.from - currentFrom) / unitsPerPoint,
    );
    totalPoints += currentNbPoints;
    if (currentNbPoints > 0) {
      zones.push({
        from: currentFrom,
        to: exclusion.from,
        numberOfPoints: currentNbPoints,
      });
    }

    currentFrom = exclusion.to;
  }
  if (numberOfPoints - totalPoints > 0) {
    zones.push({
      from: currentFrom,
      to: to,
      numberOfPoints: numberOfPoints - totalPoints,
    });
  }

  return zones;
}
