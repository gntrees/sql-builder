// src/interfaces.ts

// Tipe untuk sintaks sebelum dikelompokkan
export type RawSyntax = string;

// Tipe respons dari API
export interface CategorizationResponse {
  // Model yang mungkin akan mengembalikan JSON string yang perlu di-parse,
  // dengan format seperti: [{"syntax": "SELECT", "category": "DML"}, ...]
  categorizedItems: CategorizedSyntax[];
}

// src/interfaces.ts (Diperbarui)

/**
 * Tipe data untuk kategori sintaks PostgreSQL.
 * Nilai ini harus sesuai dengan output yang diharapkan dari model AI (OpenRouter).
 */
export type CategoryType = 
    | 'DDL'               // Data Definition Language (misal: CREATE, DROP)
    | 'DML'               // Data Manipulation Language (misal: SELECT, INSERT)
    | 'DCL'               // Data Control Language (misal: GRANT, REVOKE)
    | 'TCL'               // Transaction Control Language (misal: COMMIT, ROLLBACK)
    | 'Fungsi Bawaan'     // Built-in Functions (misal: COUNT(), NOW())
    | 'Operator'          // Operators (misal: +, LIKE, ILIKE)
    | 'Tipe Data'         // Data Types (misal: INT, VARCHAR, JSONB)
    | 'Klausa'            // Clauses (misal: WHERE, GROUP BY, JOIN)
    | 'Meta-Command'      // psql Meta-Commands (misal: \dt, \l)
    | 'ERROR';            // Penanganan kesalahan atau kategorisasi gagal

// Tipe untuk sintaks setelah dikelompokkan
export interface CategorizedSyntax {
  syntax: string;
  category: CategoryType; // Menggunakan tipe yang baru dibuat
  confidence?: number;
}