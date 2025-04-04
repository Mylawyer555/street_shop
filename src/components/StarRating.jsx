import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRate }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className={`cursor-pointer transition-colors duration-200 ${
              starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => onRate(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            size={24}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
