---
name: frontend-modern-web
description: Best practices for modern, responsive, and visually stunning web interfaces using Tailwind CSS, Blade templates, Inertia.js, and modern CSS. Activate when designing UI layouts, building dashboard views, styling forms, adding dark mode, or optimizing user experience and accessibility (a11y).
---

# Modern Frontend & UI/UX Engineering Guide

Panduan standar untuk membangun antarmuka web modern, responsif, estetis, dan aksesibel.

---

## 1. Prinsip Desain Visual & Estetika Premium

- **Tipografi Modern**: Hindari font default browser. Gunakan font modern seperti Inter, Plus Jakarta Sans, atau Outfit.
- **Harmoni Warna**: Hindari warna dasar murni (seperti `rgb(255,0,0)` atau plain blue). Gunakan palet slate/zinc bergradasi halus dengan warna aksen terkurasi (misal: Indigo, Emerald, atau Violet).
- **Dark Mode Support**: Selalu dukung dark mode berbasis class Tailwind (`dark:`). Gunakan latar belakang slate-900 / zinc-900 yang elegan, bukan hitam pekat #000000.
- **Kedalaman & Glassmorphism**: Gunakan kombinasi `backdrop-blur-md`, border tipis semi-transparan (`border-white/10` atau `border-slate-800/60`), dan subtle box-shadows untuk menciptakan hierarki visual modern.
- **Mikro-Animasi**: Tambahkan transisi halus pada hover, focus, dan active states:
  ```html
  <button class="transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
  ```

---

## 2. Struktur Blade Component yang Rapi

Ekstrak komponen UI berulang ke dalam Blade components (`resources/views/components/`):

### Contoh: Button Component (`resources/views/components/button.blade.php`)
```blade
@props([
    'variant' => 'primary',
    'type' => 'button',
])

@php
    $baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    $variants = [
        'primary' => 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm hover:shadow-indigo-500/25 focus:ring-indigo-500',
        'secondary' => 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-slate-400',
        'danger' => 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm hover:shadow-rose-500/25 focus:ring-rose-500',
    ];

    $classes = $baseClasses . ' ' . ($variants[$variant] ?? $variants['primary']);
@endphp

<button type="{{ $type }}" {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</button>
```

---

## 3. Aksesibilitas (a11y) & Formulir Responsif

1. **Labels & Inputs**:
   - Selalu pasangkan `<label for="id">` secara eksplisit dengan `<input id="id">`.
   - Berikan feedback error form yang jelas dengan atribut `aria-describedby` atau text helper merah di bawah input.
2. **Keyboard Navigation & Focus Rings**:
   - Jangan pernah menghilangkan outline focus tanpa menyediakan pengganti ring (`focus:ring-2 focus:ring-indigo-500 focus:outline-none`).
3. **Mobile First**:
   - Bangun layout dari layar kecil ke besar (`w-full md:w-1/2 lg:w-1/3`).
   - Pastikan target sentuh (touch target) pada mobile berukuran minimal 44x44px.
