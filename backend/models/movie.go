package models

import "time"

type Movie struct {
	ID          uint       `gorm:"primaryKey" json:"id"`
	Title       string     `gorm:"not null" json:"title"`
	Description *string    `json:"description,omitempty"`
	Genre       *string    `json:"genre,omitempty"`
	Language    string     `gorm:"not null;default:English" json:"language"`
	DurationMin int        `gorm:"not null" json:"duration_min"`
	Rating      *string    `json:"rating,omitempty"`
	PosterURL   *string    `json:"poster_url,omitempty"`
	Cast        *string    `json:"cast,omitempty"`
	TrailerURL  *string    `json:"trailer_url,omitempty"`
	ReleaseDate *time.Time `json:"release_date,omitempty"`
	IsActive    bool       `gorm:"not null;default:true;index" json:"is_active"`
	CreatedAt   time.Time  `json:"created_at"`
}
