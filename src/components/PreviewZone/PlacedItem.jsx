import { useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import AssociationRibbon from './AssociationRibbon';
import CityRibbon from './CityRibbon';

/**
 * PlacedItem — Wrapper react-rnd pour un élément placé sur le canvas.
 *
 * IMPORTANT — Séparation claire des responsabilités CSS :
 *   • <Rnd>            : gère la POSITION (left/top) et la TAILLE via react-draggable.
 *                        On ne touche PAS à transform ici, sinon conflit avec le drag.
 *   • .placed-item-inner : gère la ROTATION via transform: rotate(Xdeg).
 *                        Séparé du Rnd pour éviter tout conflit.
 *
 * Coordonnées x, y en pourcentage (0–100) du conteneur parent.
 * Conversion px ↔ % via containerW / containerH.
 */
export default function PlacedItem({
  item,
  assoIndex,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  onBringForward,
  onSendBackward,
  containerW,
  containerH,
}) {
  const isRuban = item.type === 'ruban_asso' || item.type === 'ruban_ville';
  const isVeloursLocked = (item.type === 'ruban_asso' || item.type === 'ruban_ville') && item.zone === 'velours';
  const isVeloursAsso = item.type === 'ruban_asso' && item.zone === 'velours';
  const isVeloursCity = item.type === 'ruban_ville' && item.zone === 'velours';
  const hasStatusBorder = item.type === 'ruban_asso' && item.statusBorderColor;

  // ── Conversion % → px pour l'affichage ───────────────────────────────────
  const pxX = isVeloursLocked ? 0 : (item.x / 100) * containerW;
  const pxY = isVeloursLocked ? 0 : (item.y / 100) * containerH;

  const width = isVeloursLocked ? containerW : item.width;
  const height = isVeloursLocked ? containerH : item.height;

  // ── Drag stop : pixels → % ────────────────────────────────────────────────
  const handleDragStop = useCallback((e, d) => {
    if (isVeloursLocked) return;
    onUpdate(item.id, {
      x: (d.x / containerW) * 100,
      y: (d.y / containerH) * 100,
    });
  }, [item.id, onUpdate, containerW, containerH, isVeloursLocked]);

  // ── Resize stop : pixels → % ──────────────────────────────────────────────
  const handleResizeStop = useCallback((e, dir, ref, delta, pos) => {
    if (isVeloursLocked) return;
    onUpdate(item.id, {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      x: Math.max(0, Math.min(100, (pos.x / containerW) * 100)),
      y: Math.max(0, Math.min(100, (pos.y / containerH) * 100)),
    });
  }, [item.id, onUpdate, containerW, containerH, isVeloursLocked]);

  return (
    <Rnd
      size={{ width, height }}
      position={{ x: pxX, y: pxY }}
      style={{
        // ⚠️ PAS de transform ici — react-draggable gère son propre transform
        // pour le drag. Tout transform ici causerait un conflit.
        zIndex: item.zIndex,
        pointerEvents: isVeloursLocked ? 'none' : 'auto',
      }}
      onDragStart={(e) => { e.stopPropagation(); onSelect(item.id); }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds={isVeloursLocked ? undefined : "parent"}
      enableResizing={isVeloursLocked ? false : isSelected}
      disableDragging={isVeloursLocked}
    >
      {/* ── Toolbar flottante — NON rotée, reste dans l'espace écran ─────── */}
      {isSelected && (
        <div className="item-toolbar" onClick={(e) => e.stopPropagation()} style={{ pointerEvents: 'auto' }}>
          <button
            className="toolbar-btn"
            title="Monter (z-index)"
            onClick={(e) => { e.stopPropagation(); onBringForward(item.id); }}
          >
            <ArrowUp size={13} />
          </button>
          <button
            className="toolbar-btn"
            title="Descendre (z-index)"
            onClick={(e) => { e.stopPropagation(); onSendBackward(item.id); }}
          >
            <ArrowDown size={13} />
          </button>
          <div className="toolbar-divider" />
          <button
            className="toolbar-btn danger"
            title="Supprimer (Suppr)"
            onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}

      {/* ── Contenu — rotation appliquée ICI, pas sur Rnd ────────────────── */}
      <div
        className={`placed-item-inner ${isSelected ? 'selected' : ''} ${isVeloursLocked ? 'velours-asso' : ''}`}
        onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}
        style={{
          // La rotation est ici, isolée du mécanisme de drag de react-rnd
          transform: `rotate(${item.rotation}deg)`,
          transformOrigin: 'center center',
          pointerEvents: 'auto',
        }}
      >
        {/* Insigne SVG */}
        {item.type === 'insigne' && item.svg && (
          <div
            className="placed-insigne"
            dangerouslySetInnerHTML={{ __html: item.svg }}
          />
        )}

        {/* Écusson de ville SVG */}
        {item.type === 'ecusson_ville' && item.svg && (
          <div
            className="placed-ecusson"
            dangerouslySetInnerHTML={{ __html: item.svg }}
          />
        )}

        {/* Texte / Surnom / Initiales */}
        {item.type === 'text' && (
          <div
            style={{
              color: item.color || '#FFD700',
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: '18px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              letterSpacing: '0.05em',
              textShadow: item.color === '#C0C0C0'
                ? '0 1px 0 #999, 0 2px 0 #777, 0 3px 4px rgba(0,0,0,0.7)'
                : '0 1px 0 #B8860B, 0 2px 0 #8B6508, 0 3px 4px rgba(0,0,0,0.7)',
            }}
          >
            {item.text}
          </div>
        )}

        {/* Ruban d'association sur le velours */}
        {isVeloursAsso && (
          <AssociationRibbon status={item.status} colors={item.colors} index={assoIndex} pattern={item.pattern} />
        )}

        {/* Ruban de ville sur le velours (forme en V) */}
        {isVeloursCity && (
          <CityRibbon colors={item.colors} />
        )}

        {/* Ruban bicolore standard */}
        {isRuban && !isVeloursLocked && item.colors && (
          <div
            className="placed-ruban"
            style={{
              boxShadow: hasStatusBorder
                ? `0 0 0 2px ${item.statusBorderColor}, 0 2px 8px rgba(0,0,0,0.5)`
                : '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              outline: hasStatusBorder
                ? `1px solid ${item.statusBorderColor}88`
                : 'none',
              outlineOffset: '2px',
              background: item.pattern === 'striped'
                ? `linear-gradient(to bottom, ${item.colors[0]} 30%, ${item.colors[1]} 30%, ${item.colors[1]} 70%, ${item.colors[0]} 70%)`
                : item.pattern === 'braided'
                ? `repeating-linear-gradient(45deg, ${item.colors[0]}, ${item.colors[0]} 6px, ${item.colors[1]} 6px, ${item.colors[1]} 12px, ${item.colors[2]} 12px, ${item.colors[2]} 18px)`
                : undefined,
            }}
          >
            {!item.pattern && item.colors.map((color, i) => (
              <div key={i} className="placed-ruban-half" style={{ backgroundColor: color }} />
            ))}
            {/* Icône de statut */}
            {item.statusIcon && (
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: Math.max(8, item.height * 0.55),
                lineHeight: 1,
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
                pointerEvents: 'none',
              }}>
                {item.statusIcon}
              </div>
            )}
          </div>
        )}
      </div>
    </Rnd>
  );
}
