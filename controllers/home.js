export default function home(req, res) {
  const query = req.query.disconnect;
  res.render("home", { query: query });
}
