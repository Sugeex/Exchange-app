const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (r: number) => void;
}) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starNumber = i + 1;
        return (
          <span
            key={i}
            className={`text-[12px] cursor-pointer ${
              rating >= starNumber ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => setRating(starNumber)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
