
import type { EmulatorConfig } from './types';

// Map of file extensions to EmulatorJS core names
// Reference: https://docs.emulatorjs.org/
export const SUPPORTED_SYSTEMS: EmulatorConfig[] = [
  {
    name: 'Nintendo Entertainment System (NES)',
    system: 'nes',
    extensions: ['nes']
  },
  {
    name: 'Super Nintendo (SNES)',
    system: 'snes',
    extensions: ['sfc', 'smc', 'snes']
  },
  {
    name: 'Game Boy',
    system: 'gb',
    extensions: ['gb']
  },
  {
    name: 'Game Boy Color',
    system: 'gbc',
    extensions: ['gbc']
  },
  {
    name: 'Game Boy Advance',
    system: 'gba',
    extensions: ['gba']
  },
  {
    name: 'Nintendo 64',
    system: 'n64',
    extensions: ['n64', 'z64', 'v64']
  },
  {
    name: 'Sega Genesis / Mega Drive',
    system: 'segaMD',
    extensions: ['md', 'gen', 'bin', 'smd']
  },
  {
    name: 'PlayStation 1',
    system: 'psx',
    extensions: ['iso', 'bin', 'img', 'pbp', 'chd']
  },
  {
    name: 'Nintendo DS',
    system: 'nds',
    extensions: ['nds']
  },
  {
    name: 'Arcade (MAME 2003)',
    system: 'mame2003',
    extensions: ['zip']
  }
];

export const CDN_BASE_URL = 'https://cdn.emulatorjs.org/stable/data/';