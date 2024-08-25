"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import beginnerQuizData from "./beginnerQuizData";
import ti18n from "../i18n";
import { submitQuiz } from "@/services/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import MatrixRainingCode from "app/bg";

function BeginnerQuiz() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { t, i18n } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionText, setCurrentQuestionText] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const language = i18n.language;
  const data = beginnerQuizData[language] || beginnerQuizData.en; // Fallback to English
  const questions = data.questions || [];
  const correctAnswers = questions.map((q) => q.answer || 0);
  const correctAnswersText = questions.map((q) => q.options || 0);
  const timestamp = dayjs().tz("Asia/Bangkok");

  const handleAnswer = async (index) => {
    setSelectedAnswer(index);
    const _timestamp = timestamp.format();
    const _question = currentQuestion;
    const _correctAnswers = correctAnswers[currentQuestion];
    const _answer = index;
    const _type = "beginner";
    if (index === correctAnswers[currentQuestion]) {
      await submitQuiz(
        true,
        _question,
        _correctAnswers,
        _answer,
        _timestamp,
        _type
      );
      toast.success(t("Correct!"));
      setScore(score + 1);
    } else {
      await submitQuiz(
        false,
        _question,
        _correctAnswers,
        _answer,
        _timestamp,
        _type
      );
      toast.error(t("Incorrect!"));
    }
    setShowNext(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setCurrentQuestionText(nextQuestion);
      setSelectedAnswer(null);
      setShowNext(false);
    } else {
      setQuizFinished(true);
      setShowNext(false);
    }
  };

  const handleLanguageChange = (lng) => {
    ti18n.changeLanguage(lng); // Ensure i18n is correctly initialized
  };

  const getUserLevel = (score, totalQuestions) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Expert";
    if (percentage >= 75) return "Advanced";
    if (percentage >= 50) return "Intermediate";
    return "Beginner";
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white p-4 font-kanit'>
      <ToastContainer />

      <MatrixRainingCode className={`absolute inset-0 -z-10`} />
      <div className='bg-gray-800 shadow-lg rounded-lg p-8 max-w-xl w-full'>
        <div className='flex justify-between mb-6'>
          <div className='flex space-x-4 mb-4'>
            <button
              onClick={() => handleLanguageChange("en")}
              className='bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition'>
              English
            </button>
            <button
              onClick={() => handleLanguageChange("th")}
              className='bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition'>
              ไทย
            </button>
          </div>
          <div className='text-lg font-semibold'>
            {t("score")}: {score}
          </div>
        </div>
        {!quizFinished ? (
          <>
            <div className='mb-6 border-b border-gray-700 pb-4'>
              <div className='text-lg font-semibold'>
                {t("Question")} {currentQuestion + 1} {t("of")}{" "}
                {questions.length}
              </div>
            </div>
            <h2 className='text-3xl font-bold mb-6'>
              {questions[currentQuestion]?.question || t("Loading question...")}
            </h2>
            <div className='space-y-4'>
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full py-3 px-5 rounded-lg transition ${
                    selectedAnswer === index
                      ? index === correctAnswers[currentQuestion]
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={selectedAnswer !== null}>
                  {option}
                </button>
              ))}
            </div>
            {showNext && (
              <button
                onClick={handleNext}
                className='mt-6 w-full bg-gray-600 text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition'>
                {t("next")}
              </button>
            )}
          </>
        ) : (
          <div className='text-center'>
            <h2 className='text-3xl font-bold mb-6'>{t("quizCompleted")}</h2>
            <p className='text-xl mb-4'>
              {t("score")}: {score}/{questions.length}
            </p>
            <p className='text-xl mb-6'>
              {t("level")}: {getUserLevel(score, questions.length)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className='w-full bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition'>
              {t("restartQuiz")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BeginnerQuiz;
