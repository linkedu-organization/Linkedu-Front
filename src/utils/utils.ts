import * as validator from "email-validator";
import moment from "moment";
import { classNames } from "primereact/utils";
import { DATE_FORMAT, DATE_PARSE_FORMAT } from "./date";

export const isValueValid = (value: unknown) => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  return true;
};

export const isMaxValue = (campo: string, tamanhoMax: number) => {
  if (campo === undefined || campo === null) {
    return true;
  }

  return campo.length <= tamanhoMax;
};

export const isMinValue = (campo: string, tamanhoMin: number) => {
  if (campo === undefined || campo === null) {
    return false;
  }
  return campo.length >= tamanhoMin;
};

export const isEmail = (email: string) => validator.validate(email);

export const getValueByKey = (
  value: string,
  list = [],
  key = "value",
  label = "label"
) => {
  let result = "-";
  const filtered = list.filter((item) => item[key] === value);
  if (filtered.length > 0) {
    result = filtered[0][label];
  }
  return result;
};

export const getMultipleValuesByKey = (
  values = [],
  list = [],
  key = "value",
  label = "text"
) => values.map((v) => getValueByKey(v, list, key, label)).join(", ");

export const getFormatMonthYear = (dataDesejavel: string) => {
  if (dataDesejavel) {
    const partes = dataDesejavel.split("-");
    const [ano, mes] = partes;

    return ano ? `${mes}/${ano}` : "-";
  }
  return "-";
};

export const getValueDate = (
  value: string,
  formatter = DATE_FORMAT,
  parser = DATE_PARSE_FORMAT
) => (value ? moment(value, parser).format(formatter) : "-");

export const getValue = (value: unknown) => value || "-";

export const getFirstAndLastName = (name: string) => {
  const fullName = name.split(" ");
  return (
    fullName.shift() + (fullName && fullName.length ? ` ${fullName.pop()}` : "")
  ).toUpperCase();
};

export const parseBoolean = (value: boolean) => {
  if (value) return "Sim";
  return "Não";
};

export const formatTypedValue = (value: string, maxSize: number) => {
  if (value.length > maxSize) {
    return `${value.substring(0, maxSize - 5)}...`;
  }
  return value;
};

export const invalid = (submitted: boolean, cond: boolean) =>
  classNames({ "p-invalid": submitted && cond });

export const joinTextPipes = (items: string[]) =>
  items.filter(Boolean).join(" | ");
