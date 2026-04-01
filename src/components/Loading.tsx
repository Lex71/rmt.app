export default function Loading() {
  return (
    // <div role="status" className="max-w-sm animate-pulse m-auto">
    //   <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    //   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    //   <span className="sr-only">Loading...</span>
    // </div>
    <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div className="flex flex-col space-y-3">
          <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
          <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </div>
    </div>
  );
}
