import { useState, useRef, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./style.css";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectWithCustomProps {
  value: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  display?: "chip" | "comma";
  customLabel?: string;
}

const toOptionValue = (label: string) =>
  `CUSTOM_${label.trim().toUpperCase().replace(/\s+/g, "_")}`;

const toLabelFromValue = (val: string) =>
  val
    .replace(/^CUSTOM_/, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

const deriveCustomOptions = (values: string[], fixedOptions: Option[]): Option[] =>
  values
    .filter(
      (v) =>
        v.startsWith("CUSTOM_") && !fixedOptions.some((o) => o.value === v)
    )
    .map((v) => ({ label: toLabelFromValue(v), value: v }));

const MultiSelectWithCustom = ({
  value = [],
  onChange,
  options,
  placeholder,
  disabled,
  className,
  display = "chip",
  customLabel = "Adicionar opção personalizada",
}: MultiSelectWithCustomProps) => {
  const [customInput, setCustomInput] = useState("");
  const [customOptions, setCustomOptions] = useState<Option[]>(() =>
    deriveCustomOptions(value, options)
  );
  const [showInput, setShowInput] = useState(false);
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

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const newValue = toOptionValue(trimmed);
    const alreadyExists = allOptions.some(
      (o) => o.value === newValue || o.label.toLowerCase() === trimmed.toLowerCase()
    );

    if (!alreadyExists) {
      const newOption: Option = { label: trimmed, value: newValue };
      setCustomOptions((prev) => [...prev, newOption]);
    }

    const existingOption = allOptions.find(
      (o) => o.label.toLowerCase() === trimmed.toLowerCase()
    );
    const valueToAdd = existingOption?.value ?? toOptionValue(trimmed);

    if (!value.includes(valueToAdd)) {
      onChange([...value, valueToAdd]);
    }

    setCustomInput("");
    setShowInput(false);
  };

  const footer = (
    <div className="multiselect-custom-footer">
      {!showInput ? (
        <button
          type="button"
          className="multiselect-add-custom-btn"
          onClick={() => {
            setShowInput(true);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
        >
          <i className="pi pi-plus" />
          {customLabel}
        </button>
      ) : (
        <div className="multiselect-custom-input-row">
          <InputText
            ref={inputRef}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Digite e pressione Enter ou clique em +"
            className="multiselect-custom-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustom();
              }
              if (e.key === "Escape") {
                setShowInput(false);
                setCustomInput("");
              }
            }}
          />
          <Button
            icon="pi pi-plus"
            type="button"
            className="multiselect-custom-confirm-btn"
            onClick={handleAddCustom}
            disabled={!customInput.trim()}
          />
          <Button
            icon="pi pi-times"
            type="button"
            className="multiselect-custom-cancel-btn"
            onClick={() => {
              setShowInput(false);
              setCustomInput("");
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <MultiSelect
      value={value}
      onChange={(e) => onChange(e.value)}
      options={allOptions}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      display={display}
      panelFooterTemplate={footer}
      filter
      filterPlaceholder="Buscar..."
      emptyFilterMessage="Nenhuma opção encontrada"
    />
  );
};

export default MultiSelectWithCustom;