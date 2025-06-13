import express from 'express';
import {createEventHandler,saveInBulk ,bookEventPage} from '../controller/events.controller.js';
// , getEventById,createEventHandler,createEventPage, bookPage


const router =express.Router();


router.post("/save-in-bulk",saveInBulk);
// router.get("/:eventId",getEventById);
router.get("/:eventId/book", bookEventPage);

// router.post("/:eventId/bookticket", bookPageHandler);  // Notice route is /bookticket here

router.post("/create", createEventHandler);


export default router;