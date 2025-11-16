import { useParams, Link } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import './MailboxDetails.css';
import '../Effects/AdvancedEffects.css';
import ScrambleButton from '../ScrambleButton/ScrambleButton';

export default function MailboxDetails({mailboxes}) {
  const { mailboxId } = useParams();

  // Find mailbox where _id matches URL parameter (convert string to number)
  const selectedBox = mailboxes.find(
    (mailbox) => mailbox._id === Number(mailboxId)
  );
  
  return (
    <div className="mailbox-details-scale">
      {/* NavBar Section */}
      <NavBar />
      <main className="hologram">
        <Link to="/mailboxes" className="back-link electric-border">
      <span className="back-icon">⬅</span> Return to Mailboxes
    </Link>
    
    <h2 className="glitch-text">Quantum Mailboxes</h2>

    {/* Enhanced error/details display with advanced effects */}
    {!selectedBox ? (
      <div className="error-container">
        <p className="terminal-text">ERROR: Mailbox ID #{mailboxId} not found in quantum database.</p>
        <p className="error-suggestion">Please verify the mailbox identification number and try again.</p>
      </div>
    ) : ( 
      <div className="details-container card-3d">
        <div className="details-header">
          <div className="box-number shimmer">{selectedBox._id}</div>
          <div className="box-status">Status: Active</div>
        </div>
        
        <ul className="details-list">
          <li className="detail-item">
            <strong>Box Number:</strong>
            <span>{selectedBox._id}</span>
          </li>
          <li className="detail-item">
            <strong>Owner:</strong>
            <span>{selectedBox.boxOwner}</span>
          </li>
          <li className="detail-item">
            <strong>Size:</strong>
            <span>{selectedBox.boxSize}</span>
          </li>
          <li className="detail-item">
            <strong>Security Level:</strong>
            <span>Quantum Encrypted</span>
          </li>
        </ul>
        
        <div className="action-row">
          <ScrambleButton variant="primary">Send Message</ScrambleButton>
          <ScrambleButton variant="secondary">Manage Access</ScrambleButton>
        </div>
      </div>
    )}
      </main>
    </div>
  );
}