const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   primaryKey: true,
    //   auto_increment: true,
    //   field: 'id',
    // },
    Nama: {
      type: String,
      required: true,
    },
    Alamat: {
      type: String,
      required: true,
    },
    NoTelp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = new mongoose.model("Contact", contactSchema);
module.exports = Contact;
