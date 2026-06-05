import { useState } from 'react';
import { ECUSSONS_VILLE } from '../../data/falucheData';

/**
 * CatalogEcussons — Grille d'écussons héraldiques SVG des villes universitaires.
 * Chaque écusson peut être ajouté sur le velours ou le circulaire.
 * Les écussons sont draggables et rotatifs (via PlacedItem).
 */
export default function CatalogEcussons({ onAdd }) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? ECUSSONS_VILLE.filter(e => e.label.toLowerCase().includes(search.toLowerCase()))
    : ECUSSONS_VILLE;

  return (
    <div>
      {/* Info */}
      <div style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        background: 'rgba(255,215,0,0.06)',
        border: '1px solid rgba(255,215,0,0.15)',
        borderRadius: 6,
        padding: '7px 10px',
        marginBottom: 10,
        lineHeight: 1.6,
      }}>
        🏰 <strong style={{ color: 'var(--text-secondary)' }}>Écussons héraldiques</strong> —
        Représentent votre ville d'études ou d'origine.
        Placez-les sur le velours ou le circulaire, puis <em>faites-les pivoter</em> librement.
      </div>

      {/* Créateur personnalisé */}
      <CustomEcussonCreator onAdd={onAdd} />

      {/* Barre de recherche */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <svg
          style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Rechercher une ville…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 10px 6px 26px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: 11,
          }}
        />
      </div>

      {/* Grille d'écussons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
      }}>
        {filtered.map(ecusson => (
          <EcussonCard key={ecusson.id} ecusson={ecusson} onAdd={onAdd} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: 11,
          padding: '20px 0',
        }}>
          Aucune ville trouvée
        </div>
      )}
    </div>
  );
}

function EcussonCard({ ecusson, onAdd }) {
  const [showZone, setShowZone] = useState(false);

  return (
    <div
      className="insigne-card"
      onMouseEnter={() => setShowZone(true)}
      onMouseLeave={() => setShowZone(false)}
    >
      {/* SVG de l'écusson */}
      <div
        className="insigne-icon"
        style={{ width: 40, height: 48 }}
        dangerouslySetInnerHTML={{ __html: ecusson.svg }}
      />
      <span className="insigne-label">{ecusson.label}</span>

      {/* Boutons zone (apparaissent au hover) */}
      {showZone && (
        <div
          className="add-zone-btns"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            gap: 2,
            padding: '4px',
            background: 'rgba(13,13,26,0.95)',
            borderTop: '1px solid var(--border)',
            justifyContent: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="add-zone-btn add-zone-btn-v"
            onClick={() => onAdd({ ...ecusson, type: 'ecusson_ville' }, 'velours')}
            title="Ajouter sur le velours"
          >
            Velours
          </button>
          <button
            className="add-zone-btn add-zone-btn-c"
            onClick={() => onAdd({ ...ecusson, type: 'ecusson_ville' }, 'circulaire')}
            title="Ajouter sur le circulaire"
          >
            Cir.
          </button>
        </div>
      )}
    </div>
  );
}

const generateEcussonSvg = (cityName, bgColor) => {
  let initials = '';
  const cleanName = cityName.trim();
  if (cleanName) {
    const parts = cleanName.split(/[\s-]+/);
    if (parts.length > 1) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else {
      initials = cleanName.substring(0, 2).toUpperCase();
    }
  } else {
    initials = '??';
  }

  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M8,8 H92 V82 Q50,118 8,82 Z" fill="${bgColor}" stroke="#FFD700" stroke-width="3.5"/>
    <text x="50" y="58" text-anchor="middle" font-size="28" font-weight="bold" font-family="Georgia,serif" fill="#FFD700" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.5))">${initials}</text>
    <path d="M20,72 H80" stroke="#FFD700" stroke-width="1.5" opacity="0.7"/>
    <text x="50" y="86" text-anchor="middle" font-size="9" font-weight="bold" font-family="Georgia,serif" fill="#FFD700" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.5))">${cleanName.toUpperCase()}</text>
  </svg>`;
};

function CustomEcussonCreator({ onAdd }) {
  const [cityName, setCityName] = useState('Bourg');
  const [bgColor, setBgColor] = useState('#006400');

  const buildItemData = () => {
    const svg = generateEcussonSvg(cityName, bgColor);
    return {
      id: `ev_custom_${Date.now()}`,
      label: cityName || 'Écusson personnalisé',
      svg,
      type: 'ecusson_ville',
      defaultWidth: 60,
      defaultHeight: 72,
    };
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      padding: '12px 14px',
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }}>
      <div style={{ fontSize: 11, fontWeight: 'bold', color: 'var(--text-secondary)' }}>
        🛡️ Nouvel écusson personnalisé
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Nom de la ville</label>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Ex: Bourg-en-Bresse..."
          style={{
            fontSize: 11,
            padding: '6px 10px',
            background: 'var(--bg-app)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Couleur de l'écusson</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{
                width: 24,
                height: 24,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                background: 'transparent',
              }}
            />
            <span style={{ fontSize: 9, fontFamily: 'monospace' }}>{bgColor.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>Aperçu</span>
          <div 
            style={{ width: 35, height: 42 }}
            dangerouslySetInnerHTML={{ __html: generateEcussonSvg(cityName, bgColor) }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
        <button
          className="add-zone-btn add-zone-btn-v"
          onClick={() => onAdd(buildItemData(), 'velours')}
          style={{ flex: 1, padding: '6px 10px', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Ajouter sur le Velours
        </button>
        <button
          className="add-zone-btn add-zone-btn-c"
          onClick={() => onAdd(buildItemData(), 'circulaire')}
          style={{ flex: 1, padding: '6px 10px', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Ajouter sur le Circulaire
        </button>
      </div>
    </div>
  );
}

