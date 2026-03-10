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

interface MultiSelectWithCustomProps {
  value: string | string[];
  onChange: (val: any) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  display?: "chip" | "comma";
  customLabel?: string;
  selectionMode?: SelectionMode;
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
    .filter((v) => v.startsWith("CUSTOM_") && !fixedOptions.some((o) => o.value === v))
    .map((v) => ({ label: toLabelFromValue(v), value: v }));
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
        if (!merged.some((o) => o.value === opt.value)) merged.push(opt);
      });
      return merged;
    });
  }, [value, options]);

  const allOptions = [...options, ...customOptions];

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const newValue = toOptionValue(trimmed);

    const existing = allOptions.find(
      (o) =>
        o.value === newValue ||
        o.label.toLowerCase() === trimmed.toLowerCase()
    );
    const valueToAdd = existing?.value ?? newValue;

    if (!existing) {
      setCustomOptions((prev) => [...prev, { label: trimmed, value: newValue }]);
    }

    if (isSingle) {
      onChange(valueToAdd);
    } else {
      const arr = Array.isArray(value) ? value : [];
      if (!arr.includes(valueToAdd)) onChange([...arr, valueToAdd]);
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
          if (e.key === "Escape") closeInput();
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
    const strValue = typeof value === "string" ? value : "";

    const displayLabel = strValue
      ? allOptions.find((o) => o.value === strValue)?.label ??
        (strValue.startsWith("CUSTOM_") ? toLabelFromValue(strValue) : strValue)
      : null;

    return (
      <div className="dropdown-custom-wrapper">
        <Dropdown
          value={strValue}
          onChange={(e) => {
            setShowInput(false);
            onChange(e.value);
          }}
          options={allOptions}
          optionLabel="label"
          optionValue="value"
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          style={{ width: "100%" }}
          valueTemplate={
            displayLabel
              ? () => <span>{displayLabel}</span>
              : undefined
          }
          panelFooterTemplate={addCustomButton}
        />
        {inlineInput}
      </div>
    );
  }

  const multiValue = Array.isArray(value) ? value : [];

  const selectedItems = multiValue.map((v) => {
    const found = allOptions.find((o) => o.value === v);
    if (found) return found;
    return { label: v.startsWith("CUSTOM_") ? toLabelFromValue(v) : v, value: v };
  });

  useEffect(() => {
    const missing = multiValue
      .filter(
        (v) =>
          v.startsWith("CUSTOM_") &&
          !allOptions.some((o) => o.value === v)
      )
      .map((v) => ({ label: toLabelFromValue(v), value: v }));
    if (missing.length > 0) {
      setCustomOptions((prev) => [...prev, ...missing]);
    }
  }, []);

  return (
    <div className="dropdown-custom-wrapper">
      <MultiSelect
        value={multiValue}
        onChange={(e) => {
          if (e.value.length === 0 && multiValue.length > 0 && allOptions.length === 0) {
            return;
          }
          onChange(e.value);
        }}
        options={[...allOptions, ...selectedItems.filter(
          (s) => !allOptions.some((o) => o.value === s.value)
        )]}
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