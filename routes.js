const userRoutes = require("./routes/userRoutes");
const toDoRouters = require("./routes/toDoRouters");
const assetRoutes = require("./routes/assetRoutes");

module.exports = (app) => {
  app.use("/user", userRoutes);
  app.use("/todo", toDoRouters);
  app.use("/asset", assetRoutes);

  app.get("/welcome", (req, res) => {
    return res.json({
      code: 200,
      message: "Congratulations! Your Asset Tracker App backend is ready!",
    });
  });
};
