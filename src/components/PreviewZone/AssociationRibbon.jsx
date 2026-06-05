import React from 'react';

/**
 * AssociationRibbon — Composant SVG pour les rubans d'association sur le velours.
 * 
 * Génère un SVG prenant 100% de la largeur/hauteur du parent (le Velours).
 * Supporte les motifs classiques bicolores, rayés (ex: BIGG BDE) et tressés (ex: FOURB).
 */
export default function AssociationRibbon({ status, colors, index = 0, pattern = null }) {
  const color1 = colors?.[0] || '#FFFFFF';
  const color2 = colors?.[1] || color1;
  const color3 = colors?.[2] || color2 || color1;

  const strokeWidthHalf = 2.5;
  const braidPatternId = `braid-${index}-${colors.join('-').replace(/#/g, '')}`;

  // Rendu des defs pour la tresse
  const renderBraidDefs = () => (
    <defs>
      <pattern id={braidPatternId} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="4" height="12" fill={color1} />
        <rect x="4" width="4" height="12" fill={color2} />
        <rect x="8" width="4" height="12" fill={color3} />
      </pattern>
    </defs>
  );

  const isBraid = pattern === 'braided';
  const isStriped = pattern === 'striped';

  // Si c'est un ruban tressé
  if (isBraid) {
    let d = "M 50,0 L 50,100"; // president
    if (status === 'actif') {
      d = "M 50,50 L 50,100";
    } else if (status === 'bureau') {
      const w = 15 + 15 * index;
      const leftX = 50 - w;
      const rightX = 50 + w;
      d = `M ${leftX},100 L 50,50 L ${rightX},100`;
    }

    return (
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ pointerEvents: 'none', overflow: 'visible' }}
      >
        {renderBraidDefs()}
        <path
          d={d}
          stroke={`url(#${braidPatternId})`}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />
      </svg>
    );
  }

  // Si c'est un ruban rayé (ex: large rouge, fin blanc au milieu)
  if (isStriped) {
    let d = "M 50,0 L 50,100"; // president
    if (status === 'actif') {
      d = "M 50,50 L 50,100";
    } else if (status === 'bureau') {
      const w = 15 + 15 * index;
      const leftX = 50 - w;
      const rightX = 50 + w;
      d = `M ${leftX},100 L 50,50 L ${rightX},100`;
    }

    return (
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ pointerEvents: 'none', overflow: 'visible' }}
      >
        {/* Base de couleur large (rouge) */}
        <path
          d={d}
          stroke={color1}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />
        {/* Ligne fine dessus au centre (blanc) */}
        <path
          d={d}
          stroke={color2}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
        />
      </svg>
    );
  }

  // Comportement par défaut (bicolore côte à côte)
  switch (status) {
    case 'president':
      return (
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
        >
          <path
            d="M 48.75,0 L 48.75,100"
            stroke={color1}
            strokeWidth={strokeWidthHalf}
            strokeLinecap="square"
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
          <path
            d="M 51.25,0 L 51.25,100"
            stroke={color2}
            strokeWidth={strokeWidthHalf}
            strokeLinecap="square"
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
        </svg>
      );

    case 'actif':
      return (
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
        >
          <path
            d="M 48.75,50 L 48.75,100"
            stroke={color1}
            strokeWidth={strokeWidthHalf}
            strokeLinecap="square"
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
          <path
            d="M 51.25,50 L 51.25,100"
            stroke={color2}
            strokeWidth={strokeWidthHalf}
            strokeLinecap="square"
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
        </svg>
      );

    case 'bureau': {
      const w = 15 + 15 * index;
      const leftX = 50 - w;
      const rightX = 50 + w;

      return (
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
        >
          <path
            d={`M ${leftX - 1.25},100 L 48.75,50 L ${rightX - 1.25},100`}
            stroke={color1}
            strokeWidth={strokeWidthHalf}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
          <path
            d={`M ${leftX + 1.25},100 L 51.25,50 L ${rightX + 1.25},100`}
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

    default:
      return (
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
        >
          <path
            d="M 48.75,0 L 48.75,100"
            stroke={color1}
            strokeWidth={strokeWidthHalf}
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
          <path
            d="M 51.25,0 L 51.25,100"
            stroke={color2}
            strokeWidth={strokeWidthHalf}
            fill="none"
            style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
          />
        </svg>
      );
  }
}
