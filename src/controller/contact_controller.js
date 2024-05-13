const Contact = require("../model/contact");
const { ResponseMessage, StatusCode } = require("../helpers/httpStatus");

// GET ALL CONTACT
exports.GetallContact = (req, res) => {
  Contact.find({})
    .then((result) => {
      res.status(StatusCode.OK).json({
        message: ResponseMessage.Success,
        result,
      });
    })
    .catch((err) => {
      res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.NotFound,
        err,
      });
    });
};

// ADD CONTACT
exports.addContact = async (req, res) => {
  let { Nama, Alamat, NoTelp } = req.body;

  try {
    const addcontact = await Contact.insertMany({
      Nama,
      Alamat,
      NoTelp,
    });
    res.status(StatusCode.CREATED).json({
      message: ResponseMessage.Added,
      data: addcontact,
    });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
      error,
    });
  }
};

// GET CONTACT BY ID
exports.GetContactByID = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(StatusCode.OK).json({
      message: ResponseMessage.Success,
      contact,
    });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.NotFound,
      error,
    });
  }
};

//UPDATE CONTACT
exports.UpdateContact = async (req, res) => {
  const contactId = req.params.id;

  console.log("Body:", req.body);
  console.log("ID:", contactId);
  try {
    const UpdateContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true, runValidators: true, context: "query" } || {}
    );

    if (!UpdateContact) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: `Cannot find any Contact with ID ${contactId}` });
    } else {
      console.log("Updated Contact:", UpdateContact);
      res.status(StatusCode.OK).json({
        message: ResponseMessage.Updated,
        data: UpdateContact,
      });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailUpdated,
      error,
    });
  }
};

// DELETE CONTACT
exports.DeleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteContact = await Contact.findByIdAndDelete(id);
    if (!DeleteContact) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: `cannot find any Contact with ID ${id}` });
    }
    res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: DeleteContact,
    });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
      error,
    });
  }
};
