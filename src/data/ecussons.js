/**
 * ecussons.js — Écussons de ville et blasons héraldiques vectoriels (SVG)
 */

export const ECUSSONS_VILLE = [
  {
    id: 'ev_bourg', label: 'Bourg-en-Bresse', defaultWidth: 60, defaultHeight: 72,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M8,8 H92 V82 Q50,118 8,82 Z" fill="#006400" stroke="#004000" stroke-width="3"/>
      <text x="50" y="55" text-anchor="middle" font-size="26" font-weight="bold" font-family="Georgia,serif" fill="#FFD700">BB</text>
      <path d="M20,68 H80" stroke="#FFD700" stroke-width="1.5" opacity="0.7"/>
      <text x="50" y="80" text-anchor="middle" font-size="9" font-family="Georgia,serif" fill="#FFD700">BRESSE</text>
    </svg>`
  },
  {
    id: 'ev_lyon', label: 'Lyon', defaultWidth: 60, defaultHeight: 72,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M8,8 H92 V82 Q50,118 8,82 Z" fill="#1a1a1a" stroke="#DC143C" stroke-width="3"/>
      <path d="M8,8 H92 V45 H8 Z" fill="#DC143C" opacity="0.8"/>
      <text x="50" y="72" text-anchor="middle" font-size="22" font-weight="bold" font-family="Georgia,serif" fill="#FFFFFF">LY</text>
    </svg>`
  }
];
