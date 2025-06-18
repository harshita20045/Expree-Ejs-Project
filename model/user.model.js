import pool from "../db/dbConfig.js";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }



  static find(email, password) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "select * from users where email = ? and password = ?";
          con.query(sql, [email, password], (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          });
        } else reject(err);
      });
    });
  }

  static hasEmail(email) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "select * from users where email = ?";
          con.query(sql, [email], (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          });
        } else reject(err);
      });
    });
  }

  create() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          let sql = "insert into users(username,email,password) values(?,?,?)";
          con.query(sql, [this.username, this.email, this.password], (err, result) => {
            con.release();
            err ? reject(err) : resolve(result);
          });
        } else reject(err);
      });
    });
  }

 static async getUploadedEvents(userId) {
  const query = `
    SELECT 
      e.id AS event_id, 
      e.name AS event_name, 
      e.total_tickets, 
      e.tickets_left,
      e.date,
      e.location,
      e.category,
      e.image,
      e.description,
      e.created_at
    FROM events e
    WHERE e.created_by = ?
    ORDER BY e.id;
  `;
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (!err) {
        con.query(query, [userId], (err, results) => {
          con.release();
          err ? reject(err) : resolve(results);
        });
      } else reject(err);
    });
  });
}


  static async getRegisteredEvents(userId) {
    const query = `
      SELECT e.id, e.name, e.date, r.tickets
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE r.user_id = ?;
    `;
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          con.query(query, [userId], (err, results) => {
            con.release();
            err ? reject(err) : resolve(results);
          });
        } else reject(err);
      });
    });
  }
}

export default User;
