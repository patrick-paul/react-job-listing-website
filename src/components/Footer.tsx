import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-indigo-700 border-t border-indigo-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <Link className="flex items-center mb-2 md:mb-0" to="/">
              <img className="h-8 w-auto" src={logo} alt="React Jobs" />
              <span className="ml-2 text-white text-lg font-semibold">
                React Jobs
              </span>
            </Link>
          <div className="text-white text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} React Jobs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
