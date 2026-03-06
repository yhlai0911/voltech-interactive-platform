'use client';

import { CHARACTERS, type CharacterId } from './BrandColors';

interface CharacterAvatarProps {
  characterId: CharacterId;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = { sm: 24, md: 32, lg: 48 } as const;

export default function CharacterAvatar({ characterId, size = 'md' }: CharacterAvatarProps) {
  const char = CHARACTERS[characterId];
  const px = SIZE_MAP[size];
  const fontSize = size === 'sm' ? 10 : size === 'md' ? 13 : 18;

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold text-white select-none"
      style={{
        width: px,
        height: px,
        fontSize,
        backgroundColor: char.color,
      }}
    >
      {char.name.charAt(0)}
    </div>
  );
}
