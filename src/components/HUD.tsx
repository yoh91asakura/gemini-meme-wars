import { useGameStore } from '../stores/useGameStore';

// Simple progress bar component used for both player and enemy health
const ProgressBar = ({ current, max, color, label, align = 'left' }: {
  current: number;
  max: number;
  color: string;
  label: string;
  align?: 'left' | 'right';
}) => {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));
  const isDangerous = percent < 30;

  return (
    <div className={`flex flex-col gap-2 w-full max-w-xs ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
        <span className="text-3xl drop-shadow-lg">{label}</span>
        <span className="text-lg font-bold text-white font-mono drop-shadow-md">
          {Math.ceil(current)}<span className="text-white/50 text-sm">/{max}</span>
        </span>
      </div>
      <div className="w-full h-6 bg-black/80 rounded-full overflow-hidden border-2 border-white/20 relative backdrop-blur-sm shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div
          className={`h-full transition-all duration-300 ease-out relative ${color} ${isDangerous ? 'animate-pulse' : ''}`}
          style={{ width: `${percent}%`, float: align === 'right' ? 'right' : 'left' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow"></div>
        </div>
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
  const { playerHP, playerMaxHP, enemyHP, enemyMaxHP, setGameState, setWinner, addGold } = useGameStore();

  const handleSkipBattle = () => {
    const playerWins = Math.random() > 0.5;
    setWinner(playerWins ? 'player' : 'enemy');
    addGold(playerWins ? 50 : 10);
    setGameState('gameover');
  };

  return (
    <div className="absolute top-0 left-0 w-full p-2 md:p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 md:gap-4 pointer-events-none z-20">
      <ProgressBar
        current={playerHP}
        max={playerMaxHP}
        color="bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
        label="🧙‍♂️"
        align="left"
      />
      <div className="flex flex-col items-center gap-1 md:gap-2 bg-black/60 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-xl border border-white/10 pointer-events-auto">
        <div className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg italic">VS</div>
        <div className="flex gap-2">
          <button
            onClick={handleSkipBattle}
            className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-b from-yellow-500 to-orange-600 text-black font-bold text-xs md:text-sm rounded-lg hover:from-yellow-400 hover:to-orange-500 transition-all hover:scale-105 shadow-lg active:scale-95 touch-manipulation"
          >
            ⏭️ SKIP
          </button>
          <button
            onClick={() => setGameState('shop')}
            className="px-2 py-1 md:px-3 md:py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs md:text-sm rounded-lg transition-all hover:scale-105 shadow-lg active:scale-95 touch-manipulation border border-slate-500"
          >
            🚪 EXIT
          </button>
        </div>
      </div>
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
