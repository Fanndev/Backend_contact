module.exports = (express, app) => {
  const api_default = `/api`;

//   require("./api/auth.routes")(express, app, api_default);
  require("./api/contact.routes")(express, app, api_default);
};
