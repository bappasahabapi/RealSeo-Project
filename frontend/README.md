# Fronted : 

implemented
- Client: CRUD , Login, Logout sorting based on asc desc
- Validaton of form added
- Routing added
- redux added


### 🏛️ Fronted Folder Architecture:

```bash
📁 frontend/
  📄 .env
  📄 .env.local.example
  📄 .gitignore
  📄 README.md
  📁 .next/
    📄 app-build-manifest.json
    📄 build-manifest.json
    📁 cache/
      📁 images/
      📁 swc/
        📁 plugins/
      📁 webpack/
        📁 client-development/
        📁 client-development-fallback/
        📁 edge-server-production/
        📁 server-development/
        📁 server-production/
    📄 package.json
    📄 react-loadable-manifest.json
    📁 server/
      📄 app-paths-manifest.json
      📄 middleware-manifest.json
      📄 next-font-manifest.json
      📄 pages-manifest.json
    📁 static/
      📁 chunks/
        📄 polyfills.js
      📁 development/
        📄 _buildManifest.js
        📄 _ssgManifest.js
    📁 types/
      📄 link.d.ts
      📄 package.json
  📁 app/
    📁 clients/
      📁 [id]/
        📁 edit/
          📄 page.tsx
      📁 new/
        📄 page.tsx
      📄 page.tsx
    📄 globals.css
    📄 layout.tsx
    📄 providers.tsx
    📄 page.tsx
  📁 components/
    📄 AppShell.tsx
    📄 ClientForm.tsx
    📄 ClientsTable.tsx
    📄 Sidebar.tsx
  📁 lib/
    📄 api.ts
    📄 store.ts
    📄 theme.ts
  📁 public/
    📄 logo.svg
  📁 state/
    📄 authSlice.ts
    📄 clientsSlice.ts
  📄 next-env.d.ts
  📄 next.config.mjs
  📄 package.json
  📄 tsconfig.json


```