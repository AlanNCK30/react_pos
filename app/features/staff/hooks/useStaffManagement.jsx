import { useMemo, useState } from "react";

import {
  loadStaffItems,
  toggleStaffStatus,
  updateStaffItem,
} from "@/features/staff/data/staffRepository";
import {
  createDraftFromStaff,
  createEmptyStaffDraft,
  DEFAULT_STAFF_FILTERS,
  filterStaffItems,
  hasActiveStaffFilters,
  validateStaffDraft,
} from "@/features/staff/utils/staffHelpers";

export function useStaffManagement() {
  const [staffItems, setStaffItems] = useState(() => loadStaffItems());
  const [filters, setFilters] = useState(DEFAULT_STAFF_FILTERS);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDraft, setEditDraft] = useState(createEmptyStaffDraft());
  const [editErrors, setEditErrors] = useState({});
  const [editFeedback, setEditFeedback] = useState(null);
  const [statusDialogState, setStatusDialogState] = useState({
    open: false,
    staff: null,
    feedback: null,
  });

  const filteredStaffItems = useMemo(
    () => filterStaffItems(staffItems, filters),
    [staffItems, filters]
  );
  const hasActiveFilters = hasActiveStaffFilters(filters);

  function resetFilters() {
    setFilters(DEFAULT_STAFF_FILTERS);
  }

  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }

  function handleEditOpen(staff) {
    setEditDraft(createDraftFromStaff(staff));
    setEditErrors({});
    setEditFeedback(null);
    setEditDialogOpen(true);
  }

  function handleEditDialogChange(nextOpen) {
    setEditDialogOpen(nextOpen);

    if (!nextOpen) {
      setEditDraft(createEmptyStaffDraft());
      setEditErrors({});
      setEditFeedback(null);
    }
  }

  function handleEditDraftChange(field, value) {
    setEditDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));

    setEditErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setEditFeedback(null);
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    const { errors, values } = validateStaffDraft(editDraft, staffItems, {
      excludeStaffId: editDraft.id,
    });

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      setEditFeedback(null);
      return;
    }

    const result = updateStaffItem(editDraft.id, values);

    if (!result.ok) {
      setEditFeedback({
        type: "error",
        message: result.message,
      });
      return;
    }

    setStaffItems(result.items);
    setEditFeedback({
      type: "success",
      message: `${values.name} 已更新。`,
    });
  }

  function handleStatusDialogOpen(staff) {
    setStatusDialogState({
      open: true,
      staff,
      feedback: null,
    });
  }

  function handleStatusDialogChange(nextOpen) {
    setStatusDialogState((currentState) => ({
      ...currentState,
      open: nextOpen,
      staff: nextOpen ? currentState.staff : null,
      feedback: nextOpen ? currentState.feedback : null,
    }));
  }

  function handleToggleStaffStatus() {
    if (!statusDialogState.staff) {
      return;
    }

    const result = toggleStaffStatus(statusDialogState.staff.id);

    if (!result.ok) {
      setStatusDialogState((currentState) => ({
        ...currentState,
        feedback: {
          type: "error",
          message: result.message,
        },
      }));
      return;
    }

    const updatedStaff =
      result.items.find((staff) => staff.id === statusDialogState.staff.id) ?? null;

    setStaffItems(result.items);
    setStatusDialogState({
      open: true,
      staff: updatedStaff,
      feedback: {
        type: "success",
        message: result.message,
      },
    });
  }

  return {
    filters,
    filteredStaffItems,
    hasActiveFilters,
    editDialogOpen,
    editDraft,
    editErrors,
    editFeedback,
    statusDialogState,
    resetFilters,
    handleFilterChange,
    handleEditOpen,
    handleEditDialogChange,
    handleEditDraftChange,
    handleEditSubmit,
    handleStatusDialogOpen,
    handleStatusDialogChange,
    handleToggleStaffStatus,
  };
}
