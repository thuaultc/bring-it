package models

import (
	"time"
)

// Event structure contains all the basic information for the event/party and its items and participants
type Event struct {
	ID           string      `bson:"_id" json:"id"`
	Name         string      `bson:"name" json:"name"`
	CreationDate time.Time   `bson:"creation_date" json:"creation_date"`
	EventDate    time.Time   `bson:"event_date" json:"event_date"`
	Host         uint        `bson:"host_id" json:"host_id"`
	Address      string      `bson:"address" json:"address"`
	Description  string      `bson:"description" json:"description"`
	Items        []Item      `bson:"items" json:"items"`
	Inventory    []Inventory `bson:"inventory" json:"inventory"`
}

// Item structure contains all the item names and ids, with an optional amount needed for the party
type Item struct {
	Name   string `bson:"name" json:"name"`
	Needed uint   `bson:"needed" json:"needed"`
}

// Inventory structure represents which user brings what amount of a specific item
type Inventory struct {
	Guest  uint `bson:"guest_id" json:"guest_id"`
	Item   uint `bson:"item_id" json:"item_id"`
	Amount uint `bson:"amount" json:"amount"`
}
