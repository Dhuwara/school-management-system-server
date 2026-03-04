import Class from "../models/ClassSchema.js";
import ClassConfig from "../models/ClassConfig.js";
import Subject from "../models/SubjectSchema.js";
import Staff from "../models/StaffSchema.js";
import ClassMapping from "../models/ClassMappingSchema.js";

export const getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const classData = await Class.findById(classId);
    console.log(classData, "classData");
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const subjectCodes = classData.subjects;
    console.log(subjectCodes, "subjectcdoee");
    const subjects = await Subject.find({
      subjectCode: { $in: subjectCodes },
    });
    console.log(subjects, "subjectsss");
    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const createClass = async (req, res) => {
  console.log(req.body, "reqqq");

  try {
    const { standard, section, capacity, roomNumber, classTeacher, subjects } =
      req.body;

    if (!standard || !section || !capacity || !roomNumber || !classTeacher) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const configData = await ClassConfig.findOne();
    console.log(configData, "configffaga");

    let className = standard;

    if (configData?.prefix && configData.prefix.trim() !== "") {
      className = `${configData.prefix}-${standard}`;
    }
    console.log(className, ":classa");
    const isClassExist = await Class.findOne({ standard, section });
    console.log(isClassExist, "isclasseiisisi");

    if (isClassExist) {
      return res.status(400).json({
        message: "Class already created for this section",
      });
    }

    const newClass = await Class.create({
      standard,
      className,
      section,
      capacity,
      roomNumber,
      classTeacher: {
        _id: classTeacher._id,
        firstName: classTeacher.firstName,
      },
      subjects,
    });
    await Staff.findByIdAndUpdate(classTeacher._id, {
      assignedClass: {
        classId: newClass._id,
        className: newClass.className,
      },
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classData = await Class.find();

    return res.status(200).send(classData);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};
export const getClass = async (req, res) => {
  const { id } = req.params;

  try {
    const classData = await Class.findById(id);
    return res.status(200).send(classData);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedClass = await Class.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.status(200).json({
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    if (existingClass.classTeacher?._id) {
      await Staff.findByIdAndUpdate(existingClass.classTeacher._id, {
        $unset: { assignedClass: "" },
      });
    }

    await Class.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { academicYear } = req.query;

    if (!academicYear) {
      return res.status(400).json({ message: "Academic year is required" });
    }

    const mapping = await ClassMapping.findOne({
      classId,
      academicYear,
    }).populate("students", "name rollNumber classSection");

    if (!mapping) {
      return res.status(404).json({ message: "Class mapping not found" });
    }

    res.status(200).json(mapping.students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};