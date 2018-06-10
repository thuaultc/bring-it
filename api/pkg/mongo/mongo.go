package mongo

import (
	"log"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/thuaultc/bring-it/api/pkg/models"
)

// Conn structure contains the connection configuration to the database
type Conn struct {
	Server   string
	Database string
}

var db *mgo.Database

// Connect establishes the connection to the database
func (c *Conn) Connect() {
	session, err := mgo.Dial(c.Server)
	if err != nil {
		log.Fatal(err)
	}
	session.SetSafe(&mgo.Safe{WMode: "majority"})
	db = session.DB(c.Database)
}

// Create function inserts the event in the database
func (c *Conn) Create(event models.Event) (err error) {
	err = db.C("events").Insert(&event)
	return
}

// Read function finds the event with the given id in the database
func (c *Conn) Read(id string) (event *models.Event, err error) {
	err = db.C("events").Find(bson.M{"_id": id}).One(&event)
	return
}

// Update function updates the event with the given id in the database
func (c *Conn) Update(id string, event models.Event) (err error) {
	err = db.C("events").UpdateId(id, &event)
	return
}
