import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "../../theme";
import { 
  FiHome,
  FiSearch,
  FiAward,
  FiUser
} from "react-icons/fi";
import { motion } from "framer-motion";
import './BottomNavbar.scss';

const BottomNavbar = () => {
  const location = useLocation();
  const mode = useSelector(state => state.mode);
  const theme = themeSettings(mode);
  const palette = theme.palette;

  const navItems = [
    { path: "/home", icon: <FiHome size={24} />, label: "Home" },
    { path: "/search", icon: <FiSearch size={24} />, label: "Search" },
    { path: "/challenges", icon: <FiAward size={24} />, label: "Challenges" },
    { path: "/profile/:id", icon: <FiUser size={24} />, label: "Profile" }
  ];

  const themeStyles = {
    '--bg-color': palette.background.default,
    '--primary-color': palette.primary.main,
    '--active-color': palette.primary.main,
    '--inactive-color': palette.neutral.medium,
  };

  return (
    <motion.nav 
      className="bottom-navbar"
      style={themeStyles}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `nav-link ${
              isActive || location.pathname.startsWith(item.path === '/profile/:id' ? '/profile' : item.path) 
                ? 'active' 
                : ''
            }`
          }
        >
          <div className="nav-icon">{item.icon}</div>
          <span className="nav-text">{item.label}</span>
        </NavLink>
      ))}
    </motion.nav>
  );
};

export default BottomNavbar;