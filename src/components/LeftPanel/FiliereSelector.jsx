import { FILIERES, FILIERE_GROUPS } from '../../data/filieres';
import { INSIGNES } from '../../data/insignes';
import { Plus, Trash2, Layers, Columns } from 'lucide-react';

/**
 * FiliereSelector — Gestionnaire complet des filières (principale et secondaires).
 * Permet d'afficher les filières :
 *   1. "À la suite" : le circulaire est découpé en segments côte à côte cousus.
 *   2. "Ruban superposé" : un ruban de filière est posé par-dessus le circulaire.
 */
export default function FiliereSelector({
  filiereId,
  primaryFiliereId,
  onChange,
  onPrimaryChange,
  secondaryFilieres = [],
  onAddSecondary,
  onUpdateSecondary,
  onRemoveSecondary,
  onAddEmbleme,
  onAddRibbonOverlay,
}) {
  const currentPrimaryId = primaryFiliereId !== undefined ? primaryFiliereId : filiereId;
  const handlePrimaryChange = onPrimaryChange || onChange;

  const primaryFiliere = FILIERES.find(f => f.id === currentPrimaryId);
  const primaryInsigne = primaryFiliere?.defaultEmblemeId
    ? INSIGNES.find(i => i.id === primaryFiliere.defaultEmblemeId)
    : null;

  return (
    <div className="panel-section">
      {/* ── Filière principale ────────────────────────────────────────── */}
      <div className="panel-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Filière d'origine (Principale)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {primaryFiliere && (
          <span
            className="filiere-color-badge"
            style={{
              background: primaryFiliere.color,
              boxShadow: '0 0 6px rgba(0,0,0,0.4)',
            }}
          />
        )}
        <select
          className="filiere-select"
          value={currentPrimaryId}
          onChange={e => handlePrimaryChange(e.target.value)}
          id="filiere-select"
        >
          <option value="">— Choisir sa filière principale —</option>
          {FILIERE_GROUPS.map(group => {
            const groupFilieres = FILIERES.filter(f => f.groupId === group.id);
            if (groupFilieres.length === 0) return null;
            return (
              <optgroup key={group.id} label={`${group.label} (${groupFilieres.length})`}>
                {groupFilieres.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </div>

      {primaryFiliere && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Badge texture */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: primaryFiliere.texture === 'velours' ? 'rgba(108,99,255,0.15)' : 'rgba(255,107,157,0.15)',
              border: `1px solid ${primaryFiliere.texture === 'velours' ? 'rgba(108,99,255,0.35)' : 'rgba(255,107,157,0.35)'}`,
              borderRadius: 4, padding: '2px 8px',
              color: primaryFiliere.texture === 'velours' ? 'var(--accent)' : 'var(--accent-2)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {primaryFiliere.texture}
            </span>
          </div>

          {/* Emblème requis */}
          <div style={{
            fontSize: 10.5,
            color: 'var(--text-secondary)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '7px 9px',
            lineHeight: 1.4,
          }}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 2 }}>
              Emblème officiel
            </div>
            <div style={{ color: 'var(--gold)', fontWeight: 600 }}>
              ✦ {primaryFiliere.embleme}
            </div>

            {primaryInsigne && onAddEmbleme && (
              <button
                type="button"
                onClick={() => onAddEmbleme({ ...primaryInsigne, type: 'insigne' })}
                style={{
                  marginTop: 6,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  background: 'rgba(255, 215, 0, 0.12)',
                  border: '1px solid rgba(255, 215, 0, 0.35)',
                  borderRadius: 4,
                  padding: '4px 8px',
                  color: 'var(--gold)',
                  fontSize: 10,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                }}
              >
                <Plus size={12} />
                <span>Placer l'insigne sur le circulaire</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Filières secondaires (Double cursus / Changement) ─────────── */}
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px dashed var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            Cursus supplémentaire
          </span>
          {onAddSecondary && (
            <button
              type="button"
              onClick={onAddSecondary}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 9.5,
                fontWeight: 600,
                color: 'var(--accent)',
                background: 'rgba(108,99,255,0.12)',
                border: '1px solid rgba(108,99,255,0.3)',
                borderRadius: 4,
                padding: '2px 7px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              title="Ajouter une 2ème filière (changement ou double cursus)"
            >
              <Plus size={11} />
              <span>+ 2e filière</span>
            </button>
          )}
        </div>

        {secondaryFilieres.map((sec, idx) => {
          const secFiliere = FILIERES.find(f => f.id === sec.filiereId);
          const secInsigne = secFiliere?.defaultEmblemeId
            ? INSIGNES.find(i => i.id === secFiliere.defaultEmblemeId)
            : null;

          return (
            <div
              key={sec.id || idx}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '8px',
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {secFiliere && (
                  <span
                    className="filiere-color-badge"
                    style={{
                      background: secFiliere.color,
                      boxShadow: '0 0 4px rgba(0,0,0,0.4)',
                    }}
                  />
                )}
                <select
                  className="filiere-select"
                  style={{ fontSize: 11, padding: '6px 24px 6px 8px' }}
                  value={sec.filiereId || ''}
                  onChange={e => onUpdateSecondary && onUpdateSecondary(sec.id, { filiereId: e.target.value })}
                >
                  <option value="">— Choisir la 2ème filière —</option>
                  {FILIERE_GROUPS.map(group => {
                    const groupFilieres = FILIERES.filter(f => f.groupId === group.id);
                    if (groupFilieres.length === 0) return null;
                    return (
                      <optgroup key={group.id} label={group.label}>
                        {groupFilieres.map(f => (
                          <option key={f.id} value={f.id}>{f.label}</option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
                {onRemoveSecondary && (
                  <button
                    type="button"
                    onClick={() => onRemoveSecondary(sec.id)}
                    style={{
                      border: 'none',
                      background: 'rgba(220,20,60,0.15)',
                      color: '#DC143C',
                      borderRadius: 4,
                      width: 26,
                      height: 26,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    title="Supprimer cette filière secondaire"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              {secFiliere && (
                <>
                  {/* Mode de disposition */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <button
                      type="button"
                      onClick={() => onUpdateSecondary && onUpdateSecondary(sec.id, { mode: 'segment' })}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        fontSize: 9,
                        fontWeight: 600,
                        padding: '4px',
                        borderRadius: 4,
                        border: '1px solid',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        background: (sec.mode || 'segment') === 'segment' ? 'rgba(108,99,255,0.2)' : 'var(--bg-card)',
                        borderColor: (sec.mode || 'segment') === 'segment' ? 'var(--accent)' : 'var(--border)',
                        color: (sec.mode || 'segment') === 'segment' ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                      title="Chacun sa place : le circulaire est divisé en segments côte à côte"
                    >
                      <Columns size={11} />
                      <span>À la suite (segment)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateSecondary && onUpdateSecondary(sec.id, { mode: 'overlay' })}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        fontSize: 9,
                        fontWeight: 600,
                        padding: '4px',
                        borderRadius: 4,
                        border: '1px solid',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        background: sec.mode === 'overlay' ? 'rgba(255,107,157,0.2)' : 'var(--bg-card)',
                        borderColor: sec.mode === 'overlay' ? 'var(--accent-2)' : 'var(--border)',
                        color: sec.mode === 'overlay' ? 'var(--accent-2)' : 'var(--text-secondary)',
                      }}
                      title="Ruban superposé par-dessus la filière principale"
                    >
                      <Layers size={11} />
                      <span>Ruban superposé</span>
                    </button>
                  </div>

                  <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    {(sec.mode || 'segment') === 'segment'
                      ? '✦ Le circulaire est découpé avec une couture : chacun sa place.'
                      : '✦ Un ruban mobile de cette filière est posé par-dessus le circulaire.'}
                  </div>

                  {/* Actions directes */}
                  <div style={{ display: 'flex', gap: 4 }}>
                    {sec.mode === 'overlay' && onAddRibbonOverlay && (
                      <button
                        type="button"
                        onClick={() => onAddRibbonOverlay(secFiliere)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                          background: 'rgba(255,107,157,0.12)',
                          border: '1px solid rgba(255,107,157,0.3)',
                          borderRadius: 4,
                          padding: '3px 6px',
                          color: 'var(--accent-2)',
                          fontSize: 9.5,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        <Plus size={11} />
                        <span>Poser le ruban</span>
                      </button>
                    )}

                    {secInsigne && onAddEmbleme && (
                      <button
                        type="button"
                        onClick={() => onAddEmbleme({ ...secInsigne, type: 'insigne' })}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                          background: 'rgba(255,215,0,0.12)',
                          border: '1px solid rgba(255,215,0,0.3)',
                          borderRadius: 4,
                          padding: '3px 6px',
                          color: 'var(--gold)',
                          fontSize: 9.5,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        <Plus size={11} />
                        <span>Poser l'insigne</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
