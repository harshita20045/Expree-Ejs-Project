import pool from "../db/dbConfig.js";

class Rsvp {
  constructor({ user_id, event_id, tickets }) {
    this.user_id = user_id;
    this.event_id = event_id;
    this.tickets = tickets;
  }

  save(callback) {
    pool.getConnection((err, con) => {
      if (err) return callback(err);

      const query = `
        INSERT INTO registrations (user_id, event_id, tickets)
        VALUES (?, ?, ?)
      `;
      con.query(query, [this.user_id, this.event_id, this.tickets], (err, result) => {
        con.release();
        if (err) return callback(err);
        callback(null, result.insertId);
      });
    });
  }

  static isAlreadyRegistered(user_id, event_id, callback) {
    pool.getConnection((err, con) => {
      if (err) return callback(err);
      con.query(
        `SELECT * FROM registrations WHERE user_id = ? AND event_id = ?`,
        [user_id, event_id],
        (err, rows) => {
          con.release();
          if (err) return callback(err);
          callback(null, rows.length > 0);
        }
      );
    });
  }

}

export default Rsvp;
