import type { BatteryEntry, DeviceUsage, AcademySummary } from '../env.d.ts';

const THRESHOLD = 0.3;

export function calculateDeviceUsages(data: BatteryEntry[]): DeviceUsage[] {
  const devicesMap = new Map<string, BatteryEntry[]>();
  for (const entry of data) {
    const sn = entry.serialNumber;
    if (!devicesMap.has(sn)) {
      devicesMap.set(sn, []);
    }
    devicesMap.get(sn)!.push(entry);
  }

  const usages: DeviceUsage[] = [];
  for (const [sn, readings] of devicesMap) {
    if (readings.length < 2) {
      usages.push({ serialNumber: sn, academyId: readings[0]?.academyId ?? -1, avg_daily: 'unknown' });
      continue;
    }

    readings.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    let totalConsumption = 0;
    let totalHours = 0;

    for (let i = 1; i < readings.length; i++) {
      const prev = readings[i - 1];
      const curr = readings[i];
      const level1 = prev.batteryLevel;
      const level2 = curr.batteryLevel;
      const time1 = new Date(prev.timestamp).getTime();
      const time2 = new Date(curr.timestamp).getTime();
      const hours = (time2 - time1) / (1000 * 3600);

      if (level2 < level1) {
        const consumption = level1 - level2;
        totalConsumption += consumption;
        totalHours += hours;
      }
    }

    const academyId: number = readings[0].academyId;
    let avg_daily: number | 'unknown' = 'unknown';
    if (totalHours > 0) {
      avg_daily = (totalConsumption / totalHours) * 24;
    }
    usages.push({ serialNumber: sn, academyId, avg_daily });
  }

  return usages;
}

export function getAcademySummaries(usages: DeviceUsage[]): AcademySummary[] {
  const academyMap = new Map<number, string[]>();

  for (const usage of usages) {

    if (typeof usage.avg_daily === 'number' && usage.avg_daily > THRESHOLD) {


      const academy = usage.academyId;


      if (typeof academy === 'number' && academy !== -1) {
        if (!academyMap.has(academy)) {
          academyMap.set(academy, []);
        }
        academyMap.get(academy)!.push(usage.serialNumber);
      }
    }
  }

  const summaries: AcademySummary[] = [];
  for (const [academyId, badDevices] of academyMap) {
    summaries.push({ academyId, badDevices, numBad: badDevices.length });
  }

  summaries.sort((a, b) => b.numBad - a.numBad);

  return summaries;
}