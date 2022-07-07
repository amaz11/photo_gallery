const photoUrlModel = require("../model/photoUrlModel");
const fileHelper = require("../utils/file");
const { uploads } = require("../utils/fileUpload");

const route = require("express").Router();

route.post("/", uploads.single("photo"), async (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try {
    const photoUrl = req.file.path;
    // console.log(photoUrl);
    const photodata = new photoUrlModel({
      filepath: photoUrl,
    });
    photodata.save();
    return res.status(201).json({
      photodata,
    });
  } catch (err) {
    console.log(err);
  }
});

route.get("/", async (req, res) => {
  const photodata = await photoUrlModel.find();
  res.status(200).json({ photodata });
});

route.put("/:id", uploads.single("photo"), async (req, res) => {
  const id = req.params.id;
  const imgdata = await photoUrlModel.findById(id);
  if (imgdata) {
    fileHelper.deleteFile(imgdata.filepath);
    const photoUrl = req.file.path;
    const updateImgData = await photoUrlModel.findByIdAndUpdate(
      id,
      { filepath: photoUrl },
      { new: true }
    );
    return res.status(201).json({
      ok: "ok",
      updateImgData,
    });
  } else {
    return res.json("Somthing Wrong");
  }
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const imgdata = await photoUrlModel.findById(id);
  if (imgdata) {
    fileHelper.deleteFile(imgdata.filepath);
    await photoUrlModel.findByIdAndDelete(id);
    return res.status(201).json({
      ok: "Delete SuccesFull",
    });
  } else {
    return res.json("Somthing Wrong");
  }
});
module.exports = route;
