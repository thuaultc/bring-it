# API

## Routes

```
POST /users
GET, PUT /users/{id}
POST /events
GET, PUT /events/{id}
GET, POST /events/{id}/items
GET, PUT, DELETE /events/{event_id}/items/{item_id}
GET /events/{id}/guests
GET /events/{id}/inventory
GET, PUT, DELETE /events/{id}/inventory/entry
GET /events/{id}/inventory/entry/increment
GET /events/{id}/inventory/entry/decrement
```

### Create user

```json
POST /users HTTP/1.1
{
    "name": "Jack"
}

HTTP/1.1 201
{
    "id": 1,
    "name": "Jack"
}
```

### Describe user

```json
GET /users/{id} HTTP/1.1

HTTP/1.1 200
{
    "id": 1,
    "name": "Jack"
}
```

### Update user

```json
PUT /users/{id} HTTP/1.1
{
    "id": 1,
    "name": "Jacky"
}

HTTP/1.1 200
{
    "id": 1,
    "name": "Jacky"
}
```

### Create event

```json
POST /events HTTP/1.1
{
    "name": "Jack's 18th Birthday!",
    "event_date": 1546300800,
    "host_id": 1,
    "address": "1 Police Plaza, NYC",
    "description": "It's gonna be great! Don't forget your gifts."
}

HTTP/1.1 201
{
    "event_id": "r794m1dmbd52vsi8",
    "name": "Jack's 18th Birthday!",
    "creation_date": 1545866264,
    "event_date": 1546300800,
    "host_id": 1,
    "address": "1 Police Plaza, NYC",
    "description": "It's gonna be great! Don't forget your gifts."
}
```

* The **event_id** will be created when inserted in the database in the **_id** field.
* The dates must be specified in UTC format.
* The **creation_date** is computed server-side.
* The **host_id** must be a valid user id.
* Items, guests, and inventory will be initialized to an empty list.

### Describe event

```json
GET /events/{id} HTTP/1.1

HTTP/1.1 200
{
    "event_id": "r794m1dmbd52vsi8",
    "name": "Jack's 18th Birthday!",
    "creation_date": 1545866264,
    "event_date": 1546300800,
    "host_id": 1,
    "address": "1 Police Plaza, NYC",
    "description": "It's gonna be great! Don't forget your gifts."
}
```

### Update event

```json
PUT /events/{id} HTTP/1.1
{
    "event_id": "r794m1dmbd52vsi8",
    "name": "Jack's 18th Birthday!",
    "creation_date": 1545866264,
    "event_date": 1546300801,
    "host_id": 1,
    "address": "1 Police Plaza, NYC",
    "description": "It's gonna be great! Don't forget your gifts. I've also updated the event date."
}

HTTP/1.1 200
{
    "event_id": "r794m1dmbd52vsi8",
    "name": "Jack's 18th Birthday!",
    "creation_date": 1545866264,
    "event_date": 1546300800,
    "host_id": 1,
    "address": "1 Police Plaza, NYC",
    "description": "It's gonna be great! Don't forget your gifts. I've also updated the event date."
}
```

* Seul l'utilisateur courant correspondant au **host_id** peut modifier l'évènement.

### Describe all items for an event

```json
GET /events/{id}/items HTTP/1.1

HTTP/1.1 200
{
    "items": [
        {
            "id": 1,
            "name": "Bag of chips",
            "requested": 2
        },
        {
            "id": 2,
            "name": "Beer 6-pack"
        }
    ]
}
```

### Add an item for an event

```json
POST /events/{id}/items HTTP/1.1
{
    "name": "Bag of chips",
    "requested": 2
}

HTTP/1.1 201
{
    "id": 1,
    "name": "Bag of chips",
    "requested": 2
}
```

* The **requested** field is optional.

### Describe an item for an event

```json
GET /events/{event_id}/items/{item_id} HTTP/1.1

HTTP/1.1 200
{
    "id": 1,
    "name": "Bag of chips",
    "requested": 2
}
```

