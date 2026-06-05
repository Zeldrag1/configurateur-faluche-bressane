import React from 'react';

/**
 * CityRibbon — Composant SVG pour les rubans de ville en "V" sur le velours.
 *
 * Génère un SVG prenant 100% de la largeur/hauteur du parent (le Velours).
 * La pointe du V est ancrée au centre (50%, 50%).
 * Les branches s'écartent vers les bords (0%, 15%) et (0%, 85%).
 * Il est bicolore avec deux tracés parallèles.
 */
export default function CityRibbon({ colors }) {
  const color1 = colors?.[0] || '#FFFFFF';
  const color2 = colors?.[1] || color1;

  // Épaisseur de chaque bande de couleur
  const strokeWidth = 3;

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ pointerEvents: 'none', overflow: 'visible' }}
    >
      {/* Branche supérieure (Leg 1) */}
      <path
        d="M -1.22,-19.13 L 48.78,50.87"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
      />
      <path
        d="M 1.22,-20.87 L 51.22,49.13"
        stroke={color2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
      />

      {/* Branche inférieure (Leg 2) */}
      <path
        d="M 48.78,49.13 L -1.22,119.13"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
      />
      <path
        d="M 51.22,50.87 L 1.22,120.87"
        stroke={color2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
      />
    </svg>
  );
}
