export default function home(req, res) {
  if (res.locals.user) {
    res.render("dashboard");
  } else {
    req.session.flashMessages.push({
      type: "error",
      message: "You must be logged in to access this page!",
    });
    res.redirect("/");
  }
}
