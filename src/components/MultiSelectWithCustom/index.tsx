import { useState, useRef, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./style.css";

interface Option {
  label: string;
  value: string;
}

type SelectionMode = "multi" | "single";
type SingleSaveAs = "value" | "label";

interface MultiSelectWithCustomProps {
  value: string | string[];
  onChange: (val: string | string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  display?: "chip" | "comma";
  customLabel?: string;
  selectionMode?: SelectionMode;
  singleSaveAs?: SingleSaveAs;
}

export const toOptionValue = (label: string) =>
  `CUSTOM_${label.trim().toUpperCase().replace(/\s+/g, "_")}`;

export const toLabelFromValue = (val: string) =>
  val
    .replace(/^CUSTOM_/, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

const deriveCustomOptions = (
  values: string | string[],
  fixedOptions: Option[]
): Option[] => {
  const arr = Array.isArray(values) ? values : values ? [values] : [];

  return arr
    .filter((v) => typeof v === "string")
    .filter((v) => {
      const isExistingValue = fixedOptions.some((o) => o.value === v);
      const isExistingLabel = fixedOptions.some((o) => o.label === v);
      const isCustomValue = v.startsWith("CUSTOM_");

      return (
        (isCustomValue && !isExistingValue) ||
        (!isCustomValue && !isExistingLabel)
      );
    })
    .map((v) => {
      const isCustomValue = v.startsWith("CUSTOM_");

      return {
        label: isCustomValue ? toLabelFromValue(v) : v,
        value: isCustomValue ? v : toOptionValue(v),
      };
    });
};

const MultiSelectWithCustom = ({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
  display = "chip",
  customLabel = "Adicionar opção personalizada",
  selectionMode = "multi",
  singleSaveAs = "value",
}: MultiSelectWithCustomProps) => {
  const isSingle = selectionMode === "single";

  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [customOptions, setCustomOptions] = useState<Option[]>(() =>
    deriveCustomOptions(value, options)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomOptions((prev) => {
      const fromValue = deriveCustomOptions(value, options);
      const merged = [...prev];

      fromValue.forEach((opt) => {
        if (!merged.some((o) => o.value === opt.value)) {
          merged.push(opt);
        }
      });

      return merged;
    });
  }, [value, options]);

  const allOptions = [...options, ...customOptions];
  const multiValue = Array.isArray(value) ? value : [];

  useEffect(() => {
    if (isSingle) return;

    const missing = multiValue
      .filter((v) => typeof v === "string")
      .filter((v) => !allOptions.some((o) => o.value === v))
      .map((v) => ({
        label: v.startsWith("CUSTOM_") ? toLabelFromValue(v) : v,
        value: v.startsWith("CUSTOM_") ? v : toOptionValue(v),
      }));

    if (missing.length > 0) {
      setCustomOptions((prev) => {
        const merged = [...prev];
        missing.forEach((opt) => {
          if (!merged.some((o) => o.value === opt.value)) {
            merged.push(opt);
          }
        });
        return merged;
      });
    }
  }, [isSingle, multiValue, allOptions]);

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const newValue = toOptionValue(trimmed);

    const existing = allOptions.find(
      (o) =>
        o.value === newValue || o.label.toLowerCase() === trimmed.toLowerCase()
    );

    const valueToAdd = existing?.value ?? newValue;
    const labelToAdd = existing?.label ?? trimmed;

    if (!existing) {
      setCustomOptions((prev) => [
        ...prev,
        { label: trimmed, value: newValue },
      ]);
    }

    if (isSingle) {
      onChange(singleSaveAs === "label" ? labelToAdd : valueToAdd);
    } else {
      const arr = Array.isArray(value) ? value : [];
      if (!arr.includes(valueToAdd)) {
        onChange([...arr, valueToAdd]);
      }
    }

    setCustomInput("");
    setShowInput(false);
  };

  const openInput = () => {
    setShowInput(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeInput = () => {
    setShowInput(false);
    setCustomInput("");
  };

  const addCustomButton = (
    <div
      className="multiselect-custom-footer"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="multiselect-add-custom-btn"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openInput();
        }}
      >
        <i className="pi pi-plus" />
        {customLabel}
      </button>
    </div>
  );

  const inlineInput = showInput && (
    <div className="multiselect-custom-input-row">
      <InputText
        ref={inputRef}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Digite e pressione Enter"
        className="multiselect-custom-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddCustom();
          }
          if (e.key === "Escape") {
            closeInput();
          }
        }}
      />
      <Button
        icon="pi pi-check"
        type="button"
        className="multiselect-custom-confirm-btn"
        onClick={handleAddCustom}
        disabled={!customInput.trim()}
      />
      <Button
        icon="pi pi-times"
        type="button"
        className="multiselect-custom-cancel-btn"
        onClick={closeInput}
      />
    </div>
  );

  if (isSingle) {
    const rawValue = typeof value === "string" ? value : "";

    const internalValue =
      singleSaveAs === "label"
        ? (allOptions.find((o) => o.label === rawValue)?.value ??
          (rawValue && !options.some((o) => o.label === rawValue)
            ? toOptionValue(rawValue)
            : ""))
        : rawValue;

    const displayLabel = internalValue
      ? (allOptions.find((o) => o.value === internalValue)?.label ??
        (internalValue.startsWith("CUSTOM_")
          ? toLabelFromValue(internalValue)
          : internalValue))
      : null;

    return (
      <div className="dropdown-custom-wrapper">
        <Dropdown
          value={internalValue}
          onChange={(e) => {
            setShowInput(false);

            const selected = allOptions.find((o) => o.value === e.value);

            if (singleSaveAs === "label") {
              onChange(selected?.label ?? "");
            } else {
              onChange(e.value ?? "");
            }
          }}
          options={allOptions}
          optionLabel="label"
          optionValue="value"
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          style={{ width: "100%" }}
          valueTemplate={
            displayLabel ? () => <span>{displayLabel}</span> : undefined
          }
          panelFooterTemplate={addCustomButton}
        />
        {inlineInput}
      </div>
    );
  }

  const selectedItems = multiValue.map((v) => {
    const found = allOptions.find((o) => o.value === v);

    if (found) return found;

    return {
      label: v.startsWith("CUSTOM_") ? toLabelFromValue(v) : v,
      value: v,
    };
  });

  const mergedOptions = [
    ...allOptions,
    ...selectedItems.filter(
      (s) => !allOptions.some((o) => o.value === s.value)
    ),
  ];

  return (
    <div className="dropdown-custom-wrapper">
      <MultiSelect
        value={multiValue}
        onChange={(e) => {
          onChange(e.value ?? []);
        }}
        options={mergedOptions}
        optionLabel="label"
        optionValue="value"
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        display={display}
        panelFooterTemplate={addCustomButton}
        filter
        filterPlaceholder="Buscar..."
        emptyFilterMessage="Nenhuma opção encontrada"
        style={{ width: "100%" }}
      />
      {inlineInput}
    </div>
  );
};

export default MultiSelectWithCustom;
