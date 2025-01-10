import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-2xl font-bold" style={{ color: '#1E88E5' }}>
        AcDiTo<span style={{ color: '#F97316' }}>Push</span>
      </span>
    </Link>
  );
};