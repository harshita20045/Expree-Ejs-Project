import express from "express";
import auth from "../middleware/auth.js";
import { ShowConfirmPage, ConfirmBooking } from "../controller/rsvp.controller.js";

const router = express.Router();

router.post("/:eventId/confirm",auth, ShowConfirmPage);
router.post("/:eventId/bookticket", auth,ConfirmBooking);
router.get("/thanks",auth, (req, res) => {
  res.render("Thanks.ejs");
});


export default router;
