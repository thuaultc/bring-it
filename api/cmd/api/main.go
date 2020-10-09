package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/thuaultc/bring-it/api/pkg/mongo"
)

var mongoConn = mongo.Conn{}

func index(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func init() {
	mongoConn.Server = os.Getenv("DB_URI")
	mongoConn.Database = os.Getenv("DB_NAME")
	mongoConn.Connect()
}

// APIUserCreate controls the user creation
func APIUserCreate(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func main() {
	log.Print("Bring-it API starting...")
	addr := flag.String("addr", ":8080", "address to listen on")
	flag.Parse()

	log.Print("Creating router...")
	r := mux.NewRouter()
	r.HandleFunc("/events", EventsHandler).Methods("POST")
	r.HandleFunc("/events/{id}", EventHandler).Methods("GET", "PUT")

	r.HandleFunc("/users", UsersHandler).Methods("POST")
	/*
		r.HandleFunc("/users", ).Methods("POST", "OPTIONS")
		r.HandleFunc("/users/{id}", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/users/{id}", ).Methods("PUT", "OPTIONS")
		r.HandleFunc("/events", ).Methods("POST", "OPTIONS")
		r.HandleFunc("/events/{id}", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{id}", ).Methods("PUT", "OPTIONS")
		r.HandleFunc("/events/{id}/items", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{id}/items", ).Methods("POST", "OPTIONS")
		r.HandleFunc("/events/{event_id}/items/{item_id}", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{event_id}/items/{item_id}", ).Methods("PUT", "OPTIONS")
		r.HandleFunc("/events/{event_id}/items/{item_id}", ).Methods("DELETE", "OPTIONS")
		r.HandleFunc("/events/{id}/guests", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{id}/inventory", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{id}/inventory/entry", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{id}/inventory/entry", ).Methods("PUT", "OPTIONS")
		r.HandleFunc("/events/{id}/inventory/entry", ).Methods("DELETE", "OPTIONS")
		r.HandleFunc("/events/{id}/inventory/entry/increment", ).Methods("GET", "OPTIONS")
		r.HandleFunc("/events/{id}/inventory/entry/decrement", ).Methods("GET", "OPTIONS")
	*/
	r.HandleFunc("/", index)

	log.Print("Waiting for connections on port ", *addr)
	if err := http.ListenAndServe(*addr, handlers.CORS()(r)); err != nil {
		log.Fatal(err)
	}
}
