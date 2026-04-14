.
├── src/
│   ├── config/                          # Configuración y variables de entorno
│   │   ├── index.ts
│   │   └── env.ts
│   ├── domain/                          # === CORE (nunca depende de nada externo)
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── value-objects/
│   │   │   ├── email.vo.ts
│   │   │   ├── password.vo.ts
│   │   │   └── session-id.vo.ts
│   │   ├── repositories/                # PORTS (interfaces)
│   │   │   ├── user.repository.port.ts
│   │   │   └── session.repository.port.ts
│   │   └── services/
│   │       └── password.service.ts      # Dominio puro (hashing, comparación)
│   ├── application/                     # === CASOS DE USO (orquesta la lógica)
│   │   ├── dtos/
│   │   │   ├── auth/
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── logout.dto.ts
│   │   │   └── shared/
│   │   │       └── api-response.dto.ts
│   │   ├── ports/                       # Inbound ports (opcional, pero limpio)
│   │   │   └── auth.service.port.ts
│   │   └── use-cases/
│   │       ├── register.use-case.ts
│   │       ├── login.use-case.ts
│   │       ├── logout.use-case.ts
│   │       └── get-current-user.use-case.ts
│   ├── infrastructure/                  # === ADAPTERS (implementaciones concretas)
│   │   ├── adapters/
│   │   │   ├── persistence/
│   │   │   │   ├── prisma/              # Adapter Prisma
│   │   │   │   │   ├── prisma.client.ts
│   │   │   │   │   └── user.prisma.repository.ts
│   │   │   │   └── redis/               # Adapter Redis para sesiones
│   │   │   │       ├── redis.client.ts
│   │   │   │       └── session.redis.repository.ts
│   │   │   └── security/
│   │   │       └── argon2.password.adapter.ts
│   │   └── external/
│   │       └── rate-limiter.ts          # Adapter para rate limiting
│   ├── presentation/                    # === HTTP + Express (entrada/salida)
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts       # Valida sesión
│   │   │   ├── rate-limit.middleware.ts
│   │   │   ├── security.middleware.ts   # Helmet, CSP, etc.
│   │   │   └── error.middleware.ts
│   │   ├── routes/
│   │   │   └── auth.routes.ts
│   │   └── server.ts                    # Configuración de Express
│   ├── shared/                          # Kernel compartido
│   │   ├── exceptions/
│   │   │   ├── domain.exception.ts
│   │   │   ├── application.exception.ts
│   │   │   └── infrastructure.exception.ts
│   │   ├── logger/
│   │   │   └── winston.logger.ts
│   │   └── utils/
│   │       └── cookie.utils.ts
│   └── main.ts                          # Punto de entrada (bootstrap)
├── prisma/                              # Prisma schema y migrations
│   ├── schema.prisma
│   └── migrations/
├── tests/                               # (vamos a crear algunos de seguridad)
│   ├── integration/
│   └── security/
├── .env.example
├── .env (NO subir al git)
├── docker-compose.yml                   # Postgres + Redis
├── package.json
└── README.md

---
