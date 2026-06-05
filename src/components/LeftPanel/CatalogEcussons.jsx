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
