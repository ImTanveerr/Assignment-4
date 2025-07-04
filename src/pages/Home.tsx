import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Library, ClipboardList } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
            Grothosheba-Your Gateway to Knowledge.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
             Where reading meets simplicity and management meets efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-xl">
          <Button
              className="flex items-center justify-center gap-2 py-6 px-8 rounded-xl shadow hover:shadow-lg text-lg transition-all"
              onClick={() => navigate("/books")}
          >
            <Library className="w-5 h-5" />
            View All Books
          </Button>

          <Button
              variant="outline"
              className="flex items-center justify-center gap-2 py-6 px-8 rounded-xl shadow hover:shadow-lg text-lg transition-all"
              onClick={() => navigate("/borrow-summary")}
          >
            <ClipboardList className="w-5 h-5" />
            Borrow Summary
          </Button>
        </div>
      </div>
  );
};

export default Home;
