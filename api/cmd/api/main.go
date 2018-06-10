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

func APIEventCreate(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	if handleCORS(w, r) {
		return
	}

	var event models.Event
	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
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

func APIEventUpdate(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	if handleCORS(w, r) {
		return
	}

	var event models.Event
	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
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
	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	}

	// Stop here if its Preflighted OPTIONS request
	if r.Method == "OPTIONS" {
		return true
	}
	return false
}

func init() {
	mongoConn.Server = os.Getenv("SERVER_URL")
	mongoConn.Database = "admin"
	mongoConn.Connect()
}

func main() {
	addr := flag.String("addr", ":8080", "address to listen on")
	flag.Parse()

	l, err := net.Listen("tcp", *addr)
	if err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()
	r.HandleFunc("/events", APIEventCreate).Methods("POST")
	r.HandleFunc("/events/{id}", APIEventUpdate).Methods("PUT")
	r.HandleFunc("/events/{id}", APIEventRead).Methods("GET")
	r.HandleFunc("/", index)

	if err := http.Serve(l, r); err != nil {
		log.Fatal(err)
	}
}
