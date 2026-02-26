import Counter from '../models/counterSchema.js'

export const getNextSequence = async (name) => {
  const fullYear = new Date().getFullYear();
  const shortYear = fullYear.toString().slice(-2);

  const counter = await Counter.findOneAndUpdate(
    { name, year: fullYear },
    { $inc: { seq: 1 } },
    { new: true },
  );

  if (!counter) {
    throw new Error("Counter not configured for this year");
  }

  const formattedSeq = counter.seq.toString().padStart(counter.padding, "0");

  return `${counter.prefix}${shortYear}${formattedSeq}`;
};
