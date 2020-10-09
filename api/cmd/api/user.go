package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/thuaultc/bring-it/api/pkg/models"
)

// UsersHandler handles the creation of users
func UsersHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	err := mongoConn.CreateUser(user)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("not found"))
		fmt.Fprintln(w, err)
		return
	}
	json.NewEncoder(w).Encode(user)
}
