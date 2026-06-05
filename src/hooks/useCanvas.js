import { useState, useCallback, useEffect } from 'react';


/**
 * useCanvas — Hook d'état central pour les éléments placés sur le configurateur.
 *
 * Coordonnées : x et y sont stockés en POURCENTAGE (0–100) du conteneur parent.
 * Cela garantit que les éléments restent au bon endroit même si la fenêtre est
 * redimensionnée ou si le navigateur est zoomé.
 *
 * Dimensions : width et height sont stockés en pixels absolus.
 */
export function useCanvas() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // ── Ajout d'un élément dans une zone ──────────────────────────────────────
  const addItem = useCallback((itemData, zone = 'velours') => {
    const id = `item-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    const maxZ = items.reduce((m, i) => Math.max(m, i.zIndex), 0);

    let x = 15 + Math.random() * 30;
    let y = 15 + Math.random() * 30;

    if ((itemData.type === 'ruban_asso' || itemData.type === 'ruban_ville') && zone === 'velours') {
      x = 0;
      y = 0;
    }

    const newItem = {
      id,
      zone,
      type: itemData.type,             // 'insigne' | 'ruban_asso' | 'ruban_ville' | 'ecusson_ville'
      dataId: itemData.id,
      label: itemData.label,
      // Visuel
      svg: itemData.svg ?? null,
      colors: itemData.colors ?? null,
      pattern: itemData.pattern ?? null,
      text: itemData.text ?? null,
      color: itemData.color ?? null,
      // Statut (pour les rubans d'association)
      status: itemData.status ?? null,
      statusBorderColor: itemData.statusBorderColor ?? null,
      statusIcon: itemData.statusIcon ?? null,
      // Géométrie — x, y en % du conteneur (0–100), width/height en px
      x,
      y,
      width: itemData.defaultWidth ?? 80,
      height: itemData.defaultHeight ?? 24,
      rotation: 0,
      zIndex: maxZ + 1,
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

  // ── Z-index : monter d'un cran ─────────────────────────────────────────────
  const bringForward = useCallback((id) => {
    setItems(prev => {
      const sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex(i => i.id === id);
      if (idx === sorted.length - 1) return prev;
      const above = sorted[idx + 1];
      return prev.map(item => {
        if (item.id === id) return { ...item, zIndex: above.zIndex };
        if (item.id === above.id) return { ...item, zIndex: sorted[idx].zIndex };
        return item;
      });
    });
  }, []);

  // ── Z-index : descendre d'un cran ─────────────────────────────────────────
  const sendBackward = useCallback((id) => {
    setItems(prev => {
      const sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex(i => i.id === id);
      if (idx === 0) return prev;
      const below = sorted[idx - 1];
      return prev.map(item => {
        if (item.id === id) return { ...item, zIndex: below.zIndex };
        if (item.id === below.id) return { ...item, zIndex: sorted[idx].zIndex };
        return item;
      });
    });
  }, []);

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
    bringForward,
    sendBackward,
    selectItem,
    clearSelection,
  };
}
