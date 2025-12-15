import React, { useCallback, useState } from 'react';
import { Upload, FileWarning, Gamepad2 } from 'lucide-react';
import { detectSystem } from '../utils';
import type { RomFile } from '../types';
import { SUPPORTED_SYSTEMS } from '../constants';

interface RomUploaderProps {
  onRomLoaded: (rom: RomFile) => void;
}

const RomUploader: React.FC<RomUploaderProps> = ({ onRomLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    setError(null);
    const system = detectSystem(file.name);
    
    if (!system) {
      setError(`Unsupported file extension: .${file.name.split('.').pop()}`);
      return;
    }

    const url = URL.createObjectURL(file);
    onRomLoaded({
      name: file.name,
      url,
      system,
      size: file.size
    });
  }, [onRomLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-96 rounded-2xl border-4 border-dashed transition-all duration-300 ease-in-out cursor-pointer overflow-hidden group
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-slate-600 bg-slate-800/50 hover:bg-slate-800 hover:border-indigo-400'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          accept=".nes,.sfc,.smc,.gb,.gbc,.gba,.n64,.z64,.md,.gen,.bin,.iso,.zip"
        />

        <div className="z-10 flex flex-col items-center space-y-4 text-center p-4">
            <div className={`p-4 rounded-full bg-indigo-500/20 text-indigo-400 transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
                <Gamepad2 size={64} />
            </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              {isDragging ? 'Drop it like it\'s hot!' : 'Drop ROM file here'}
            </h3>
            <p className="text-slate-400 max-w-sm">
              Supports NES, SNES, GB, GBA, N64, Genesis, PSX, and more.
            </p>
          </div>
          
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">
            Browse Files
          </button>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <FileWarning size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {SUPPORTED_SYSTEMS.map(sys => (
           <div key={sys.system} className="text-xs px-3 py-2 rounded bg-slate-800 text-slate-400 border border-slate-700 text-center truncate">
              {sys.name}
           </div> 
        ))}
      </div>
    </div>
  );
};

export default RomUploader;