package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jensborch/go-foosball/model"
	"github.com/jensborch/go-foosball/resources"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func main() {
	router := gin.Default()

	db, err := gorm.Open("sqlite3", "test.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	db.AutoMigrate(&model.Tournament{}, &model.TournamentTable{}, &model.Table{}, &model.Player{}, &model.Game{})

	players := router.Group("/players/")
	{
		players.POST("/", resources.PostPlayer(db))
		players.GET("/:name", resources.GetPlayer("name", db))
		players.GET("/", resources.GetPlayers(db))
	}

	tables := router.Group("/tables/")
	{
		tables.POST("/", resources.PostTable(db))
		tables.GET("/:id", resources.GetTable("id", db))
		tables.GET("/", resources.GetTables(db))
	}

	tournaments := router.Group("/tournaments/")
	{
		tournaments.POST("/", resources.PostTournament(db))
		tournaments.GET("/", resources.GetTournaments(db))
		tournaments.GET("/:id", resources.GetTournament("id", db))
		tournaments.GET("/:id/players", resources.GetTournamentPlayes("id", db))
		tournaments.POST("/:id/players", resources.PostTournamentPlayer("id", db))
		tournaments.GET("/:id/events", resources.GetTournamentEvents("id"))
	}

	router.StaticFile("/", "./src/github.com/jensborch/go-foosball/index.html")

	router.Run(":8080")
}
