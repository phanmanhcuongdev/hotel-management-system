# Phase 03: Backend Auth API

## Context
- `frontend/src/api/client.ts` — axios client với Authorization header
- `frontend/src/types/auth.ts` (kiểm tra nếu có)
- `backend/src/main/java/com/hotel/backend/config/BeanConfig.java`

## Overview
- **Date**: 2026-04-02
- **Priority**: HIGH
- **Status**: pending
- **Goal**: Backend cung cấp `/api/auth/login` endpoint để xác thực user và trả JWT token

## Key Insights
1. Frontend hiện có `AuthProvider` với mock login kiểm tra `admin/admin123`
2. Frontend `apiClient` inject `Authorization: Bearer {token}` header
3. Frontend dispatch `auth:unauthorized` event khi server trả 401
4. Backend hoàn toàn không có auth controller hay token verification
5. Cần tạo User domain model, UserRepository, AuthService, AuthController
6. KHÔNG cần full JWT library — có thể dùng simple token hoặc JJWT library

## Requirements
- `POST /api/auth/login` — body `{username, password}`, response `{token, user: {id, fullName, email, role}}`
- User domain model để represent logged-in user
- Simple JWT token generation và validation
- Password hashing (BCrypt)
- `UserRepository` để query user by username
- Error handling: invalid credentials → 401

## Architecture

### New Endpoint
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Authenticate user, return JWT token |

### Request/Response DTOs
```java
// LoginRequest
record LoginRequest(
    @NotBlank String username,
    @NotBlank String password
)

// LoginResponse
record LoginResponse(
    String token,
    UserDto user
)

// UserDto
record UserDto(
    Long id,
    String fullName,
    String email,
    String role
)
```

### New Domain Model
```java
// User
record User(
    Long id,
    String username,
    String passwordHash,
    String fullName,
    String email,
    String role
)

// UserStatus
enum UserStatus {
    ACTIVE, INACTIVE, DELETED
}
```

### New Ports
```java
// LoadUserPort
public interface LoadUserPort {
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
}
```

### New Files
```
backend/src/main/java/com/hotel/backend/
├── adapter/
│   ├── in/web/
│   │   ├── AuthController.java          # NEW
│   │   └── dto/
│   │       ├── LoginRequest.java       # NEW
│   │       ├── LoginResponse.java      # NEW
│   │       └── UserDto.java            # NEW
│   └── out/persistence/
│       ├── UserPersistenceAdapter.java # NEW
│       ├── UserJpaEntity.java          # NEW
│       ├── UserMapper.java             # NEW
│       └── SpringDataUserRepository.java # NEW
├── application/
│   ├── domain/
│   │   ├── model/
│   │   │   ├── User.java               # NEW
│   │   │   └── UserStatus.java         # NEW
│   │   └── service/
│   │       └── AuthService.java        # NEW - login logic
│   └── port/
│       ├── in/
│       │   └── LoginUseCase.java       # NEW
│       └── out/
│           └── LoadUserPort.java        # NEW
└── config/
    └── SecurityConfig.java              # NEW - optional, basic filter
```

### JPA Entity
```java
@Entity
@Table(name = "users")
public class UserJpaEntity {
    @Id @GeneratedValue
    Long id;
    String username;
    String passwordHash;
    String fullName;
    String email;
    String role;
    String status; // ACTIVE, INACTIVE, DELETED
}
```

### Database Schema (假设)
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

