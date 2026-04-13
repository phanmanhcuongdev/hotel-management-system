# Backend Runtime Notes

## Local development

Run the backend with the Spring `dev` profile:

```powershell
$env:SPRING_PROFILES_ACTIVE="dev"
./mvnw spring-boot:run
```

This profile uses:
- in-memory H2
- local JWT defaults from `application-dev.yaml`
- port `8080` unless `SERVER_PORT` is overridden

To seed a local admin user for login testing:

```powershell
$env:SPRING_PROFILES_ACTIVE="dev"
$env:APP_DEV_SEED_ADMIN_USERNAME="admin"
$env:APP_DEV_SEED_ADMIN_PASSWORD="123456"
./mvnw spring-boot:run
```

Notes:
- `APP_DEV_SEED_ADMIN_PASSWORD` must be plain text, not a pre-generated BCrypt hash.
- The dev seed only runs in the `dev` Spring profile.
- If the same username already exists, the seed is skipped.

## Production-style run

The default profile expects external environment variables. See `backend/.env.example` for the required keys:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MS`
- optional `SERVER_PORT`

Example:

```powershell
$env:DB_URL="jdbc:mysql://127.0.0.1:3306/hotel_management"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your-password"
$env:JWT_SECRET="replace-with-a-long-random-secret"
$env:JWT_EXPIRATION_MS="86400000"
./mvnw spring-boot:run
```

## Frontend integration

- Local Vite development expects the backend on `http://127.0.0.1:8080` by default.
- The frontend uses `/api` as its default API base path.
- `frontend/.env.example` is not loaded automatically by Vite. Use `frontend/.env` or set `VITE_*` variables in the shell before `npm run dev`.
- For real backend auth in local Vite development, set:
  - `VITE_API_BASE_URL=/api`
  - `VITE_DEV_API_PROXY_TARGET=http://127.0.0.1:8080`
  - `VITE_ENABLE_REAL_AUTH=true`
  - `VITE_ENABLE_MOCK_AUTH=false`
- In production-style deployment, the bundled nginx config proxies `/api` to the backend container.
