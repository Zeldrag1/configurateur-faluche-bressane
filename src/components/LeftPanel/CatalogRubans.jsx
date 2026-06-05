import { useState } from 'react';
import { RUBANS_ASSO, RUBANS_VILLE, STATUTS_ASSO } from '../../data/falucheData';

/**
 * CatalogRubans — Liste des rubans d'association et de ville.
 * Onglets : Asso / Ville.
 * Les rubans d'association ont un sélecteur de statut (Membre, Bureau, Président, Doyen)
 * qui applique un liseré coloré distinctif sur le velours.
 */
export default function CatalogRubans({ onAdd }) {
  const [tab, setTab] = useState('asso');

  const rubans = tab === 'asso' ? RUBANS_ASSO : RUBANS_VILLE;

  return (
    <div>
      {/* Tabs asso / ville */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
        {[{ id: 'asso', label: "D'association" }, { id: 'ville', label: 'De ville' }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 4,
              cursor: 'pointer',
              border: '1px solid',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
              flex: 1,
              background: tab === t.id ? 'rgba(108,99,255,0.2)' : 'transparent',
              borderColor: tab === t.id ? 'rgba(108,99,255,0.6)' : 'var(--border)',
              color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Info tradition + légende statuts */}
      {tab === 'asso' && (
        <div style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          background: 'rgba(108,99,255,0.07)',
          border: '1px solid rgba(108,99,255,0.15)',
          borderRadius: 6,
          padding: '8px 10px',
          marginBottom: 10,
          lineHeight: 1.6,
        }}>
          💡 <strong style={{ color: 'var(--text-secondary)' }}>Tradition bressane</strong> —
          Les rubans d'asso sont placés sur le velours en biais et peuvent se croiser.
          Choisissez votre statut pour afficher un <em>liseré distinctif</em>.
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {STATUTS_ASSO.map(s => (
              <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 9 }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: s.borderColor ?? 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  flexShrink: 0,
                }} />
                {s.label} {s.icon ? <span>{s.icon}</span> : null}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Liste */}
      <div>
        {tab === 'asso' && <CustomAssociationRibbonCreator onAdd={onAdd} />}
        {tab === 'ville' && <CustomCityRibbonCreator onAdd={onAdd} />}
        {rubans.map(ruban => (
          <RubanRow
            key={ruban.id}
            ruban={ruban}
            type={tab === 'asso' ? 'ruban_asso' : 'ruban_ville'}
            showStatus={tab === 'asso'}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}

function CustomAssociationRibbonCreator({ onAdd }) {
  const [assoName, setAssoName] = useState('Mon Asso');
  const [pattern, setPattern] = useState('bicolore'); // bicolore, striped, braided
  const [color1, setColor1] = useState('#DC143C');
  const [color2, setColor2] = useState('#FFFFFF');
  const [color3, setColor3] = useState('#0000FF');
  const [selectedStatus, setSelectedStatus] = useState('actif');

  const currentStatut = STATUTS_ASSO.find(s => s.id === selectedStatus);

  const buildItemData = () => {
    let colors = [color1, color2];
    if (pattern === 'braided') {
      colors = [color1, color2, color3];
    }
    
    return {
      id: `ra_custom_${Date.now()}`,
      label: assoName || 'Association personnalisée',
      colors,
      type: 'ruban_asso',
      pattern: pattern === 'bicolore' ? null : pattern,
      defaultWidth: 130,
      defaultHeight: 20,
      status: selectedStatus,
      statusBorderColor: currentStatut?.borderColor ?? null,
      statusIcon: currentStatut?.icon ?? null,
    };
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
        🎗️ Nouveau ruban d'association
      </div>
      
      {/* Nom Asso */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Nom de l'association</label>
        <input
          type="text"
          value={assoName}
          onChange={(e) => setAssoName(e.target.value)}
          placeholder="Ex: BDE Bresse..."
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

      {/* Motif & Statut */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Motif</label>
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            style={{
              fontSize: 11,
              padding: '6px 10px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
          >
            <option value="bicolore">Bicolore</option>
            <option value="striped">Rayé</option>
            <option value="braided">Tressé</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Statut</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              fontSize: 11,
              padding: '6px 10px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
          >
            {STATUTS_ASSO.map(s => (
              <option key={s.id} value={s.id}>
                {s.icon ? `${s.icon} ` : ''}{s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Couleurs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 50px' }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Couleur 1</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{ width: 22, height: 22, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
            />
            <span style={{ fontSize: 8, fontFamily: 'monospace' }}>{color1.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 50px' }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Couleur 2</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{ width: 22, height: 22, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
            />
            <span style={{ fontSize: 8, fontFamily: 'monospace' }}>{color2.toUpperCase()}</span>
          </div>
        </div>

        {pattern === 'braided' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 50px' }}>
            <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Couleur 3</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
                style={{ width: 22, height: 22, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
              />
              <span style={{ fontSize: 8, fontFamily: 'monospace' }}>{color3.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Preview en direct */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>Aperçu :</span>
        <div
          className="ruban-preview"
          style={{
            flexShrink: 0,
            height: 14,
            width: 70,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: currentStatut?.borderColor
              ? `0 0 0 2px ${currentStatut.borderColor}`
              : 'none',
            outline: currentStatut?.borderColor
              ? `1px solid ${currentStatut.borderColor}88`
              : 'none',
            outlineOffset: '2px',
            background: pattern === 'striped'
              ? `linear-gradient(to bottom, ${color1} 30%, ${color2} 30%, ${color2} 70%, ${color1} 70%)`
              : pattern === 'braided'
              ? `repeating-linear-gradient(45deg, ${color1}, ${color1} 4px, ${color2} 4px, ${color2} 8px, ${color3} 8px, ${color3} 12px)`
              : undefined,
          }}
        >
          {pattern === 'bicolore' && [color1, color2].map((c, i) => (
            <div key={i} className="ruban-preview-half" style={{ backgroundColor: c, height: '100%', width: '50%', display: 'inline-block' }} />
          ))}
          {currentStatut?.icon && (
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 9,
              color: 'white',
              lineHeight: 1,
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.8))',
              pointerEvents: 'none',
            }}>
              {currentStatut.icon}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
        <button
          className="add-zone-btn add-zone-btn-v"
          onClick={() => onAdd(buildItemData(), 'velours')}
          style={{ width: '100%', padding: '6px 10px', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
        >
          Ajouter sur le Velours
        </button>
      </div>
    </div>
  );
}

function CustomCityRibbonCreator({ onAdd }) {
  const [cityName, setCityName] = useState('Bourg-en-Bresse');
  const [color1, setColor1] = useState('#006400');
  const [color2, setColor2] = useState('#000000');

  const buildItemData = () => ({
    id: `rv_custom_${Date.now()}`,
    label: cityName || 'Ville personnalisée',
    colors: [color1, color2],
    type: 'ruban_ville',
    defaultWidth: 110,
    defaultHeight: 16,
  });

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
        🏙️ Nouveau ruban de ville
      </div>
      
      {/* Input Ville */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Nom de la ville</label>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Ex: Bourg-en-Bresse..."
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

      {/* Couleurs */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Couleur 1</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{
                width: 24,
                height: 24,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                background: 'transparent',
              }}
            />
            <span style={{ fontSize: 9, fontFamily: 'monospace' }}>{color1.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <label style={{ fontSize: 9, color: 'var(--text-muted)' }}>Couleur 2</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{
                width: 24,
                height: 24,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                background: 'transparent',
              }}
            />
            <span style={{ fontSize: 9, fontFamily: 'monospace' }}>{color2.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Preview en direct */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>Aperçu :</span>
        <div className="ruban-preview" style={{ flexShrink: 0, height: 12, width: 60, borderRadius: 2, overflow: 'hidden' }}>
          <div className="ruban-preview-half" style={{ backgroundColor: color1 }} />
          <div className="ruban-preview-half" style={{ backgroundColor: color2 }} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
        <button
          className="add-zone-btn add-zone-btn-v"
          onClick={() => onAdd(buildItemData(), 'velours')}
          style={{ width: '100%', padding: '6px 10px', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
        >
          Ajouter sur le Velours
        </button>
      </div>
    </div>
  );
}

function RubanRow({ ruban, type, showStatus, onAdd }) {
  const [showBtns, setShowBtns] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('actif');

  const defaultW = type === 'ruban_asso' ? 130 : 110;
  const defaultH = type === 'ruban_asso' ? 20 : 16;

  const currentStatut = STATUTS_ASSO.find(s => s.id === selectedStatus);

  const buildItemData = () => ({
    ...ruban,
    type,
    defaultWidth: defaultW,
    defaultHeight: defaultH,
    status: showStatus ? selectedStatus : null,
    statusBorderColor: showStatus ? (currentStatut?.borderColor ?? null) : null,
    statusIcon: showStatus ? (currentStatut?.icon ?? null) : null,
  });

  return (
    <div
      className="ruban-item"
      onMouseEnter={() => setShowBtns(true)}
      onMouseLeave={() => setShowBtns(false)}
      style={{ flexDirection: 'column', gap: 6, padding: '8px 10px', alignItems: 'flex-start' }}
    >
      {/* Ligne principale : aperçu + nom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
        {/* Aperçu couleur */}
        <div className="ruban-preview" style={{ flexShrink: 0 }}>
          {ruban.colors.map((c, i) => (
            <div key={i} className="ruban-preview-half" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Nom */}
        <span className="ruban-label" title={ruban.label}>{ruban.label}</span>

        {/* Indicateur de statut (cercle coloré à droite) */}
        {showStatus && currentStatut?.borderColor && (
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: currentStatut.borderColor,
            flexShrink: 0,
            boxShadow: `0 0 4px ${currentStatut.borderColor}88`,
          }} />
        )}
      </div>

      {/* Sélecteur de statut (rubans d'asso uniquement) + boutons */}
      {showStatus && showBtns && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
          {/* Sélecteur statut */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              fontSize: 9,
              padding: '3px 6px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              color: 'var(--text-secondary)',
              fontFamily: 'inherit',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            {STATUTS_ASSO.map(s => (
              <option key={s.id} value={s.id} style={{ background: 'var(--bg-card)' }}>
                {s.icon ? `${s.icon} ` : ''}{s.label}
              </option>
            ))}
          </select>

          {/* Boutons d'ajout */}
          <div className="add-zone-btns" style={{ flexShrink: 0 }}>
            <button
              className="add-zone-btn add-zone-btn-v"
              onClick={() => onAdd(buildItemData(), 'velours')}
              title="Ajouter sur le velours"
              style={{ width: 'auto', padding: '3px 8px', fontSize: 9 }}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Boutons ville (sans statut) */}
      {!showStatus && showBtns && (
        <div className="add-zone-btns" style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
          <button
            className="add-zone-btn add-zone-btn-v"
            onClick={() => onAdd(buildItemData(), 'velours')}
            title="Ajouter sur le velours"
            style={{ width: 'auto', padding: '3px 8px', fontSize: 9 }}
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
}
