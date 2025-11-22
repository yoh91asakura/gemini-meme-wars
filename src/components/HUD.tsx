import React from 'react';
import { useGameStore } from '../stores/useGameStore';

const ProgressBar = ({ current, max, color, label, align = 'left' }: { current: number; max: number; color: string; label: string; align?: 'left' | 'right' }) => {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));
  
  return (
    <div className={`flex flex-col gap-1 w-72 ${align === 'right' ? 'items-end' : 'items-start'}`}>
        <div className="flex items-end gap-2">
            <span className="text-2xl drop-shadow-md">{label}</span>
            <span className="text-sm font-bold text-white font-mono drop-shadow-md">{Math.ceil(current)}/{max}</span>
        </div>
        <div className="w-full h-4 bg-slate-900/80 rounded-full overflow-hidden border border-slate-600 relative backdrop-blur-sm">
            <div
                className={`h-full ${color} transition-all duration-200 ease-out`}
                style={{ width: `${percent}%`, float: align === 'right' ? 'right' : 'left' }}
            />
        </div>
    </div>
  );
};

export const HUD = () => {
  const { playerHP, playerMaxHP, enemyHP, enemyMaxHP } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-20">
        <ProgressBar 
            current={playerHP} 
            max={playerMaxHP} 
            color="bg-game-success shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
            label="🧙‍♂️ YOU"
            align="left"
        />

        {/* VS / Timer Placeholder */}
        <div className="text-3xl font-black text-white italic opacity-50 drop-shadow-lg">
            VS
        </div>

        <ProgressBar 
            current={enemyHP} 
            max={enemyMaxHP} 
            color="bg-game-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
            label="🤖 ENEMY"
            align="right"
        />
    </div>
  );
};
