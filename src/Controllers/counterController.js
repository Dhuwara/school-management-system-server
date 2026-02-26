import Counter from "../models/counterSchema.js";

export const configureCounter = async (req, res) => {
    console.log(req.body,"req.body")
  try {
    const { name, prefix, start, padding } = req.body;

    const currentYear = new Date().getFullYear();

    const counter = await Counter.findOneAndUpdate(
      { name, year: currentYear },
      {
        name,
        year: currentYear,
        prefix,
        start,
        padding,
        seq: start - 1,
      },
      { upsert: true, new: true },
    );

    res.json({
      message: "Counter configured successfully",
      data: counter,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
