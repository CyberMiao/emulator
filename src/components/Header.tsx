import React from 'react';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import type { RomFile } from '../types';

interface HeaderProps {
  currentRom: RomFile | null;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRom, onBack }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentRom ? (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline text-sm font-medium">Exit Game</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-indigo-400">
              <Gamepad2 size={28} />
              <span className="text-xl font-bold tracking-tight text-white">RetroWeb</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
           {currentRom && (
               <div className="hidden sm:flex flex-col items-end">
                   <span className="text-sm font-semibold text-white truncate max-w-[200px]">{currentRom.name}</span>
                   <span className="text-xs text-indigo-400 uppercase tracking-wider">{currentRom.system}</span>
               </div>
           )}
           <a 
            href="https://github.com/emulatorjs/emulatorjs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
           >
            Powered by EmulatorJS
           </a>
        </div>
      </div>
    </header>
  );
};

export default Header;