### Update an item for an event

```json
PUT /events/{event_id}/items/{item_id} HTTP/1.1

HTTP/1.1 200
{
    "id": 1,
    "name": "Bag of chips",
    "requested": 2
}
```

### Delete an item for an event

```json
DELETE /events/{event_id}/items/{item_id} HTTP/1.1

HTTP/1.1 204
```

* This is only possible if no remaining guest is associated with this item.

### Describe all guests of an event

```json
GET /events/{id}/guests HTTP/1.1

HTTP/1.1 200
{
    "guests": [1, 2]
}
```

### Retrieve inventory for an event

```json
GET /events/{id}/inventory HTTP/1.1

HTTP/1.1 200
{
    "inventory": [
        {
            "guest_id": 1,
            "item_id": 1,
            "amount": 1
        },
        {
            "guest_id": 1,
            "item_id": 2,
            "amount": 1
        },
        {
            "guest_id": 2,
            "item_id": 2,
            "amount": 3
        }
    ]
}
```

* The **guest_id** or **item_id** parameters can be given to filter results (must be exclusive).

```json
GET /events/{id}/inventory?guest_id=1 HTTP/1.1

HTTP/1.1 200
{
    "inventory": [
        {
            "guest_id": 1,
            "item_id": 1,
            "amount": 1
        },
        {
            "guest_id": 1,
            "item_id": 2,
            "amount": 1
        }
    ]
}
```

```json
GET /events/{id}/inventory?item_id=2 HTTP/1.1

HTTP/1.1 200
{
    "inventory": [
        {
            "guest_id": 1,
            "item_id": 2,
            "amount": 1
        },
        {
            "guest_id": 2,
            "item_id": 2,
            "amount": 3
        }
    ]
}
```

### Get amount of specific inventory entry

```json
GET /events/{id}/inventory/entry?guest_id=1&item_id=2 HTTP/1.1

HTTP/1.1 200
{
    "amount": 1
}
```

* Both **guest_id** or **item_id** parameters are required here.

### Put amount of specific inventory entry

```json
PUT /events/{id}/inventory/entry?guest_id=1&item_id=2 HTTP/1.1

HTTP/1.1 200
{
    "amount": 3
}
```

### Increment specific inventory entry

```json
GET /events/{id}/inventory/entry/increment?guest_id=1&item_id=2 HTTP/1.1

HTTP/1.1 200
{
    "amount": 4
}
```

### Decrement specific inventory entry

```json
GET /events/{id}/inventory/entry/decrement?guest_id=1&item_id=2 HTTP/1.1

HTTP/1.1 200
{
    "amount": 3
}
```

### Delete specific inventory entry

```json
DELETE /events/{id}/inventory/entry?guest_id=1&item_id=2 HTTP/1.1

HTTP/1.1 204
```

## Backend representation

### Events

```json
Event {
    "_id": "r794m1dmbd52vsi8",
    "name": "Jack's 18th Birthday!",
    "creation_date": 1545866264,
    "event_date": 1546300800,
    "host_id": 1,
    "address": "1 Police Plaza, NYC",
    "description": "It's gonna be great! Don't forget your things.",
    "items": [
        {
            "id": 1,
            "name": "Bag of chips",
            "requested": 2
        },
        {
            "id": 2,
            "name": "Beer 6-pack"
        }        
    ],
    "guests": [1, 2],
    "inventory": [
        {
            "guest_id": 1,
            "item_id": 1,
            "amount": 1
        },
        {
            "guest_id": 1,
            "item_id": 2,
            "amount": 1
        },
        {
            "guest_id": 2,
            "item_id": 2,
            "amount": 3
        }
    ]
}
```

### Users

```json
User {
    "_id": 1,
    "name": "Jack"
}

User {
    "_id": 2,
    "name": "Clément"
}
```