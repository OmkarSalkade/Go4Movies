package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parasmittal099/backend-project/database"
	"github.com/parasmittal099/backend-project/models"
)

// GET /api/v1/locations
// Returns all supported locations from the locations table.
// Frontend displays these in a searchable dropdown (zipcode + city).
func GetLocations(c *gin.Context) {
	var locations []models.Location

	if err := database.DB.Order("city, zipcode").Find(&locations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch locations"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"locations": locations})
}
