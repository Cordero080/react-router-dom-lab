import { NavLink } from 'react-router-dom';
import './NavBar.css';

// 2. Create the NavBar component
export default function NavBar() {

//3. Return JSX with nav and three links with active state
return (
  <nav>
    <NavLink 
      to="/" 
      className={({ isActive }) => isActive ? 'active' : ''}
      end
    >
      Home
    </NavLink>
    <NavLink 
      to="/mailboxes"
      className={({ isActive }) => isActive ? 'active' : ''}
    >
      Mailboxes
    </NavLink>
    <NavLink 
      to="/new-mailbox"
      className={({ isActive }) => isActive ? 'active' : ''}
    >
      New Mailbox
    </NavLink>
  </nav>
)


}