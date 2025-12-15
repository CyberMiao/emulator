export interface EmulatorConfig {
  system: string;
  name: string;
  extensions: string[];
}

export interface RomFile {
  name: string;
  url: string; // Blob URL
  system: string;
  size: number;
}

export type ScreenState = 'UPLOAD' | 'PLAYING';

// Extended Window interface isn't strictly needed for the iframe approach, 
// but good to have if we ever moved to direct embedding.
export interface Window {
  EJS_player: any;
  EJS_core: string;
  EJS_gameUrl: string;
  EJS_pathtodata: string;
}