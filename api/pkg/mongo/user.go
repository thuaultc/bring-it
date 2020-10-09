package mongo

import "github.com/thuaultc/bring-it/api/pkg/models"

// CreateUser function inserts the user in the database
func (c *Conn) CreateUser(user models.User) (err error) {
	err = db.C("users").Insert(&user)
	return
}
