import type { QualitySystem } from '../types';

export const qualitySystems: QualitySystem[] = [
  {
    id: 'iso9001',
    name: 'ISO 9001',
    icon: '🏅',
    description:
      'Starptautiskais kvalitātes vadības sistēmu standarts. Apgūsti procesālo domāšanu, orientāciju uz klientu un nepārtrauktu pilnveidi.',
    color: '#e8c547',
    accentClass: 'from-yellow-500 to-amber-600',
    category: 'quality-systems',
  },
  {
    id: 'tqm',
    name: 'Totālā kvalitātes vadība',
    icon: '♾️',
    description:
      'Holistiska pieeja ilgtermiņa panākumiem caur klientu apmierinātību. Uzzini, kā katrs darbinieks veicina procesu uzlabošanu.',
    color: '#7c6fff',
    accentClass: 'from-violet-500 to-purple-700',
    category: 'quality-systems',
  },
  {
    id: 'sixsigma',
    name: 'Six Sigma',
    icon: 'Σ',
    description:
      'Uz datiem balstīta metodoloģija defektu novēršanai. Apgūsti DMAIC ciklu, statistiskos rīkus un procesu variāciju samazināšanu.',
    color: '#4ecdc4',
    accentClass: 'from-teal-400 to-cyan-600',
    category: 'quality-systems',
  },
  {
    id: 'lean',
    name: 'Lean ražošana',
    icon: '⚡',
    description:
      'Maksimizē vērtību, minimizējot izšķērdību. Izproti 8 izšķērdību veidus, vērtību plūsmas kartēšanu un vilkšanas sistēmas.',
    color: '#ff6b6b',
    accentClass: 'from-rose-500 to-red-700',
    category: 'quality-systems',
  },
  {
    id: '7s',
    name: '7S sistēma',
    icon: '🏭',
    description:
      'Darbavietas organizācijas metode: Šķirot, Sakārtot, Spodrināt, Standartizēt, Stiprināt, Sargāt un Komandas gars. Apgūsti, kā radīt drošu, tīru un produktīvu darba vidi.',
    color: '#f97316',
    accentClass: 'from-orange-500 to-amber-600',
    category: 'quality-systems',
  },
];
