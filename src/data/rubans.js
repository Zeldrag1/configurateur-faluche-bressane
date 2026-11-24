/**
 * rubans.js — Rubans associatifs, rubans de ville et statuts
 */

// ─────────────────────────────────────────────────────────────────────────────
// STATUTS D'ASSOCIATION
// ─────────────────────────────────────────────────────────────────────────────
export const STATUTS_ASSO = [
  { id: 'actif',     label: 'Membre Actif',     borderColor: null,      icon: null },
  { id: 'bureau',    label: 'Membre du Bureau', borderColor: '#FFD700', icon: '★' },
  { id: 'president', label: 'Président',        borderColor: '#DC143C', icon: '♛' },
];

// ─────────────────────────────────────────────────────────────────────────────
// RUBANS D'ASSOCIATION
// ─────────────────────────────────────────────────────────────────────────────
export const RUBANS_ASSO = [
  // --- Spécifiques de l'énoncé ---
  { id: 'r_bigg', label: 'IUT Bourg BIGG BDE — Blanc / Rouge (Strayé)', colors: ['#DC143C', '#FFFFFF'], pattern: 'striped' },
  { id: 'r_fourb', label: 'FOURB — Vert / Noir / Bleu (Tressé)', colors: ['#006400', '#000000', '#0000FF'], pattern: 'braided' },
  { id: 'r_journalisme', label: 'Journalisme — Satin Blanc', colors: ['#FFFFFF', '#FFFFFF'] },
  { id: 'r_humanitaire', label: 'Humanitaire — Velours Blanc', colors: ['#FFFFFF', '#FFFFFF'] },
  { id: 'r_gaelis', label: 'GAELIS — Vert / Blanc', colors: ['#228B22', '#FFFFFF'] },
  
  // --- Représentants / Élus ---
  { id: 'r_elus_nat', label: 'Élu National — Tricolore', colors: ['#002395', '#FFFFFF', '#ED2939'] },
  { id: 'r_elus_euro', label: 'Élu Européen — Bleu et Or', colors: ['#003399', '#FFCC00'] },
  { id: 'r_elus_inter', label: 'Élu International — Bleu pâle / Blanc', colors: ['#5B92E5', '#FFFFFF'] },
  { id: 'r_elus_univ', label: 'Élu Universitaire — Jaune', colors: ['#FFD700', '#FFD700'] },

  // --- Classiques ---
  { id: 'r_bde_rouge_blanc',  label: 'BDE — Rouge / Blanc',              colors: ['#DC143C', '#FFFFFF'] },
  { id: 'r_bde_bleu_or',      label: 'BDE — Bleu / Or',                  colors: ['#003DA5', '#FFD700'] },
  { id: 'r_bds',              label: 'BDS (Sport) — Vert / Blanc',       colors: ['#228B22', '#FFFFFF'] },
  { id: 'r_bda',              label: 'BDA (Arts) — Violet / Argent',     colors: ['#6A0DAD', '#C0C0C0'] }
];

// ─────────────────────────────────────────────────────────────────────────────
// RUBANS DE VILLE
// ─────────────────────────────────────────────────────────────────────────────
export const RUBANS_VILLE = [
  // --- Bourg-en-Bresse et Bresse ---
  { id: 'rv_bourg',       label: 'Bourg-en-Bresse (Vert/Noir)', colors: ['#006400', '#000000'] },
  
  { id: 'rv_lyon',        label: 'Lyon (Rouge/Noir)',          colors: ['#DC143C', '#000000'] },
  { id: 'rv_paris',       label: 'Paris (Bleu/Rouge)',         colors: ['#003DA5', '#DC143C'] },
  { id: 'rv_grenoble',    label: 'Grenoble (Bleu/Or)',         colors: ['#003DA5', '#FFD700'] },
  { id: 'rv_strasbourg',  label: 'Strasbourg (Rouge/Blanc)',   colors: ['#DC143C', '#FFFFFF'] }
];
