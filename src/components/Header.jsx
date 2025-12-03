import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

const Header = () => {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
};

export default Header;