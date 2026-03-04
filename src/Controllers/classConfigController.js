import ClassConfig from "../models/ClassConfig.js";

export const upsertClassConfig = async (req, res) => {
  console.log(req.body, "reqbody");
  try {
    const { prefix, standardFormat, sectionFormat } = req.body;

    const config = await ClassConfig.findOneAndUpdate(
      {}, // empty filter → only one document
      { prefix, standardFormat, sectionFormat },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      message: "Class configuration saved successfully",
      data: config,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getConfig = async (req, res) => {
  try {
    const configData = await ClassConfig.findOne(); 
    console.log(configData, "configData");

    return res.status(200).json(configData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};