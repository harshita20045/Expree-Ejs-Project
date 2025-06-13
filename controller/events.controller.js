// import Event from "../model/events.model.js";





// export const getEventById = async (req, res) => {
//   try {
//     const event = await Event.getById(req.params.eventId);
//     console.log("Event for getEventById:", event);

//     if (!event) {
//       return res.status(404).render("error.ejs", { message: "Event not found" });
//     }

//     res.render("ViewMore.ejs", {
//       event,
//       title: "View Event",
//       currentUser: req.session.user ? req.session.user.username : null,
//       isLoggedIn: !!req.session.user,
//       currentPath: req.path
//     });
//   } catch (err) {
//     console.error("Error in getEventById:", err);
//     res.status(500).render("error.ejs", { message: "Error fetching event" });
//   }
// };


// export const createEventPage = (request, response, next) => {
//   return response.render("createEvent.ejs", {
//     title: "Create Event",
//     currentUser: request.session.user ? request.session.user.username : null,
//     isLoggedIn: !!request.session.user,
//     currentPath: request.path || ""
//   });
// };


// export const createEventHandler = async (req, res) => {
//   try {
  
//     if (!req.session.user || !req.session.user.id) {
//       return res.status(401).render("error.ejs", { message: "You must be logged in to create an event." });
//     }

//     const created_by = req.session.user.id;

//     const { name, date, location, description, category, image } = req.body;

//     if (!name || !date || !location) {
//       return res.status(400).json({ error: "Name, date, and location are required" });
//     }

//     const event = new Event(
//       null,
//       name,
//       date,
//       location,
//       description,
//       category,
//       image,
//       created_by,
//       null
//     );

//     console.log("Creating event:", event);
//     await Event.create(event);

//     return res.redirect("/");
//   } catch (err) {
//     console.error("Error in createEventHandler:", err);
//     res.status(500).json({ error: err.message });
//   }
// };



import Event from "../model/events.model.js";

export const createEventHandler = async (request, response, next) => {
  try {
    const user = request.session.currentUser || request.session.user;

    if (!user || !user.id) {
      return response.status(401).render("error.ejs", {
        message: "You must be logged in to create an event.",
      });
    }

    const createdBy = user.id;
    const { name, date, location, description, category, image, tickets } = request.body;

    if (!name || !date || !location) {
      return response.status(400).json({ error: "Name, date, and location are required" });
    }

    const event = new Event(
 
  name,
  date,
  location,
  description || '',
  category || '',
  image || '',
  createdBy,
  new Date(),
  tickets ? parseInt(tickets, 10) : 0,
  tickets ? parseInt(tickets, 10) : 0
);


    console.log("Creating event:", event);
    await event.create();

    return response.redirect("/"); 
  } catch (err) {
    console.error("Error in createEventHandler:", err);
    return response.status(500).render("error.ejs", { message: "Internal server error" });
  }
};
export const saveInBulk = async (req, res) => {
  try {
    const eventsData = req.body;

    if (!Array.isArray(eventsData)) {
      return res.status(400).json({ error: "Request body must be an array of events" });
    }

    const results = [];

    for (const eventData of eventsData) {
      const totalTickets = eventData.total_tickets ? parseInt(eventData.total_tickets, 10) : 0;
      const ticketsLeft = totalTickets; 

      const event = new Event(
        null, 
        eventData.name,
        eventData.date,
        eventData.location,
        eventData.description || '',
        eventData.category || '',
        eventData.image || '',
        eventData.created_by || null,
        null,  
        totalTickets,
        ticketsLeft
      );

      console.log("Creating event:", event);
      const eventId = await Event.create(event);
      results.push({ id: eventId, name: eventData.name });
    }

    res.status(201).json({ message: "Events created successfully", events: results });
  } catch (err) {
    console.error("Error in saveInBulk:", err);
    res.status(500).json({ error: err.message });
  }
};

export const bookEventPage = async (req, res, next) => {
  const eventId = req.params.eventId;
  console.log(eventId);

  try {
    const event = await Event.getById(eventId);
    console.log(event); // assuming you have this function
    return res.render("book.ejs", {
      title: "Book Event",
      event, // ✅ THIS MUST BE PASSED
      currentUser: req.session.currentUser,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Event not found or server error");
  }
};
