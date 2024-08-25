// Function to analyze data
export default function analyzeQuizData(data) {
  const userStats = {};

  // Process each entry in the data
  data.forEach((entry) => {
    const userID = entry.userID;
    const correct = entry.correct;

    if (!userStats[userID]) {
      userStats[userID] = {
        totalAnswers: 0,
        correctAnswers: 0,
      };
    }

    userStats[userID].totalAnswers += 1;
    if (correct) {
      userStats[userID].correctAnswers += 1;
    }
  });

  // Calculate performance metrics
  const userPerformance = Object.keys(userStats).map((userID) => {
    const stats = userStats[userID];
    const accuracyRate = (stats.correctAnswers / stats.totalAnswers) * 100;

    return {
      userID,
      totalAnswers: stats.totalAnswers,
      correctAnswers: stats.correctAnswers,
      accuracyRate: accuracyRate.toFixed(2), // rounded to two decimal places
    };
  });

  // Sort users by accuracy rate in descending order
  userPerformance.sort((a, b) => b.accuracyRate - a.accuracyRate);

  console.log(userPerformance);

  // Get top 5 users
  const topUsers = userPerformance.slice(0, 5);

  return topUsers;
}
