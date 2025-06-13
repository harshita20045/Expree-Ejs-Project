import express from 'express';
import session from 'express-session';
import indexRouter from './route/index.route.js';
import eventsRouter from './route/events.route.js';
import userRouter from './route/users.route.js';
import rsvp from './route/rsvp.route.js';

const app = express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'fyjguksagdsyklaatfygbukhadwedewekhbdksvu',
  
}));

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/user', userRouter);
app.use('/rsvp',rsvp);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});