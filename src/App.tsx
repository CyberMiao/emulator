import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import RomUploader from './components/RomUploader';
import EmulatorFrame from './components/EmulatorFrame';
import type { RomFile, ScreenState } from './types';

function App() {
  const [screen, setScreen] = useState<ScreenState>('UPLOAD');
  const [currentRom, setCurrentRom] = useState<RomFile | null>(null);

  const handleRomLoaded = useCallback((rom: RomFile) => {
    setCurrentRom(rom);
    setScreen('PLAYING');
  }, []);

  const handleBackToMenu = useCallback(() => {
    // We intentionally do not revoke the object URL immediately to avoid race conditions if re-opening quickly,
    // but in a real large app you might want to cleanup URLs.
    // setCurrentRom(null) will unmount the iframe, effectively stopping the emulator.
    setScreen('UPLOAD');
    setCurrentRom(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header currentRom={currentRom} onBack={handleBackToMenu} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {screen === 'UPLOAD' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
             <div className="text-center mb-8 space-y-2">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 pb-2">
                    Browser Emulation
                </h1>
                <p className="text-slate-400 text-lg">
                    No install required. Secure. Local execution.
                </p>
             </div>
            <RomUploader onRomLoaded={handleRomLoaded} />
            
            <footer className="mt-12 text-slate-600 text-sm max-w-lg text-center">
                <p>
                    All emulation runs locally in your browser via WebAssembly. 
                    No ROM files are uploaded to any server.
                </p>
            </footer>
          </div>
        )}

        {screen === 'PLAYING' && currentRom && (
          <div className="flex-1 w-full h-full p-0 sm:p-4 bg-black flex flex-col items-center justify-center animate-in slide-in-from-bottom duration-500">
             <div className="w-full h-full max-w-7xl max-h-[90vh] aspect-video relative">
                <EmulatorFrame rom={currentRom} />
             </div>
             <div className="mt-2 text-slate-500 text-xs hidden sm:block">
                Controls depend on the system. Check the "Gamepad" icon in the emulator menu for mapping.
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;