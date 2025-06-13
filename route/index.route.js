import express from 'express';
import { indexPage, aboutPage, contactPage, loginPage } from '../controller/index.controller.js';

const router = express.Router();

router.get("/", indexPage);
router.get("/about", aboutPage);
router.get("/contact", contactPage);
router.get("/signin", loginPage);
router.get("/signup", (req, res) => {
    res.render("SignUp.ejs", {
        title: "Sign Up",
        error: null,
        currentUser: req.session.user ? req.session.user.username : null,
        isLoggedIn: !!req.session.user,
        currentPath: req.path,
    });
});



router.get("/create-event", (req, res) => {
    res.render("createEvent.ejs");
});




export default router;
