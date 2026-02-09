erDiagram
    ROLES ||--o{ USERS : has
    ROOM_TYPES ||--o{ ROOMS : contains
    USERS ||--o{ BOOKINGS : makes
    ROOMS ||--o{ BOOKINGS : assigned
    BOOKINGS ||--|| PAYMENTS : has

    ROLES {
        int id PK
        string nameerDiagram
    USERS ||--o{ BOOKINGS : makes
    ROOMS ||--o{ BOOKINGS : has
    ROLES ||--o{ USERS : assigns

    USERS {
        int id PK
        string username
        string password
        int role_id FK
    }

    ROLES {
        int id PK
        string name
    }

    ROOMS {
        int id PK
        string room_number
        string status
    }

    BOOKINGS {
        int id PK
        int user_id FK
        int room_id FK
        date check_in
        date check_out
    }

    }

    USERS {
        int id PK
        string username
        string password
        int role_id FK
    }

    ROOM_TYPES {
        int id PK
        string name
        float price
        int capacity
    }

    ROOMS {
        int id PK
        string room_number
        int room_type_id FK
        string status
    }

    BOOKINGS {
        int id PK
        int user_id FK
        int room_id FK
        date check_in
        date check_out
        string status
    }

    PAYMENTS {
        int id PK
        int booking_id FK
        float amount
        string method
        string status
    }
