const auth = (request, response, next) => {
  if (request.session.user) {
    next();
  } else {
    const redirect = request.originalUrl;
    return response.redirect("/signin");
  }
};

export default auth;