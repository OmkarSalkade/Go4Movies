package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/parasmittal099/backend-project/config"
	"github.com/parasmittal099/backend-project/handlers"
	"github.com/parasmittal099/backend-project/middleware"
)

// cfg is used for auth routes (Sprint 1 US05 - uncomment when ready)
func RegisterRoutes(r *gin.Engine, cfg *config.Config) {
	_ = cfg // will be used when auth routes are enabled
	r.Use(middleware.CORS())

	v1 := r.Group("/api/v1")
	{
		// Locations (zipcodes + cities)
		v1.GET("/locations", handlers.GetLocations)

		// Movie listing + search (filter by zipcode, search by q)
		v1.GET("/movies", handlers.ListMovies)

		// Movie details
		v1.GET("/movies/:id", handlers.GetMovie)

		// Auth (TODO: uncomment when handlers/auth.go is implemented)
		// authHandler := &handlers.AuthHandler{JWTSecret: cfg.JWTSecret}
		// auth := v1.Group("/auth")
		// {
		//     auth.POST("/register", authHandler.Register)
		//     auth.POST("/login", authHandler.Login)
		//     auth.POST("/refresh", authHandler.Refresh)
		// }
	}
}
