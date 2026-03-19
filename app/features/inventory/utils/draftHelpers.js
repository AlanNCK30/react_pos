import { INVENTORY_CATEGORIES } from "@/data/inventory";
function createEmptyDraft() {
    return {
        id: "",
        name: "",
        category: INVENTORY_CATEGORIES[0],
        unit: "",
        currentStock: "0",
        parLevel: "0",
        reorderThreshold: "0",
        notes: "",
    };
}

function createDraftFromItem(item) {
    return {
        id: item.id,
        name: item.name,
        category: item.category,
        unit: item.unit,
        currentStock: String(item.currentStock),
        parLevel: String(item.parLevel),
        reorderThreshold: String(item.reorderThreshold),
        notes: item.notes ?? "",
    };
}

function validateDraft(draft) {
    const nextErrors = {};
    const numberFields = ["currentStock", "parLevel", "reorderThreshold"];
    const parsedNumbers = {};

    if (!draft.name.trim()) {
        nextErrors.name = "請輸入項目名稱。";
    }

    if (!draft.unit.trim()) {
        nextErrors.unit = "請輸入單位。";
    }

    numberFields.forEach((field) => {
        const rawValue = String(draft[field]).trim();

        if (!/^\d+$/.test(rawValue)) {
            nextErrors[field] = "請輸入大於或等於 0 的整數。";
            return;
        }

        parsedNumbers[field] = Number.parseInt(rawValue, 10);
    });

    if (
        parsedNumbers.reorderThreshold !== undefined &&
        parsedNumbers.parLevel !== undefined &&
        parsedNumbers.reorderThreshold > parsedNumbers.parLevel
    ) {
        nextErrors.reorderThreshold = "補貨門檻不可高於標準存量。";
    }

    return {
        errors: nextErrors,
        values: {
            name: draft.name.trim(),
            category: draft.category,
            unit: draft.unit.trim(),
            currentStock: parsedNumbers.currentStock,
            parLevel: parsedNumbers.parLevel,
            reorderThreshold: parsedNumbers.reorderThreshold,
            notes: draft.notes.trim(),
        },
    };
}

export { createEmptyDraft, createDraftFromItem, validateDraft };
