import { useBorrowedSummeryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const {
    data: summaryResponse,
    isLoading,
    error,
  } = useBorrowedSummeryQuery({});

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <h3 className="text-gray-500 text-lg font-medium">Loading borrow summary...</h3>
      </div>
    );

  if (error || !summaryResponse?.success)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <h3 className="text-red-500 text-lg font-semibold">
          Failed to load borrow summary.
        </h3>
      </div>
    );

  const summaryData = summaryResponse.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">📊 Borrow Summary</h1>
        <p className="text-gray-500">Total books borrowed with quantity details</p>
      </div>

      {summaryData.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p className="text-lg">No borrowed records found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {summaryData.map((entry: any, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {entry.book?.title || "Unknown Title"}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                ISBN: {entry.book?.isbn || "N/A"}
              </p>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  📦 Borrowed: {entry.totalQuantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
