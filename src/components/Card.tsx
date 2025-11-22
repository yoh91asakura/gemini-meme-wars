import { useState } from 'react';
import type { Card as CardType } from '../game/logic/types';

interface CardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
  showMana?: boolean;
  manaProgress?: number; // 0-1 for mana bar
  state?: 'idle' | 'hover' | 'active' | 'disabled' | 'ulti-ready';
  onClick?: () => void;
  onLongPress?: () => void;
}

export const Card = ({ 
  card, 
  size = 'md', 
  showMana = false, 
  manaProgress = 0,
  state = 'idle',
  onClick,
  onLongPress: _onLongPress 
}: CardProps) => {
  const [_isPressed, _setIsPressed] = useState(false);

  // UI Spec Section 3.4 - Rarity & FX
  const rarityStyles = {
    common: {
      frame: 'card-frame-common border-4',
      shadow: 'shadow-glow-common',
      bg: 'from-surface-base to-canvas',
      fx: '',
    },
    rare: {
      frame: 'card-frame-rare border-4',
      shadow: 'shadow-glow-rare',
      bg: 'from-blue-950/50 to-surface-base',
      fx: 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-blue-400/10 before:to-transparent before:animate-shimmer',
    },
    epic: {
      frame: 'card-frame-epic border-4',
      shadow: 'shadow-glow-epic',
      bg: 'from-purple-950/50 to-surface-base',
      fx: 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-400/20 before:to-transparent before:animate-shimmer',
    },
    legendary: {
      frame: 'card-frame-legendary border-4',
      shadow: 'shadow-glow-legendary animate-pulse-slow',
      bg: 'from-orange-950/50 via-yellow-950/30 to-surface-base',
      fx: 'before:absolute before:inset-0 before:bg-gradient-legendary before:opacity-20 before:animate-shimmer',
    },
  };

  // UI Spec Section 3.1 - Size classes with 2:3 aspect ratio
  const sizeClasses = {
    sm: 'w-24 h-36', // 96x144px
    md: 'w-40 h-60', // 160x240px  
    lg: 'w-64 h-96', // 256x384px
  };

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl', 
    lg: 'text-8xl',
  };

  // UI Spec Section 3.3 - Visual states
  const getStateClasses = () => {
    switch (state) {
      case 'hover':
        return 'scale-105 shadow-lg brightness-110';
      case 'active':
        return 'scale-110 opacity-80';
      case 'disabled':
        return 'saturate-50 opacity-60 cursor-not-allowed';
      case 'ulti-ready':
        return 'animate-pulse-slow ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]';
      default:
        return 'scale-100 opacity-100';
    }
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

  // Touch event handlers for mobile long press
  const handleTouchStart = () => {
    _setIsPressed(true);
  };

  const handleTouchEnd = () => {
    _setIsPressed(false);
  };

  // Keyboard event handlers for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      className={`
        group relative rounded-lg flex flex-col overflow-hidden 
        cursor-pointer transform-gpu transition-all duration-150 ease-out
        ${style.frame} ${style.shadow}
        ${sizeClasses[size]}
        ${getStateClasses()}
        ${style.fx}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
        hover:transform hover:-translate-y-1
      `}
      role="button"
      tabIndex={onClick ? 0 : -1}
      aria-label={`${card.name} - Level ${card.level} ${card.rarity} card. HP: ${card.stats.maxHP}, Attack: ${card.stats.strength}, Speed: ${card.stats.attackSpeed}`}
      style={{
        aspectRatio: '2/3',
        minHeight: '44px', // WCAG touch target minimum
        minWidth: '44px'
      }}
    >
      {/* UI Spec Section 3.1: Z-indexed layers */}
      
      {/* 1. Frame/Border - handled by container classes */}
      
      {/* 2. Artwork Layer - Full Art with 2:3 composition */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background gradient matching rarity */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bg}`}></div>
        
        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-white/10 via-transparent to-black/20"></div>
        
        {/* 3. Main subject positioned for visual appeal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Background halo for Epic/Legendary (UI Spec 3.4) */}
            {(card.rarity === 'epic' || card.rarity === 'legendary') && (
              <div className={`absolute inset-0 rounded-full blur-3xl ${
                card.rarity === 'legendary' 
                  ? 'bg-orange-400/40 animate-pulse-slow' 
                  : 'bg-purple-400/30'
              }`}></div>
            )}
            
            {/* Main emoji character with prominent sizing */}
            <span className={`
              ${iconSizes[size]} 
              transform drop-shadow-2xl relative z-10 
              transition-transform duration-fast
              ${state === 'hover' ? 'scale-110' : ''}
              ${card.rarity === 'legendary' ? 'animate-pulse-slow' : ''}
            `}>
              {getIcon(card.id)}
            </span>
          </div>
        </div>
        
        {/* 4. Gradient Overlay for text contrast (UI Spec 3.1.3) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
      </div>

      {/* 5. Rarity Badge (UI Spec Section 3.2) */}
      <div className={`absolute top-2 right-2 z-20 px-2 py-1 rounded-md text-tiny font-bold uppercase tracking-wide ${
        card.rarity === 'common' ? 'bg-gray-600 text-gray-200' :
        card.rarity === 'rare' ? 'bg-blue-600 text-blue-100' :
        card.rarity === 'epic' ? 'bg-purple-600 text-purple-100' :
        'bg-gradient-legendary text-white'
      }`}>
        {card.rarity}
      </div>

      {/* Level indicator */}
      <div className="absolute top-2 left-2 z-20 bg-black/70 text-white text-xs font-bold rounded px-2 py-1 backdrop-blur-sm border border-white/10">
        Lv.{card.level}
      </div>

      {/* 6. Content Layer - Name Band (UI Spec Section 3.2) */}
      <div className="relative z-30 bg-black/70 backdrop-blur-md text-center border-t border-white/10">
        <div className="px-2 py-1">
          <div className="text-lg font-bold text-white truncate drop-shadow-md">
            {card.name}
          </div>
        </div>
      </div>

      {/* 7. Stats Display (UI Spec Section 3.2) */}
      <div className="relative z-30 bg-black/60 backdrop-blur-sm px-2 py-1 grid grid-cols-3 gap-1 text-center border-t border-white/10">
        <div className="flex flex-col items-center">
          <span className="text-xs opacity-70">❤️</span>
          <span className="text-green-500 font-mono font-bold text-sm">
            {card.stats.maxHP}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs opacity-70">⚔️</span>
          <span className="text-red-500 font-mono font-bold text-sm">
            {card.stats.strength}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs opacity-70">⚡</span>
          <span className="text-yellow-500 font-mono font-bold text-sm">
            {card.stats.attackSpeed?.toFixed(1)}
          </span>
        </div>
      </div>

      {/* 8. Mana/Ultimate Bar (UI Spec Section 3.2) */}
      {showMana && (
        <div className="relative z-30 h-2 bg-slate-700 w-full border-t border-white/10 overflow-hidden">
          <div 
            className={`h-full transition-all duration-200 ${
              manaProgress >= 1 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-400'
            }`}
            style={{ width: `${Math.min(100, manaProgress * 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Ultimate Ready Indicator (UI Spec Section 3.3) */}
      {state === 'ulti-ready' && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
            READY!
          </div>
        </div>
      )}

      {/* 9. Interaction Layer - Hover Effects */}
      <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-150 ${
        state === 'hover' ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full"></div>
      </div>

      {/* Accessibility - Screen Reader Info */}
      <div className="sr-only">
        Card: {card.name}, Level {card.level}, {card.rarity} rarity.
        Stats: {card.stats.maxHP} HP, {card.stats.strength} Attack, {card.stats.attackSpeed} Speed.
        {showMana && `Mana: ${Math.round(manaProgress * 100)}%`}
      </div>
    </div>
  );
};
