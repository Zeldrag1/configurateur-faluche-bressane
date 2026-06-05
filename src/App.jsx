import { useState } from 'react';
import { useCanvas } from './hooks/useCanvas';
import { FILIERES } from './data/falucheData';

import FiliereSelector from './components/LeftPanel/FiliereSelector';
import CatalogInsignes from './components/LeftPanel/CatalogInsignes';
import CatalogRubans from './components/LeftPanel/CatalogRubans';
import CatalogEcussons from './components/LeftPanel/CatalogEcussons';
import VelourView from './components/PreviewZone/VelourView';
import CirView from './components/PreviewZone/CirView';

const FalucheIcon = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#111" stroke="#6c63ff" strokeWidth="4"/>
    <circle cx="50" cy="50" r="30" fill="#1a1a1a"/>
    <rect x="20" y="74" width="60" height="12" rx="6" fill="#6c63ff" opacity="0.8"/>
    <circle cx="50" cy="50" r="8" fill="#FFD700"/>
  </svg>
);

const CATALOG_TABS = [
  { id: 'insignes', label: '✦ Insignes'  },
  { id: 'rubans',   label: '▬ Rubans'    },
  { id: 'ecussons', label: '🛡 Écussons' },
];

// ── Rotation snap : valeurs rapides ───────────────────────────────────────────
const ROTATION_SNAPS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

export default function App() {
  const [filiereId, setFiliereId] = useState('');
  const [catalogTab, setCatalogTab] = useState('insignes');

  const {
    items,
    selectedId,
    addItem,
    updateItem,
    removeItem,
    bringForward,
    sendBackward,
    selectItem,
    clearSelection,
  } = useCanvas();

  const selectedFiliere = FILIERES.find(f => f.id === filiereId);
  const selectedItem    = items.find(i => i.id === selectedId);

  const handleAdd = (itemData, zone) => addItem(itemData, zone);

  // ── Raccourcis rotation ─────────────────────────────────────────────────────
  const setRotation = (deg) => {
    if (selectedId) updateItem(selectedId, { rotation: deg });
  };

  return (
    <div className="app-layout">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="app-header">
        <FalucheIcon />
        <h1>Configurateur de Faluche</h1>
        <span className="subtitle">Tradition Bressane</span>
        {selectedItem && (
          <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
            <em style={{ color: 'var(--text-secondary)' }}>{selectedItem.label}</em>
            &nbsp;sélectionné —&nbsp;
            <kbd style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 3, padding: '1px 5px', fontSize: 10, color: 'var(--text-secondary)' }}>Suppr</kbd>
          </div>
        )}
      </header>

      {/* ── Panneau gauche ──────────────────────────────────────────────── */}
      <aside className="left-panel">

        {/* ─ Sélecteur filière ─────────────────────────────────────────── */}
        <FiliereSelector filiereId={filiereId} onChange={setFiliereId} />

        {/* ─ Panneau de propriétés (visible si élément sélectionné) ─────── */}
        {selectedItem && (
          <div className="properties-panel">
            <div className="properties-header">
              <span className="properties-title">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Rotation
              </span>
              <span className="properties-value">{selectedItem.rotation}°</span>
            </div>

            {/* Slider principal */}
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={selectedItem.rotation}
              onChange={(e) => updateItem(selectedId, { rotation: +e.target.value })}
              className="rotation-slider"
              style={{ '--val': selectedItem.rotation }}
            />

            {/* Boutons snap rapides */}
            <div className="rotation-snaps">
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <button
                  key={deg}
                  className={`snap-btn ${selectedItem.rotation === deg ? 'active' : ''}`}
                  onClick={() => setRotation(deg)}
                  title={`${deg}°`}
                >
                  {deg}°
                </button>
              ))}
            </div>

            {/* Nom de l'élément + type */}
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '65%' }}>{selectedItem.label}</span>
              <span style={{ color: 'var(--border-active)', opacity: 0.7 }}>{selectedItem.type}</span>
            </div>
          </div>
        )}

        {/* ─ Tabs catalogue ────────────────────────────────────────────── */}
        <div className="catalog-tabs">
          {CATALOG_TABS.map(t => (
            <button
              key={t.id}
              className={`catalog-tab ${catalogTab === t.id ? 'active' : ''}`}
              onClick={() => setCatalogTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ─ Contenu catalogue scrollable ──────────────────────────────── */}
        <div className="panel-scroll">
          {catalogTab === 'insignes' && <CatalogInsignes onAdd={handleAdd} />}
          {catalogTab === 'rubans'   && <CatalogRubans   onAdd={handleAdd} />}
          {catalogTab === 'ecussons' && <CatalogEcussons onAdd={handleAdd} />}
        </div>

        {/* ─ Pied de panneau ──────────────────────────────────────────── */}
        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 10,
          color: 'var(--text-muted)',
          flexShrink: 0,
        }}>
          <span>{items.length} élément{items.length !== 1 ? 's' : ''} placé{items.length !== 1 ? 's' : ''}</span>
          {items.length > 0 && (
            <button
              onClick={() => { if (window.confirm('Effacer tous les éléments ?')) { items.forEach(i => removeItem(i.id)); clearSelection(); } }}
              style={{ fontSize: 10, color: '#DC143C', background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.3)', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Tout effacer
            </button>
          )}
        </div>
      </aside>

      {/* ── Zone de prévisualisation droite ─────────────────────────────── */}
      <main className="preview-zone">
        {/* Velours */}
        <div className="preview-panel preview-panel-velours">
          <div className="preview-panel-header">
            <h2>Vue 1 — Velours (dessus)</h2>
            <span className="zone-badge zone-badge-velours">
              {items.filter(i => i.zone === 'velours').length} élément(s)
            </span>
          </div>
          <div className="preview-canvas">
            <VelourView
              items={items}
              selectedId={selectedId}
              onSelect={selectItem}
              onUpdate={updateItem}
              onRemove={removeItem}
              onBringForward={bringForward}
              onSendBackward={sendBackward}
              onClearSelection={clearSelection}
            />
          </div>
        </div>

        {/* Circulaire */}
        <div className="preview-panel preview-panel-cir">
          <div className="preview-panel-header">
            <h2>Vue 2 — Circulaire (déplié)</h2>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {selectedFiliere && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-muted)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: selectedFiliere.color, border: '1px solid rgba(255,255,255,0.2)', display: 'inline-block' }} />
                  {selectedFiliere.label}
                  {selectedFiliere.texture && (
                    <span style={{ fontSize: 9, opacity: 0.6, fontStyle: 'italic' }}>· {selectedFiliere.texture}</span>
                  )}
                </span>
              )}
              <span className="zone-badge zone-badge-cir">
                {items.filter(i => i.zone === 'circulaire').length} élément(s)
              </span>
            </div>
          </div>
          <div className="preview-canvas">
            <CirView
              items={items}
              filiereColor={selectedFiliere?.color ?? '#1a1a1a'}
              filiereName={selectedFiliere?.label ?? ''}
              filiereTexture={selectedFiliere?.texture ?? 'velours'}
              selectedId={selectedId}
              onSelect={selectItem}
              onUpdate={updateItem}
              onRemove={removeItem}
              onBringForward={bringForward}
              onSendBackward={sendBackward}
              onClearSelection={clearSelection}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
