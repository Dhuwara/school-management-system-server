import Attendance from "../models/attendanceSchema.js";

export const markAttendance = async (req, res) => {
  try {
    const { classId, academicYear, date, records } = req.body;

    if (!classId || !academicYear || !date || !records) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await Attendance.findOneAndUpdate(
      { classId, academicYear, date },
      { records },
      { new: true, upsert: true },
    );

    res.json({ message: "Attendance saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const { classId, academicYear, date } = req.query;

    const attendance = await Attendance.findOne({
      classId,
      academicYear,
      date,
    });

    if (!attendance) {
      return res.json({ records: [] });
    }

    res.json({ records: attendance.records });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};