import { useRef, useEffect, useState } from 'react';
import PlacedItem from './PlacedItem';

/**
 * CirView — Vue du circulaire (ruban de filière déplié à plat).
 * Supporte le mode mono-filière et multi-filières segmenté (côte à côte à la suite).
 *
 * Utilise un ResizeObserver pour connaître ses dimensions exactes
 * et les passer à PlacedItem pour la conversion % ↔ px.
 */
export default function CirView({
  items,
  filiereColor,
  filiereName,
  filiereTexture,
  segments = [],
  selectedId,
  onSelect,
  onUpdate,
  onRemove,
  onBringForward,
  onSendBackward,
  onClearSelection,
}) {
  const rectRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ w: 600, h: 80 });

  useEffect(() => {
    const el = rectRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setContainerSize({ w: width, h: height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cirItems = items.filter(i => i.zone === 'circulaire');

  // Segments actifs : soit la liste multi-filières transmise, soit la filière principale unique
  const activeSegments = segments.length > 0
    ? segments
    : [{
        color: filiereColor || '#1a1a1a',
        label: filiereName || 'Filière non choisie',
        texture: filiereTexture || 'velours',
      }];

  return (
    <div className="circulaire-container" onClick={onClearSelection}>
      <div
        ref={rectRef}
        className="circulaire-rect"
        style={{ position: 'relative', overflow: 'visible' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Segments de fond de filière (côte à côte / chacun sa place) ── */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none', borderRadius: 6, overflow: 'hidden', zIndex: 1 }}>
          {activeSegments.map((seg, idx) => {
            const isSatin = seg.texture === 'satin';
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  background: seg.color,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Texture — velours (stries) ou satin (reflets diagonaux) */}
                {isSatin ? (
                  <div className="circulaire-texture-satin" />
                ) : (
                  <div className="circulaire-texture-velours" />
                )}

                {/* Reflet de brillance haut */}
                <div className="circulaire-highlight" />

                {/* Couture séparatrice réaliste entre deux filières cousues à la suite */}
                {idx < activeSegments.length - 1 && (
                  <div className="circulaire-seam" />
                )}

                {/* Label filière au bas du segment */}
                <div className="circulaire-label" style={{ right: 8, bottom: 4 }}>
                  {seg.label}{seg.texture ? ` · ${seg.texture}` : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Zone de dépôt ────────────────────────────────────────────── */}
        {cirItems.length === 0 && (
          <div className="drop-hint" style={{ fontSize: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
              <rect x="3" y="8" width="18" height="8" rx="2"/>
            </svg>
            <span>Ajoutez des insignes sur le circulaire</span>
          </div>
        )}

        {/* ── Éléments placés (insignes, rubans, etc.) ─────────────────── */}
        {cirItems.map(item => (
          <PlacedItem
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onBringForward={onBringForward}
            onSendBackward={onSendBackward}
            containerW={containerSize.w}
            containerH={containerSize.h}
          />
        ))}
      </div>
    </div>
  );
}
