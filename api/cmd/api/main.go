package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/xid"
	"github.com/thuaultc/bring-it/api/pkg/models"
	"github.com/thuaultc/bring-it/api/pkg/mongo"
)

var mongoConn = mongo.Conn{}

func index(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
}

// APIEventCreate controls the event creation
func APIEventCreate(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	if handleCORS(w, r) {
		return
	}

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

// APIEventUpdate controls the event update
func APIEventUpdate(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	if handleCORS(w, r) {
		return
	}

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
	if handleCORS(w, r) {
		return
	}

	id := mux.Vars(r)["id"]
	e, err := mongoConn.Read(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("not found"))
		return
	}

	json.NewEncoder(w).Encode(e)
}

func handleCORS(w http.ResponseWriter, r *http.Request) bool {
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
}

func init() {
	mongoConn.Server = os.Getenv("DB_URI")
	mongoConn.Database = os.Getenv("DB_NAME")
	mongoConn.Connect()
}

func main() {
	addr := flag.String("addr", ":8080", "address to listen on")
	flag.Parse()
	log.Print("Bring-it API starting...")

	log.Print("Trying to listen on TCP port ", *addr)
	l, err := net.Listen("tcp", *addr)
	if err != nil {
		log.Fatal(err)
	}

	log.Print("Creating router...")
	r := mux.NewRouter()
	r.HandleFunc("/events", APIEventCreate).Methods("POST", "OPTIONS")
	r.HandleFunc("/events/{id}", APIEventUpdate).Methods("PUT", "OPTIONS")
	r.HandleFunc("/events/{id}", APIEventRead).Methods("GET", "OPTIONS")

	r.HandleFunc("/", index)

	log.Print("Serving HTTP - waiting for connections...")
	if err := http.Serve(l, r); err != nil {
		log.Fatal(err)
	}
}
