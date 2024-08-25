"use client";
import MatrixRainingCode from "app/bg";

// pages/index.js
export default function WorkshopAssignment() {
  return (
    <div className='min-h-screen sm:w-full flex flex-col justify-center items-center px-4'>
      <MatrixRainingCode className={`absolute inset-0 -z-10`} />
      <div className='max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-yellow-300'>
          Workshop Assignment Overview
        </h1>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-2 text-green-400'>
            Topic 1: Drafting Emails
          </h2>
          <ul className='list-disc pl-5 space-y-1 text-white'>
            <li>
              <span className='font-bold'>Objective:</span> Draft professional
              emails using AI tools.
            </li>
            <li>
              <span className='font-bold'>Tasks:</span>
              <ul className='list-inside list-decimal'>
                <li>
                  Internal Email: Summarize a meeting and outline next steps.
                </li>
                <li>
                  Client Email: Respond to a customer inquiry or complaint.
                </li>
                <li>
                  Approval Request: Draft a request for project/budget approval.
                </li>
              </ul>
            </li>
            <li>
              <span className='font-bold'>Deliverable:</span> Present drafted
              emails with AI enhancements.
            </li>
          </ul>
        </div>

        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-2 text-blue-400'>
            Topic 2: Translation & Summarization
          </h2>
          <ul className='list-disc pl-5 space-y-1 text-white'>
            <li>
              <span className='font-bold'>Objective:</span> Translate and
              summarize long text using AI.
            </li>
            <li>
              <span className='font-bold'>Task:</span>
              <ul className='list-inside list-decimal'>
                <li>Translate a foreign-language report.</li>
                <li>Summarize key points in 100-150 words.</li>
              </ul>
            </li>
            <li>
              <span className='font-bold'>Deliverable:</span> Present translated
              and summarized text.
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 text-red-400'>
            Topic 3: Data Analysis & Visualization
          </h2>
          <ul className='list-disc pl-5 space-y-1 text-white'>
            <li>
              <span className='font-bold'>Objective:</span> Analyze data and
              visualize it as a graph.
            </li>
            <li>
              <span className='font-bold'>Task:</span>
              <ul className='list-inside list-decimal'>
                <li>Analyze provided data and generate insights.</li>
                <li>Visualize findings using an appropriate graph.</li>
              </ul>
            </li>
            <li>
              <span className='font-bold'>Deliverable:</span> Present the
              visualized data and key insights.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
