import { useState, useCallback, useEffect } from 'react';

/**
 * useCanvas — Hook d'état central pour les éléments placés sur le configurateur.
 *
 * Coordonnées : x et y sont stockés en POURCENTAGE (0–100) du conteneur parent.
 * Dimensions : width et height sont stockés en pixels absolus.
 * zIndex : géré par zone (velours / circulaire) pour un ordonnancement prévisible des calques.
 */
export function useCanvas() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // ── Ajout d'un élément dans une zone ──────────────────────────────────────
  const addItem = useCallback((itemData, zone = 'velours') => {
    const id = `item-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    const zoneItems = items.filter(i => i.zone === zone);
    const maxZ = zoneItems.reduce((m, i) => Math.max(m, i.zIndex ?? 0), 0);

    const itemType = itemData.type || (itemData.svg ? (itemData.category === 'ecussons' ? 'ecusson_ville' : 'insigne') : (itemData.text ? 'text' : 'insigne'));

    let width = itemData.defaultWidth ?? (itemType === 'insigne' ? 45 : 80);
    let height = itemData.defaultHeight ?? (itemType === 'insigne' ? 45 : 24);

    let x = 15 + Math.random() * 30;
    let y = 15 + Math.random() * 30;

    if (zone === 'circulaire') {
      y = 18;
      if (itemType === 'insigne' && height > 44) {
        const scale = 42 / height;
        width = Math.round(width * scale);
        height = 42;
      }
    }

    if ((itemType === 'ruban_asso' || itemType === 'ruban_ville') && zone === 'velours') {
      x = 0;
      y = 0;
    }

    const newItem = {
      id,
      zone,
      type: itemType,             // 'insigne' | 'ruban_asso' | 'ruban_ville' | 'ecusson_ville' | 'text' | 'ruban_filiere'
      dataId: itemData.id,
      label: itemData.label,
      // Visuel
      svg: itemData.svg ?? null,
      colors: itemData.colors ?? null,
      pattern: itemData.pattern ?? null,
      text: itemData.text ?? null,
      color: itemData.color ?? null,
      texture: itemData.texture ?? null,
      filiereName: itemData.filiereName ?? null,
      // Statut (pour les rubans d'association)
      status: itemData.status ?? null,
      statusBorderColor: itemData.statusBorderColor ?? null,
      statusIcon: itemData.statusIcon ?? null,
      // Géométrie — x, y en % du conteneur (0–100), width/height en px
      x,
      y,
      width,
      height,
      rotation: 0,
      zIndex: Math.max(10, maxZ + 1),
    };
    setItems(prev => [...prev, newItem]);
    setSelectedId(id);
    return id;
  }, [items]);

  // ── Mise à jour partielle d'un élément ────────────────────────────────────
  const updateItem = useCallback((id, patch) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item));
  }, []);

  // ── Suppression ───────────────────────────────────────────────────────────
  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setSelectedId(prev => prev === id ? null : prev);
  }, []);

  // ── Duplication d'un élément ──────────────────────────────────────────────
  const duplicateItem = useCallback((id) => {
    setItems(prev => {
      const target = prev.find(i => i.id === id);
      if (!target) return prev;
      const newId = `item-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      const zoneItems = prev.filter(i => i.zone === target.zone);
      const maxZ = zoneItems.reduce((m, i) => Math.max(m, i.zIndex ?? 0), 0);

      const isLocked = (target.type === 'ruban_asso' || target.type === 'ruban_ville') && target.zone === 'velours';
      const duplicated = {
        ...target,
        id: newId,
        x: isLocked ? 0 : Math.min(90, target.x + 3),
        y: isLocked ? 0 : Math.min(90, target.y + 3),
        zIndex: maxZ + 1,
      };
      setSelectedId(newId);
      return [...prev, duplicated];
    });
  }, []);

  // ── Helper interne : réordonner au sein de la même zone ───────────────────
  const reorderZone = useCallback((id, transformList) => {
    setItems(prev => {
      const target = prev.find(i => i.id === id);
      if (!target) return prev;

      // Éléments de la même zone, triés par zIndex croissant
      const zoneItems = prev
        .filter(i => i.zone === target.zone)
        .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

      const newZoneList = transformList([...zoneItems], target);
      if (!newZoneList) return prev;

      // Normaliser les zIndex : 1, 2, 3...
      const zIndexMap = new Map();
      newZoneList.forEach((item, index) => {
        zIndexMap.set(item.id, index + 1);
      });

      return prev.map(item => {
        if (zIndexMap.has(item.id)) {
          return { ...item, zIndex: zIndexMap.get(item.id) };
        }
        return item;
      });
    });
  }, []);

  // ── Z-index : monter d'un cran (avancer de plan) ──────────────────────────
  const bringForward = useCallback((id) => {
    reorderZone(id, (list, target) => {
      const idx = list.findIndex(i => i.id === target.id);
      if (idx === -1 || idx === list.length - 1) return null;
      const next = list[idx + 1];
      list[idx + 1] = list[idx];
      list[idx] = next;
      return list;
    });
  }, [reorderZone]);

  // ── Z-index : descendre d'un cran (reculer de plan) ───────────────────────
  const sendBackward = useCallback((id) => {
    reorderZone(id, (list, target) => {
      const idx = list.findIndex(i => i.id === target.id);
      if (idx <= 0) return null;
      const prev = list[idx - 1];
      list[idx - 1] = list[idx];
      list[idx] = prev;
      return list;
    });
  }, [reorderZone]);

  // ── Z-index : mettre tout au premier plan ─────────────────────────────────
  const bringToFront = useCallback((id) => {
    reorderZone(id, (list, target) => {
      const idx = list.findIndex(i => i.id === target.id);
      if (idx === -1 || idx === list.length - 1) return null;
      const [item] = list.splice(idx, 1);
      list.push(item);
      return list;
    });
  }, [reorderZone]);

  // ── Z-index : mettre tout à l'arrière-plan ─────────────────────────────────
  const sendToBack = useCallback((id) => {
    reorderZone(id, (list, target) => {
      const idx = list.findIndex(i => i.id === target.id);
      if (idx <= 0) return null;
      const [item] = list.splice(idx, 1);
      list.unshift(item);
      return list;
    });
  }, [reorderZone]);

  // ── Sélection ─────────────────────────────────────────────────────────────
  const selectItem = useCallback((id) => setSelectedId(id), []);
  const clearSelection = useCallback(() => setSelectedId(null), []);

  // ── Touche Suppr ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        if (document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'SELECT' ||
            document.activeElement.tagName === 'TEXTAREA') return;
        removeItem(selectedId);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedId, removeItem]);

  return {
    items,
    selectedId,
    addItem,
    updateItem,
    removeItem,
    duplicateItem,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    selectItem,
    clearSelection,
  };
}
