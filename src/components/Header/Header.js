import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
     🎥 GOMYCODE MOVIES HUB 🎬
    </span>
  );
};

export default Header;
