import axios from "axios";
import { useQuery } from "react-query";
import { getCookieLogin } from "./cookie";
// const server = process.env.QUIZ_URL

const getDataAI = async (_prompt) => {
  // console.log("🚀 ~ getDataAI ~ _prompt:", _prompt)
  return await axios({
    method: "POST",
    url: `http://agrappl03.aapico.com:3002/ai/query`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      promt: _prompt,
    }),
  });
};

const trainAIurl = async (_prompt) => {
  // console.log("🚀 ~ trainAIurl ~ _prompt:", _prompt)
  return await axios({
    method: "POST",
    url: `http://agrappl03.aapico.com:3002/ai/upsert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      data: _prompt,
    }),
  });
};

const trainAIPrompt = async (_prompt) => {
  // console.log("🚀 ~ trainAIurl ~ _prompt:", _prompt)
  return await axios({
    method: "POST",
    url: `http://agrappl03.aapico.com:3002/ai/upsertPrompt`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      data: _prompt,
    }),
  });
};

const submitQuiz = async (
  _correct,
  _question,
  _correctAnswers,
  _answer,
  _timestamp,
  _type
) => {
  const cookie = getCookieLogin();
  console.log("cookie", cookie);
  try {
    return await axios({
      method: "POST",
      url: `https://apigw.aapico.com/quiz`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJleHAiOjE3NTQ4NDkxNjR9.ByVimbQPZpurTi_v9DRaL564UaUQpPDMUzwnJt-KR2o",
      },
      data: JSON.stringify({
        questionId: _question,
        answer: _correctAnswers,
        response: _answer,
        correct: _correct,
        stamp: _timestamp,
        type: _type,
        userID: cookie,
      }),
    });
  } catch (error) {
    console.log("🚀 ~ todos ~ error:", error);
  }
};

const chatlogs = async (_prompt, _timestamp) => {
  try {
    return await axios({
      method: "POST",
      url: `http://10.10.10.42:3000/chatlogs`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJleHAiOjE3NTQ4NDkxNjR9.ByVimbQPZpurTi_v9DRaL564UaUQpPDMUzwnJt-KR2o",
      },
      data: JSON.stringify({
        chat: _prompt,
        stamp: _timestamp,
      }),
    });
  } catch (error) {
    console.log("🚀 ~ chatlogs ~ error:", error);
  }
};

const getQuiz = async () => {
  try {
    return await axios({
      method: "GET",
      url: `https://apigw.aapico.com/quiz`,
      headers: {
        "Content-Type": "application/json",
        "Range-Unit": "items",
        Range: "0-",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJleHAiOjE3NTQ4NDkxNjR9.ByVimbQPZpurTi_v9DRaL564UaUQpPDMUzwnJt-KR2o",
      },
    });
  } catch (error) {
    console.log("🚀 ~ chatlogs ~ error:", error);
  }
};

// const autogetData = useQuery({
//   queryKey: 'autogetData',
//   queryFn: async () => {
//     return fetch(`http://10.10.10.42:3000/quiz`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJleHAiOjE3NTQ4NDkxNjR9.ByVimbQPZpurTi_v9DRaL564UaUQpPDMUzwnJt-KR2o'
//     },
//     }).then(async (res) => {
//       let data = await res.json();
//       if (data === "Empty") return [];
//       return data;
//     });
//   },
//   refetchOnWindowFocus: false,
//   refetchOnMount: false,
//   refetchInterval: 30000,
//   staleTime: 30000,
// })

export { getDataAI, trainAIurl, submitQuiz, chatlogs, trainAIPrompt, getQuiz };
