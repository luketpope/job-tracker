import { useNavigate } from "react-router-dom";

const statusOrder = ["Pending", "Interview", "Offer", "Rejected"];

function getXP(status) {
  switch (status) {
    case "Pending":
      return 10;
    case "Interview":
      return 25;
    case "Offer":
      return 50;
    case "Rejected":
      return 0;
    default:
      return 0;
  }
}

export default function GameJobCard({ job, onDelete }) {
  const navigate = useNavigate();
  const currentStatusIndex = statusOrder.indexOf(job.status);

  const isRejected = job.status === "Rejected";

  return (
    <div
      className={`
        max-w-xl mx-auto rounded-xl shadow-xl transition-all duration-300 p-6 mb-6 font-mono select-none
        ${isRejected
          ? "bg-red-100 text-red-800 border-4 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
          : "bg-white text-gray-900 border-4 border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
        }
        hover:border-emerald-600 dark:hover:border-emerald-400
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`
            text-2xl font-bold
            ${isRejected ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-400"}
        `}>
            {job.title}
          <div className={`
            text-sm font-normal
            ${isRejected ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}
            `}>
            @ {job.company}
          </div>
        </h2>
        <div className={`
          font-bold text-xl
          ${isRejected ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}
        `}>
          {getXP(job.status)} XP
        </div>
      </div>

      <p className={`mb-2 ${isRejected ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"}`}>
        <span className="font-semibold">Salary:</span> £{job.salary.toLocaleString()}
      </p>
      <p className={`mb-4 ${isRejected ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"}`}>
        <span className="font-semibold">Date Applied:</span> {job.date_applied}
      </p>

      {/* Status tracker */}
      <div className="mb-6">
        <div className="flex space-x-3 justify-center">
          {statusOrder.map((status, i) => (
            <div
              key={status}
              className={`
                flex-1 py-1 text-center rounded-lg border-2 cursor-default
                ${
                  i === currentStatusIndex
                    ? `bg-emerald-400 text-black border-emerald-600 font-bold dark:bg-emerald-600 dark:text-black dark:border-emerald-700`
                    : i < currentStatusIndex
                    ? `bg-gray-300 border-gray-400 text-gray-500 line-through dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400`
                    : `bg-gray-200 border-gray-300 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500`
                }
              `}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-semibold ${
            isRejected
              ? "text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-400"
              : "text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-600"
          }`}
        >
          View Job Posting
        </a>
      </div>

      <div className="flex justify-around space-x-4">
        <button
          onClick={() => onDelete(job.id)}
          className="
            bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800
            text-white px-5 py-2 rounded-lg transition transform hover:scale-105
          "
        >
          Delete Quest
        </button>
        <button
          onClick={() => navigate(`/update/${job.id}`)}
          className={`
            text-white px-5 py-2 rounded-lg transition transform hover:scale-105
            ${isRejected
              ? "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
            }
          `}
        >
          Update Quest
        </button>
      </div>
    </div>
  );
}
