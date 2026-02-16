package config

import "os"

type Config struct {
	DBPath    string
	JWTSecret string
	Port      string
}

func LoadConfig() *Config {
	return &Config{
		DBPath:    genENV("DB_PATH", "./data/go4movies.db"),
		JWTSecret: genENV("JWT_SECRET", "change-me-in-production"),
		Port:      genENV("PORT", "8080"),
	}
}

func genENV(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
