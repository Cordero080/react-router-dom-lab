import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
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