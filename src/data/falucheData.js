/**
 * falucheData.js — Source de vérité du Configurateur de Faluche Bressane
 *
 * Contient toutes les filières (Velours & Satins), le cursus (bacs, étoiles, palmes),
 * les rubans associatifs/officiels et les insignes régionaux et libres.
 */

// ─────────────────────────────────────────────────────────────────────────────
// FILIÈRES (Couleurs du Circulaire et Emblèmes)
// ─────────────────────────────────────────────────────────────────────────────
export const FILIERES = [
  // --- Les Velours ---
  { id: 'dentaire', label: 'Chirurgie Dentaire (Velours)', color: '#800080', texture: 'velours', embleme: 'Molaire' },
  { id: 'courte_sante', label: 'Étude courte de santé (Velours)', color: '#FFFFFF', texture: 'velours', embleme: 'Initiales / Rattachement' },
  { id: 'medecine', label: 'Médecine (Velours)', color: '#8B0000', texture: 'velours', embleme: 'Caducée médecine' },
  { id: 'osteopathie', label: 'Ostéopathie (Velours)', color: '#4169E1', texture: 'velours', embleme: 'Sphénoïde' },
  { id: 'paramedical', label: 'Paramédical (Velours)', color: '#FF69B4', texture: 'velours', embleme: 'Ciseaux + Lettres / Caducée' },
  { id: 'pharmacie', label: 'Pharmacie (Velours)', color: '#006400', texture: 'velours', embleme: 'Caducée sur coupe' },
  { id: 'prepa_sante', label: 'Prépa santé PASS/LASS (Velours)', color: '#5C2E00', texture: 'velours', embleme: 'Tête de mort sur fémurs' },
  { id: 'sage_femme', label: 'Sage-femme (Velours)', color: '#FF1493', texture: 'velours', embleme: 'Ânkh' },
  { id: 'veterinaire', label: 'Vétérinaire (Velours)', color: '#800020', texture: 'velours', embleme: 'Tête de cheval' },

  // --- Les Satins ---
  { id: 'aes', label: 'AES (Satin)', color: '#90EE90', texture: 'satin', embleme: 'Lettres AES' },
  { id: 'arts', label: 'Arts (Beaux-Arts, Archi, Cinéma...) (Satin)', color: '#0000FF', texture: 'satin', embleme: 'Équerre/Compas/Clap/Lyre' },
  { id: 'bts', label: 'BTS (Satin)', color: '#FFFFFF', texture: 'satin', embleme: 'Lettres BTS' },
  { id: 'prepas', label: 'Classes préparatoires (Satin)', color: '#8B4513', texture: 'satin', embleme: 'Épi de Blé / Tête de Cheval / Chouette' },
  { id: 'droit', label: 'Droit (Satin)', color: '#DC143C', texture: 'satin', embleme: 'Glaive et Balance' },
  { id: 'commerce', label: 'Écoles de Commerce (Satin)', color: 'linear-gradient(to bottom, #DC143C 50%, #228B22 50%)', texture: 'satin', embleme: 'Caducée Mercure' },
  { id: 'ingenieurs', label: 'Écoles d\'ingénieurs (Satin)', color: 'linear-gradient(to bottom, #4169E1 50%, #000000 50%)', texture: 'satin', embleme: 'Étoile et Foudre' },
  { id: 'iut', label: 'IUT (Satin)', color: '#E8E0CC', texture: 'satin', embleme: 'Marteau et Maillet + IUT' },
  { id: 'lettres', label: 'Lettres & Sciences humaines (Satin)', color: '#FFD700', texture: 'satin', embleme: 'Squelette/Globe/Casque/Nounours' },
  { id: 'sciences', label: 'Sciences (Satin)', color: '#8B008B', texture: 'satin', embleme: 'Palmes croisées' },
  { id: 'eco_gestion', label: 'Sciences économiques & Gestion (IAE) (Satin)', color: '#FF8C00', texture: 'satin', embleme: 'Caducée Mercure / IAE' },
  { id: 'sciences_po', label: 'Sciences Politiques (Satin)', color: 'linear-gradient(to bottom, #003DA5 50%, #DC143C 50%)', texture: 'satin', embleme: 'Parapluie' },
  { id: 'staps', label: 'STAPS (Satin)', color: '#004d00', texture: 'satin', embleme: 'Coq' }
];

