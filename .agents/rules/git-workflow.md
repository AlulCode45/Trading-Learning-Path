# Workspace Rule: Git Workflow & Commit Guidelines

Aturan manajemen versi Git pada repository ini:

## 1. Disiplin Commit Setiap Selesai Task
- **Wajib melakukan git commit setiap kali satu task/fitur/perbaikan selesai**.
- Commit harus atomik (satu commit menangani satu fokus perubahan yang tuntas dan bebas error).
- Pastikan dokumentasi terkait (README, specs, changelog) diperbarui bersamaan dalam commit atau segera setelahnya.

## 2. Format Conventional Commits
Gunakan format commit konvensional:
`<type>(<scope>): <pesan>`

Jenis `<type>`:
- `feat`: Menambahkan fitur atau endpoint baru.
- `fix`: Memperbaiki bug atau issue.
- `refactor`: Mengubah struktur kode tanpa mengubah fungsi (misal memindahkan logika ke Service).
- `test`: Menambahkan atau memperbaiki pengujian otomatis.
- `docs`: Menambah atau memperbarui dokumentasi.
- `chore`: Tugas pemeliharaan build tool, dependency, atau konfigurasi.

Contoh:
- `feat(product): implement product repository and store service`
- `fix(auth): handle expired sanctum token exception`
- `refactor(controller): inject product interface via constructor`
- `docs(api): update openapi spec for product routes`

## 3. Kebijakan Keamanan & Kualitas Commit
- Dilarang keras melakukan commit file kredensial rahasia (`.env`, certificates, token private).
- Kode wajib lolos linter, validasi sintaks, dan pengujian sebelum di-commit.
