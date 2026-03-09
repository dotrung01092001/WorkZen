"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmployee } from "@/contexts/EmployeeContext";
import {
  parseEmployeeExcel,
  type ExcelParseError,
} from "@/features/employees/utils/parseEmployeeExcel";

type ImportSummary = {
  fileName: string;
  totalRows: number;
  validRows: number;
  added: number;
  skippedExisting: number;
  skippedDuplicateInFile: number;
  parseErrors: ExcelParseError[];
};

export function EmployeeExcelImport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importEmployees } = useEmployee();
  const [isImporting, setIsImporting] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsImporting(true);
    setError(null);

    try {
      const parsed = await parseEmployeeExcel(file);
      const result = importEmployees(parsed.rows);

      setSummary({
        fileName: file.name,
        totalRows: parsed.totalRows,
        validRows: parsed.rows.length,
        added: result.added,
        skippedExisting: result.skippedExisting,
        skippedDuplicateInFile: result.skippedDuplicateInFile,
        parseErrors: parsed.errors,
      });
    } catch {
      setError("Cannot read this file. Please use a valid .xlsx, .xls, or .csv file.");
    } finally {
      setIsImporting(false);
      event.target.value = "";
    }
  };

  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Import employees from Excel file
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Required column: Name, Email. Optional: Role, Status.
          </p>
        </div>

        <Button
          type="button"
          onClick={handlePickFile}
          disabled={isImporting}
          className="inline-flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {isImporting ? "Importing..." : "Add Excel file"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
          {error}
        </p>
      )}

      {summary && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <FileSpreadsheet className="h-4 w-4" />
            File Excel: {summary.fileName}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 lg:grid-cols-6">
            <p>Total rows: {summary.totalRows}</p>
            <p>Valid rows: {summary.validRows}</p>
            <p>Added: {summary.added}</p>
            <p>Existing duplicates: {summary.skippedExisting}</p>
            <p>File duplicates: {summary.skippedDuplicateInFile}</p>
            <p>Invalid rows: {summary.parseErrors.length}</p>
          </div>

          {summary.parseErrors.length > 0 && (
            <ul className="mt-3 max-h-32 overflow-y-auto rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
              {summary.parseErrors.slice(0, 10).map((item) => (
                <li key={`${item.row}-${item.message}`}>
                  Row {item.row}: {item.message}
                </li>
              ))}
              {summary.parseErrors.length > 10 && (
                <li>...and {summary.parseErrors.length - 10} more rows</li>
              )}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

