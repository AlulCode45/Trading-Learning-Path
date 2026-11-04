---
name: antislop-code
description: Code quality and comment hygiene filter for AI coding agents. Activate to eliminate generic AI-generated comments, decorative banner noise, restating the obvious, and premature over-engineering, while preserving high-value technical intent.
---

# Code Quality & Clean Code Guardrails (Anti-Slop)

Panduan kebersihan kode agar hasil kode dari AI agent tetap bersih, ringkas, profesional, dan setara dengan standar insinyur senior manusia.

---

## 1. Komentar yang Dilarang (Noise & Slop)

### A. Banner Dekoratif & Garis Pemisah
- **Buruk**:
  ```php
  // ==========================================
  //                CONTROLLER
  // ==========================================
  ```
- **Solusi**: Hapus seluruh banner dekoratif. Nama class dan namespace sudah menjelaskan perannya.

### B. Mengulangi Apa yang Sudah Jelas (Restating the Obvious)
- **Buruk**:
  ```php
  // Create user
  $user = User::create($data);

  // Return json response
  return response()->json($user);
  ```
- **Solusi**: Hapus komentar tersebut. Kode sudah cukup deskriptif (self-documenting).

### C. Narasi Alur Langkah Demi Langkah yang Trivial
- **Buruk**:
  ```php
  // Step 1: Validate input
  // Step 2: Store to database
  // Step 3: Redirect to index
  ```
- **Solusi**: Hilangkan narasi "Step 1, Step 2". Jika suatu fungsi membutuhkan narasi langkah yang panjang, pisahkan logika ke private helper atau Service layer.

### D. Placeholder Samaran & Emoji
- **Buruk**: `// 🚀 Performance boost`, `// TODO: nanti diperbaiki`, `// Penting: jangan diubah`.
- **Solusi**: Jangan gunakan emoji dekoratif pada komentar kode. Jika ada TODO, tulis konteks tugas konkretnya.

---

## 2. Komentar yang Wajib Dipertahankan

Pertahankan (dan tulis) komentar yang menjelaskan **MENGAPA (Why)**, bukan **APA (What)**:
- Keputusan arsitektural yang tidak lazim karena batasan sistem pihak ketiga.
- Logika keamanan atau mitigasi race condition.
- Alasan penyesuaian performa khusus atau workaround bug upstream:
  ```php
  // Midtrans webhook can send duplicate events on network failure.
  // We use atomic locks on the transaction ID to prevent double fulfillment.
  ```

---

## 3. Menghindari Over-Engineering (YAGNI & KISS)

1. Jangan membuat layer abstraksi tambahan di luar blueprint standar (misal: Factory dari Factory, atau Interface untuk class helper satu fungsi sederhana).
2. Pertahankan kode seringkas mungkin tanpa mengorbankan readability atau type-safety.
3. Gunakan fitur bawaan Laravel dan PHP 8.2+ (Constructor property promotion, match expressions, nullsafe operator, typed properties).
