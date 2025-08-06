# 🚀 Next.js User Management Boilerplate

A scalable **Next.js 15+** project structure using **App Router**, **Redux Toolkit**, **Tailwind CSS**, **React Hook Form**, and **Yup**. Built with best practices for modular, maintainable frontend development.

---

## 📁 Project Directory Structure

### `app/` — Next.js App Router Pages

```
app/
└── users/
    ├── page.tsx                    # User list route → renders <UserListPage />
    ├── create/
    │   └── page.tsx                # User creation route → renders <UserCreatePage />
    └── [id]/
        └── edit/
            └── page.tsx            # Dynamic edit route → renders <UserEditPage />
```

### `features/user/` — Feature-specific Logic

```
features/
└── user/
    ├── services/
    │   └── userService.ts          # API interaction using axios or webApiCaller
    ├── components/
    │   └── UserForm.tsx            # Controlled form component reused for Create/Edit
    ├── hooks/
    │   └── useUserForm.ts          # Custom hook for form state and fetching countries/states
    ├── pages/
    │   ├── UserListPage.tsx        # Container component for listing users
    │   ├── UserCreatePage.tsx      # Container for user creation
    │   └── UserEditPage.tsx        # Container for user editing
    ├── userSlice.ts                # Redux slice with async thunks for user state management
    └── types.ts                    # TypeScript interfaces/types (e.g. `User`, `Country`, etc.)
```

### `lib/` — Core Config & Providers

```
lib/
├── axios.ts                        # Axios instance with base URL and interceptors
└── providers.ts                    # Next.js providers (Redux Provider, Toaster, etc.)
```

### `redux/` — Redux Setup

```
redux/
├── store.ts                        # Redux store configuration
├── rootReducer.ts                  # Combines all feature reducers (if needed manually)
└── hooks.ts                        # Typed `useAppDispatch` and `useAppSelector` hooks
```

### `utils/` — Utility Functions

```
utils/
└── webApiCaller.ts                 # Wrapper around axios with extra error handling (optional)
```

### `validation/` — Schema Validation

```
validation/
└── userSchema.ts                   # Yup schema for user form validation (create/edit)
```

---

## 📦 Installed Packages

```
"@hookform/resolvers"      // Integrates Yup with React Hook Form
"@reduxjs/toolkit"         // State management
"axios"                    // API requests
"react-hook-form"          // Lightweight form management
"react-hot-toast"          // Toast notifications
"react-redux"              // React bindings for Redux
"yup"                      // Schema-based form validation
```

---

## 🛠️ Project Configuration Choices

```
√ TypeScript:                 Yes
√ ESLint:                     Yes
√ Tailwind CSS:               Yes
√ Use src/ directory:         No
√ App Router:                 Yes (recommended)
√ Turbopack for `next dev`:   Yes
√ Customize import alias:     No (default is `@/*`)
```

---

## 📄 License

MIT

## ChatGPT Chat Link

[Click here to view the shared ChatGPT conversation](https://chatgpt.com/share/68939bed-f4ec-800d-9736-68279d6abc90)
