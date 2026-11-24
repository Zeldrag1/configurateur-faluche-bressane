import { useState, useMemo } from 'react';
import {
  Layers,
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
  Trash2,
  Copy,
  X,
  RotateCw,
} from 'lucide-react';

/**
 * Miniature visuelle d'un élément dans la liste des calques.
 */
function LayerThumbnail({ item }) {
  if ((item.type === 'insigne' || item.type === 'ecusson_ville') && item.svg) {
    return (
      <div
        className="layer-thumb-svg"
        dangerouslySetInnerHTML={{ __html: item.svg }}
      />
    );
  }

  if (item.type === 'text') {
    return (
      <div
        className="layer-thumb-text"
        style={{ color: item.color || '#FFD700' }}
      >
        Aa
      </div>
    );
  }

  if (item.type === 'ruban_filiere') {
    return (
      <div
        className="layer-thumb-ruban"
        style={{
          background: item.color,
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      />
    );
  }

  if (item.colors && item.colors.length > 0) {
    return (
      <div
        className="layer-thumb-ruban"
        style={{
          background: item.pattern === 'striped'
            ? `linear-gradient(to bottom, ${item.colors[0]} 30%, ${item.colors[1]} 30%, ${item.colors[1]} 70%, ${item.colors[0]} 70%)`
            : item.pattern === 'braided'
            ? `repeating-linear-gradient(45deg, ${item.colors[0]}, ${item.colors[0]} 3px, ${item.colors[1]} 3px, ${item.colors[1]} 6px, ${item.colors[2]} 6px, ${item.colors[2]} 9px)`
            : undefined,
        }}
      >
        {!item.pattern && item.colors.map((c, idx) => (
          <div key={idx} style={{ flex: 1, backgroundColor: c, height: '100%' }} />
        ))}
      </div>
    );
  }

  return <div className="layer-thumb-placeholder">✦</div>;
}

export default function LayersPanel({
  items,
  selectedId,
  onSelect,
  onClearSelection,
  onRemove,
  onDuplicate,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
}) {
  const [filterZone, setFilterZone] = useState('all'); // 'all' | 'velours' | 'circulaire'

  const selectedItem = items.find(i => i.id === selectedId);

  // Éléments filtrés et ordonnés du PREMIER PLAN au DERNIER PLAN (z-index décroissant)
  const sortedAndFilteredItems = useMemo(() => {
    let list = [...items];
    if (filterZone !== 'all') {
      list = list.filter(item => item.zone === filterZone);
    }
    // Ordre calque classique (Photoshop / Illustrator) :
    // Le premier plan (zIndex le plus élevé) s'affiche tout en haut de la liste
    return list.sort((a, b) => (b.zIndex ?? 0) - (a.zIndex ?? 0));
  }, [items, filterZone]);

  const velourCount = items.filter(i => i.zone === 'velours').length;
  const cirCount = items.filter(i => i.zone === 'circulaire').length;

  return (
    <aside className="right-panel">
      {/* ── En-tête du panneau ────────────────────────────────────────── */}
      <div className="right-panel-header">
        <div className="right-panel-title">
          <Layers size={15} className="text-accent" />
          <span>Calques & Plans</span>
          <span className="layers-count-badge">{items.length}</span>
        </div>
        {selectedId && (
          <button
            className="clear-select-btn"
            onClick={onClearSelection}
            title="Désélectionner"
          >
            <X size={12} />
            <span>Désélectionner</span>
          </button>
        )}
      </div>

      {/* ── Filtres de zone ───────────────────────────────────────────── */}
      <div className="layers-filters">
        <button
          className={`layer-filter-btn ${filterZone === 'all' ? 'active' : ''}`}
          onClick={() => setFilterZone('all')}
        >
          Tous ({items.length})
        </button>
        <button
          className={`layer-filter-btn ${filterZone === 'velours' ? 'active' : ''}`}
          onClick={() => setFilterZone('velours')}
        >
          Velours ({velourCount})
        </button>
        <button
          className={`layer-filter-btn ${filterZone === 'circulaire' ? 'active' : ''}`}
          onClick={() => setFilterZone('circulaire')}
        >
          Circulaire ({cirCount})
        </button>
      </div>

      {/* ── Barre d'actions d'empilement (si un élément est sélectionné) ── */}
      {selectedItem && (
        <div className="layer-actions-bar">
          <div className="layer-actions-info">
            <span className="layer-actions-label">{selectedItem.label}</span>
            <span className={`zone-tag zone-tag-${selectedItem.zone}`}>
              {selectedItem.zone === 'velours' ? 'Velours' : 'Circulaire'}
            </span>
          </div>

          <div className="layer-actions-buttons">
            <button
              className="layer-action-btn"
              onClick={() => onBringToFront(selectedItem.id)}
              title="Tout au premier plan"
            >
              <ChevronsUp size={14} />
              <span className="btn-hint">1er plan</span>
            </button>
            <button
              className="layer-action-btn"
              onClick={() => onBringForward(selectedItem.id)}
              title="Avancer d'un plan (monter)"
            >
              <ChevronUp size={14} />
              <span className="btn-hint">Monter</span>
            </button>
            <button
              className="layer-action-btn"
              onClick={() => onSendBackward(selectedItem.id)}
              title="Reculer d'un plan (descendre)"
            >
              <ChevronDown size={14} />
              <span className="btn-hint">Descendre</span>
            </button>
            <button
              className="layer-action-btn"
              onClick={() => onSendToBack(selectedItem.id)}
              title="Tout à l'arrière-plan"
            >
              <ChevronsDown size={14} />
              <span className="btn-hint">Fond</span>
            </button>

            <div className="layer-action-divider" />

            {onDuplicate && (
              <button
                className="layer-action-btn"
                onClick={() => onDuplicate(selectedItem.id)}
                title="Dupliquer l'élément"
              >
                <Copy size={13} />
              </button>
            )}

            <button
              className="layer-action-btn danger"
              onClick={() => onRemove(selectedItem.id)}
              title="Supprimer (Suppr)"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      )}

      {/* ── Liste des calques ─────────────────────────────────────────── */}
      <div className="layers-list-scroll">
        {sortedAndFilteredItems.length === 0 ? (
          <div className="layers-empty">
            <Layers size={28} opacity={0.3} />
            <p>Aucun élément placé</p>
            <span>
              {filterZone === 'all'
                ? 'Choisissez un insigne ou ruban dans le catalogue pour commencer.'
                : `Aucun élément sur le ${filterZone}.`}
            </span>
          </div>
        ) : (
          <div className="layers-list">
            {sortedAndFilteredItems.map((item, idx) => {
              const isSelected = item.id === selectedId;
              const isTop = idx === 0;
              const isBottom = idx === sortedAndFilteredItems.length - 1;

              return (
                <div
                  key={item.id}
                  className={`layer-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelect(item.id)}
                >
                  {/* Miniature */}
                  <div className="layer-item-thumb">
                    <LayerThumbnail item={item} />
                  </div>

                  {/* Infos texte */}
                  <div className="layer-item-content">
                    <div className="layer-item-title" title={item.label}>
                      {item.label}
                    </div>
                    <div className="layer-item-meta">
                      <span className={`zone-tag zone-tag-${item.zone}`}>
                        {item.zone === 'velours' ? 'Velours' : 'Circulaire'}
                      </span>
                      {item.rotation !== 0 && (
                        <span className="layer-item-rotation">
                          <RotateCw size={9} />
                          {item.rotation}°
                        </span>
                      )}
                      <span className="layer-item-z">
                        Plan {item.zIndex}
                      </span>
                    </div>
                  </div>

                  {/* Actions directes au niveau du calque */}
                  <div className="layer-item-tools" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="layer-tool-btn"
                      disabled={isTop}
                      onClick={() => onBringForward(item.id)}
                      title="Avancer d'un plan"
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      className="layer-tool-btn"
                      disabled={isBottom}
                      onClick={() => onSendBackward(item.id)}
                      title="Reculer d'un plan"
                    >
                      <ChevronDown size={13} />
                    </button>
                    <button
                      className="layer-tool-btn danger"
                      onClick={() => onRemove(item.id)}
                      title="Supprimer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Pied du panneau ───────────────────────────────────────────── */}
      <div className="right-panel-footer">
        <span className="footer-tip">
          💡 <strong>Astuce :</strong> Cliquez sur un calque pour le sélectionner et utilisez les flèches pour changer son plan.
        </span>
      </div>
    </aside>
  );
}
