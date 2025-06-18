import User from "../model/user.model.js";
import Event from "../model/events.model.js";

export const signInPage = (request,response,next)=>{
  let {email,password} = request.body;
  
  User.find(email,password)
  .then(result=>{
    if(result.length){
      console.log(result);
      request.session.isLoggedIn = true;
      request.session.currentUser = result[0];
      return response.redirect("/");
      
    
    }else
      return response.redirect("/signin");
  })
  .catch(err=>{
    return response.end("Something went wrong....");
  })
}

export const signUpPage = (request,response,next)=>{
  let {username,email,password} = request.body;
  let user = new User(username,email,password);
  console.log(user);
  user.create().then(result=>{
    //return response.render("signin.ejs");
    
    return response.redirect("/signin");
    // http://localhost:3000/sign-in
  }).catch(err=>{
    console.log(err);
    response.end("Something wrong....");
  });
}

export const logout = (request,response,next)=>{
   request.session.isLoggedIn = false;
   request.session.currentUser = null;
   request.session.destroy();
   return response.redirect("/");
}


export const dashboard = async (req, res) => {
  try {
    const userId = req.session.currentUser.id;
console.log(userId);
    const uploadedEvents = await  User.getUploadedEvents(userId);
console.log(uploadedEvents);
    const registeredEvents = await User.getRegisteredEvents(userId);
console.log(registeredEvents);
    
    const profile = req.session.currentUser;
console.log(profile);


    res.render('Dashboard.ejs', {
      title: 'Dashboard',
      uploadedEvents,
      registeredEvents,
      profile,
      currentUser:req.session.currentUser,
      isLoggedIn:req.session.currentUser.isLoggedIn,
    });
    
  } catch (error) {
    console.error('Dashboard load error:', error);
    res.status(500).send('Server Error');
  }
};













