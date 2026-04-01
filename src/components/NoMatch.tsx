import { useNavigate } from "react-router";

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        404 - Page not found
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
