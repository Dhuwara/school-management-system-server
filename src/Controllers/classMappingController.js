import ClassMapping from "../models/ClassMappingSchema.js";


export const createClassMapping = async (req, res) => {
  try {
    const { classId, academicYear, classTeacher, subjectTeachers, students } =
      req.body;

    if (!classId || !academicYear || !classTeacher) {
      return res.status(400).json({
        message: "classId, academicYear and classTeacher are required",
      });
    }

    const existing = await ClassMapping.findOne({
      classId,
      academicYear,
    });

    if (existing) {
      return res.status(400).json({
        message: "Mapping already exists for this class and academic year",
      });
    }

    const newMapping = await ClassMapping.create({
      classId,
      academicYear,
      classTeacher,
      subjectTeachers,
      students,
    });

    res.status(201).json({
      success: true,
      message: "Class mapping created successfully",
      data: newMapping,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAllClassMappings = async (req, res) => {
  try {
    const mappings = await ClassMapping.find()
      .populate("classId")
      .populate("students");

    res.status(200).json({
      success: true,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getClassMappingByClass = async (req, res) => {
  try {
    const { classId, academicYear } = req.params;

    if (!classId || !academicYear) {
      return res.status(400).json({
        message: "classId and academicYear are required",
      });
    }

    const mapping = await ClassMapping.findOne({
      classId,
      academicYear,
    })
      .populate("classId")
      .populate("students");

    if (!mapping) {
      return res.status(404).json({
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      success: true,
      data: mapping,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateClassMapping = async (req, res) => {
  try {
    const { classId, academicYear } = req.params;
    const { classTeacher, subjectTeachers, students } = req.body;

    if (!classId || !academicYear) {
      return res.status(400).json({
        message: "classId and academicYear are required",
      });
    }

    const updated = await ClassMapping.findOneAndUpdate(
      { classId, academicYear },
      {
        classTeacher,
        subjectTeachers,
        students,
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mapping updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteClassMapping = async (req, res) => {
  try {
    const { classId, academicYear } = req.params;

    if (!classId || !academicYear) {
      return res.status(400).json({
        message: "classId and academicYear are required",
      });
    }

    const deleted = await ClassMapping.findOneAndDelete({
      classId,
      academicYear,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mapping deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
