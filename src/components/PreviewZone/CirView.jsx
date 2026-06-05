import { useRef, useEffect, useState } from 'react';
import PlacedItem from './PlacedItem';

/**
 * CirView — Vue du circulaire (ruban de filière déplié à plat).
 * Simple bande horizontale dont la couleur change selon la filière.
 *
 * Utilise un ResizeObserver pour connaître ses dimensions exactes
 * et les passer à PlacedItem pour la conversion % ↔ px.
 */
export default function CirView({
  items,
  filiereColor,
  filiereName,
  filiereTexture,
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
  const isSatin = filiereTexture === 'satin';

  return (
    <div className="circulaire-container" onClick={onClearSelection}>
      <div
        ref={rectRef}
        className="circulaire-rect"
        style={{ background: filiereColor, position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Texture — velours (stries verticales) ou satin (reflet diagonal) */}
        {isSatin ? (
          <div className="circulaire-texture-satin" />
        ) : (
          <div className="circulaire-texture-velours" />
        )}

        {/* Reflet haut */}
        <div className="circulaire-highlight" />

        {/* Zone de dépôt */}
        {cirItems.length === 0 && (
          <div className="drop-hint" style={{ fontSize: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
              <rect x="3" y="8" width="18" height="8" rx="2"/>
            </svg>
            <span>Ajoutez des insignes sur le circulaire</span>
          </div>
        )}

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

        {/* Label filière */}
        <div className="circulaire-label">
          {filiereName || 'Filière non choisie'}{filiereTexture ? ` · ${filiereTexture}` : ''}
        </div>
      </div>
    </div>
  );
}
