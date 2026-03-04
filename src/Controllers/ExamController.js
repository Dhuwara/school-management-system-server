import ExamSchedule from "../models/ExamSchedule.js";
export const saveExamSchedule = async (req, res) => {
  try {
    const { classId, academicYear, examType, ...rest } = req.body;

    if (!classId || !academicYear || !examType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const schedule = await ExamSchedule.findOneAndUpdate(
      { classId, academicYear, examType },
      { ...rest },
      { new: true, upsert: true }, // 🔥 create or update
    );

    res.json({ success: true, data: schedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExamSchedules = async (req, res) => {
  try {
    const { classId, academicYear } = req.params;

    const schedules = await ExamSchedule.find({
      classId,
      academicYear,
    });

    res.json({ data: schedules });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
