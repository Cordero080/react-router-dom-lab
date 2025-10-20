// PSEUDOCODE: Import useParams to extract URL parameters
import { useParams } from 'react-router-dom';

// PSEUDOCODE: Accept mailboxes array as a prop from App.jsx

export default function MailboxDetails({mailboxes}) {

 // PSEUDOCODE: Extract mailboxId from URL (e.g., /mailboxes/3 gives mailboxId = "3") 

 const { mailboxId } = useParams();



// Find mailbox where _id matches URL parameter (convert string to number)
const selectedBox = mailboxes.find(
  (mailbox) => mailbox._id === Number(mailboxId)
);
  
return (
  <main>
    <Link to="/mailboxes"> Back to Mailboxes"</Link>
    <h2>Mailbox Details</h2>

    {/* If not found, show error. Otherwise, show details */}
    {!selectedBox ?(
      <p>Mailbox Not Found!</p>
    ) : ( 
      <ul>
    <li><strong>Box Number:</strong>{selectedBox._id}</li>
    <li><strong>Owner:</strong>{selectedBox.boxOwner}</li>
    <li><strong>Size:</strong>{selectedBox.boxSize}</li>
    </ul>
    )}
  </main>
);
}