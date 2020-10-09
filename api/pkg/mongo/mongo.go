package mongo

import (
	"log"

	"github.com/globalsign/mgo"
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
