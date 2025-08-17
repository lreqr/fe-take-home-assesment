<template>
  <div class="home">
    <h1>Academy Battery Issues</h1>
    <table>
      <thead>
      <tr>
        <th>Academy</th>
        <th>Number of Bad Devices</th>
        <th>Details</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="academy in academySummaries" :key="academy.academyId">
        <td>{{ academy.academyId }}</td>
        <td>{{ academy.numBad }}</td>
        <td>
          <ul>
            <li v-for="device in academy.badDevices" :key="device">{{ device }}</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import batteryData from '@/data/battery.json';
import { calculateDeviceUsages, getAcademySummaries } from '../units/batteryCalculator.ts';
import type { AcademySummary, BatteryEntry } from '../env.d.ts';

const usages = calculateDeviceUsages(batteryData as BatteryEntry[]);
const academySummaries = ref<AcademySummary[]>(getAcademySummaries(usages));
</script>

<style scoped>
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 8px; }
</style>