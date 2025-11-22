import React from 'react';
import type { Card as CardType } from '../game/logic/types';

interface CardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
  showMana?: boolean;
  onClick?: () => void;
}

export const Card = ({ card, size = 'md', showMana = false, onClick }: CardProps) => {
  // Rarity-based styling with neon glows
  const rarityStyles = {
    common: {
      border: 'border-rarity-common',
      shadow: 'shadow-[0_0_10px_rgba(148,163,184,0.3)]',
      glow: 'hover:shadow-[0_0_20px_rgba(148,163,184,0.5)]',
      bg: 'from-slate-900 to-slate-800'
    },
    rare: {
      border: 'border-rarity-rare',
      shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.4)]',
      glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
      bg: 'from-blue-950 to-slate-900'
    },
    epic: {
      border: 'border-rarity-epic',
      shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
      glow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]',
      bg: 'from-purple-950 to-slate-900'
    },
    legendary: {
      border: 'border-rarity-legendary',
      shadow: 'shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-pulse-slow',
      glow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]',
      bg: 'from-orange-950 to-yellow-950'
    },
  };

  const sizeClasses = {
    sm: 'w-24 h-36 text-xs',
    md: 'w-40 h-60 text-sm',
    lg: 'w-64 h-96 text-base',
  };

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  const getIcon = (id: string) => {
    const icons: Record<string, string> = {
      'c_beefy': '🥩',
      'c_workout': '💪',
      'c_coffee': '☕',
      'c_sneakers': '👟',
      'c_tank': '🎽',
      'c_chad': '🗿',
      'c_wizard': '🧙',
      'c_vamp': '🧛',
    };
    return icons[id] || '🃏';
  };

  const style = rarityStyles[card.rarity];

  return (
    <div
      onClick={onClick}
      className={`
            group relative rounded-xl border-4 flex flex-col overflow-hidden 
            transition-all duration-300 cursor-pointer
            ${style.border} ${style.shadow} ${style.glow}
            ${sizeClasses[size]}
            hover:-translate-y-2 hover:scale-105
            bg-gradient-to-b ${style.bg}
        `}
    >
      {/* Level Badge with pulse animation */}
      <div className="absolute top-2 right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 shadow-lg border-2 border-yellow-200 animate-pulse">
        {card.level}
      </div>

      {/* Art Area with gradient overlay */}
      <div className="flex-1 bg-slate-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-white/5 to-transparent"></div>

        {/* Main icon */}
        <span className={`${iconSizes[size]} transform drop-shadow-2xl filter relative z-10 group-hover:scale-110 transition-transform duration-300`}>
          {getIcon(card.id)}
        </span>
      </div>

      {/* Name Band with glassmorphism */}
      <div className="bg-black/70 backdrop-blur-md p-2 text-center border-t border-white/10">
        <div className="font-bold text-white truncate drop-shadow-md">{card.name}</div>
        <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: rarityStyles[card.rarity].border.replace('border-rarity-', '#') }}>
          {card.rarity}
        </div>
      </div>

      {/* Stats Area with icons */}
      <div className="bg-black/50 backdrop-blur-sm p-2 grid grid-cols-3 gap-1 text-center border-t border-white/10">
        {card.stats.maxHP && (
          <div className="flex flex-col items-center">
            <span className="text-xs opacity-70">❤️</span>
            <span className="text-green-400 font-mono font-bold text-xs">{card.stats.maxHP}</span>
          </div>
        )}
        {card.stats.strength && (
          <div className="flex flex-col items-center">
            <span className="text-xs opacity-70">⚔️</span>
            <span className="text-red-400 font-mono font-bold text-xs">{card.stats.strength}</span>
          </div>
        )}
        {card.stats.attackSpeed && (
          <div className="flex flex-col items-center">
            <span className="text-xs opacity-70">⚡</span>
            <span className="text-yellow-400 font-mono font-bold text-xs">{card.stats.attackSpeed.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Mana Bar (if active) */}
      {showMana && (
        <div className="h-2 bg-slate-950 w-full border-t border-white/10">
          <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-0 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300"></div>
        </div>
      )}

      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
    </div>
  );
};