// ─────────────────────────────────────────────────────────────────────────────
// STATUTS D'ASSOCIATION
// ─────────────────────────────────────────────────────────────────────────────
export const STATUTS_ASSO = [
  { id: 'actif',     label: 'Membre Actif',     borderColor: null,      icon: null },
  { id: 'bureau',    label: 'Membre du Bureau', borderColor: '#FFD700', icon: '★' },
  { id: 'president', label: 'Président',        borderColor: '#DC143C', icon: '♛' },
];

// ─────────────────────────────────────────────────────────────────────────────
// INSIGNES — SVG inline par catégorie
// ─────────────────────────────────────────────────────────────────────────────
export const INSIGNES = [
  // ── Emblèmes de discipline ──
  {
    id: 'molaire',
    label: 'Molaire (Dentaire)',
    category: 'emblemes',
    defaultWidth: 45,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,15 C25,5 45,5 50,20 C55,5 75,5 80,15 C85,25 85,55 80,75 C75,95 65,105 55,105 C50,105 52,90 50,90 C48,90 50,105 45,105 C35,105 25,95 20,75 C15,55 15,25 20,15 Z" fill="#F5F5F5" stroke="#ccc" stroke-width="2"/>
      <ellipse cx="35" cy="30" rx="8" ry="4" fill="#e0e0e0"/>
      <ellipse cx="65" cy="30" rx="8" ry="4" fill="#e0e0e0"/>
    </svg>`
  },
  {
    id: 'caducee_medecine',
    label: 'Caducée Médecine',
    category: 'emblemes',
    defaultWidth: 50,
    defaultHeight: 65,
    svg: `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="5" x2="50" y2="125" stroke="#C0C0C0" stroke-width="5" stroke-linecap="round"/>
      <path d="M50,18 C35,10 15,14 12,22 C10,28 20,30 30,26" fill="#C0C0C0" stroke="#999" stroke-width="1.5"/>
      <path d="M50,18 C65,10 85,14 88,22 C90,28 80,30 70,26" fill="#C0C0C0" stroke="#999" stroke-width="1.5"/>
      <path d="M38,30 C28,40 30,50 42,55 C52,60 54,70 44,78 C34,86 36,96 46,100 C52,103 52,110 46,115" fill="none" stroke="#228B22" stroke-width="4" stroke-linecap="round"/>
      <path d="M62,30 C72,40 70,50 58,55 C48,60 46,70 56,78 C66,86 64,96 54,100 C48,103 48,110 54,115" fill="none" stroke="#228B22" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="44" cy="118" rx="5" ry="4" fill="#228B22"/>
      <ellipse cx="56" cy="118" rx="5" ry="4" fill="#228B22"/>
    </svg>`
  },
  {
    id: 'sphenoide',
    label: 'Sphénoïde (Ostéopathie)',
    category: 'emblemes',
    defaultWidth: 55,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,45 Q25,20 50,30 Q75,20 90,45 Q75,70 50,60 Q25,70 10,45 Z" fill="#E8DCC4" stroke="#8c7a6b" stroke-width="2"/>
      <circle cx="50" cy="45" r="10" fill="#d6c2a3"/>
      <path d="M30,45 H70 M50,25 V65" stroke="#8c7a6b" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`
  },
  {
    id: 'ciseaux',
    label: 'Ciseaux (Paramédical)',
    category: 'emblemes',
    defaultWidth: 45,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#C0C0C0" stroke-width="4" fill="none">
        <circle cx="30" cy="80" r="12"/>
        <circle cx="50" cy="80" r="12"/>
        <line x1="30" y1="68" x2="45" y2="15"/>
        <line x1="50" y1="68" x2="35" y2="15"/>
      </g>
      <circle cx="40" cy="50" r="4" fill="#FFD700"/>
    </svg>`
  },
  {
    id: 'caducee_pharmacie',
    label: 'Caducée Coupe (Pharmacie)',
    category: 'emblemes',
    defaultWidth: 55,
    defaultHeight: 70,
    svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,120 L70,120 L65,90 L35,90 Z" fill="#228B22" stroke="#004000" stroke-width="2"/>
      <line x1="50" y1="120" x2="50" y2="135" stroke="#228B22" stroke-width="5"/>
      <line x1="32" y1="135" x2="68" y2="135" stroke="#228B22" stroke-width="5" stroke-linecap="round"/>
      <line x1="50" y1="8" x2="50" y2="95" stroke="#C0C0C0" stroke-width="4" stroke-linecap="round"/>
      <path d="M38,25 C28,35 30,45 42,50 C54,55 56,65 46,72 C36,79 38,89 48,93" fill="none" stroke="#228B22" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="48" cy="95" rx="6" ry="5" fill="#228B22"/>
    </svg>`
  },
  {
    id: 'tete_mort_femur',
    label: 'Tête de mort sur Fémurs (PASS)',
    category: 'emblemes',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="15" y1="15" x2="85" y2="85" stroke="#E8E0CC" stroke-width="6" stroke-linecap="round"/>
      <line x1="85" y1="15" x2="15" y2="85" stroke="#E8E0CC" stroke-width="6" stroke-linecap="round"/>
      <circle cx="50" cy="45" r="22" fill="#E8E0CC" stroke="#999" stroke-width="2"/>
      <ellipse cx="42" cy="42" rx="6" ry="8" fill="#111"/>
      <ellipse cx="58" cy="42" rx="6" ry="8" fill="#111"/>
      <path d="M46,55 L50,59 L54,55 Z" fill="#111"/>
      <rect x="40" y="63" width="20" height="8" rx="2" fill="#E8E0CC" stroke="#999" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'ankh',
    label: 'Ânkh (Sage-Femme)',
    category: 'emblemes',
    defaultWidth: 50,
    defaultHeight: 65,
    svg: `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="26" ry="32" fill="none" stroke="#FFD700" stroke-width="7"/>
      <line x1="50" y1="72" x2="50" y2="125" stroke="#FFD700" stroke-width="7" stroke-linecap="round"/>
      <line x1="18" y1="80" x2="82" y2="80" stroke="#FFD700" stroke-width="7" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'tete_cheval',
    label: 'Tête de cheval (Vétérinaire)',
    category: 'emblemes',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,80 C30,70 32,50 28,40 C26,30 35,15 45,15 C55,15 52,25 58,22 C64,20 78,35 78,55 C78,65 68,75 55,75 C45,75 32,85 25,80 Z" fill="#8B5A2B" stroke="#5c3a1a" stroke-width="2"/>
      <path d="M48,15 L52,5 L56,12 Z" fill="#8B5A2B"/>
      <circle cx="62" cy="42" r="5" fill="#111"/>
      <circle cx="63" cy="40" r="1.5" fill="white"/>
    </svg>`
  },
  {
    id: 'equerre_compas',
    label: 'Équerre & Compas (Archi)',
    category: 'emblemes',
    defaultWidth: 55,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,15 20,80 80,80" fill="none" stroke="#C0C0C0" stroke-width="5"/>
      <polygon points="50,15 15,20 85,20" fill="none" stroke="#FFD700" stroke-width="3"/>
      <circle cx="50" cy="15" r="6" fill="#A0A0A0"/>
    </svg>`
  },
  {
    id: 'clap_cinema',
    label: 'Clap Cinéma',
    category: 'emblemes',
    defaultWidth: 55,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="30" width="70" height="50" rx="4" fill="#222" stroke="#444" stroke-width="2"/>
      <rect x="15" y="15" width="70" height="12" fill="#222" transform="rotate(-10,15,15)"/>
      <line x1="20" y1="42" x2="80" y2="42" stroke="white" stroke-width="2"/>
      <line x1="20" y1="58" x2="80" y2="58" stroke="white" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'glaive_balance',
    label: 'Glaive & Balance (Droit)',
    category: 'emblemes',
    defaultWidth: 60,
    defaultHeight: 65,
    svg: `<svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="10" x2="30" y2="120" stroke="#C0C0C0" stroke-width="4" stroke-linecap="round"/>
      <polygon points="30,10 24,38 36,38" fill="#C0C0C0" stroke="#999" stroke-width="1"/>
      <rect x="20" y="38" width="20" height="6" rx="2" fill="#FFD700"/>
      <line x1="60" y1="20" x2="110" y2="20" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
      <line x1="85" y1="10" x2="85" y2="80" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
      <line x1="62" y1="20" x2="62" y2="52" stroke="#FFD700" stroke-width="2"/>
      <line x1="72" y1="20" x2="72" y2="52" stroke="#FFD700" stroke-width="2"/>
      <path d="M56,52 Q67,58 78,52" fill="#FFD700" stroke="#B8860B" stroke-width="1.5"/>
      <line x1="98" y1="20" x2="98" y2="52" stroke="#FFD700" stroke-width="2"/>
      <line x1="108" y1="20" x2="108" y2="52" stroke="#FFD700" stroke-width="2"/>
      <path d="M92,52 Q103,58 114,52" fill="#FFD700" stroke="#B8860B" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'caducee_mercure',
    label: 'Caducée Mercure',
    category: 'emblemes',
    defaultWidth: 50,
    defaultHeight: 65,
    svg: `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="15" x2="50" y2="120" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="10" r="6" fill="#FFD700"/>
      <path d="M30,35 Q50,65 70,35" fill="none" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
      <path d="M32,60 Q50,90 68,60" fill="none" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'etoile_foudre',
    label: 'Étoile & Foudre (Ingénieur)',
    category: 'emblemes',
    defaultWidth: 55,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
      <path d="M45,25 L65,45 L50,50 L60,75 L35,45 L50,40 Z" fill="#FF4500" stroke="#FFD700" stroke-width="1"/>
    </svg>`
  },
  {
    id: 'marteau_maillet',
    label: 'Marteau & Maillet (IUT)',
    category: 'emblemes',
    defaultWidth: 55,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="80" x2="70" y2="30" stroke="#8B4513" stroke-width="5" stroke-linecap="round"/>
      <rect x="62" y="18" width="18" height="24" rx="3" fill="#A0A0A0" stroke="#606060" stroke-width="2" transform="rotate(45,71,30)"/>
      <line x1="80" y1="80" x2="30" y2="30" stroke="#8B4513" stroke-width="5" stroke-linecap="round"/>
      <rect x="18" y="20" width="22" height="15" rx="2" fill="#8B4513" stroke="#5c3a1a" stroke-width="2" transform="rotate(-45,29,27)"/>
    </svg>`
  },
  {
    id: 'parapluie',
    label: 'Parapluie (Sciences Po)',
    category: 'emblemes',
    defaultWidth: 50,
    defaultHeight: 60,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,60 Q50,10 90,60 Z" fill="#4682B4" stroke="#2a4d6c" stroke-width="3"/>
      <line x1="50" y1="40" x2="50" y2="105" stroke="#C0C0C0" stroke-width="4" stroke-linecap="round"/>
      <path d="M50,105 Q55,115 62,110" fill="none" stroke="#C0C0C0" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },

  // ── Cursus et Baccalauréats (Lettres) ──
  {
    id: 'bacc_general',
    label: 'Bac Général (Y + Gamma)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="35" y="65" font-size="42" font-weight="bold" fill="#FFD700" font-family="serif">Y</text>
      <text x="65" y="65" font-size="38" font-weight="bold" fill="#FFD700" font-family="serif">Γ</text>
    </svg>`
  },
  {
    id: 'bacc_droit',
    label: 'Capacité en Droit (C)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="55" font-weight="bold" fill="#FFD700" font-family="serif">C</text>
    </svg>`
  },
  {
    id: 'bacc_inter',
    label: 'Bac International (i)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="55" font-weight="bold" fill="#FFD700" font-family="serif">i</text>
    </svg>`
  },
  {
    id: 'bacc_ancien_es',
    label: 'Bac ES (Beta)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="50" font-weight="bold" fill="#FFD700" font-family="serif">β</text>
    </svg>`
  },
  {
    id: 'bacc_ancien_l',
    label: 'Bac L (Phi)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="65" text-anchor="middle" font-size="45" font-weight="bold" fill="#FFD700" font-family="serif">φ</text>
    </svg>`
  },
  {
    id: 'bacc_ancien_s',
    label: 'Bac S-SI (Epsilon)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="50" font-weight="bold" fill="#FFD700" font-family="serif">ε</text>
    </svg>`
  },

  // ── Années d'études (Cursus) ──
  {
    id: 'etoile_or',
    label: 'Étoile dorée (Année d\'étude)',
    category: 'distinctions',
    defaultWidth: 35,
    defaultHeight: 35,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'etoile_argent',
    label: 'Étoile argentée (Redoublée)',
    category: 'distinctions',
    defaultWidth: 35,
    defaultHeight: 35,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#C0C0C0" stroke="#808080" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'double_palme',
    label: 'Double palme croisée (Diplôme)',
    category: 'distinctions',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,80 C35,60 45,40 50,15 M75,80 C65,60 55,40 50,15" fill="none" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="85" r="5" fill="#FFD700"/>
    </svg>`
  },
  {
    id: 'simple_palme',
    label: 'Simple palme (Fin de cycle)',
    category: 'distinctions',
    defaultWidth: 30,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,90 C35,70 40,40 30,10" fill="none" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'lettre_m',
    label: 'Lettre M (Major)',
    category: 'lettres',
    defaultWidth: 40,
    defaultHeight: 40,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="52" font-weight="bold" fill="#FFD700" font-family="serif">M</text>
    </svg>`
  },
  {
    id: 'lettre_a_sous_etoile',
    label: 'Lettre A (Alternance)',
    category: 'lettres',
    defaultWidth: 40,
    defaultHeight: 40,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="52" font-weight="bold" fill="#FFD700" font-family="serif">A</text>
    </svg>`
  },
  {
    id: 'tete_vache',
    label: 'Tête de vache (Rattrapage)',
    category: 'libres',
    defaultWidth: 45,
    defaultHeight: 40,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,35 C20,20 35,15 50,15 C65,15 80,20 80,35 C80,55 70,75 50,75 C30,75 20,55 20,35 Z" fill="#F5F5DC" stroke="#8c7a6b" stroke-width="2"/>
      <path d="M10,25 Q20,15 25,30 M90,25 Q80,15 75,30" fill="none" stroke="#8c7a6b" stroke-width="4" stroke-linecap="round"/>
      <circle cx="35" cy="40" r="5" fill="#111"/>
      <circle cx="65" cy="40" r="5" fill="#111"/>
      <rect x="40" y="55" width="20" height="10" rx="3" fill="#e0cda9"/>
    </svg>`
  },
  {
    id: 'tete_mort',
    label: 'Tête de mort (Échec/Abandon)',
    category: 'libres',
    defaultWidth: 40,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="45" r="30" fill="#E8E0CC" stroke="#999" stroke-width="2"/>
      <ellipse cx="38" cy="42" rx="7" ry="9" fill="#111"/>
      <ellipse cx="62" cy="42" rx="7" ry="9" fill="#111"/>
      <path d="M46,57 L50,62 L54,57 Z" fill="#111"/>
      <rect x="38" y="70" width="24" height="12" rx="3" fill="#E8E0CC" stroke="#999" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'zero',
    label: 'Chiffre 0 (Césure)',
    category: 'lettres',
    defaultWidth: 40,
    defaultHeight: 40,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="70" text-anchor="middle" font-size="55" font-weight="bold" fill="#FFD700" font-family="serif">0</text>
    </svg>`
  },

  // ── Régions ──
  {
    id: 'poulet_bresse',
    label: 'Bresse (Poulet pattes bleues)',
    category: 'libres',
    defaultWidth: 60,
    defaultHeight: 60,
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="62" cy="72" rx="38" ry="30" fill="#FFFFF0" stroke="#999" stroke-width="2"/>
      <path d="M35,68 C25,58 28,48 38,52 C44,54 52,60 55,68Z" fill="#E8E0B0" stroke="#999" stroke-width="1.5"/>
      <path d="M98,60 C110,45 118,50 115,62 C112,72 100,72 98,68Z" fill="#FFFFF0" stroke="#999" stroke-width="1.5"/>
      <circle cx="28" cy="52" r="20" fill="#FFFFF0" stroke="#999" stroke-width="2"/>
      <path d="M22,34 C20,26 26,22 28,28 C30,22 36,20 36,28 C40,22 44,24 42,30" fill="#DC143C" stroke="#8B0000" stroke-width="1.5"/>
      <path d="M10,50 L20,48 L20,54 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1"/>
      <circle cx="22" cy="46" r="5" fill="#1a1a1a"/>
      <line x1="50" y1="100" x2="44" y2="116" stroke="#4169E1" stroke-width="4" stroke-linecap="round"/>
      <line x1="62" y1="100" x2="68" y2="116" stroke="#4169E1" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'lion_rampant',
    label: 'Lyon (Lion rampant)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,90 L35,70 L25,60 L40,55 L45,35 L60,40 L55,55 L70,60 L60,75 L65,95 Z" fill="#DC143C" stroke="#8B0000" stroke-width="2"/>
      <text x="50" y="30" font-size="24" fill="#FFD700" font-weight="bold">♛</text>
    </svg>`
  },
  {
    id: 'lion_passant',
    label: 'Normandie (Léopard)',
    category: 'libres',
    defaultWidth: 60,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,45 Q50,25 85,45 L75,60 L50,50 L25,60 Z" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
      <circle cx="35" cy="40" r="3" fill="red"/>
      <path d="M75,35 Q85,25 90,45" fill="none" stroke="#FFD700" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'cigogne',
    label: 'Alsace (Cigogne)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 60,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="15" ry="25" fill="#FFFFFF" stroke="#ccc" stroke-width="2"/>
      <circle cx="50" cy="20" r="10" fill="#FFFFFF" stroke="#ccc" stroke-width="2"/>
      <polygon points="50,20 20,25 50,15" fill="#FF4500"/>
      <line x1="45" y1="75" x2="40" y2="110" stroke="#FF4500" stroke-width="3"/>
      <line x1="55" y1="75" x2="60" y2="110" stroke="#FF4500" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'taste_vin',
    label: 'Bourgogne (Taste-vin)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="none" stroke="#C0C0C0" stroke-width="6"/>
      <circle cx="50" cy="50" r="25" fill="#FFD700" opacity="0.4"/>
      <rect x="25" y="45" width="20" height="10" fill="#C0C0C0"/>
    </svg>`
  },
  {
    id: 'pic_hermine',
    label: 'Bretagne (Hermine)',
    category: 'libres',
    defaultWidth: 40,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,10 L30,45 L50,45 Z M40,40 L40,85 M25,85 L55,85" stroke="black" stroke-width="6" stroke-linecap="round" fill="black"/>
      <circle cx="30" cy="45" r="4" fill="black"/>
      <circle cx="50" cy="45" r="4" fill="black"/>
      <circle cx="40" cy="35" r="4" fill="black"/>
    </svg>`
  },
  {
    id: 'chardon',
    label: 'Lorraine (Chardon)',
    category: 'libres',
    defaultWidth: 45,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 90 110" xmlns="http://www.w3.org/2000/svg">
      <path d="M45,60 C35,80 20,80 10,70 Q45,100 80,70 C70,80 55,80 45,60 Z" fill="#228B22" stroke="#006400" stroke-width="2"/>
      <ellipse cx="45" cy="40" rx="18" ry="20" fill="#BA55D3" stroke="#8A2BE2" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'croix_occitane',
    label: 'Occitanie (Croix)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,5 L50,95 M5,50 L95,50 M30,30 L70,70 M30,70 L70,30" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="5" r="5" fill="#FFD700"/>
      <circle cx="50" cy="95" r="5" fill="#FFD700"/>
      <circle cx="5" cy="50" r="5" fill="#FFD700"/>
      <circle cx="95" cy="50" r="5" fill="#FFD700"/>
    </svg>`
  },

  // ── Insignes Libres ──
  {
    id: 'aigle',
    label: 'Aigle (Aviation)',
    category: 'libres',
    defaultWidth: 55,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,20 Q20,30 10,60 Q50,45 50,80 Q50,45 90,60 Q80,30 50,20 Z" fill="#8B4513" stroke="#5c3a1a" stroke-width="2"/>
      <polygon points="50,45 46,55 54,55" fill="#FFD700"/>
    </svg>`
  },
  {
    id: 'ancre',
    label: 'Ancre (Navigation)',
    category: 'libres',
    defaultWidth: 45,
    defaultHeight: 55,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#C0C0C0" stroke-width="7" stroke-linecap="round">
        <circle cx="50" cy="22" r="13"/>
        <line x1="50" y1="35" x2="50" y2="100"/>
        <line x1="25" y1="55" x2="75" y2="55"/>
        <path d="M25,100 Q50,115 75,100"/>
      </g>
    </svg>`
  },
  {
    id: 'grappe_raisin',
    label: 'Raisin (Bon vin)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 60,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,10 C44,18 52,28 50,35" fill="none" stroke="#228B22" stroke-width="3"/>
      <circle cx="50" cy="45" r="10" fill="#6A0DAD"/>
      <circle cx="38" cy="60" r="10" fill="#7B1FA2"/>
      <circle cx="62" cy="60" r="10" fill="#7B1FA2"/>
      <circle cx="28" cy="75" r="10" fill="#8B26B2"/>
      <circle cx="50" cy="75" r="10" fill="#8B26B2"/>
      <circle cx="72" cy="75" r="10" fill="#8B26B2"/>
      <circle cx="50" cy="95" r="10" fill="#AB3AD2"/>
    </svg>`
  },
  {
    id: 'chameau',
    label: 'Chameau (Célibataire)',
    category: 'libres',
    defaultWidth: 55,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="25" ry="18" fill="#C4913A" stroke="#8b6527" stroke-width="2"/>
      <circle cx="40" cy="32" r="10" fill="#C4913A"/>
      <circle cx="60" cy="32" r="8" fill="#C4913A"/>
      <path d="M22,42 C18,30 22,15 28,15" fill="none" stroke="#C4913A" stroke-width="5" stroke-linecap="round"/>
      <circle cx="26" cy="12" r="4" fill="#C4913A"/>
    </svg>`
  },
  {
    id: 'chope_biere',
    label: 'Chope de bière',
    category: 'libres',
    defaultWidth: 45,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="45" height="60" rx="5" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
      <path d="M65,40 H78 V70 H65" fill="none" stroke="#B8860B" stroke-width="4" stroke-linecap="round"/>
      <path d="M15,32 Q45,15 75,32" fill="#FFF" stroke="#FFF" stroke-width="6"/>
    </svg>`
  },
  {
    id: 'cochon',
    label: 'Cochon (Intégration)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 40,
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="45" rx="30" ry="22" fill="#FFB6C1" stroke="#FF69B4" stroke-width="2"/>
      <circle cx="24" cy="38" r="5" fill="#FFB6C1" stroke="#FF69B4" stroke-width="2"/>
      <circle cx="85" cy="45" r="8" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1.5"/>
      <path d="M10,40 Q5,35 8,45" fill="none" stroke="#FF69B4" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'cocotte_papier',
    label: 'Cocotte en papier',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,65 50,15 90,65 50,80" fill="none" stroke="#C0C0C0" stroke-width="2"/>
      <polygon points="10,65 50,55 90,65" fill="none" stroke="#C0C0C0" stroke-width="2"/>
      <line x1="50" y1="15" x2="50" y2="55" stroke="#C0C0C0" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'epi_ble_faucille',
    label: 'Épi & Faucille (Chance Exam)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,75 C45,55 50,30 45,10" fill="none" stroke="#FFD700" stroke-width="4"/>
      <path d="M70,75 C50,65 40,45 35,25" fill="none" stroke="#C0C0C0" stroke-width="4"/>
      <path d="M35,25 Q20,10 40,5" fill="none" stroke="#C0C0C0" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'fer_cheval',
    label: 'Fer à cheval (Chance)',
    category: 'libres',
    defaultWidth: 40,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,15 C15,65 65,65 65,15" fill="none" stroke="#C0C0C0" stroke-width="8" stroke-linecap="round"/>
      <circle cx="25" cy="30" r="2" fill="black"/>
      <circle cx="25" cy="45" r="2" fill="black"/>
      <circle cx="55" cy="30" r="2" fill="black"/>
      <circle cx="55" cy="45" r="2" fill="black"/>
    </svg>`
  },
  {
    id: 'feuille_vigne',
    label: 'Feuille de vigne (Virginité)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,90 Q50,50 50,15 M50,15 L25,45 Q40,60 50,90 M50,15 L75,45 Q60,60 50,90" fill="#228B22" stroke="#006400" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'fourchette',
    label: 'Fourchette (Gourmet)',
    category: 'libres',
    defaultWidth: 35,
    defaultHeight: 60,
    svg: `<svg viewBox="0 0 60 110" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="45" x2="30" y2="105" stroke="#C0C0C0" stroke-width="4"/>
      <path d="M15,15 V45 H45 V15" fill="none" stroke="#C0C0C0" stroke-width="4" stroke-linecap="round"/>
      <line x1="25" y1="15" x2="25" y2="45" stroke="#C0C0C0" stroke-width="2"/>
      <line x1="35" y1="15" x2="35" y2="45" stroke="#C0C0C0" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pendu',
    label: 'Pendu (Marié)',
    category: 'libres',
    defaultWidth: 45,
    defaultHeight: 65,
    svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,125 H55 M30,125 V15 H75 V35" fill="none" stroke="#8B4513" stroke-width="4"/>
      <circle cx="75" cy="45" r="10" fill="none" stroke="black" stroke-width="2"/>
      <line x1="75" y1="55" x2="75" y2="90" stroke="black" stroke-width="2"/>
      <line x1="75" y1="65" x2="60" y2="80" stroke="black" stroke-width="2"/>
      <line x1="75" y1="65" x2="90" y2="80" stroke="black" stroke-width="2"/>
      <line x1="75" y1="90" x2="65" y2="115" stroke="black" stroke-width="2"/>
      <line x1="75" y1="90" x2="85" y2="115" stroke="black" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'taureau',
    label: 'Taureau (Parent)',
    category: 'libres',
    defaultWidth: 55,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,25 Q50,45 75,25 M15,10 Q25,25 20,40 M85,10 Q75,25 80,40" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="50" cy="50" rx="20" ry="15" fill="#333" stroke="black" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'renard',
    label: 'Renard (IFSI Fleyriat)',
    category: 'libres',
    defaultWidth: 50,
    defaultHeight: 50,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,75 15,35 85,35" fill="#D2691E" stroke="#8b4513" stroke-width="2"/>
      <polygon points="50,75 35,35 65,35" fill="#FFFFFF"/>
      <polygon points="50,75 45,65 55,65" fill="#111"/>
      <circle cx="32" cy="45" r="4" fill="#111"/>
      <circle cx="68" cy="45" r="4" fill="#111"/>
    </svg>`
  },
  {
    id: 'lettre_psi',
    label: 'Lettre Psi (CPA)',
    category: 'lettres',
    defaultWidth: 45,
    defaultHeight: 45,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FFD700" stroke-width="3"/>
      <text x="50" y="68" text-anchor="middle" font-size="52" font-weight="bold" fill="#FFD700" font-family="serif">Ψ</text>
    </svg>`
  }
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

// ─────────────────────────────────────────────────────────────────────────────
// ÉCUSSONS DE VILLE — blasons héraldiques SVG des villes universitaires
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// CATÉGORIES D'INSIGNES
// ─────────────────────────────────────────────────────────────────────────────
export const INSIGNE_CATEGORIES = [
  { id: 'emblemes',     label: 'Emblèmes de discipline' },
  { id: 'libres',       label: 'Insignes libres & Régions' },
  { id: 'distinctions', label: 'Distinctions & Cursus' },
  { id: 'lettres',      label: 'Baccalauréats & Lettres' }
];
