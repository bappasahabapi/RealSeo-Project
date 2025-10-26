### Making the endpoint First endpoints

All client endpoints require Authorization: Bearer <token> from /login.
```ts
POST /api/auth/login → { email, password }

GET /api/clients with query params:

page (1-based), pageSize, sort, order, search

Example: /api/clients?page=1&pageSize=10&sort=created_at&order=desc

POST /api/clients → create

PUT /api/clients/:id → update

DELETE /api/clients/:id → delete

GET /api/clients/:id/csv → single-row CSV (used by toolbar export)

```

### 🏛️ Backend Folder Architecture:

```bash
📁 backend/
  📄 .DS_Store
  📄 .env
  📄 .env.example
  📄 .gitignore
  📄 Readme.md
  📄 package-lock.json
  📄 package.json
  📁 src/
    📄 app.ts
    📁 config/
      📄 env.ts
    📁 database/
      📄 pool.ts
    📁 middleware/
      📄 asyncHandler.ts
      📄 auth.ts
      📄 errorHandler.ts
    📁 modules/
      📁 auth/
        📄 auth.controller.ts
        📄 auth.routes.ts
        📄 auth.service.ts
        📄 user.repo.ts
      📁 clients/
        📄 client.controller.ts
        📄 client.repo.ts
        📄 client.routes.ts
        📄 client.service.ts
    📁 scripts/
      📄 seed.ts
    📄 server.ts
    📁 utils/
      📄 jwt.ts
  📄 tsconfig.json


```