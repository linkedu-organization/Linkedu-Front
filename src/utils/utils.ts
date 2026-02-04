import * as validator from "email-validator";
import moment from "moment";
import { classNames } from "primereact/utils";
import type { Perfil } from "@domains/Perfil";
import { DATE_FORMAT, DATE_PARSE_FORMAT } from "./date";
import { cargosCandidato, cargosRecrutador, interesses } from "./constants";

export const isValueValid = (value: unknown) => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  return true;
};

export const isMaxValue = (campo: unknown, tamanhoMax: number) => {
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

export const getMultipleValuesByKey = (values = [], list = [], format = ", ") =>
  values.map((v) => getValueByKey(v, list)).join(format);

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

export const joinTextPipes = (items: string[]) =>
  items.filter(Boolean).join(" | ");

export const hasError = (submitted: boolean, msg: string) =>
  submitted && isValueValid(msg);

export const invalid = (submitted: boolean, msg: string) =>
  classNames({ "p-invalid": hasError(submitted, msg) });

export const normalizeUrl = (url?: string) => {
  const u = (url ?? "").trim();
  if (!u) return "";
  return u.startsWith("http://") || u.startsWith("https://")
    ? u
    : `https://${u}`;
};

export function getIniciais(nome: string): string {
  return nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function isCandidato(perfil: Perfil): boolean {
  return perfil.tipo === "CANDIDATO";
}

export function getCargo(perfil: Perfil): string {
  const cargoValue =
    perfil.tipo === "CANDIDATO"
      ? perfil.candidato?.cargo
      : perfil.recrutador?.cargo;

  if (!cargoValue) return "Não informado";

  return (
    getValueByKey(
      cargoValue,
      [...cargosCandidato, ...cargosRecrutador] as any,
      "value",
      "label"
    ) ?? cargoValue
  );
}

export function getAreas(perfil: Perfil): string[] | string | undefined {
  const raw =
    perfil.tipo === "CANDIDATO"
      ? getMultipleValuesByKey(
          perfil.candidato?.areasInteresse || [],
          interesses,
          " | "
        )
      : perfil.recrutador?.areaAtuacao;

  if (raw == null) return undefined;
  return Array.isArray(raw) ? raw : raw;
}

export function getTempoDisponivel(perfil: Perfil): number | null | undefined {
  return perfil.tipo === "CANDIDATO" ? perfil.candidato?.tempoDisponivel : null;
}

export function formatDisponibilidade(
  tempo: number | null | undefined
): string {
  return tempo != null ? `${tempo}h/semanais` : "Não informado";
}
