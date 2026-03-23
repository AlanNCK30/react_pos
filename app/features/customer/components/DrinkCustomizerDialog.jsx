import { X } from "lucide-react";

import { menuData } from "@/data/items";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { calculateConfiguredUnitPrice } from "@/features/customer/hooks/useCustomerCart";

import { formatCurrency } from "@/utils/formatters";

function OptionChip({ active, children, onClick }) {
  return (
    <button
      className={`rounded-lg border px-3 py-4 text-left text-base transition-colors
        ${
          active
            ? "border-slate-950 bg-slate-950 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }
      `}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default function DrinkCustomizerDialog({
  config,
  item,
  onAddToCart,
  onClose,
  onConfigChange,
  open,
}) {
  if (!item || !config) {
    return null;
  }

  const optionGroup = menuData.optionGroups[item.opt_group_id];
  const unitPrice = calculateConfiguredUnitPrice(item, config);

  function toggleAddon(addon) {
    onConfigChange((currentConfig) => {
      const isSelected = currentConfig.addons.some((currentAddon) => currentAddon.id === addon.id);

      return {
        ...currentConfig,
        addons: isSelected
          ? currentConfig.addons.filter((currentAddon) => currentAddon.id !== addon.id)
          : [...currentConfig.addons, addon],
      };
    });
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent
        className="flex max-h-[88vh] max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 sm:max-w-2xl"
        showCloseButton={false}
      >
        <div className="shrink-0 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogHeader className="gap-1">
                <DialogTitle className="text-3xl font-semibold tracking-tight text-slate-950">
                  {item.categoryName}
                </DialogTitle>
                <DialogDescription className="leading-6 text-slate-500">
                  {item.name}
                </DialogDescription>
              </DialogHeader>
            </div>

            <button
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950"
              onClick={onClose}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-6">
            <section>
              <h3 className="mb-3 text-base font-medium text-slate-700">杯型</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <OptionChip
                  active={config.size === "medium"}
                  onClick={() =>
                    onConfigChange((currentConfig) => ({
                      ...currentConfig,
                      size: "medium",
                    }))
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>中杯 (M)</span>
                    <span>{formatCurrency(item.medium)}</span>
                  </div>
                </OptionChip>
                <OptionChip
                  active={config.size === "large"}
                  onClick={() =>
                    onConfigChange((currentConfig) => ({
                      ...currentConfig,
                      size: "large",
                    }))
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>大杯 (L)</span>
                    <span>{formatCurrency(item.large)}</span>
                  </div>
                </OptionChip>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-base font-medium text-slate-700">甜度</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {optionGroup.sweetness.map((option) => (
                  <OptionChip
                    key={option.level}
                    active={config.sweetness === option.level}
                    onClick={() =>
                      onConfigChange((currentConfig) => ({
                        ...currentConfig,
                        sweetness: option.level,
                      }))
                    }
                  >
                    {option.label}
                  </OptionChip>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-base font-medium text-slate-700">冰量</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {optionGroup.ice.map((option) => (
                  <OptionChip
                    key={option.level}
                    active={config.ice === option.level}
                    onClick={() =>
                      onConfigChange((currentConfig) => ({
                        ...currentConfig,
                        ice: option.level,
                      }))
                    }
                  >
                    {option.label}
                  </OptionChip>
                ))}
              </div>
            </section>

            {optionGroup.add_ons.length > 0 ? (
              <section>
                <h3 className="mb-3 text-base font-medium text-slate-700">加料</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {optionGroup.add_ons.map((addon) => {
                    const isSelected = config.addons.some(
                      (selectedAddon) => selectedAddon.id === addon.id
                    );

                    return (
                      <OptionChip
                        key={addon.id}
                        active={isSelected}
                        onClick={() => toggleAddon(addon)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span>{addon.item}</span>
                          <span>+{formatCurrency(addon.price)}</span>
                        </div>
                      </OptionChip>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
            <div className="text-base text-slate-500">
              已選價格
              <span className="ml-2 text-lg font-semibold text-slate-950">
                {formatCurrency(unitPrice)}
              </span>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button className="rounded-lg" onClick={onClose} type="button" variant="outline">
                返回
              </Button>
              <Button className="rounded-lg" onClick={onAddToCart} type="button">
                加入購物袋
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
