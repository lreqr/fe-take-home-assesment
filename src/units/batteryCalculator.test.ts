import { describe, expect, test } from 'vitest';
import { calculateDeviceUsages } from './batteryCalculator';
import type { BatteryEntry } from '../env.d.ts';

describe('batteryCalculator', () => {
  test('calculates avg daily correctly for simple case', () => {
    const mockData: BatteryEntry[] = [
      { timestamp: '2023-10-01T09:00:00', batteryLevel: 100, serialNumber: 'dev1', employeeId: '1', academyId: 1 },
      { timestamp: '2023-10-01T21:00:00', batteryLevel: 90, serialNumber: 'dev1', employeeId: '1', academyId: 1 },
    ];
    const usages = calculateDeviceUsages(mockData);
    expect(usages[0].avg_daily).toBe(20); // 10% over 12h -> 20%/day
  });

  test('ignores charge increases', () => {
    const mockData: BatteryEntry[] = [
      { timestamp: '2023-10-01T09:00:00', batteryLevel: 100, serialNumber: 'dev2', employeeId: '2', academyId: 2 },
      { timestamp: '2023-10-01T21:00:00', batteryLevel: 90, serialNumber: 'dev2', employeeId: '2', academyId: 2 },
      { timestamp: '2023-10-02T21:00:00', batteryLevel: 80, serialNumber: 'dev2', employeeId: '2', academyId: 2 },
      { timestamp: '2023-10-02T22:00:00', batteryLevel: 100, serialNumber: 'dev2', employeeId: '2', academyId: 2 }, // Charge: ignore
    ];
    const usages = calculateDeviceUsages(mockData);
    expect(usages[0].avg_daily).toBeCloseTo(13.333, 1); // 13.3% as PDF example
  });

  test('handles unknown for single point', () => {
    const mockData: BatteryEntry[] = [
      { timestamp: '2023-10-01T09:00:00', batteryLevel: 100, serialNumber: 'dev3', employeeId: '3', academyId: 3 },
    ];
    const usages = calculateDeviceUsages(mockData);
    expect(usages[0].avg_daily).toBe('unknown');
  });

});