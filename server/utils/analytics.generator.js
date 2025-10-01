import mongoose from "mongoose";

/**
 * Generates last 12 periods of 28 days data
 * @param {mongoose.Model} model - Mongoose model to count documents from
 * @returns {Promise<{ last12Months: { month: string, count: number }[] }>}
 */
export async function generateLast12MonthsData(model) {
  const last12Months = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    // Calculate end and start dates for 28-day periods
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    // Format the date label
    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Count documents in that period
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    last12Months.push({ month: monthYear, count });
  }

  return { last12Months };
}
