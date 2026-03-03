import Timetable from "../models/TimetableSchema.js";

export const createTimetable = async (req, res) => {
  console.log(req.body, "incoming payload");

  try {
    const { class: classId, academicYear, schedule } = req.body;

    const formattedSchedule = Object.keys(schedule).map((dayName) => {
      const periodsObject = schedule[dayName];

      const periodsArray = Object.keys(periodsObject).map((timeSlot, index) => {
        const periodData = periodsObject[timeSlot];

        const [startTime, endTime] = timeSlot.split("-");

        return {
          periodNumber: index + 1,
          startTime,
          endTime,
          subject: periodData?.subject || null,
          teacher: periodData?.teacher || null,
          roomNumber: periodData?.room || "",
          isBreak: periodData?.isBreak || false,
        };
      });

      return {
        day: dayName,
        periods: periodsArray,
      };
    });

    const timetable = new Timetable({
      class: classId,
      academicYear,
      schedule: formattedSchedule,
    });

    await timetable.save();

    res.status(201).json({
      message: "Timetable created successfully",
      data: timetable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const upsertTimetable = async (req, res) => {
  console.log(req.body, "incoming payload");

  try {
    const { class: classId, academicYear, schedule } = req.body;

    const timetable = await Timetable.findOneAndUpdate(
      { class: classId },
      {
        class: classId,
        academicYear,
        schedule, 
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      message: "Timetable saved successfully",
      data: timetable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTimetable = async (req, res) => {
  try {
    const { classId } = req.params;

    const timetable = await Timetable.findOne({
      class: classId,
      isActive: true,
    })
      .populate("class")
      .populate("schedule.periods.subject")
      .populate("schedule.periods.teacher");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};