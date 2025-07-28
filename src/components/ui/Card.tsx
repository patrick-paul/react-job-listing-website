import { Link } from "react-router-dom";
type CardType = {
  bgColor?: string;
  title: string;
  content: string;
  linkText: string;
  linkAddress: string;
};

const Card = ({
  bgColor = "bg-gray-100",
  title,
  content,
  linkText,
  linkAddress,
}: CardType) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{content}</p>
      <Link
        to={linkAddress}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default Card;