-- Seed data
INSERT INTO users (username, password_hash, full_name, email, role) 
VALUES ('admin', '$2a$10$...', 'Administrator', 'admin@hotel.com', 'ADMIN');
```

## Implementation Steps

1. **Tạo UserStatus enum**
   - File: `UserStatus.java`
   - Values: `ACTIVE, INACTIVE, DELETED`

2. **Tạo User domain model**
   - File: `User.java`
   - Record với các fields

3. **Tạo UserJpaEntity**
   - File: `UserJpaEntity.java`
   - JPA entity mapping đến `users` table

4. **Tạo UserMapper**
   - File: `UserMapper.java`
   - Map giữa Entity ↔ Domain

5. **Tạo SpringDataUserRepository**
   - File: `SpringDataUserRepository.java`
   - `findByUsername(String username)`
   - `existsByUsername(String username)`

6. **Tạo LoadUserPort**
   - File: `LoadUserPort.java`
   - `findByUsername`, `findById`

7. **Tạo UserPersistenceAdapter**
   - File: `UserPersistenceAdapter.java`
   - Implement `LoadUserPort`

8. **Tạo LoginRequest/Response DTOs**
   - File: `LoginRequest.java`
   - File: `LoginResponse.java`
   - File: `UserDto.java`

9. **Tạo LoginUseCase interface**
   - File: `LoginUseCase.java`
   - `login(username, password): LoginResponse`

10. **Tạo AuthService**
    - File: `AuthService.java`
    - Validate credentials với BCrypt
    - Generate JWT token
    - Return `LoginResponse`

11. **Tạo AuthController**
    - File: `AuthController.java`
    - `POST /api/auth/login` endpoint
    - Exception handling: invalid credentials → 401

12. **Tạo SecurityConfig (optional)**
    - File: `SecurityConfig.java`
    - Có thể thêm simple filter để validate JWT trên các endpoints khác
    - HOẶC có thể để phase sau — phase này chỉ cần login endpoint

13. **Update BeanConfig**
    - File: `BeanConfig.java`
    - Wire `LoadUserPort` → `UserPersistenceAdapter`
    - Wire `LoginUseCase` → `AuthService`

14. **Thêm JJWT dependency vào pom.xml**
    - JJWT API và Implementation
    - Hoặc dùng java.util.Base64 simple token (không khuyến khích cho production)

## Todo List
- [ ] Tạo UserStatus enum
- [ ] Tạo User domain model
- [ ] Tạo UserJpaEntity
- [ ] Tạo UserMapper
- [ ] Tạo SpringDataUserRepository
- [ ] Tạo LoadUserPort interface
- [ ] Tạo UserPersistenceAdapter
- [ ] Tạo Login DTOs (LoginRequest, LoginResponse, UserDto)
- [ ] Tạo LoginUseCase interface
- [ ] Tạo AuthService với JWT generation
- [ ] Tạo AuthController với POST /api/auth/login
- [ ] (Optional) Tạo SecurityConfig với JWT filter
- [ ] Update BeanConfig
- [ ] Thêm JJWT dependency

## Success Criteria
1. `POST /api/auth/login` với credentials đúng trả `{token, user: {...}}`
2. `POST /api/auth/login` với credentials sai trả 401
3. Frontend có thể call `/api/auth/login` và nhận token
4. Frontend `apiClient` inject được token vào Authorization header
5. Token có thể decode để lấy user info (hoặc verify signature)

## Risk Assessment
- **Risk**: Dùng simple Base64 token thay vì proper JWT
  - **Impact**: MEDIUM — Không an toàn cho production
  - **Mitigation**: Dùng JJWT library với secret key
- **Risk**: Password stored as plain text hoặc simple hash
  - **Impact**: CRITICAL — Security vulnerability
  - **Mitigation**: Dùng BCrypt password encoder
- **Risk**: Không có token expiration
  - **Impact**: MEDIUM — Token never expires
  - **Mitigation**: Set JWT expiration (e.g., 24h)

## Security Considerations
- **Password**: LUÔN hash password với BCrypt, KHÔNG bao giờ so sánh plain text
- **JWT Secret**: Store trong environment variable hoặc config, không hardcode
- **Token Storage**: Frontend lưu token trong localStorage (chấp nhận được cho demo)
- **CORS**: Configure CORS nếu frontend/backend khác origin
- **Rate Limiting**: Nên có rate limit trên login endpoint để prevent brute force

## Next Steps
- Phase 04: Frontend Cleanup — kết nối API thật, gỡ mock, gỡ console.log
