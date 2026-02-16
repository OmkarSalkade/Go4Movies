package database

import (
	"log"
	"time"

	"github.com/parasmittal099/backend-project/models"
)

func strPtr(s string) *string {
	return &s
}

func timePtr(t time.Time) *time.Time {
	return &t
}

// Seed inserts sample data into the database.
// It only runs if the locations table is empty (idempotent).
func Seed() {
	var count int64
	DB.Model(&models.Location{}).Count(&count)
	if count > 0 {
		log.Println("Database already seeded, skipping")
		return
	}

	// -------------------------------------------------------
	// 1. LOCATIONS (Florida zipcodes)
	// -------------------------------------------------------
	locations := []models.Location{
		{Zipcode: "33101", City: "Miami", State: "Florida"},
		{Zipcode: "33301", City: "Fort Lauderdale", State: "Florida"},
		{Zipcode: "32801", City: "Orlando", State: "Florida"},
		{Zipcode: "33601", City: "Tampa", State: "Florida"},
		{Zipcode: "32301", City: "Tallahassee", State: "Florida"},
		{Zipcode: "33401", City: "West Palm Beach", State: "Florida"},
		{Zipcode: "32601", City: "Gainesville", State: "Florida"},
	}
	DB.Create(&locations)
	log.Printf("Seeded %d locations", len(locations))

	// -------------------------------------------------------
	// 2. THEATERS
	// -------------------------------------------------------
	theaters := []models.Theater{
		{Name: "AMC Aventura", LocationID: locations[0].ID, Address: strPtr("19501 Biscayne Blvd, Miami"), TotalScreens: 3},
		{Name: "Regal South Beach", LocationID: locations[0].ID, Address: strPtr("1100 Lincoln Rd, Miami Beach"), TotalScreens: 2},
		{Name: "Cinemark Paradise", LocationID: locations[1].ID, Address: strPtr("5401 S University Dr, Fort Lauderdale"), TotalScreens: 2},
		{Name: "AMC Disney Springs", LocationID: locations[2].ID, Address: strPtr("1500 Buena Vista Dr, Orlando"), TotalScreens: 4},
		{Name: "Regal Pointe Orlando", LocationID: locations[2].ID, Address: strPtr("9101 International Dr, Orlando"), TotalScreens: 3},
		{Name: "AMC West Shore", LocationID: locations[3].ID, Address: strPtr("210 Westshore Plaza, Tampa"), TotalScreens: 2},
		{Name: "Regal Celebration Pointe", LocationID: locations[6].ID, Address: strPtr("3528 SW 45th St, Gainesville"), TotalScreens: 2},
	}
	DB.Create(&theaters)
	log.Printf("Seeded %d theaters", len(theaters))

	// -------------------------------------------------------
	// 3. SCREENS (1 per theater for sample data)
	// -------------------------------------------------------
	screens := []models.Screen{
		{TheaterID: theaters[0].ID, Name: "Screen 1", TotalRows: 10, TotalCols: 15, ScreenType: "IMAX"},
		{TheaterID: theaters[1].ID, Name: "Screen 1", TotalRows: 8, TotalCols: 12, ScreenType: "Standard"},
		{TheaterID: theaters[2].ID, Name: "Screen 1", TotalRows: 10, TotalCols: 14, ScreenType: "Standard"},
		{TheaterID: theaters[3].ID, Name: "Screen 1", TotalRows: 12, TotalCols: 18, ScreenType: "IMAX"},
		{TheaterID: theaters[4].ID, Name: "Screen 1", TotalRows: 10, TotalCols: 15, ScreenType: "4DX"},
		{TheaterID: theaters[5].ID, Name: "Screen 1", TotalRows: 9, TotalCols: 14, ScreenType: "Standard"},
		{TheaterID: theaters[6].ID, Name: "Screen 1", TotalRows: 10, TotalCols: 15, ScreenType: "Standard"},
	}
	DB.Create(&screens)
	log.Printf("Seeded %d screens", len(screens))

	// -------------------------------------------------------
	// 4. MOVIES
	// -------------------------------------------------------
	movies := []models.Movie{
		{
			Title:       "Thunderbolts*",
			Description: strPtr("A group of anti-heroes are recruited by Valentina Allegra de Fontaine to go on a mission that reveals their past."),
			Genre:       strPtr("Action,Superhero"),
			Language:    "English",
			DurationMin: 127,
			Rating:      strPtr("PG-13"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/thunderbolts.jpg"),
			Cast:        strPtr("Florence Pugh, Sebastian Stan, David Harbour, Wyatt Russell"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=thunderbolts"),
			ReleaseDate: timePtr(time.Date(2025, 5, 2, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "Mission: Impossible - The Final Reckoning",
			Description: strPtr("Ethan Hunt faces his most dangerous mission yet as he races to stop a catastrophic weapon from falling into the wrong hands."),
			Genre:       strPtr("Action,Thriller"),
			Language:    "English",
			DurationMin: 163,
			Rating:      strPtr("PG-13"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/mi8.jpg"),
			Cast:        strPtr("Tom Cruise, Hayley Atwell, Simon Pegg, Ving Rhames"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=mi-final"),
			ReleaseDate: timePtr(time.Date(2025, 5, 23, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "Dune: Part Three",
			Description: strPtr("Paul Atreides continues his journey as he unites with the Fremen to lead a rebellion across the galaxy."),
			Genre:       strPtr("Sci-Fi,Drama"),
			Language:    "English",
			DurationMin: 175,
			Rating:      strPtr("PG-13"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/dune3.jpg"),
			Cast:        strPtr("Timothée Chalamet, Zendaya, Austin Butler, Florence Pugh"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=dune3"),
			ReleaseDate: timePtr(time.Date(2026, 2, 20, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "Inside Out 3",
			Description: strPtr("Riley faces new emotions as she navigates college life and discovers feelings she never knew she had."),
			Genre:       strPtr("Animation,Comedy,Family"),
			Language:    "English",
			DurationMin: 105,
			Rating:      strPtr("PG"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/insideout3.jpg"),
			Cast:        strPtr("Amy Poehler, Maya Hawke, Phyllis Smith, Lewis Black"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=insideout3"),
			ReleaseDate: timePtr(time.Date(2026, 6, 13, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "The Batman II",
			Description: strPtr("Batman returns to Gotham to face a new villain who threatens to expose the city's darkest secrets."),
			Genre:       strPtr("Action,Crime,Drama"),
			Language:    "English",
			DurationMin: 155,
			Rating:      strPtr("PG-13"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/batman2.jpg"),
			Cast:        strPtr("Robert Pattinson, Zoë Kravitz, Colin Farrell, Jeffrey Wright"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=batman2"),
			ReleaseDate: timePtr(time.Date(2026, 10, 2, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "Wicked: For Good",
			Description: strPtr("The epic conclusion to the Wicked saga as Elphaba and Glinda face their destinies in the land of Oz."),
			Genre:       strPtr("Musical,Fantasy,Drama"),
			Language:    "English",
			DurationMin: 145,
			Rating:      strPtr("PG"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/wicked2.jpg"),
			Cast:        strPtr("Cynthia Erivo, Ariana Grande, Jeff Goldblum, Michelle Yeoh"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=wicked2"),
			ReleaseDate: timePtr(time.Date(2025, 11, 21, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "A Quiet Place: Day One",
			Description: strPtr("Experience the day the world went quiet. A prequel revealing how it all began in New York City."),
			Genre:       strPtr("Horror,Sci-Fi,Thriller"),
			Language:    "English",
			DurationMin: 99,
			Rating:      strPtr("PG-13"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/quietplace3.jpg"),
			Cast:        strPtr("Lupita Nyong'o, Joseph Quinn, Alex Wolff, Djimon Hounsou"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=quietplace-dayone"),
			ReleaseDate: timePtr(time.Date(2025, 6, 28, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
		{
			Title:       "Moana 3",
			Description: strPtr("Moana sets sail once more on a brand-new adventure across uncharted waters with old and new friends."),
			Genre:       strPtr("Animation,Adventure,Family"),
			Language:    "English",
			DurationMin: 110,
			Rating:      strPtr("PG"),
			PosterURL:   strPtr("https://image.tmdb.org/t/p/w500/moana3.jpg"),
			Cast:        strPtr("Auli'i Cravalho, Dwayne Johnson, Rachel House, Temuera Morrison"),
			TrailerURL:  strPtr("https://youtube.com/watch?v=moana3"),
			ReleaseDate: timePtr(time.Date(2026, 11, 27, 0, 0, 0, 0, time.UTC)),
			IsActive:    true,
		},
	}
	DB.Create(&movies)
	log.Printf("Seeded %d movies", len(movies))

	// -------------------------------------------------------
	// 5. SHOWTIMES
	//    Spread across theaters so different cities have
	//    different movie selections for testing.
	// -------------------------------------------------------
	today := time.Now().Format("2006-01-02")
	tomorrow := time.Now().Add(24 * time.Hour).Format("2006-01-02")

	showtimes := []models.Showtime{
		// Miami -- AMC Aventura (screen 0): Thunderbolts, Dune 3, Batman II
		{MovieID: movies[0].ID, ScreenID: screens[0].ID, ShowDate: today, StartTime: "10:00", EndTime: "12:07", Language: "English", Format: "IMAX", PriceMultiplier: 1.5, IsActive: true},
		{MovieID: movies[2].ID, ScreenID: screens[0].ID, ShowDate: today, StartTime: "13:00", EndTime: "15:55", Language: "English", Format: "IMAX", PriceMultiplier: 1.5, IsActive: true},
		{MovieID: movies[4].ID, ScreenID: screens[0].ID, ShowDate: tomorrow, StartTime: "18:00", EndTime: "20:35", Language: "English", Format: "IMAX", PriceMultiplier: 1.5, IsActive: true},

		// Miami -- Regal South Beach (screen 1): MI, Wicked
		{MovieID: movies[1].ID, ScreenID: screens[1].ID, ShowDate: today, StartTime: "11:00", EndTime: "13:43", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[5].ID, ScreenID: screens[1].ID, ShowDate: today, StartTime: "15:00", EndTime: "17:25", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},

		// Fort Lauderdale -- Cinemark (screen 2): Thunderbolts, Inside Out 3, Quiet Place
		{MovieID: movies[0].ID, ScreenID: screens[2].ID, ShowDate: today, StartTime: "10:30", EndTime: "12:37", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[3].ID, ScreenID: screens[2].ID, ShowDate: today, StartTime: "14:00", EndTime: "15:45", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[6].ID, ScreenID: screens[2].ID, ShowDate: tomorrow, StartTime: "19:00", EndTime: "20:39", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},

		// Orlando -- AMC Disney Springs (screen 3): Dune 3, Inside Out 3, Moana 3
		{MovieID: movies[2].ID, ScreenID: screens[3].ID, ShowDate: today, StartTime: "11:00", EndTime: "13:55", Language: "English", Format: "IMAX", PriceMultiplier: 1.5, IsActive: true},
		{MovieID: movies[3].ID, ScreenID: screens[3].ID, ShowDate: today, StartTime: "15:00", EndTime: "16:45", Language: "English", Format: "IMAX", PriceMultiplier: 1.2, IsActive: true},
		{MovieID: movies[7].ID, ScreenID: screens[3].ID, ShowDate: tomorrow, StartTime: "10:00", EndTime: "11:50", Language: "English", Format: "IMAX", PriceMultiplier: 1.2, IsActive: true},

		// Orlando -- Regal Pointe (screen 4): Thunderbolts, MI, Wicked
		{MovieID: movies[0].ID, ScreenID: screens[4].ID, ShowDate: today, StartTime: "12:00", EndTime: "14:07", Language: "English", Format: "4DX", PriceMultiplier: 1.8, IsActive: true},
		{MovieID: movies[1].ID, ScreenID: screens[4].ID, ShowDate: today, StartTime: "16:00", EndTime: "18:43", Language: "English", Format: "4DX", PriceMultiplier: 1.8, IsActive: true},
		{MovieID: movies[5].ID, ScreenID: screens[4].ID, ShowDate: tomorrow, StartTime: "19:00", EndTime: "21:25", Language: "English", Format: "4DX", PriceMultiplier: 1.8, IsActive: true},

		// Tampa -- AMC West Shore (screen 5): Batman II, Quiet Place, Moana 3
		{MovieID: movies[4].ID, ScreenID: screens[5].ID, ShowDate: today, StartTime: "13:00", EndTime: "15:35", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[6].ID, ScreenID: screens[5].ID, ShowDate: today, StartTime: "17:00", EndTime: "18:39", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[7].ID, ScreenID: screens[5].ID, ShowDate: tomorrow, StartTime: "10:30", EndTime: "12:20", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},

		// Gainesville -- Regal Celebration Pointe (screen 6): Dune 3, Thunderbolts, Inside Out 3, Wicked
		{MovieID: movies[2].ID, ScreenID: screens[6].ID, ShowDate: today, StartTime: "11:00", EndTime: "13:55", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[0].ID, ScreenID: screens[6].ID, ShowDate: today, StartTime: "15:00", EndTime: "17:07", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[3].ID, ScreenID: screens[6].ID, ShowDate: tomorrow, StartTime: "10:00", EndTime: "11:45", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
		{MovieID: movies[5].ID, ScreenID: screens[6].ID, ShowDate: tomorrow, StartTime: "14:00", EndTime: "16:25", Language: "English", Format: "2D", PriceMultiplier: 1.0, IsActive: true},
	}
	DB.Create(&showtimes)
	log.Printf("Seeded %d showtimes", len(showtimes))

	log.Println("Database seeding completed successfully")
}
