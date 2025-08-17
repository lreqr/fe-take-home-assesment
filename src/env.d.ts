/// <reference types="vite/client" />
export interface BatteryEntry {
  academyId: number;
  batteryLevel: number;
  employeeId: string;
  serialNumber: string;
  timestamp: string;
}

export interface DeviceUsage {
  serialNumber: string;
  academyId: number;
  avg_daily: number | 'unknown';
}

export interface AcademySummary {
  academyId: number;
  badDevices: string[];
  numBad: number;
}