import React, { useMemo } from 'react';
import type { RomFile } from '../types';
import { CDN_BASE_URL } from '../constants';

interface EmulatorFrameProps {
  rom: RomFile;
}

const EmulatorFrame: React.FC<EmulatorFrameProps> = ({ rom }) => {
  
  // We use srcDoc to inject the full HTML required for EmulatorJS.
  // This ensures a clean environment for the global EJS variables every time.
  const srcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body, html { 
              margin: 0; 
              padding: 0; 
              height: 100%; 
              width: 100%;
              overflow: hidden; 
              background-color: #000; 
            }
            #game { 
              width: 100% !important; 
              height: 100% !important; 
            }
          </style>
        </head>
        <body>
          <div id="game"></div>
          <script>
            // Configure EmulatorJS
            window.EJS_player = '#game';
            window.EJS_core = '${rom.system}';
            window.EJS_gameUrl = '${rom.url}';
            window.EJS_pathtodata = '${CDN_BASE_URL}';
            window.EJS_startOnLoaded = true;
            window.EJS_biosUrl = ''; // If needed, could be passed similarly
            
            // UI Customization to match our theme slightly better
            window.EJS_backgroundColor = '#000000';
            window.EJS_buttons = {
                playPause: true,
                restart: true,
                mute: true,
                settings: true,
                fullscreen: true,
                saveState: true,
                loadState: true,
                screenRecord: false,
                gamepad: true,
                cheat: true,
                volume: true
            };
          </script>
          <script src="${CDN_BASE_URL}loader.js"></script>
        </body>
      </html>
    `;
  }, [rom]);

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl border border-slate-700">
      <iframe
        title="Emulator"
        srcDoc={srcDoc}
        className="w-full h-full border-0 block"
        allow="autoplay; fullscreen; gamepad; microphone"
      />
    </div>
  );
};

export default EmulatorFrame;