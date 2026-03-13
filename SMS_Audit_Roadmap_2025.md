# 🏫 EduSphere School System — SMS Audit & Roadmap 2025

> **Target Audience:** AI Coding Agents (Copilot, Cursor, Windsurf, Claude Code)  
> **Stack:** React 18 · Vite · TailwindCSS · Dexie · React Router v6  
> **Purpose:** Definitive guide for refactoring, new features, and backend integration  
> **Design Direction:** Desktop-first, Professional Clarity, mobile-accessible

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Feature Audit Matrix](#2-feature-audit-matrix)
3. [Critical Bugs & Code Issues](#3-critical-bugs--code-issues)
4. [IndexedDB / Dexie Strategy](#4-indexeddb--dexie-strategy)
5. [Backend Integration Guide](#5-backend-integration-guide)
6. [State Management Architecture](#6-state-management-architecture)
7. [UI/UX Design System](#7-uiux-design-system)
8. [Dependency Updates](#8-dependency-updates)
9. [File Structure & Agent Instructions](#9-file-structure--agent-instructions)
10. [Quick Wins — Copy-Paste Ready](#10-quick-wins--copy-paste-ready)
11. [Appendix](#11-appendix)

---

## 1. Executive Summary

The app has a solid React/Vite/TailwindCSS foundation with well-structured routing and lazy loading. However, several critical gaps block production use.

### ✅ Strengths

- Clean Vite + React 18 setup with lazy loading on all admin routes
- `ErrorBoundary` wraps the entire app
- `AuthContext` uses `useCallback`/`useMemo` correctly
- Dexie (IndexedDB) provides genuine offline-capable local persistence for students and grades
- Comprehensive component decomposition in `StudentManagement` and `PayrollManagement`
- Recharts already integrated for data visualizations
- `react-hook-form` + `yup` validation on `AddStudentModal` is production-quality
- `ProtectedRoute` pattern is implemented correctly
- Responsive sidebar with expand/collapse and mobile hamburger menu

### 🚨 Critical Gaps

| Gap | Impact |
|-----|--------|
| **NO BACKEND** — all data resets on device wipe; no multi-user support | CRITICAL |
| Staff, payroll, transactions, library, inventory are pure mock data with no persistence | HIGH |
| No global state (no Zustand/TanStack Query) — prop-passing is fragile at this scale | HIGH |
| `@headlessui/react` v2 API breaking changes not addressed (`Tab.Group` → `TabGroup` etc.) | HIGH |
| Passwords stored **plaintext** in IndexedDB | CRITICAL SECURITY |
| No loading/error states on async operations outside the login flow | MED |
| `Students.jsx` calls Dexie directly in components — needs a service/repository layer | MED |
| Dashboard quick-action links point to wrong routes (`/students/new` vs `/app/admin/students`) | MED |

---

## 2. Feature Audit Matrix

| Feature / Page | Status | Notes |
|----------------|--------|-------|
| Landing Page | ✅ Done | Fully implemented with login cards, feature cards, mobile menu |
| Admin Login / Signup | ✅ Done | Form validation works. **CRITICAL:** passwords stored as plaintext in IndexedDB |
| Admin Dashboard | ✅ Done | Charts with Recharts, quick stats, quick actions cards |
| Student Management — Grade Cards | ✅ Done | Dexie-backed, persistent across sessions |
| Student Management — Student Table | ✅ Done | Dexie-backed CRUD with yup validation |
| Student Management — Export | ⚠️ Partial | Button exists; `handleExport` is empty callback |
| Staff Management | ⚠️ Partial | Table renders mock data. Add/Edit/Delete only `console.log` |
| Payroll — Current Table | ⚠️ Partial | Renders mock employees. No persistence |
| Payroll — View/Adjust Payslip | ⚠️ Partial | Modal works UI-only; no save logic |
| Payroll — Salary Analytics | ⚠️ Partial | Static mock data charts. Needs real data binding |
| Payroll — Tax Management | ⚠️ Partial | Static table, no CRUD |
| Payroll — Processor / Report Generator | ⚠️ Partial | Modals open/close. No actual processing logic |
| Transactions — All panels | 🔵 Stub | Panel structure exists. Zero content in sub-panels |
| Sales & Inventory — All panels | 🔵 Stub | Panel structure exists. Zero content in sub-panels |
| E-Library | ⚠️ Partial | Add/Delete UI works with local `useState` only. No persistence |
| Mass Messaging | ⚠️ Partial | Compose UI complete. Send only `console.log` |
| Transportation | ⚠️ Partial | Tables render mock data. Add/Schedule only `alert()` |
| Academics Management | ⚠️ Partial | Courses CRUD with `useState`. Timetable grid exists. No persistence |
| Reports / System Logs | ⚠️ Partial | Log viewer with filter. Mock data only |
| Settings | ✅ Done | Toggle switches work with local state. No persistence |
| Student Portal | 🔵 Stub | Renders `ComingSoon` page |
| Staff Portal | 🔵 Stub | Renders `ComingSoon` page |
| NotFound / 404 | ✅ Done | Fully implemented |
| Error Boundary | ✅ Done | Fully implemented |
| Loading Page | ✅ Done | Suspense fallback implemented |

---

## 3. Critical Bugs & Code Issues

### 3.1 Security Issues — Fix Immediately

#### 🚨 CRITICAL: Plaintext Password Storage
**Files:** `src/components/contexts/AuthContext.jsx` + `src/db/db.js`

Passwords are stored as raw strings in IndexedDB. Anyone with DevTools access can read all credentials.

```js
// Install: npm install bcryptjs
import bcrypt from 'bcryptjs';

// On signUp — hash before storing
const hashed = await bcrypt.hash(password, 10);
await db.users.add({ username, email, password: hashed });

// On login — compare hash
const user = await db.users.get({ username });
const valid = user && await bcrypt.compare(password, user.password);
if (!valid) throw new Error('Invalid credentials');
```

> **Note:** This is a stopgap. The real fix is Supabase Auth (see Section 5).

---

### 3.2 HeadlessUI v2 API Mismatch

**Affected files:** `E-Library.jsx`, `MassMessaging.jsx`, `SalesAndInventory.jsx`, `Transactions.jsx`, `Transportation.jsx`, `Settings.jsx`

The v2 API removed compound component patterns. All files using the OLD pattern will silently fail or throw.

```jsx
// ❌ OLD (v1) — BROKEN in v2
import { Tab } from '@headlessui/react';
<Tab.Group>
  <Tab.List>
    <Tab>Item</Tab>
  </Tab.List>
</Tab.Group>

// ✅ NEW (v2) — already used correctly in Payroll.jsx
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
<TabGroup>
  <TabList>
    <Tab>Item</Tab>
  </TabList>
</TabGroup>
```

**Action:** Find-replace `Tab.Group` → `TabGroup`, `Tab.List` → `TabList`, `Tab.Panel` → `TabPanel`, `Tab.Panels` → `TabPanels` across all affected files. Update the import to use named exports.

---

### 3.3 All Code Issues

| Issue | File | Severity | Fix |
|-------|------|----------|-----|
| `resetPassword` called but never defined in `AuthContext` | `AdminLogin.jsx` | HIGH | Add `resetPassword` to `AuthContext` or remove the destructure |
| `handleGradeClick` passes grade object but `GradeCard` `onClick` expects grade name string | `Students.jsx` | HIGH | Standardize — pass `grade.name` or the full object consistently |
| `PaymentHistory` imported but called with no props | `Payroll.jsx` | HIGH | Pass `employee` and `paymentHistory` props or replace with `EmployeePaymentHistory` |
| `AdjustPayslip` `onSave` receives adjustments but `Payroll.jsx` passes no `onSave` | `Payroll.jsx` | HIGH | Wire up `onSave` to update employee salary state and persist |
| `handleAddEmployee` only `console.log`s — no state update, no persistence | `Staff.jsx` | HIGH | `setEmployees([...employees, { id: Date.now(), ...employeeData }])` then persist to Dexie |
| `StudentDetailsModal` uses `Dialog.Overlay` which was removed in v2 | `StudentDetailsModal.jsx` | HIGH | Replace with `DialogBackdrop` or a styled div |
| `db.students` query uses `{ gradeId }` but `gradeId` is not in the Dexie index | `db.js` | MED | Add `gradeId` to the students store index string |
| Dashboard quick-action links point to wrong routes (`/students/new`, `/staff`, etc.) | `Dashboard.jsx` | MED | Update to `/app/admin/students`, `/app/admin/staff` etc. |
| `handleEditBook` is an empty function — edit button does nothing | `E-Library.jsx` | MED | Implement edit modal or remove button until implemented |
| Transportation `handleAddBus/Route/Driver` only calls `alert()` | `Transportation.jsx` | MED | Replace `alert()` with proper modal/form |
| `generateStudents.js` is never imported or used anywhere | `generateStudents.js` | LOW | Use it to seed the DB on first run OR delete it |
| `App.jsx` is empty dead code | `App.jsx` | LOW | Delete the file |
| Missing `key` props in several `.map()` calls | Various | LOW | Audit all `.map()` calls; assign unique `key` props |

---

## 4. IndexedDB / Dexie Strategy

### 4.1 Assessment

The current Dexie implementation is **under-utilized but architecturally correct**. Do NOT remove it. Dexie is the right choice for offline capability. The problem is that only 4 tables exist when the app needs at least 12, and Dexie is called directly inside components instead of through a service layer.

**Decision: Keep Dexie as the offline-first data layer. Sync to Supabase when online.**

---

### 4.2 Revised Dexie Schema

Replace `src/db/db.js` entirely. Version number must increment on every schema change.

```js
// src/db/db.js — FULL REVISED SCHEMA
import Dexie from 'dexie';

const db = new Dexie('SMS_IAmBlessed');

db.version(2).stores({
  users:        '++id, &username, email, role',
  grades:       '++id, name',
  students:     '++id, name, gradeId, status, gender, email, syncStatus',
  admissions:   '++id, studentId, admissionDate',
  staff:        '++id, firstName, lastName, email, role, department, syncStatus',
  payroll:      '++id, staffId, month, year, status, syncStatus',
  transactions: '++id, type, amount, date, category, syncStatus',
  books:        '++id, title, author, category, isbn, syncStatus',
  borrowings:   '++id, bookId, studentId, borrowDate, returnDate',
  inventory:    '++id, name, category, quantity, syncStatus',
  messages:     '++id, sentAt, status',
  syncQueue:    '++id, table, operation, createdAt, attempts',
});

export default db;
```

---

### 4.3 Repository Service Pattern

**NEVER call Dexie directly in React components.** Create a service layer at `src/services/` with one file per domain. This makes it trivial to swap IndexedDB for API calls later.

```js
// src/services/studentService.js
import db from '../db/db';
import { syncQueue } from './syncQueue';

export const studentService = {
  getByGrade: (gradeId) =>
    db.students.where({ gradeId }).toArray(),

  add: async (data) => {
    const id = await db.students.add({ ...data, syncStatus: 'pending' });
    await syncQueue.push('students', 'create', { ...data, id });
    return id;
  },

  update: async (id, data) => {
    await db.students.update(id, { ...data, syncStatus: 'pending' });
    await syncQueue.push('students', 'update', { id, ...data });
  },

  delete: async (id) => {
    await db.students.delete(id);
    await syncQueue.push('students', 'delete', { id });
  },
};
```

Create equivalent files: `staffService.js`, `payrollService.js`, `bookService.js`, `inventoryService.js`, `transactionService.js`.

---

### 4.4 Offline Sync Queue

When the app gains internet connectivity, flush the `syncQueue` to the backend. This enables true offline-first usage — teachers can record attendance, add students, or process payroll without internet.

```js
// src/services/syncService.js
import db from '../db/db';
import { apiClient } from './apiClient';

export const syncService = {
  flush: async () => {
    if (!navigator.onLine) return;

    const queue = await db.syncQueue.orderBy('createdAt').toArray();

    for (const item of queue) {
      try {
        await apiClient.sync(item); // POST /api/sync
        await db.syncQueue.delete(item.id);
        await db[item.table].update(item.data.id, { syncStatus: 'synced' });
      } catch {
        await db.syncQueue.update(item.id, { attempts: item.attempts + 1 });
      }
    }
  }
};

// src/main.jsx — register once
window.addEventListener('online', () => syncService.flush());
```

---

## 5. Backend Integration Guide

### 5.1 Recommended Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| **Backend** | Supabase | PostgreSQL + Auth + Storage + Realtime. Free tier sufficient for one school |
| **API Server (future)** | Hono.js on Cloudflare Workers | When business logic gets complex; edge-deployed, ultra-fast |
| **Auth** | Supabase Auth | JWT, email/password, OAuth, Row Level Security — replaces Dexie auth entirely |
| **File Storage** | Supabase Storage | Student photos, report PDFs, document uploads |
| **Realtime** | Supabase Realtime | Live attendance dashboards, live messaging |
| **Frontend Deployment** | Vercel | Free tier, automatic previews, edge network |
| **Email** | Resend | Simple API, generous free tier |
| **SMS** | Africa's Talking | Ghana-specific, supports local networks (MTN, Vodafone, AirtelTigo) |
| **Server State** | TanStack Query v5 | Caching, background sync, optimistic updates |
| **Client State** | Zustand v5 | Sidebar, modals, selected grade — replaces ad-hoc `useState` |

---

### 5.2 Supabase Client Setup

```js
// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

---

### 5.3 API Service Layer

```js
// src/services/api/students.js
import { supabase } from '../supabaseClient';

export const studentsApi = {
  getByGrade: (gradeId) =>
    supabase.from('students').select('*').eq('grade_id', gradeId),

  create: (data) =>
    supabase.from('students').insert(data).select().single(),

  update: (id, data) =>
    supabase.from('students').update(data).eq('id', id),

  delete: (id) =>
    supabase.from('students').delete().eq('id', id),
};
```

---

### 5.4 TanStack Query Hook with Offline Fallback

```js
// src/hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '../services/api/students';
import db from '../db/db'; // Dexie fallback

export const useStudents = (gradeId) => useQuery({
  queryKey: ['students', gradeId],
  queryFn: async () => {
    if (!navigator.onLine) {
      return db.students.where({ gradeId }).toArray(); // offline fallback
    }
    const { data, error } = await studentsApi.getByGrade(gradeId);
    if (error) throw error;
    await db.students.bulkPut(data); // cache locally for offline
    return data;
  },
  staleTime: 30_000,
});

export const useAddStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => studentsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }),
  });
};
```

---

### 5.5 Supabase Auth Migration

Replace the current Dexie-based auth. The `AuthContext` shape stays identical — only the implementation changes.

```js
// src/components/contexts/AuthContext.jsx — Supabase version
import { supabase } from '../../services/supabaseClient';

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  setCurrentUser(data.user);
};

const logout = async () => {
  await supabase.auth.signOut();
  setCurrentUser(null);
};

const signUp = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { username } }
  });
  if (error) throw error;
  return data;
};

