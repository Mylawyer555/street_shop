import { useAuth } from "../context/AuthContext";
import { FaBars, FaUser, FaHeart, FaShoppingCart, FaCog, FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import DashboardNavbar from "../components/UserDashboardNav";
import { div } from "framer-motion/client";
import { Heart, ListCheckIcon, LogOut, NotebookTabs, PersonStandingIcon } from "lucide-react";
import { BiCart } from "react-icons/bi";
import { useState } from "react";




const sections = [
    {name:"Your profile", icon:<PersonStandingIcon className="text-2xl"/> , key:"Your profile"},
    {name:"Your Order", icon:<ListCheckIcon/>, key: "your order"},
    {name:"Cart", icon:<BiCart className="text-2xl"/>, key: "your cart"},
    {name:"Wishlist", icon:<Heart/>, key: "your wishlist"},
    {name:"Shipping Address", icon:<NotebookTabs/>, key: "shipping address"},

]
const UserDashboard = () => {


  const { user, logOut} = useAuth();
  const [activeSection, setActiveSection] = useState("Your Profile");

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const renderSection = () => {
    switch (activeSection) {
      case "Your Orders":
        return <div>Manage Order</div>;
      case "your cart":
        return <div>Manage Cart</div>;
      case "your wishlist":
        return <div>Manage Wishlist</div>;
      case "shipping address":
        return <div>Manage Address</div>;
      case "Your profile":
      default:
        return (
            <div className="max-w-xl w-full shadow-md mx-auto bg-white">
            <div className="p-6">
              <div className="flex flex-col items-center gap-3 mb-6">
                <FaUserCircle className="text-gray-400" size={80} />
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
      
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-800">{user.phone}</p>
                  )}
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  {isEditing ? (
                    <Input
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-800">{user.address}</p>
                  )}
                </div>
              </div>
      
              <div className="mt-6 flex justify-end gap-3">
                {isEditing ? (
                  <>
                    <button variant="outline" onClick={toggleEdit}>
                      Cancel
                    </button>
                    <button onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <button onClick={toggleEdit}>Edit Profile</button>
                )}
              </div>
            </div>
          </div>

          
        );
    }
  };


  return (
    <div className="dashboard_container h-screen w-screen bg-gray-50">
        <div 
        
        className="dash_top bg-white w-full h-[70px] flex items-center border-b border-b-gray-200">
            <div className="dash_top__left w-[15%] h-full flex items-center bg-b ">
                <img src="/Yellow_Black_Brush_Streetwear_Brand_Logo-removebg-preview.png"
                width={150}
                 alt="" />
            </div>
            <div className="dash_top__right w-[85%] h-full "></div>
        </div>
        <div className="dash_bottom w-[100%] min-h-[561px] flex gap-3 ">
            <aside className="sidebar w-[20%] shadow-lg bg-white px-2.5 pt-5 flex flex-col justify-between" >
            
            <nav className="space-y-2">
            {sections.map((section) => (
                <button
                key={section.key}
                variant={activeSection === section.key ? "default" : "ghost"}
                className="w-full px-5 py-1.5 rounded-md text-left flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
                
                onClick={() => setActiveSection(section.key)}
                >
                <span className="mr-2">{section.icon}</span>
                {section.name}
                </button>
            ))}
            </nav>
            <div className="flex items-center justify-center mb-[10px]">
                <button
                onClick={logOut}
                 className="w-full flex justify-start py-[10px] px-[20px]  bg-gray-50 hover:bg-gray-100 text-black  rounded-md transition-colors duration-200">
                 <LogOut/> Logout
                </button>
            </div>
            </aside>
            <main className="mt-4">
                <Outlet/>
                {renderSection()}
            </main>
        </div>
    </div>
  );
};

export default UserDashboard;
