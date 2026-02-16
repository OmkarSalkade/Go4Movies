package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parasmittal099/backend-project/database"
	"github.com/parasmittal099/backend-project/models"
)

// GET /api/v1/movies?zipcode=110001&q=avengers
func ListMovies(c *gin.Context) {
	var movies []models.Movie
	query := database.DB.Where("is_active = ?", true)

	//filter by zipcode
	if zipcode := c.Query("zipcode"); zipcode != "" {
		//Look up the city for this zipcode from the locations table
		var location models.Location
		if err := database.DB.Where("zipcode = ?", zipcode).First(&location).Error; err != nil {
			c.JSON(http.StatusOK, []models.Movie{}) // unknown zipcode = no movies
			return
		}

		// Step 2: Find all location IDs in the same city (radius/nearby)
		// Step 3: Find movies with showtimes in theaters at those locations
		query = query.Where("id IN (?)",
			database.DB.Table("showtimes").
				Select("DISTINCT movie_id").
				Joins("JOIN screens ON screens.id = showtimes.screen_id").
				Joins("JOIN theaters ON theaters.id = screens.theater_id").
				Joins("JOIN locations ON locations.id = theaters.location_id").
				Where("locations.city = ? AND showtimes.is_active = ?", location.City, true),
		)
	}

	if q := c.Query("q"); q != "" {
		search := "%" + q + "%"
		query = query.Where("title LIKE ? OR genre LIKE ?", search, search)
	}

	if err := query.Find(&movies).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch movies"})
		return
	}

	c.JSON(http.StatusOK, movies)
}

// GET /api/v1/movies/:id
func GetMovie(c *gin.Context) {
	id := c.Param("id")
	var movie models.Movie

	if err := database.DB.First(&movie, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
		return
	}

	c.JSON(http.StatusOK, movie)
}
