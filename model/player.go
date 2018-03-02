package model

import (
	"github.com/jinzhu/gorm"
)

// Player playing foosball games
type Player struct {
	gorm.Model        `json:"-"`
	Nickname          string             `json:"nickname" binding:"required" gorm:"size:50;unique_index"`
	RealName          string             `json:"realname" gorm:"type:varchar(100);not null"`
	RFID              string             `json:"rfid,omitempty" gorm:"type:varchar(36)"`
	TournamentPlayers []TournamentPlayer `json:"tournaments,omitempty"`
}

// TournamentPlayer is a player in a tournament
type TournamentPlayer struct {
	gorm.Model   `json:"-"`
	PlayerID     uint       `json:"-"`
	Player       Player     `json:"-"`
	TournamentID uint       `json:"-"`
	Tournament   Tournament `json:"tournament"`
	Points       uint       `json:"points"`
	Active       bool       `json:"active"`
}

func (p *Player) FindTournamentPlayer(id string) *TournamentPlayer {
	for i, tp := range p.TournamentPlayers {
		if tp.Tournament.UUID == id {
			return &p.TournamentPlayers[i]
		}
	}
	return nil
}

// PlayerRepository provides access players
type PlayerRepository interface {
	Store(player *Player) error
	Remove(player *Player) error
	Update(player *Player) error
	Find(nickname string) (*Player, Found, error)
	FindAll() []*Player
	FindByTournament(id string) []*Player
}

// NewPlayer create new palyer
func NewPlayer(nickname, realName string) *Player {
	return &Player{
		Nickname:          nickname,
		RealName:          realName,
		TournamentPlayers: make([]TournamentPlayer, 0, 10),
	}
}
