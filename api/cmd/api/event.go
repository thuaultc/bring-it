package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/xid"
	"github.com/thuaultc/bring-it/api/pkg/models"
)

// EventsHandler handles the creation of events
func EventsHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	/*	if handleCORS(w, r) {
			return
		}
	*/
	var event models.Event
	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	guid := xid.New()
	event.ID = guid.String()

	err := mongoConn.Create(event)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("not found"))
		fmt.Fprintln(w, err)
		return
	}
	json.NewEncoder(w).Encode(event)
}

// EventHandler handles the retrieval or update of a single event
func EventHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	/*	if handleCORS(w, r) {
			return
		}
	*/
	var event models.Event
	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
		log.Print("err ", err, " event ", event)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	id := mux.Vars(r)["id"]

	err := mongoConn.Update(id, event)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("not found"))
		fmt.Fprintln(w, err)
		return
	}
	json.NewEncoder(w).Encode(event)
}

// APIEventRead controls the event retrieval
func APIEventRead(w http.ResponseWriter, r *http.Request) {
	/*	if handleCORS(w, r) {
			return
		}
	*/
	id := mux.Vars(r)["id"]
	e, err := mongoConn.Read(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("not found"))
		return
	}

	json.NewEncoder(w).Encode(e)
}

/*func handleCORS(w http.ResponseWriter, r *http.Request) bool {
	authorizedOrigin := os.Getenv("CORS_ALLOWED_ORIGIN")

	if authorizedOrigin == "" {
		if origin := r.Header.Get("Origin"); origin != "" {
			authorizedOrigin = origin
		}
	}

	w.Header().Set("Access-Control-Allow-Origin", authorizedOrigin)
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	// Stop here if its Preflighted OPTIONS request
	if r.Method == "OPTIONS" {
		return true
	}
	return false
}*/
