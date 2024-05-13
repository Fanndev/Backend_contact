require("dotenv").config();
const ContactController = require("../../controller/contact_controller");

module.exports = (express, app, default_router) => {
  const router = express.Router();

  //Contact
  router.get("/contacts", ContactController.GetallContact); //get allContact
  router.post("/add-contact", ContactController.addContact); //Added Contact
  router.put("/contact/:id", ContactController.UpdateContact); //Update Contact
  router.delete("/delete-contact/:id", ContactController.DeleteContact); //Delete Contact

  app.use(default_router, router);
};
