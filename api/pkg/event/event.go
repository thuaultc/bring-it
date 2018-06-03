package event

import "time"

type Event struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Date        time.Time `json:"date"`
	Location    string    `json:"location"`
	Description string    `json:"description"`

	Items []Item `json:"items"`
}

type Item struct {
	ID string `json:"id"`
	Name string `json:"name"`
	From []ItemFrom `json:"from"`
}

type ItemFrom struct {
	Name     string `json:"name"`
	Quantity uint  `json:"quantity"`
}

func Read(id string) (*Event, error) {
	return &Event{
		ID:          id,
		Name:        "Raclette",
		Date:        time.Date(2018, time.December, 1, 20, 00, 00, 00, time.UTC),
		Location:    "chez Vincent",
		Description: "nothing to show here for now...",
		Items: []Item{
			{
				ID: "1",
				Name: "Machine à raclette",
				From: []ItemFrom{
					{
						Name: "Bod",
						Quantity: 1,
					},
					{
						Name: "Danie",
						Quantity: 42,
					},
				},
			},
			{
				ID: "2",
				Name: "Fromage",
				From: []ItemFrom{
					{
						Name: "John",
						Quantity: 18,
					},
					{
						Name: "Marie",
						Quantity: 13,
					},
				},
			},
		},
	}, nil
}
