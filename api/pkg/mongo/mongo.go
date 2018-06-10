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
func (c *Conn) Connect(url string) {
	session, err := mgo.Dial(c.Server)
	if err != nil {
		log.Fatal(err)
	}
	db = session.DB(c.Database)
}

/*func Create(id string) (*Event, error) {
	e, ok := events[id]
	if !ok {
		return nil, errors.New("not found")
	}

	e.ID = id

	return &e, nil
}*/

// Read finds the event with the specific id
func (c *Conn) Read(id string) (event *models.Event, err error) {
	err = db.C("events").Find(bson.M{"_id": id}).One(&event)
	return event, err
}

/*func Update(id string) (*Event, error) {
	e, ok := events[id]
	if !ok {
		return nil, errors.New("not found")
	}

	e.ID = id

	return &e, nil
}*/