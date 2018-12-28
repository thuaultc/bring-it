package models

// User structure contains all the information describing a user
type User struct {
	ID   uint   `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
}
