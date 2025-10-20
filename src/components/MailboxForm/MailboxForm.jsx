import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MailboxForm.css';
import '../Effects/AdvancedEffects.css';
import ScrambleButton from '../ScrambleButton/ScrambleButton';

//MailboxForm component that accepts addBox function as a prop from App.jsx
export default function MailboxForm({addBox}) {

  //Create local state for boxOwner input field, initialized as empty string
  const [boxOwner, setBoxOwner] = useState('');

  const [boxSize, setBoxSize] = useState('Small'); 
  //Initialize navigate function to programmatically redirect user after form submission

const navigate = useNavigate();
//Create handleSubmit function that runs when form is submitted

  function handleSubmit(e)  {

    //Prevent default form submission behavior (page refresh)
    e.preventDefault();

    //Validate input - if boxOwner is empty or only whitespace, exit function early

    if(!boxOwner.trim()) return;

   // Call the addBox function (passed from App.jsx) with form data object
    // trim() removes extra whitespace from boxOwner

    addBox({ boxOwner: boxOwner.trim(), boxSize });

    //After successful submission, redirect user to /mailboxes page
    navigate('/mailboxes');
}
return (
  <main className="hologram">
    {/* Enhanced heading with glitch effect */}
    <h2 className="glitch-text">Register New Mailbox</h2>
    
    {/* Enhanced form with interactive effects */}
    <form onSubmit={handleSubmit} className="focus-ring">
      {/* Enhanced input field for Box Owner */}
      <label>
        Box Owner
        <input
          type="text"
          value={boxOwner}
          onChange={(e) => setBoxOwner(e.target.value)}
          placeholder="e.g., Megatron"
          className="focus-ring"
          required
        />
      </label>
      
      {/* Enhanced select dropdown for Box Size */}
      <label>
        Box Size
        <select 
          value={boxSize} 
          onChange={(e) => setBoxSize(e.target.value)}
          className="focus-ring"
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Extra Large</option>
        </select>
      </label>
      
      {/* Security code field (just for visual enhancement) */}
      <label>
        Security Code
        <input
          type="password"
          placeholder="Optional security code"
          className="focus-ring"
        />
      </label>

      {/* Enhanced submit button with code scramble effect */}
      <ScrambleButton type="submit" variant="accent">Initialize Mailbox</ScrambleButton>
    </form>
  </main>
)
}