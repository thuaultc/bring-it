package models

import (
	"time"
)

// Event structure contains all the basic information for the event/party and its items and participants
type Event struct {
	ID           string      `bson:"_id" json:"id"`
	Name         string      `bson:"name" json:"name"`
	EventDate    time.Time   `bson:"event_date" json:"event_date"`
	CreationDate time.Time   `bson:"creation_date" json:"creation_date"`
	Address      string      `bson:"address" json:"address"`
	Description  string      `bson:"description" json:"description"`
	Items        []Item      `bson:"items" json:"items"`
	Users        []User      `bson:"users" json:"users"`
	Inventory    []Inventory `bson:"inventory" json:"inventory"`
}

// Item structure contains all the item names and ids, with an optional amount needed for the party
type Item struct {
	Name   string `bson:"name" json:"name"`
	Needed uint   `bson:"needed" json:"needed"`
}

// User structure contains the user names and ids
type User struct {
	Name string `bson:"name" json:"name"`
}

// Inventory structure represents which user brings what amount of a specific item
type Inventory struct {
	User     uint `bson:"user" json:"name"`
	Item     uint `bson:"item" json:"item"`
	Quantity uint `bson:"quantity" json:"quantity"`
}
