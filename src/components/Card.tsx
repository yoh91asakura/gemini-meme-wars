import React from 'react';
import type { Card as CardType } from '../game/logic/types';

interface CardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
  showMana?: boolean;
  onClick?: () => void;
}

export const Card = ({ card, size = 'md', showMana = false, onClick }: CardProps) => {
  const rarityColors = {
    common: 'border-slate-400 shadow-slate-900/20',
    rare: 'border-blue-500 shadow-blue-500/20',
    epic: 'border-purple-500 shadow-purple-500/30',
    legendary: 'border-orange-500 shadow-orange-500/40',
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
    switch(id) {
        case 'c_beefy': return '🥩';
        case 'c_workout': return '💪';
        case 'c_coffee': return '☕';
        case 'c_sneakers': return '👟';
        case 'c_tank': return '🎽';
        case 'c_chad': return '🗿';
        case 'c_wizard': return '🧙';
        case 'c_vamp': return '🧛';
        default: return '🃏';
    }
  };

  return (
    <div 
        onClick={onClick}
        className={`
            relative bg-slate-800 rounded-xl border-4 flex flex-col overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer
            ${rarityColors[card.rarity]} ${sizeClasses[size]}
        `}
    >
        {/* Level Badge */}
        <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center z-10 shadow-md">
            {card.level}
        </div>

        {/* Art Area */}
        <div className="flex-1 bg-slate-900 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
            <span className={`${iconSizes[size]} transform drop-shadow-lg filter`}>{getIcon(card.id)}</span>
        </div>

        {/* Name Band */}
        <div className="bg-black/60 backdrop-blur-sm p-2 text-center">
            <div className="font-bold text-white truncate">{card.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">{card.rarity}</div>
        </div>

        {/* Stats Area */}
        <div className="bg-slate-800 p-2 grid grid-cols-3 gap-1 text-center border-t border-slate-700">
            {card.stats.maxHP && <div className="text-green-400 font-mono">❤️{card.stats.maxHP}</div>}
            {card.stats.strength && <div className="text-red-400 font-mono">⚔️{card.stats.strength}</div>}
            {card.stats.attackSpeed && <div className="text-yellow-400 font-mono">⚡{card.stats.attackSpeed}</div>}
        </div>

        {/* Mana Bar (if active) */}
        {showMana && (
            <div className="h-2 bg-slate-700 w-full">
                <div className="h-full bg-blue-500 w-0"></div>
            </div>
        )}
    </div>
  );
};

