import Event from "../model/events.model.js";
import User from "../model/user.model.js";
import Rsvp from "../model/rsvp.model.js";
import pool from "../db/dbConfig.js";

// Show confirmation page
export const ShowConfirmPage = (req, res) => {
  const eventId = req.params.eventId;
  const { username, email, tickets } = req.body;

  Event.getById(eventId)
    .then((event) => {
      if (!event) return res.status(404).send("Event not found");
      res.render("bookTickets.ejs", {
        event,
        username,
        email,
        tickets,
      });
    })
    .catch((err) => {
      console.error("Error fetching event:", err);
      res.status(500).send("Internal server error");
    });
};


export const ConfirmBooking = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const username = req.body.username;
    const email = req.body.email;
    const tickets = parseInt(req.body.tickets);

    console.log("ConfirmBooking: ", { eventId, username, email, tickets });

    if (isNaN(tickets) || tickets <= 0) {
      return res.status(400).send("Invalid number of tickets.");
    }

    const users = await User.hasEmail(email); // ✅ Await the Promise

    const createAndRegister = async (userId) => {
      const alreadyRegistered = await new Promise((resolve, reject) => {
        Rsvp.isAlreadyRegistered(userId, eventId, (err, exists) =>
          err ? reject(err) : resolve(exists)
        );
      });

      if (alreadyRegistered) {
        return res.send("You have already registered for this event.");
      }

      const rsvp = new Rsvp({ user_id: userId, event_id: eventId, tickets });

      await new Promise((resolve, reject) => {
        rsvp.save((err) => (err ? reject(err) : resolve()));
      });

      const updateQuery = `
        UPDATE events
        SET tickets_left = tickets_left - ?
        WHERE id = ? AND tickets_left >= ?
      `;

      pool.query(updateQuery, [tickets, eventId, tickets], (err, result) => {
        if (err) return res.status(500).send("Ticket update failed.");
        if (result.affectedRows === 0) {
          return res.send("Not enough tickets available.");
        }
      return res.redirect("/rsvp/thanks");

      });
    };

    if (users.length === 0) {
      const newUser = new User(username, email, "");
      newUser.create(async (err, result) => {
        if (err) return res.status(500).send("Error creating user");
        await createAndRegister(result.insertId);
      });
    } else {
      await createAndRegister(users[0].id);
    }
  } catch (error) {
    console.error("ConfirmBooking error:", error);
    return res.status(500).send("Internal server error.");
  }
};
