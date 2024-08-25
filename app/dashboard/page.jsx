"use client";
import BarChart from "@/components/BarChart";
import DashboardStats from "@/components/DashboardStats";
import TopUserCard from "@/components/topUserCard";
import { getQuiz } from "@/services/api";
import React, { useEffect, useState } from "react";
import analyzeQuizData from "./analysisUser";
import MatrixRainingCode from "app/bg";

const Dashboard = () => {
  const [quizTypeBeginner, setQuizTypeBeginner] = useState();
  const [correctBeginner, setCorrectBeginner] = useState();
  const [quizTypeAdvanced, setQuizTypeAdvanced] = useState();
  const [correctAdvanced, setCorrectAdvanced] = useState();
  const [barChartBeginner, setBarChartBeginner] = useState([]);
  const [barChartAdvanced, setBarChartAdvanced] = useState([]);
  const [topUser, setTopUser] = useState([]); // Change to null

  const getDataQuiz = async () => {
    const response = await getQuiz();
    setQuizTypeBeginner(
      response.data.filter((item) => item.type === "beginner").length
    );
    setCorrectBeginner(
      response.data.filter(
        (item) => item.type === "beginner" && item.correct === true
      ).length
    );
    setQuizTypeAdvanced(
      response.data.filter((item) => item.type === "advanced").length
    );
    setCorrectAdvanced(
      response.data.filter(
        (item) => item.type === "advanced" && item.correct === true
      ).length
    );
    const dataBarChartBeginner = extractData(
      response.data.filter((item) => item.type === "beginner")
    );
    setBarChartBeginner(dataBarChartBeginner);
    const dataBarChartAdvanced = extractData(
      response.data.filter((item) => item.type === "advanced")
    );
    setBarChartAdvanced(dataBarChartAdvanced);
    const topUsersResult = analyzeQuizData(response.data);
    setTopUser(topUsersResult); // Set the top user
  };

  const extractData = (data) => {
    return data.map((item) => ({
      questionID: item.questionId,
      type: item.type,
      correct: item.correct,
      incorrect: !item.correct,
    }));
  };

  console.log(topUser);

  const fetchData = async () => {
    try {
      await getDataQuiz(); // Use try-catch for error handling
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataQuiz();
    let intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`w-screen h-screen`}>
      <MatrixRainingCode className={`absolute inset-0 -z-10`} />
      <div className={`pt-6 flex justify-center gap-6 `}>
        <div>
          <DashboardStats
            title={"Quiz Beginner"}
            value={quizTypeBeginner}
            description={"All User Join Quiz Beginner"}
            icon={
              <p className='text-4xl flex justify-center items-center'>🕵🏼‍♂️</p>
            }
          />
        </div>
        <div>
          <DashboardStats
            title={"Correct Quiz Beginner"}
            value={correctBeginner}
            description={"All user join quiz"}
            icon={
              <p className='text-4xl flex justify-center items-center'>🏅</p>
            }
          />
        </div>
        <div>
          <DashboardStats
            title={"Quiz Advanced"}
            value={quizTypeAdvanced}
            description={"All User Join Quiz Advanced"}
            icon={
              <p className='text-4xl flex justify-center items-center'>🤖</p>
            }
          />
        </div>
        <div>
          <DashboardStats
            title={"Correct Quiz Advanced"}
            value={correctAdvanced}
            description={"All user join quiz"}
            icon={
              <p className='text-4xl flex justify-center items-center'>🏆</p>
            }
          />
        </div>
      </div>
      <div className='flex w-screen justify-center space-x-3 mt-3'>
        <div className='flex w-2/5 justify-center h-auto'>
          <BarChart
            _data={barChartBeginner}
            titleDashboard={"Beginner Dashboard"}
          />
        </div>
        <div className='flex w-2/5 justify-center '>
          <BarChart
            _data={barChartAdvanced}
            titleDashboard={"Advanced Dashboard"}
          />
        </div>
        <div className='flex flex-col w-1/5 justify-start'>
          {topUser.map((item, index) => {
            return <TopUserCard user={item} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
