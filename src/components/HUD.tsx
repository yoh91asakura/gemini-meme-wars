import React from 'react';
import { useGameStore } from '../stores/useGameStore';

const ProgressBar = ({ current, max, color, label, align = 'left' }: {
  current: number;
  max: number;
  color: string;
  label: string;
  align?: 'left' | 'right'
}) => {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));
  const isDangerous = percent < 30;

  return (
    <div className={`flex flex-col gap-2 w-80 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      {/* Label */}
      <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
        <span className="text-3xl drop-shadow-lg">{label}</span>
        <span className="text-lg font-bold text-white font-mono drop-shadow-md">
          {Math.ceil(current)}<span className="text-white/50 text-sm">/{max}</span>
        </span>
      </div>

      {/* Bar container */}
      <div className="w-full h-6 bg-black/80 rounded-full overflow-hidden border-2 border-white/20 relative backdrop-blur-sm shadow-lg">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        {/* Health fill */}
        <div
          className={`
                    h-full transition-all duration-300 ease-out relative
                    ${color}
                    ${isDangerous ? 'animate-pulse' : ''}
                `}
          style={{
            width: `${percent}%`,
            float: align === 'right' ? 'right' : 'left'
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow"></div>
        </div>

        {/* Segment marks */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-white/10 last:border-r-0"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HUD = () => {
  const { playerHP, playerMaxHP, enemyHP, enemyMaxHP } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-20">
      {/* Player Health */}
      <ProgressBar
        current={playerHP}
        max={playerMaxHP}
        color="bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
        label="🧙‍♂️"
        align="left"
      />

      {/* Center VS indicator */}
      <div className="flex flex-col items-center gap-2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg italic">
          VS
        </div>
        {/* Optional: Add timer or round counter here */}
      </div>

      {/* Enemy Health */}
      <ProgressBar
        current={enemyHP}
        max={enemyMaxHP}
        color="bg-gradient-to-l from-red-500 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
        label="🤖"
        align="right"
      />
    </div>
  );
};
