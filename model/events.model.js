import pool from "../db/dbConfig.js";

class Event {
 

 constructor(
    eventName,
    eventDate,
    eventLocation,
    eventDescription,
    eventCategory,
    eventImage,
    eventCreatedBy,
    eventCreatedAt,
    eventTickets,
    eventTicketsLeft
  ) {
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.eventLocation = eventLocation;
    this.eventDescription = eventDescription;
    this.eventCategory = eventCategory;
    this.eventImage = eventImage;
    this.eventCreatedBy = eventCreatedBy;
    this.eventCreatedAt = eventCreatedAt;
    this.eventTickets = eventTickets;
    this.eventTicketsLeft = eventTicketsLeft;
  }

 create() {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO events 
          (name, date, location, description, category, image, created_by, created_at, total_tickets, tickets_left) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      pool.query(sql, [
        this.eventName,
        this.eventDate,
        this.eventLocation,
        this.eventDescription,
        this.eventCategory,
        this.eventImage,
        this.eventCreatedBy,
        this.eventCreatedAt,
        this.eventTickets,
        this.eventTicketsLeft
      ], (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }



  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM events";
      pool.query(sql, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

 static getById(eventId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM events WHERE id = ?";
    pool.query(sql, [eventId], (error, results) => {
      if (error) return reject(error);
      resolve(results[0]); // Return the first matched event
    });
  });
}

static create() {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO events 
        (name, date, location, description, category, image, created_by, created_at, total_tickets, tickets_left)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(
      sql,
      [
        this.eventName,
        this.eventDate,
        this.eventLocation,
        this.eventDescription,
        this.eventCategory,
        this.eventImage,
        this.eventCreatedBy,
        null,
        this.eventTickets,
        this.eventTicketsLeft
      ],
      (error, results) => {
        if (error) return reject(error);
        resolve(results.insertId);
      }
    );
  });
}




}

export default Event;


