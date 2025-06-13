import Event from "../model/events.model.js";
import user from "../model/user.model.js";



export const indexPage = async (request, response, next) => {
  try {
    const events = await Event.getAll();
    return response.render("index.ejs", {
      title: "Event Management",
      events,
      currentUser: request.session.currentUser,
      isLoggedIn: request.session.isLoggedIn
    });
  } catch (error) {
    console.error("Error loading homepage:", error);
    return response.status(500).render("error.ejs", { message: "Failed to load events" });
  }
};


export const aboutPage = (request, response, next) => {
  return response.render("about.ejs", {
    title: "About Us",
   currentUser: request.session.currentUser,
      isLoggedIn: request.session.isLoggedIn
  });
};


export const contactPage = (request, response, next) => {
  return response.render("contact.ejs", {
    title: "Contact Us",
   currentUser: request.session.currentUser,
      isLoggedIn: request.session.isLoggedIn
  });
};


export const logout = (request, response, next) => {
  request.session.destroy((err) => {
    if (err) {
      console.error("Error in logout:", err);
      return response.redirect("/?error=Failed to log out");
    }
    return response.redirect("/?message=Logged out successfully");
  });
};

export const loginPage = (req, res) => {
  res.render('SignIn.ejs', {
    title: 'Sign In',
   currentUser: req.session.currentUser,
      isLoggedIn: req.session.isLoggedIn
  });
};


