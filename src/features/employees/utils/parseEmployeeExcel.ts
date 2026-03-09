import type { Role, Status } from "@/types/common";
import type { CreateEmployeePayload } from "@/types/employee";

export type ExcelParseError = {
  row: number;
  message: string;
};

export type ParseEmployeeExcelResult = {
  rows: CreateEmployeePayload[];
  errors: ExcelParseError[];
  totalRows: number;
};

const VALID_ROLES: Role[] = ["Admin", "Manager", "Employee"];
const VALID_STATUSES: Status[] = ["Active", "Inactive"];

const normalizeHeader = (value: string) =>
  value.trim().toLowerCase().replace(/[\s_-]+/g, "");

const pickValue = (row: Record<string, unknown>, aliases: string[]) => {
  const keyMap = new Map<string, string>();
  Object.keys(row).forEach((key) => keyMap.set(normalizeHeader(key), key));

  for (const alias of aliases) {
    const rawKey = keyMap.get(normalizeHeader(alias));
    if (!rawKey) {
      continue;
    }
    const value = row[rawKey];
    if (value == null) {
      return "";
    }
    return String(value).trim();
  }

  return "";
};

const toRole = (value: string): Role => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "admin") return "Admin";
  if (normalized === "manager") return "Manager";
  if (normalized === "employee" || normalized === "staff") return "Employee";
  return "Employee";
};

const toStatus = (value: string): Status => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "inactive" || normalized === "off") return "Inactive";
  if (normalized === "active" || normalized === "on") return "Active";
  return "Active";
};

export async function parseEmployeeExcel(
  file: File,
): Promise<ParseEmployeeExcelResult> {
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return { rows: [], errors: [{ row: 0, message: "File has no sheets" }], totalRows: 0 };
  }

  const sheet = workbook.Sheets[firstSheetName];
  const jsonRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: false,
  });

  const errors: ExcelParseError[] = [];
  const rows: CreateEmployeePayload[] = [];

  jsonRows.forEach((rawRow, index) => {
    const excelRow = index + 2;
    const name = pickValue(rawRow, ["name", "full name", "employee name", "ten", "hoten"]);
    const email = pickValue(rawRow, ["email", "mail", "e-mail"]);
    const roleValue = pickValue(rawRow, ["role", "position", "vai tro", "vaitro"]);
    const statusValue = pickValue(rawRow, ["status", "state", "trang thai", "trangthai"]);

    if (!name) {
      errors.push({ row: excelRow, message: "Missing name" });
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ row: excelRow, message: "Invalid email" });
      return;
    }

    const role = toRole(roleValue);
    const status = toStatus(statusValue);

    if (!VALID_ROLES.includes(role) || !VALID_STATUSES.includes(status)) {
      errors.push({ row: excelRow, message: "Invalid role or status" });
      return;
    }

    rows.push({
      name,
      email,
      role,
      status,
    });
  });

  return {
    rows,
    errors,
    totalRows: jsonRows.length,
  };
}
