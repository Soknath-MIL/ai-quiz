// components/TopUserCard.js
import React from "react";

const TopUserCard = ({ user, index }) => {
  if (!user) return null;

  return (
    <div className='flex-col text-white p-4 text-sm shadow-lg rounded-lg w-full h-32 mb-2 backdrop-filter border-2 border-gray-700 backdrop-blur-sm'>
      <h2 className='text-lg font-semibold mb-1'></h2>
      <div className='text-lg'>
        <strong>User ID:</strong> {user.userID} ({index + 1})
      </div>
      <div className=''>
        <strong>Total Answers:</strong> {user.totalAnswers}
      </div>
      <div className=''>
        <strong>Correct Answers:</strong> {user.correctAnswers}
      </div>
      <div>
        <strong>Accuracy Rate:</strong> {user.accuracyRate}%
      </div>
    </div>
  );
};

export default TopUserCard;
