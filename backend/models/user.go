package models

import "time"

type User struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Email        string    `gorm:"uniqueIndex;not null" json:"email"`
	Username     string    `gorm:"uniqueIndex;not null" json:"username"`
	PasswordHash string    `gorm:"not null" json:"-"`
	FullName     string    `gorm:"not null" json:"full_name"`
	Phone        *string   `json:"phone,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type RefreshToken struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"index;not null" json:"user_id"`
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"-"`
	TokenHash string    `gorm:"uniqueIndex;not null" json:"-"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	Revoked   bool      `gorm:"not null;default:false" json:"revoked"`
	CreatedAt time.Time `json:"created_at"`
}
