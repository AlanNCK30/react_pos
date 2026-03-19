import { useEffect, useMemo, useState } from "react";

import { createDraftFromItem, createEmptyDraft, validateDraft } from "@/features/inventory/utils/draftHelpers";
import {
  DEFAULT_INVENTORY_FILTERS,
  buildSummary,
  filterInventoryItems,
  getLowStockItems,
  hasActiveInventoryFilters,
} from "@/features/inventory/utils/inventoryLogic";
import {
  loadInventoryItems,
  saveInventoryItems,
} from "@/features/inventory/data/inventoryRepository";

export function useInventory() {
  const [items, setItems] = useState(() => loadInventoryItems());
  const [filters, setFilters] = useState(DEFAULT_INVENTORY_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [draft, setDraft] = useState(createEmptyDraft());
  const [errors, setErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    saveInventoryItems(items);
  }, [items]);

  const filteredItems = useMemo(
    () => filterInventoryItems(items, filters),
    [items, filters]
  );
  const lowStockItems = useMemo(() => getLowStockItems(items), [items]);
  const summary = useMemo(() => buildSummary(items), [items]);
  const hasActiveFilters = useMemo(
    () => hasActiveInventoryFilters(filters),
    [filters]
  );

  function resetDraftState() {
    setDraft(createEmptyDraft());
    setErrors({});
  }

  function handleCreateOpen() {
    setFormMode("create");
    resetDraftState();
    setFormOpen(true);
  }

  function handleEditOpen(item) {
    setFormMode("edit");
    setDraft(createDraftFromItem(item));
    setErrors({});
    setFormOpen(true);
  }

  function handleFormOpenChange(nextOpen) {
    setFormOpen(nextOpen);

    if (!nextOpen) {
      resetDraftState();
    }
  }

  function handleDraftChange(field, value) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { errors: nextErrors, values } = validateDraft(draft);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const nextItem = {
      id: formMode === "edit" ? draft.id : `inv-${Date.now().toString(36)}`,
      ...values,
      updatedAt: new Date().toISOString(),
    };

    if (formMode === "edit") {
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === draft.id ? nextItem : item))
      );
    } else {
      setItems((currentItems) => [nextItem, ...currentItems]);
    }

    setFormOpen(false);
    resetDraftState();
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) {
      return;
    }

    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== deleteTarget.id)
    );
    setDeleteTarget(null);
  }

  function clearDeleteTarget() {
    setDeleteTarget(null);
  }

  function handleQueryChange(query) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      query,
    }));
  }

  function handleCategoryChange(category) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      category,
    }));
  }

  function handleStatusChange(status) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      status,
    }));
  }

  function resetFilters() {
    setFilters(DEFAULT_INVENTORY_FILTERS);
  }

  return {
    items,
    filteredItems,
    lowStockItems,
    summary,
    filters,
    hasActiveFilters,
    formOpen,
    formMode,
    draft,
    errors,
    deleteTarget,
    handleCreateOpen,
    handleEditOpen,
    handleFormOpenChange,
    handleDraftChange,
    handleSubmit,
    setDeleteTarget,
    clearDeleteTarget,
    handleDeleteConfirm,
    handleQueryChange,
    handleCategoryChange,
    handleStatusChange,
    resetFilters,
  };
}
