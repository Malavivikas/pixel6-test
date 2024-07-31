import logoImage from "../assets/pixel6-logo.jpeg";
import { IoIosMenu } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-[50px] w-full p-5">
      {/* <div className="flex items-center space-x-3 rtl:space-x-reverse"> */}
      <img src={logoImage} alt="Pixel6 Studio logo" className="h-14" />
      {/* </div> */}
      <IoIosMenu className="text-red-600" size={30} />
    </div>
  );
};

export default Navbar;
