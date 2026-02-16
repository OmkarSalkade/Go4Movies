package handlers

// POST /api/v1/auth/register
// Body: { "email", "username", "password", "full_name" }
// - Validate unique email + username
// - Hash password with bcrypt
// - Create user, return JWT access + refresh tokens

//func Register(c *gin.Context) { ... }

// POST /api/v1/auth/login
// Body: { "email", "password" }
// - Verify credentials, return JWT tokens

//func Login(c *gin.Context) { ... }

// POST /api/v1/auth/refresh
// Body: { "refresh_token" }
// - Validate hashed refresh token, revoke old, issue new pair

//func Refresh(c *gin.Context) { ... }
