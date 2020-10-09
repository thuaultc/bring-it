package mongo

import (
	"github.com/globalsign/mgo/bson"
	"github.com/thuaultc/bring-it/api/pkg/models"
)

// CreateEvent function inserts the event in the database
func (c *Conn) CreateEvent(event models.Event) (err error) {
	err = db.C("events").Insert(&event)
	return
}

// ReadEvent function finds the event with the given id in the database
func (c *Conn) ReadEvent(id string) (event *models.Event, err error) {
	err = db.C("events").Find(bson.M{"_id": id}).One(&event)
	return
}

// UpdateEvent function updates the event with the given id in the database
func (c *Conn) UpdateEvent(id string, event models.Event) (err error) {
	err = db.C("events").UpdateId(id, &event)
	return
}