// Listen for auth state changes
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_, session) => setCurrentUser(session?.user ?? null)
  );
  return () => subscription.unsubscribe();
}, []);
```

---

## 6. State Management Architecture

### 6.1 Current Problems

- Every page manages its own `useState` for data that should be shared (students, staff lists)
- Data is re-fetched on every navigation
- No optimistic updates — UI freezes while DB operations run
- Deeply nested prop drilling in `StudentManagement` → `GradeCard` → `StudentTable`

### 6.2 Pattern: TanStack Query + Zustand

**Rule:** Use TanStack Query for all async/server state. Use Zustand for synchronous UI state.

```js
// src/store/uiStore.js
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarExpanded: true,
  activeModal: null,
  selectedGrade: null,
  setSidebarExpanded: (v) => set({ sidebarExpanded: v }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setSelectedGrade: (grade) => set({ selectedGrade: grade }),
  closeModal: () => set({ activeModal: null }),
}));

// Usage in any component — eliminates all prop drilling
const { sidebarExpanded, setSidebarExpanded } = useUIStore();
const { activeModal, setActiveModal } = useUIStore();
```

**Wrap the app with TanStack Query provider in `main.jsx`:**

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 2 },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

## 7. UI/UX Design System

### 7.1 Design Direction

**"Professional Clarity"** — authoritative, calm, trustworthy. Think Google Workspace meets modern African tech. The teal/green brand is retained and elevated.

**Principles:**
1. **Desktop-first** — sidebar + main content at ≥1280px. Tables full-width. No forced mobile-first breakpoints on data-heavy views.
2. **Density-appropriate** — data tables use compact padding (`py-2 px-4`); forms use generous spacing (`space-y-6`).
3. **Consistent hierarchy** — one primary teal action per screen; secondary actions gray; destructive actions red only.
4. **Progressive disclosure** — modals for details, drawers for forms, inline for quick edits.
5. **Accessibility** — WCAG 2.1 AA minimum; all interactives keyboard-navigable; visible focus rings.
6. **Performance feel** — skeleton loaders instead of spinners; optimistic UI for all mutations.

---

### 7.2 Design Tokens — tailwind.config.js

Replace the existing `tailwind.config.js`:

```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',  // primary action
          700: '#0F766E',  // hover
          800: '#115E59',
          900: '#134E4A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F8FAFC',
          hover:   '#F1F5F9',
        },
        border: {
          DEFAULT: '#E2E8F0',
          strong:  '#CBD5E1',
        },
        text: {
          primary:   '#0F172A',
          secondary: '#475569',
          muted:     '#94A3B8',
        },
        status: {
          success: '#16A34A',
          warning: '#D97706',
          danger:  '#DC2626',
          info:    '#2563EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs:   ['11px', '16px'],
        sm:   ['13px', '20px'],
        base: ['14px', '22px'],
        lg:   ['16px', '24px'],
        xl:   ['18px', '28px'],
        '2xl':['20px', '30px'],
        '3xl':['24px', '32px'],
        '4xl':['30px', '38px'],
      },
      spacing: {
        sidebar:    '256px',
        'sidebar-sm': '72px',
      },
      borderRadius: {
        card:  '10px',
        modal: '14px',
        badge: '6px',
      },
      boxShadow: {
        card:     '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        dropdown: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        modal:    '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
```

---

### 7.3 Component Conventions

| Component | Class Pattern |
|-----------|---------------|
| **Button — Primary** | `bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors` |
| **Button — Secondary** | `bg-surface-muted hover:bg-surface-hover border border-border text-text-primary px-4 py-2 rounded-lg text-sm` |
| **Button — Danger** | `bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm` — ONLY for destructive actions |
| **Card** | `bg-white rounded-card shadow-card border border-border p-6` |
| **Table header row** | `bg-surface-muted text-text-secondary text-xs font-semibold uppercase tracking-wide` |
| **Table row hover** | `hover:bg-surface-hover transition-colors cursor-pointer` |
| **Status badge** | `inline-flex items-center px-2 py-0.5 rounded-badge text-xs font-medium` |
| **Modal** | `max-w-2xl w-full rounded-modal shadow-modal bg-white p-6` |
| **Sidebar active link** | `bg-brand-700 text-white rounded-lg` — remove the current `hover:bg-blue-500` |
| **Form input** | `block w-full rounded-lg border-border shadow-sm focus:ring-brand-600 focus:border-brand-600 text-sm` |
| **Page header** | Sticky `<header>` with `h1 text-2xl font-semibold text-text-primary` + right-aligned primary action |
| **Empty state** | Centered icon (64px, muted color) + heading + description + CTA button |
| **Skeleton loader** | `animate-pulse bg-surface-muted rounded-md` |

---

### 7.4 Typography — Install Inter

```bash
npm install @fontsource/inter
```

```js
// src/main.jsx — add at top
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
```

Remove any Google Fonts CDN `<link>` tags from `index.html`.

---

### 7.5 Layout Architecture

The `AdminLayout` is structurally sound. Apply these improvements:

```jsx
// src/components/layouts/AdminLayout.jsx — improved
const AdminLayout = () => {
  const { sidebarExpanded, setSidebarExpanded } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-surface-muted">
      {/* Sidebar — fixed left */}
      <Sidebar />

      {/* Main area — scrolls independently */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300
        ${sidebarExpanded ? 'ml-sidebar' : 'ml-sidebar-sm'}`}>

        {/* Sticky top bar */}
        <Header className="sticky top-0 z-30 bg-white border-b border-border shadow-sm" />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
```

---

### 7.6 shadcn/ui Integration

**Recommendation:** Add `shadcn/ui` for production-quality accessible components. It copies source into your project — fully customizable.

```bash
npx shadcn@latest init
npx shadcn@latest add button table dialog form input select switch badge avatar tooltip
```

**Use shadcn/ui for:** `Button`, `Table`, `Dialog`, `Form`, `Input`, `Select`, `Switch`, `Badge`, `Avatar`, `Tooltip`, `DataTable`, `DropdownMenu`

**Keep HeadlessUI for:** `Combobox`, `Listbox`, `Popover`, `Transition` (shadcn wraps these anyway)

---

### 7.7 Icon System Migration

Replace `react-icons` with `lucide-react` for consistent, tree-shakeable icons:

```bash
npm install lucide-react
npm uninstall react-icons
```

```jsx
// Before
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

// After
import { Trash2, Pencil, Search } from 'lucide-react';
```

Lucide has equivalent icons for everything used in the project and ships ~60% smaller.

---

## 8. Dependency Updates

### 8.1 Package Upgrade Matrix

| Package | Current | Recommended | Reason |
|---------|---------|-------------|--------|
| `react` / `react-dom` | ^18.3.1 | ^19.0.0 | React 19 is stable. New compiler, `use()` hook, better Suspense |
| `react-router-dom` | ^6.24.1 | ^7.2.0 | v7 adds framework mode, better types, loader/action APIs |
| `@headlessui/react` | ^2.1.2 | ^2.2.0 | Latest patch — ensure all files use v2 API (no `Tab.Group`) |
| `tailwindcss` | ^3.4.4 | ^4.1.0 | v4 is CSS-first, no config file needed, significantly faster builds |
| `dexie` | ^4.0.8 | ^4.0.11 | Patches Safari 17 compatibility issues |
| `recharts` | ^2.12.7 | ^2.15.0 | Better TypeScript support, perf improvements |
| `date-fns` | ^3.6.0 | ^4.1.0 | ESM-first, better tree-shaking, smaller bundle |
| `react-hook-form` | ^7.52.1 | ^7.55.0 | React 19 compatibility fixes |
| `yup` | ^1.4.0 | ^1.6.0 | Better async validation support |
| `faker` | ^5.5.3 | **REMOVE** | v5 is unmaintained. Not used in production code |
| `vite` | ^5.3.1 | ^6.2.0 | Vite 6 with Rolldown bundler (~10x faster builds) |
| `@vitejs/plugin-react` | ^4.3.1 | ^4.4.0 | React 19 support |
| `autoprefixer` | ^10.4.19 | ^10.4.20 | Latest patch |
| `postcss` | ^8.4.39 | ^8.5.0 | Latest stable |

### 8.2 New Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | ^5.67.0 | Server state management, caching, background sync |
| `zustand` | ^5.0.3 | Lightweight client state — replaces ad-hoc `useState` |
| `@supabase/supabase-js` | ^2.49.0 | Backend-as-a-service: auth, DB, storage, realtime |
| `@fontsource/inter` | ^5.1.1 | Bundled Inter font — no Google Fonts CDN dependency |
| `bcryptjs` | ^2.4.3 | Client-side password hashing (stopgap until Supabase Auth) |
| `@tailwindcss/forms` | ^0.5.9 | Proper form element baseline styling with Tailwind |
| `react-hot-toast` | ^2.5.2 | Toast notifications — replaces all `alert()` calls |
| `lucide-react` | ^0.475.0 | Replaces `react-icons` — tree-shakeable, consistent |
| `clsx` | ^2.1.1 | Conditional `className` utility |
| `tailwind-merge` | ^3.0.2 | Merge Tailwind classes without conflicts |
| `@tanstack/react-table` | ^8.21.0 | Headless table with sorting, filtering, pagination |
| `jspdf` | ^2.5.2 | Generate payslip PDFs and student reports client-side |
| `xlsx` | ^0.18.5 | Export student/payroll data to Excel |

### 8.3 Updated package.json

```json
{
  "name": "iab-montessori-sms",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "seed": "node src/db/seed.js"
  },
  "dependencies": {
    "@fontsource/inter": "^5.1.1",
    "@headlessui/react": "^2.2.0",
    "@hookform/resolvers": "^3.10.0",
    "@supabase/supabase-js": "^2.49.0",
    "@tailwindcss/forms": "^0.5.9",
    "@tanstack/react-query": "^5.67.0",
    "@tanstack/react-table": "^8.21.0",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "dexie": "^4.0.11",
    "jspdf": "^2.5.2",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.55.0",
    "react-hot-toast": "^2.5.2",
    "react-router-dom": "^7.2.0",
    "recharts": "^2.15.0",
    "tailwind-merge": "^3.0.2",
    "xlsx": "^0.18.5",
    "yup": "^1.6.0",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.4.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.20.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^4.1.0",
    "vite": "^6.2.0"
  }
}
```

---

## 9. File Structure & Agent Instructions

### 9.1 Target Directory Structure

```
src/
├── components/
│   ├── contexts/           # AuthContext, ThemeContext
│   ├── layouts/            # AdminLayout (keep), remove StaffLayout + StudentLayout
│   ├── ui/                 # Shared: Button, Badge, Card, Modal, Table, Skeleton, DataTable
│   └── admin/              # Feature-specific components (keep existing structure)
├── db/
│   ├── db.js               # Dexie schema — expanded to 12 tables
│   └── seed.js             # Dev-only seed script (use generateStudents.js here)
├── hooks/                  # useStudents, useStaff, usePayroll (TanStack Query wrappers)
├── pages/
│   ├── admin/              # All admin pages (keep)
│   ├── staff/              # Staff portal (implement or keep ComingSoon)
│   └── student/            # Student portal (implement or keep ComingSoon)
├── routes/                 # AppRouter, ProtectedRoute (keep)
├── services/
│   ├── api/                # Supabase API wrappers — one file per domain
│   │   ├── students.js
│   │   ├── staff.js
│   │   ├── payroll.js
│   │   ├── books.js
│   │   └── transactions.js
│   ├── studentService.js   # Dexie service layer
│   ├── staffService.js
│   ├── syncService.js      # Offline sync queue processor
│   └── supabaseClient.js   # Supabase client singleton
├── store/
│   └── uiStore.js          # Zustand: sidebar, modals, selectedGrade
└── utils/
    ├── cn.js               # clsx + tailwind-merge helper
    ├── formatters.js       # GHS currency, dates, phone numbers
    └── export.js           # PDF and Excel export utilities
```

---

### 9.2 Files to Delete

```
src/App.jsx                              # Empty, dead code
src/App.css                              # Empty
src/components/layouts/StaffLayout.jsx   # Stub, routes go to ComingSoon
src/components/layouts/StudentLayout.jsx # Stub, routes go to ComingSoon
src/pages/staff/Dashboard.jsx           # Stub, unreachable
src/pages/student/Dashboard.jsx         # Stub, unreachable
src/pages/admin/css/Dashboard.css       # Empty CSS file
```

> **`src/components/utils/generateStudents.js`** — move this to `src/db/seed.js` and use it to seed Dexie on first run instead of deleting it.

---

### 9.3 Agent Implementation Priority Queue

Execute in this order for maximum impact with minimum regressions:

1. **Fix HeadlessUI v2 breaking changes** across `E-Library.jsx`, `MassMessaging.jsx`, `SalesAndInventory.jsx`, `Transactions.jsx`, `Transportation.jsx`, `Settings.jsx`
2. **Fix security bug** — hash passwords in `AuthContext` with `bcryptjs`
3. **Fix `AdminLogin.jsx`** — remove `resetPassword` destructure or implement it in `AuthContext`
4. **Fix `StudentDetailsModal`** — replace `Dialog.Overlay` with `DialogBackdrop`
5. **Fix Dashboard quick-action routes** — update all links to `/app/admin/*` paths
6. **Wire up `Staff.jsx` `handleAddEmployee`** — update state and persist to Dexie
7. **Wire up `AdjustPayslip` `onSave`** in `Payroll.jsx`
8. **Delete dead files** listed in 9.2
9. **Expand Dexie schema** to 12 tables (Section 4.2)
10. **Create service layer** at `src/services/` — move all Dexie calls out of components
11. **Install packages:** `@tanstack/react-query`, `zustand`, `@fontsource/inter`, `react-hot-toast`, `lucide-react`, `clsx`, `tailwind-merge`, `bcryptjs`, `@tailwindcss/forms`
12. **Configure Zustand** — create `uiStore.js`; migrate sidebar + modal state
13. **Wrap app in TanStack Query provider** in `main.jsx`
14. **Create `src/hooks/`** — migrate all data fetching to TanStack Query custom hooks
15. **Update `tailwind.config.js`** with full design token system (Section 7.2)
16. **Replace all `alert()` and `console.log` stubs** with `react-hot-toast` notifications
17. **Implement export buttons** — students → XLSX, payslips → PDF using `xlsx` and `jspdf`
18. **Set up Supabase** — replace Dexie auth with Supabase Auth; create `supabaseClient.js`
19. **Implement `syncService.js`** for offline→online data synchronization
20. **Replace `react-icons` with `lucide-react`** throughout the codebase

---

## 10. Quick Wins — Copy-Paste Ready

### 10.1 `cn()` Utility

```js
// src/utils/cn.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args) => twMerge(clsx(args));

// Usage — replaces messy template literals everywhere
className={cn(
  'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
  isActive ? 'bg-brand-600 text-white' : 'bg-surface-muted text-text-secondary',
  className // allow callers to extend
)}
```

---

### 10.2 Toast Notifications

```jsx
// src/main.jsx — add once
import { Toaster } from 'react-hot-toast';

// Inside your render, alongside <AppRouter />
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3500,
    style: { fontFamily: 'Inter', fontSize: '14px' },
    success: { iconTheme: { primary: '#0D9488', secondary: '#FFFFFF' } },
  }}
/>

// Any component — usage (replaces all alert() calls)
import toast from 'react-hot-toast';

toast.success('Student added successfully');
toast.error('Failed to save — please try again');
const id = toast.loading('Processing payroll...');
toast.dismiss(id);
```

---

### 10.3 GHS Currency Formatter

```js
// src/utils/formatters.js
export const formatGHS = (amount) =>
  new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount ?? 0);

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GH', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(date));

export const formatPhone = (phone) =>
  phone?.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') ?? '—';

// Usage
formatGHS(50000)   // → 'GH₵ 50,000.00'
formatDate('2024-07-10') // → '10 Jul 2024'
```

---

### 10.4 Skeleton Loader Components

```jsx
// src/components/ui/Skeleton.jsx
import { cn } from '../../utils/cn';

export const Skeleton = ({ className }) => (
  <div className={cn('animate-pulse rounded-md bg-surface-muted', className)} />
);

export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="space-y-3 p-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className="h-8 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white rounded-card shadow-card border border-border p-6 space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

// Usage in any page
const { data: students, isLoading } = useStudents(gradeId);
if (isLoading) return <TableSkeleton rows={8} cols={5} />;
```

---

### 10.5 Reusable Empty State Component

```jsx
// src/components/ui/EmptyState.jsx
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-text-muted" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
    <p className="text-text-secondary text-sm mb-6 max-w-sm">{description}</p>
    {action}
  </div>
);

// Usage
<EmptyState
  icon={Users}
  title="No students yet"
  description="Add students to this grade to get started."
  action={<button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm">Add Student</button>}
/>
```

---

### 10.6 Export Utilities

```js
// src/utils/export.js
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

// Export any array of objects to Excel
export const exportToExcel = (data, filename = 'export') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// Generate a simple payslip PDF
export const generatePayslipPDF = (employee) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Payslip', 14, 22);
  doc.setFontSize(12);
  doc.text(`Employee: ${employee.name}`, 14, 40);
  doc.text(`Role: ${employee.role}`, 14, 50);
  doc.text(`Net Pay: GH₵ ${employee.netPay?.toFixed(2) ?? '0.00'}`, 14, 60);
  doc.save(`payslip-${employee.name}-${Date.now()}.pdf`);
};
```

---

## 11. Appendix

### A.1 Environment Variables

```bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_VERSION=2.0.0
VITE_SCHOOL_NAME="EduSphere School System"
```

```bash
# .env.example — commit this to git
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_VERSION=2.0.0
VITE_SCHOOL_NAME=
```

---

### A.2 Supabase PostgreSQL Tables

Create these tables in the Supabase dashboard. Enable **Row Level Security (RLS)** on all tables. Each table should have a `school_id` FK for future multi-tenancy.

```sql
-- students
create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade_id uuid references grades(id),
  status text default 'Active',
  gender text,
  date_of_birth date,
  address text,
  contact_number text,
  email text,
  guardian_name text,
  guardian_contact text,
  school_id uuid,
  created_at timestamptz default now()
);

-- staff
create table staff (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text unique,
  role text,
  department text,
  salary numeric,
  start_date date,
  employment_type text,
  school_id uuid,
  created_at timestamptz default now()
);

-- Enable RLS
alter table students enable row level security;
alter table staff enable row level security;
```

---

### A.3 Pre-Launch Checklist

- [ ] All HeadlessUI v2 breaking changes resolved
- [ ] Password hashing implemented (`bcryptjs` minimum, Supabase Auth target)
- [ ] All `alert()` and `console.log()` stubs replaced with real UI feedback (`react-hot-toast`)
- [ ] Dexie schema expanded to all 12 tables with correct indexes
- [ ] Service layer created — zero direct Dexie calls in components
- [ ] TanStack Query installed and all data fetching migrated to custom hooks
- [ ] Zustand store created; sidebar + modal state migrated
- [ ] Design tokens added to `tailwind.config.js`
- [ ] Inter font installed via `@fontsource/inter`
- [ ] `react-hot-toast` `<Toaster>` added to `main.jsx`
- [ ] Dashboard quick-action links corrected to `/app/admin/*` routes
- [ ] Export functionality working: students → XLSX, payslips → PDF
- [ ] `StudentDetailsModal` `Dialog.Overlay` replaced with `DialogBackdrop`
- [ ] All `.map()` calls have unique `key` props
- [ ] `.env.example` committed to git (never `.env.local`)
- [ ] Dead files deleted (Section 9.2)
- [ ] `generateStudents.js` repurposed as `src/db/seed.js`

---

*Generated by Claude · I Am Blessed Montessori School SMS Audit 2025*
