// PSEUDOCODE: Import Link component from react-router-dom to create clickable navigation links
import { Link } from 'react-router-dom';

// PSEUDOCODE: Create MailboxList component that accepts mailboxes array as a prop from App.jsx
export default function MailboxList({ mailboxes }) {
  
  // PSEUDOCODE: Return JSX to render the mailbox list page
  return (
    <main>
      {/* PSEUDOCODE: Display heading for the page */}
      <h2>Mailboxes</h2>
      
      {/* PSEUDOCODE: Conditional rendering - check if mailboxes array is empty */}
      {mailboxes.length === 0 ? (
        // PSEUDOCODE: If no mailboxes exist, display a message to the user
        <p>No mailboxes yet. Create one from "New Mailbox"!</p>
      ) : (
        // PSEUDOCODE: If mailboxes exist, display them in a grid container
        <div className="mailbox-grid">
          
          {/* PSEUDOCODE: Loop through mailboxes array using .map() */}
          {/* For each mailbox object, create a Link element */}
          {mailboxes.map((mailbox) => (
            
            // PSEUDOCODE: Create a Link for each mailbox that navigates to its details page
            // key={mailbox._id} helps React track each element uniquely
            // to={`/mailboxes/${mailbox._id}`} creates dynamic URL like /mailboxes/1, /mailboxes/2
            // className="mail-box" applies the square styling to each mailbox
            <Link
              key={mailbox._id}
              to={`/mailboxes/${mailbox._id}`}
              className="mail-box"
            >
              {/* PSEUDOCODE: Display the mailbox ID number inside the square */}
              {mailbox._id}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}