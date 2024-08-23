'use client'
import BarChart from '@/components/BarChart'
import DashboardStats from '@/components/DashboardStats'
import { getQuiz } from '@/services/api'
import React, { useEffect, useState } from 'react'

const dashboard = () => {
    const [quizTypeBeginner,setQuizTypeBeginner] = useState()
    const [correctBeginner,setCorrectBeginner] = useState()
    const [quizTypeAdvanced,setQuizTypeAdvanced] = useState()
    const [correctAdvanced,setCorrectAdvanced] = useState()
    const [barChartBeginner,setBarChartBeginner] = useState([])
    const [barChartAdvanced,setBarChartAdvanced] = useState([])
const getDataQuiz = async () => {
    const response = await getQuiz();
    // console.log("🚀 ~ getDataQuiz ~ response:", response.data.filter(item => item.type === "beginner"))
    setQuizTypeBeginner(response.data.filter(item => item.type === "beginner").length) 
    setCorrectBeginner(response.data.filter(item => item.type === "beginner"&&item.correct === true).length) 
    setQuizTypeAdvanced(response.data.filter(item => item.type === "advanced").length) 
    setCorrectAdvanced(response.data.filter(item => item.type === "advanced"&&item.correct === true).length) 
    const dataBarChartBeginner = extractData(response.data.filter(item => item.type === "beginner"))
    setBarChartBeginner(dataBarChartBeginner)
    const dataBarChartAdvanced = extractData(response.data.filter(item => item.type === "advanced"))
    setBarChartAdvanced(dataBarChartAdvanced)
}
const extractData = (data)  => {
    return data.map(item => ({
        questionID : item.questionId,
        type: item.type,
        correct: item.correct,
        incorrect:!item.correct,
    }));
}

const fetchData = async () => {
    try {
      await getDataQuiz(); // ใช้ try-catch เพื่อจัดการ Error
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(() => {
    getDataQuiz()
      // สร้างตัวแปรเก็บค่า Interval
      let intervalId = setInterval(fetchData, 30000);
      // คืนค่าเพื่อเคลียร์ Interval เมื่อ Component หายไป
      return () => clearInterval(intervalId);
},[]);
  return (
    <div className={`w-screen h-screen`}>
        
        <div className={`pt-20 flex justify-center gap-6`}>
            <div>
            <DashboardStats 
                title={"Quiz Beginner"} 
                value={quizTypeBeginner} 
                description={"All User Join Quiz Beginner"} 
                icon={<p className='text-4xl flex justify-center items-center'>🕵🏼‍♂️</p>} 
            />
            </div>
            <div>
            <DashboardStats 
                title={"Correct Quiz Beginner"} 
                value={correctBeginner} 
                description={"all user join quiz"} 
                icon={<p className='text-4xl flex justify-center items-center'>🏅</p>} 
            />
            </div>
            <div>
            <DashboardStats 
                title={"Quiz Advanced"} 
                value={quizTypeAdvanced} 
                description={"All User Join Quiz Advanced"} 
                icon={<p className='text-4xl flex justify-center items-center'>🤖</p>} 
            />
            </div>
            <div>
            <DashboardStats 
                title={"Correct Quiz Advanced"} 
                value={correctAdvanced} 
                description={"all user join quiz"} 
                icon={<p className='text-4xl flex justify-center items-center'>🏆</p>} 
            />
            </div>
        </div>
        <div className="flex justify-center p-4 gap-4 ">
                <BarChart _data={barChartBeginner} titleDashboard={"Beginner Dashboard"} />
                <BarChart _data={barChartAdvanced} titleDashboard={"Advanced Dashboard"} />
            </div>
    </div>
  )
}

export default dashboard