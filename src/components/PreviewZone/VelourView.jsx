import { useRef, useEffect, useState } from 'react';
import PlacedItem from './PlacedItem';

/**
 * VelourView — Disque noir représentant la vue de dessus (velours) de la faluche.
 *
 * Le disque a position: relative — les PlacedItem y sont positionnés en absolu.
 * Les coordonnées x,y (en %) sont converties en pixels via discSize.
 *
 * Divisions en 3 sections pointillées :
 *   Personnelle (0–120°), Divers (120–240°), Officielle (240–360°)
 */
export default function VelourView({
  items,
  selectedId,
  onSelect,
  onUpdate,
  onRemove,
  onBringForward,
  onSendBackward,
  onClearSelection,
}) {
  const containerRef = useRef(null);
  const [discSize, setDiscSize] = useState(400);

  // Calcul dynamique du disque — 92% de l'espace disponible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const { width, height } = el.getBoundingClientRect();
      setDiscSize(Math.min(width, height) * 0.92);
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const velourItems = items.filter(i => i.zone === 'velours');
  const r = discSize / 2;

  // Point sur le cercle (angle en degrés, 0° = 12h)
  const pt = (angleDeg, radius = r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: r + radius * Math.cos(rad), y: r + radius * Math.sin(rad) };
  };

  const sectionAngles = [0, 120, 240];
  const sectionLabels = [
    { angle: 60,  label: 'PERSONNELLE' },
    { angle: 180, label: 'DIVERS'      },
    { angle: 300, label: 'OFFICIELLE'  },
  ];

  return (
    <div
      className="velours-container"
      ref={containerRef}
      onClick={onClearSelection}
    >
      <div
        className="velours-disc"
        style={{ width: discSize, height: discSize, position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Overlay SVG sections (pointer-events: none) ──────────────── */}
        <svg
          width={discSize}
          height={discSize}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
        >
          {sectionAngles.map((angle) => {
            const inner = pt(angle, r * 0.06);
            const outer = pt(angle, r * 0.97);
            return (
              <line
                key={angle}
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                strokeDasharray="5,4"
              />
            );
          })}
          {sectionLabels.map(({ angle, label }) => {
            const pos = pt(angle, r * 0.60);
            return (
              <text
                key={label}
                x={pos.x} y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={Math.max(7, discSize * 0.026)}
                fill="rgba(255,255,255,0.1)"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                letterSpacing="0.15em"
                transform={`rotate(${angle}, ${pos.x}, ${pos.y})`}
              >
                {label}
              </text>
            );
          })}
        </svg>

        {/* ── Zone de dépôt avec position: relative ────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
          }}
        >
          {velourItems.length === 0 && (
            <div className="drop-hint">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              <span>Cliquez sur un insigne ou ruban<br/>pour l'ajouter ici</span>
            </div>
          )}

          {velourItems.map(item => {
            const velourBureauRibbons = velourItems.filter(i => i.type === 'ruban_asso' && i.status === 'bureau');
            const assoIndex = (item.type === 'ruban_asso' && item.status === 'bureau')
              ? velourBureauRibbons.findIndex(i => i.id === item.id)
              : 0;
            return (
              <PlacedItem
                key={item.id}
                item={item}
                assoIndex={assoIndex}
                isSelected={selectedId === item.id}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onRemove={onRemove}
                onBringForward={onBringForward}
                onSendBackward={onSendBackward}
                containerW={discSize}
                containerH={discSize}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
