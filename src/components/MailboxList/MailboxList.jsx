// Import Link component from react-router-dom to create clickable navigation links
import { Link, useNavigate } from 'react-router-dom';
import './MailboxList.css';
import '../Effects/AdvancedEffects.css';
import ScrambleButton from '../ScrambleButton/ScrambleButton';

// PSEUDOCODE: Create MailboxList component that accepts mailboxes array as a prop from App.jsx
export default function MailboxList({ mailboxes }) {
  const navigate = useNavigate();
  
  // Navigate to new mailbox form
  const goToNewMailbox = () => navigate('/new-mailbox');
  return (
    <main className="hologram">
      {/* Enhanced heading with glitch effect */}
      <h2 className="glitch-text">Quantum Mailboxes</h2>
      
      {/* Enhanced conditional rendering with terminal text effect */}
      {mailboxes.length === 0 ? (
        <p className="terminal-text">No mailboxes available. Please register a new one...</p>
      ) : (
        <div className="mailbox-grid">
          {/* Enhanced mailbox grid with 3D and animation effects */}
          {mailboxes.map((mailbox) => (
            <Link
              key={mailbox._id}
              to={`/mailboxes/${mailbox._id}`}
              className="mail-box card-3d electric-border"
              aria-label={`Mailbox ${mailbox._id}, Owner: ${mailbox.boxOwner || 'Unknown'}`}
            >
              {/* Display mailbox number with shimmer effect */}
              <span className="shimmer">{mailbox._id}</span>
            </Link>
          ))}
        </div>
      )}
      
      {/* Quick action button to add new mailbox with scramble effect */}
      <div className="action-container">
        <ScrambleButton variant="accent" onClick={goToNewMailbox}>
          + New Mailbox
        </ScrambleButton>
      </div>
    </main>
  );
}