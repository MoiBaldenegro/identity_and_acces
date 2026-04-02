src/
├── auth/
│   ├── domain/                          # Core puro (sin React)
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── value-objects/
│   │   │   └── email.vo.ts
│   │   ├── ports/
│   │   │   ├── auth.port.ts
│   │   │   └── http-client.port.ts
│   ├── application/
│   │   └── use-cases/
│   │       ├── register.use-case.ts
│   │       ├── login.use-case.ts
│   │       ├── logout.use-case.ts
│   │       └── get-current-user.use-case.ts
│   ├── infrastructure/
│   │   └── adapters/
│   │       ├── http/
│   │       │   └── fetch-http.adapter.ts
│   │       └── auth/
│   │           └── auth.api.adapter.ts
│   ├── presentation/
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   └── LoginForm.module.css
│   │   │   │   └── RegisterForm/
│   │   │   │       ├── RegisterForm.tsx
│   │   │   │       └── RegisterForm.module.css
│   │   │   ├── ui/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   └── Button.module.css
│   │   │   │   └── Card/
│   │   │   │       ├── Card.tsx
│   │   │   │       └── Card.module.css
│   │   │   └── layout/
│   │   │       └── Navbar.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── router/
│   │   │   └── AppRouter.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── App.tsx
│   ├── shared/
│   │   ├── types/
│   │   │   └── api.types.ts
│   │   └── constants.ts

