// ANCIENNE VERSION
// export default function dashboard(req, res) {
//   if (res.locals.user) {
//     res.render("dashboard");
//   } else {
//     req.session.flashMessages.push({
//       type: "error",
//       message: "You must be logged in to access this page!",
//     });
//     res.redirect("/");
//   }
// }
export default function dashboard(req, res) {
  res.render("dashboard");
}
