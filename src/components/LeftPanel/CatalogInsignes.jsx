import { useState } from 'react';
import { INSIGNES, INSIGNE_CATEGORIES } from '../../data/falucheData';

/**
 * CatalogInsignes — Grille d'insignes SVG par catégorie.
 * Chaque carte permet d'ajouter l'insigne sur le velours ou le circulaire.
 */
export default function CatalogInsignes({ onAdd }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [{ id: 'all', label: 'Tous' }, ...INSIGNE_CATEGORIES];

  const filtered = activeCategory === 'all'
    ? INSIGNES
    : INSIGNES.filter(i => i.category === activeCategory);

  // Grouper par catégorie si 'all'
  const grouped = activeCategory === 'all'
    ? INSIGNE_CATEGORIES.map(cat => ({
        ...cat,
        items: INSIGNES.filter(i => i.category === cat.id),
      })).filter(g => g.items.length > 0)
    : [{ id: activeCategory, label: '', items: filtered }];

  return (
    <div>
      {/* Filtres catégorie */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 4,
              cursor: 'pointer',
              border: '1px solid',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
              background: activeCategory === cat.id ? 'rgba(108,99,255,0.2)' : 'transparent',
              borderColor: activeCategory === cat.id ? 'rgba(108,99,255,0.6)' : 'var(--border)',
              color: activeCategory === cat.id ? 'var(--accent)' : 'var(--text-muted)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Groupes */}
      {grouped.map(group => (
        <div key={group.id}>
          {activeCategory === 'all' && (
            <div className="category-label">{group.label}</div>
          )}
          {group.id === 'lettres' && <CustomTextCreator onAdd={onAdd} />}
          <div className="insignes-grid">
            {group.items.map(insigne => (
              <InsigneCard key={insigne.id} insigne={insigne} onAdd={onAdd} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomTextCreator({ onAdd }) {
  const [text, setText] = useState('TOMMY');
  const [finish, setFinish] = useState('gold');

  const color = finish === 'gold' ? '#FFD700' : '#C0C0C0';

  const handleAdd = (zone) => {
    if (!text.trim()) return;
    onAdd({
      id: `text_custom_${Date.now()}`,
      label: `Surnom : ${text}`,
      type: 'text',
      text: text,
      color: color,
      defaultWidth: Math.max(40, text.length * 14 + 10),
      defaultHeight: 30,
    }, zone);
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
        ✍️ Créer un texte (Surnom, Initiales...)
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 2 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Texte</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            placeholder="Ex: HEPTA..."
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

        {/* Finition métallique */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Finition</label>
          <select
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            style={{
              fontSize: 11,
              padding: '6px 8px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            <option value="gold" style={{ background: 'var(--bg-card)' }}>Or (Doré)</option>
            <option value="silver" style={{ background: 'var(--bg-card)' }}>Argent (Gris)</option>
          </select>
        </div>
      </div>

      {/* Aperçu en direct */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>Aperçu :</span>
        <div style={{
          padding: '4px 12px',
          background: '#111',
          border: '1px solid #222',
          borderRadius: 4,
          display: 'inline-flex',
          fontFamily: 'Georgia, serif',
          fontSize: '14px',
          fontWeight: 'bold',
          color: color,
          textShadow: finish === 'silver'
            ? '0 1px 0 #999, 0 2px 0 #777, 0 3px 4px rgba(0,0,0,0.7)'
            : '0 1px 0 #B8860B, 0 2px 0 #8B6508, 0 3px 4px rgba(0,0,0,0.7)',
        }}>
          {text || 'VIDE'}
        </div>
      </div>

      {/* Boutons d'ajout */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
        <button
          className="add-zone-btn add-zone-btn-v"
          onClick={() => handleAdd('velours')}
          style={{ width: 'auto', padding: '4px 10px', fontSize: 10 }}
        >
          Ajouter sur le Velours (V)
        </button>
        <button
          className="add-zone-btn add-zone-btn-c"
          onClick={() => handleAdd('circulaire')}
          style={{ width: 'auto', padding: '4px 10px', fontSize: 10 }}
        >
          Ajouter sur le Circulaire (C)
        </button>
      </div>
    </div>
  );
}

function InsigneCard({ insigne, onAdd }) {
  const [showZone, setShowZone] = useState(false);

  return (
    <div
      className="insigne-card"
      onMouseEnter={() => setShowZone(true)}
      onMouseLeave={() => setShowZone(false)}
    >
      <div
        className="insigne-icon"
        dangerouslySetInnerHTML={{ __html: insigne.svg }}
      />
      <span className="insigne-label">{insigne.label}</span>

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
            onClick={() => onAdd({ ...insigne, type: 'insigne' }, 'velours')}
            title="Ajouter sur le velours"
          >
            Velours
          </button>
          <button
            className="add-zone-btn add-zone-btn-c"
            onClick={() => onAdd({ ...insigne, type: 'insigne' }, 'circulaire')}
            title="Ajouter sur le circulaire"
          >
            Circulaire
          </button>
        </div>
      )}
    </div>
  );
}
