package main

import (
	"encoding/json"
	"flag"
	"log"
	"net"
	"net/http"

	"github.com/thuaultc/bring-it/api/pkg/event"
)

func index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("index"))
}

func APIEventRead(w http.ResponseWriter, r *http.Request) {
	// FIXME(sb) get id from request
	id := "42"

	e, err := event.Read(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("not found"))
		return
	}

	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	}
	// Stop here if its Preflighted OPTIONS request
	if r.Method == "OPTIONS" {
		return
	}

	json.NewEncoder(w).Encode(e)
}

func main() {
	addr := flag.String("addr", ":8080", "address to listen on")
	flag.Parse()

	l, err := net.Listen("tcp", *addr)
	if err != nil {
		log.Fatal(err)
	}

	mux := &http.ServeMux{}
	mux.HandleFunc("/api/events/", APIEventRead)
	mux.HandleFunc("/", index)

	if err := http.Serve(l, mux); err != nil {
		log.Fatal(err)
	}
}
