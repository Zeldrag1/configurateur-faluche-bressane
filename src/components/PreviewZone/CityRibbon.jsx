import React from 'react';

/**
 * CityRibbon — Composant SVG pour les rubans de ville sur le velours.
 *
 * Selon le code officiel de la faluche :
 *   • Ville de baptême (cityIndex === 0) :
 *       Part du frontal (haut) au central le long de l'axe gauche,
 *       puis bifurque à 120° sur la gauche vers le bord officiel.
 *   • Ville de naissance (cityIndex === 1) :
 *       Part du frontal (haut) au central PARALLÈLE au ruban de baptême (côté droit),
 *       puis bifurque à 120° sur la droite vers le bord personnel.
 *   • Ville d'études (cityIndex >= 2) :
 *       Part du centre vers le bord gauche à 90°.
 */
export default function CityRibbon({ colors, cityIndex = 0 }) {
  const color1 = colors?.[0] || '#FFFFFF';
  const color2 = colors?.[1] || color1;

  // Épaisseur de chaque moitié bicolore
  const strokeWidthHalf = 2.6;

  // ── Cas 0 : Ville de baptême (Frontal gauche → 120° à gauche) ───────────
  if (cityIndex === 0) {
    return (
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ pointerEvents: 'none', overflow: 'visible' }}
      >
        {/* Ombre portée subtile */}
        <path
          d="M 46.8,0 L 46.8,48.5 L 6.7,75"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth={strokeWidthHalf * 2 + 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Bande 1 (extérieure gauche) */}
        <path
          d="M 45.5,0 L 45.5,47.4 L 6.0,73.9"
          stroke={color1}
          strokeWidth={strokeWidthHalf}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />

        {/* Bande 2 (intérieure droite) */}
        <path
          d="M 48.1,0 L 48.1,49.6 L 7.4,76.1"
          stroke={color2}
          strokeWidth={strokeWidthHalf}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />
      </svg>
    );
  }

  // ── Cas 1 : Ville de naissance (Frontal droit PARALLÈLE → 120° à droite) ─
  if (cityIndex === 1) {
    return (
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ pointerEvents: 'none', overflow: 'visible' }}
      >
        {/* Ombre portée subtile */}
        <path
          d="M 53.2,0 L 53.2,48.5 L 93.3,75"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth={strokeWidthHalf * 2 + 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Bande 1 (intérieure gauche) */}
        <path
          d="M 51.9,0 L 51.9,49.6 L 92.6,76.1"
          stroke={color1}
          strokeWidth={strokeWidthHalf}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />

        {/* Bande 2 (extérieure droite) */}
        <path
          d="M 54.5,0 L 54.5,47.4 L 94.0,73.9"
          stroke={color2}
          strokeWidth={strokeWidthHalf}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />
      </svg>
    );
  }

  // ── Cas 2+ : Ville d'études (Centre → bord gauche à 90°) ────────────────
  const yOffset = (cityIndex - 2) * 6;
  const centerY1 = 48.7 + yOffset;
  const centerY2 = 51.3 + yOffset;

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ pointerEvents: 'none', overflow: 'visible' }}
    >
      <path
        d={`M 50,${50 + yOffset} L 0,${50 + yOffset}`}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={strokeWidthHalf * 2 + 1.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M 50,${centerY1} L 0,${centerY1}`}
        stroke={color1}
        strokeWidth={strokeWidthHalf}
        strokeLinecap="round"
        fill="none"
        style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
      />
      <path
        d={`M 50,${centerY2} L 0,${centerY2}`}
        stroke={color2}
        strokeWidth={strokeWidthHalf}
        strokeLinecap="round"
        fill="none"
        style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
      />
    </svg>
  );
}
