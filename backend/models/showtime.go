package models

import "time"

type Showtime struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	MovieID         uint      `gorm:"index;not null" json:"movie_id"`
	Movie           Movie     `gorm:"foreignKey:MovieID;constraint:OnDelete:CASCADE" json:"movie,omitempty"`
	ScreenID        uint      `gorm:"index;not null" json:"screen_id"`
	Screen          Screen    `gorm:"foreignKey:ScreenID;constraint:OnDelete:CASCADE" json:"screen,omitempty"`
	ShowDate        string    `gorm:"not null;index" json:"show_date"`
	StartTime       string    `gorm:"not null" json:"start_time"`
	EndTime         string    `gorm:"not null" json:"end_time"`
	Language        string    `gorm:"not null;default:English" json:"language"`
	Format          string    `gorm:"not null;default:2D" json:"format"`
	PriceMultiplier float64   `gorm:"not null;default:1.0" json:"price_multiplier"`
	IsActive        bool      `gorm:"not null;default:true" json:"is_active"`
	CreatedAt       time.Time `json:"created_at"`
}
