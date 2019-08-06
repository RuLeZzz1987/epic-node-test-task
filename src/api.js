export default function registerRoutes(app) {
  app.get(`/dummy`, async (req, res, next) => {
    const { rows } = await req.app.get('db').query("SELECT * FROM dummy", []);
    res.json(rows)
  });
  
  app.get(`/external/`, async (req, res, next) => {
  
  })
}
