package models

type Location struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	Zipcode string `gorm:"uniqueIndex;not null" json:"zipcode"`
	City    string `gorm:"not null;index" json:"city"`
	State   string `gorm:"not null" json:"state"`
}
