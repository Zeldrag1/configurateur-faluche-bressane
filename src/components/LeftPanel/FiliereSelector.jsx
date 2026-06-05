import { FILIERES } from '../../data/falucheData';

/**
 * FiliereSelector — Dropdown de sélection de filière avec badge couleur et type.
 */
export default function FiliereSelector({ filiereId, onChange }) {
  const selected = FILIERES.find(f => f.id === filiereId);

  // Grouper par type pour l'affichage
  const velours = FILIERES.filter(f => f.texture === 'velours');
  const satin   = FILIERES.filter(f => f.texture === 'satin');

  return (
    <div className="panel-section">
      <div className="panel-section-title">Filière</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {selected && (
          <span
            className="filiere-color-badge"
            style={{
              backgroundColor: selected.color,
              boxShadow: `0 0 6px ${selected.color}66`,
            }}
          />
        )}
        <select
          className="filiere-select"
          value={filiereId}
          onChange={e => onChange(e.target.value)}
          id="filiere-select"
        >
          <option value="">— Choisir sa filière —</option>
          <optgroup label="Velours">
            {velours.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </optgroup>
          <optgroup label="Satin">
            {satin.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </optgroup>
        </select>
      </div>
      {selected && (
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: 4, padding: '2px 8px',
          }}>
            <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
              {selected.texture}
            </span>
          </span>
          <code style={{ color: 'var(--text-secondary)', background: 'var(--bg-app)', padding: '1px 4px', borderRadius: 3, fontSize: 9 }}>
            {selected.color}
          </code>
        </div>
      )}
    </div>
  );
}
