package models

import "time"

type Theater struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Name         string    `gorm:"not null" json:"name"`
	LocationID   uint      `gorm:"index;not null" json:"location_id"`
	Location     Location  `gorm:"foreignKey:LocationID" json:"location,omitempty"`
	Address      *string   `json:"address,omitempty"`
	TotalScreens int       `gorm:"not null;default:1" json:"total_screens"`
	CreatedAt    time.Time `json:"created_at"`
	Screens      []Screen  `gorm:"foreignKey:TheaterID" json:"screens,omitempty"`
}

type Screen struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	TheaterID  uint      `gorm:"index;not null" json:"theater_id"`
	Theater    Theater   `gorm:"foreignKey:TheaterID;constraint:OnDelete:CASCADE" json:"-"`
	Name       string    `gorm:"not null" json:"name"`
	TotalRows  int       `gorm:"not null" json:"total_rows"`
	TotalCols  int       `gorm:"not null" json:"total_cols"`
	ScreenType string    `gorm:"not null;default:Standard" json:"screen_type"`
	CreatedAt  time.Time `json:"created_at"`
	Seats      []Seat    `gorm:"foreignKey:ScreenID" json:"seats,omitempty"`
}

type Seat struct {
	ID        uint    `gorm:"primaryKey" json:"id"`
	ScreenID  uint    `gorm:"uniqueIndex:idx_seat_unique;not null" json:"screen_id"`
	Screen    Screen  `gorm:"foreignKey:ScreenID;constraint:OnDelete:CASCADE" json:"-"`
	RowLabel  string  `gorm:"uniqueIndex:idx_seat_unique;not null" json:"row_label"`
	ColNumber int     `gorm:"uniqueIndex:idx_seat_unique;not null" json:"col_number"`
	SeatType  string  `gorm:"not null;default:Regular" json:"seat_type"`
	BasePrice float64 `gorm:"not null;default:150.0" json:"base_price"`
}
