/**
 * AssociationRibbonSVG — Composant SVG pour les rubans d'association.
 *
 * Génère 3 formes selon le statut du membre :
 *
 *   'president' — Ligne droite continue traversant tout le velours (Frontal → Occipital).
 *                 Forme : rectangle vertical bicolore.
 *
 *   'actif'     — Demi-ligne (Central → Occipital).
 *                 Forme : rectangle vertical bicolore, mais le conteneur (item.height) est moitié.
 *
 *   'bureau'    — Ligne droite + chevron en Y (Frontal → Central, puis évasement).
 *                 Forme : tige verticale + bifurcation en V vers le bas.
 *
 * Bicolore : deux clipPath (gauche=c1, droite=c2) sur la forme géométrique.
 * uniqueId  : OBLIGATOIRE si plusieurs rubans du même type sont présents (ID SVG globaux).
 */
export default function AssociationRibbonSVG({ shape, colors, uniqueId = 'r' }) {
  const c1 = colors?.[0] ?? '#FFFFFF';
  const c2 = colors?.[1] ?? colors?.[0] ?? '#FFFFFF';

  // ── Président & Membre Actif — rectangle vertical ─────────────────────────
  // Le conteneur (item.height) détermine la longueur : tall = Président, court = Actif.
  if (shape === 'president' || shape === 'actif') {
    return (
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Moitié gauche — couleur 1 */}
        <rect x="0" y="0" width="50" height="100" fill={c1} />
        {/* Moitié droite — couleur 2 */}
        <rect x="50" y="0" width="50" height="100" fill={c2} />

        {/* Séparation centrale */}
        <line x1="50" y1="0" x2="50" y2="100"
          stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* Reflet satin (haut) */}
        <rect x="0" y="0" width="100" height="12"
          fill="rgba(255,255,255,0.13)" />

        {/* Ombre bas */}
        <rect x="0" y="88" width="100" height="12"
          fill="rgba(0,0,0,0.15)" />

        {/* Bords longitudinaux */}
        <line x1="0" y1="0" x2="0" y2="100"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        <line x1="100" y1="0" x2="100" y2="100"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      </svg>
    );
  }

  // ── Membre du Bureau — tige + bifurcation en Y ────────────────────────────
  //
  // ViewBox : 0 0 140 270
  // La tige est centrée horizontalement (x=60 à x=80, largeur=20).
  // Le fourche commence à y=130 (milieu).
  // Bras gauche : (60,130)→(0,268), (80,130)→(20,268) — via le point de convergence
  // Bras droit  : (60,130)→(120,268), (80,130)→(140,268)
  //
  if (shape === 'bureau') {
    const clipId   = `yc-${uniqueId}`;
    const shineId  = `ys-${uniqueId}`;
    // Polygone de la forme en Y (calculé pour viewBox 140×270)
    const pts = "60,0 80,0 80,128 140,268 120,268 70,148 20,268 0,268 60,128";

    return (
      <svg
        viewBox="0 0 140 270"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Forme en Y = masque de découpe */}
          <clipPath id={clipId}>
            <polygon points={pts} />
          </clipPath>

          {/* Gradient de brillance satin (haut → transparent) */}
          <linearGradient id={shineId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.18)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Fond gauche (couleur 1) — clippé au Y */}
        <rect x="0" y="0" width="70" height="270"
          fill={c1} clipPath={`url(#${clipId})`} />

        {/* Fond droite (couleur 2) — clippé au Y */}
        <rect x="70" y="0" width="70" height="270"
          fill={c2} clipPath={`url(#${clipId})`} />

        {/* Reflet satin sur toute la forme */}
        <rect x="0" y="0" width="140" height="270"
          fill={`url(#${shineId})`} clipPath={`url(#${clipId})`} />

        {/* Séparation centrale (axe du Y) */}
        <line x1="70" y1="0" x2="70" y2="270"
          stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"
          clipPath={`url(#${clipId})`} />

        {/* Contour du Y */}
        <polygon
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Point de bifurcation mis en évidence (facultatif) */}
        <circle cx="70" cy="132" r="3"
          fill="rgba(255,255,255,0.25)"
          clipPath={`url(#${clipId})`} />
      </svg>
    );
  }

  // ── Fallback — bicolore simple ────────────────────────────────────────────
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%"
      preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="50" height="100" fill={c1} />
      <rect x="50" y="0" width="50" height="100" fill={c2} />
    </svg>
  );
}
