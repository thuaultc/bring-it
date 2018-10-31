const apiUrl = 'https://api.bring-it.thuault.com';

export default class StorageAPI {
  async createEvent(payload) {
    const request = {
      ...payload,
      creation_date: payload.creationDate,
      event_date: payload.eventDate,
      items: [],
      users: [],
      inventory: []
    }

    delete request.creationDate
    delete request.eventDate

    console.log(request)

    const data = await fetch(apiUrl + "/events", {
      method: 'POST',
      body: JSON.stringify(request)
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log('successfully create event data')
      console.log(data)
      return data
    })
    .catch(function(err) {
      console.log('error in create event data')
      console.log(err)
      throw new Error(
        `[StorageAPI] createEvent(payload)`
      );
    })

    return data.id;
  }

  async updateEventDesc(payload, id) {
    console.log("COUCOU", payload)
    const request = {
      ...payload,
      creation_date: new Date(payload.creationDate).toISOString(),
      event_date: new Date(payload.eventDate).toISOString()
    }
    console.log("COUCOU", request)
    console.log("COUCOU", id)

    delete request.creationDate
    delete request.eventDate

    const data = await fetch(apiUrl + "/events/" + id, {
      method: 'PUT',
      body: JSON.stringify(request)
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log('successfully update event data')
      console.log(data)
      return data
    })
    .then(function(data) {
      const items = data.items

      items.forEach(element => {
        element.count = 0
        element.guests = []
      });

      data.inventory.forEach(element => {
        const name = data.users[element.name].name
        const count = element.quantity
        const item = data.items[element.item]

        item.count += count
        item.guests.push({
          name: name,
          count: count
        })
      });
      
      const event = {
        ...data,
        items: items,
        creationDate: data.creation_date,
        eventDate: data.event_date,
      }
      delete event.inventory
      delete event.users

      return event
    })
    .catch(function(err) {
      console.log('error in get event data')
      console.log(err)
      throw new Error(
        `[StorageAPI] getEvent(payload, ${id})`
      );
    })

    return data
  }

  async updateEventItems(payload, id) {
    console.log("COUCOU", payload)
    const request = {
      ...payload,
      creation_date: new Date(payload.creationDate).toISOString(),
      event_date: new Date(payload.eventDate).toISOString(),
      items: [],
      users: [],
      inventory: []
    }
    console.log("COUCOU", request)
    console.log("COUCOU", id)

    delete request.creationDate
    delete request.eventDate

    const data = await fetch(apiUrl + "/events/" + id, {
      method: 'PUT',
      body: JSON.stringify(request)
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log('successfully update event data')
      console.log(data)
      return data
    })
    .then(function(data) {
      const items = data.items

      items.forEach(element => {
        element.count = 0
        element.guests = []
      });

      data.inventory.forEach(element => {
        const name = data.users[element.name].name
        const count = element.quantity
        const item = data.items[element.item]

        item.count += count
        item.guests.push({
          name: name,
          count: count
        })
      });
      
      const event = {
        ...data,
        items: items,
        creationDate: data.creation_date,
        eventDate: data.event_date,
      }
      delete event.inventory
      delete event.users

      return event
    })
    .catch(function(err) {
      console.log('error in get event data')
      console.log(err)
      throw new Error(
        `[StorageAPI] getEvent(payload, ${id})`
      );
    })

    return data
  }

  async getEvent(id) {
    const data = await fetch(apiUrl + "/events/" + id, {
      method: 'GET'
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log('successfully get event data')
      console.log(data)
      return data
    })
    .then(function(data) {
      const items = data.items

      items.forEach(element => {
        element.count = 0
        element.guests = []
      });

      data.inventory.forEach(element => {
        const name = data.users[element.name].name
        const count = element.quantity
        const item = data.items[element.item]

        item.count += count
        item.guests.push({
          name: name,
          count: count
        })
      });
      
      const event = {
        ...data,
        items: items,
        creationDate: data.creation_date,
        eventDate: data.event_date,
      }
      delete event.inventory
      delete event.users

      return event
    })
    .catch(function(err) {
      console.log('error in get event data')
      console.log(err)
      throw new Error(
        `[StorageAPI] getEvent(payload, ${id})`
      );
    })

    return data
  }
}
