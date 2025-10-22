import { Link, useNavigate } from 'react-router-dom';
import './MailboxList.css';
import '../Effects/AdvancedEffects.css';
import ScrambleButton from '../ScrambleButton/ScrambleButton';

export default function MailboxList({ mailboxes }) {
  const navigate = useNavigate();
  
  // Navigate to new mailbox form
  const goToNewMailbox = () => navigate('/new-mailbox');
  return (
    <main className="hologram">
      <h2 className="glitch-text">Quantum Mailboxes</h2>
      
      {mailboxes.length === 0 ? (
        <p className="terminal-text">No mailboxes available. Please register a new one...</p>
      ) : (
        <div className="mailbox-grid">
          {mailboxes.map((mailbox) => (
            <Link
              key={mailbox._id}
              to={`/mailboxes/${mailbox._id}`}
              className="mail-box card-3d electric-border"
              aria-label={`Mailbox ${mailbox._id}, Owner: ${mailbox.boxOwner || 'Unknown'}`}
            >
              <span className="shimmer">{mailbox._id}</span>
            </Link>
          ))}
        </div>
      )}
      
      <div className="action-container">
        <ScrambleButton variant="accent" onClick={goToNewMailbox}>
          + New Mailbox
        </ScrambleButton>
      </div>
    </main>
  );
}