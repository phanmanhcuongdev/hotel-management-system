# Backend Runtime Notes

## Local development

Run the backend with the Spring `dev` profile:

```powershell
./mvnw spring-boot:run "-Dspring-boot.run.profiles=dev"
```

This profile uses:
- in-memory H2
- local JWT defaults from `application-dev.yaml`
- port `8080` unless `SERVER_PORT` is overridden

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
- In production-style deployment, the bundled nginx config proxies `/api` to the backend container.
