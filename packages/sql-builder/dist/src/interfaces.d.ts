export type RawSyntax = string;
export interface CategorizationResponse {
    categorizedItems: CategorizedSyntax[];
}
/**
 * Tipe data untuk kategori sintaks PostgreSQL.
 * Nilai ini harus sesuai dengan output yang diharapkan dari model AI (OpenRouter).
 */
export type CategoryType = 'DDL' | 'DML' | 'DCL' | 'TCL' | 'Fungsi Bawaan' | 'Operator' | 'Tipe Data' | 'Klausa' | 'Meta-Command' | 'ERROR';
export interface CategorizedSyntax {
    syntax: string;
    category: CategoryType;
    confidence?: number;
}
