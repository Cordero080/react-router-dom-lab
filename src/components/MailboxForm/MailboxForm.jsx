import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MailboxForm.css';

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
<main>
   {/* Display heading for the page */}
   <h2>New Mailbox</h2>
 {/* Create form element with handleSubmit attached to onSubmit event */}
 <form onSubmit={handleSubmit}>

 {/* Create label and input for Box Owner field */}
 <label>
  Box Owner
  {/*Text input controlled by boxOwner state */}
          {/* value={boxOwner} displays current state */}
          {/* onChange updates state when user types */}
          <input
          type="text"
          value={boxOwner}
          onChange={(e) => setBoxOwner(e.target.value)}
          placeholder="e.g., Megatron"/>

 </label>
 Box Size
 {/* Create label and select dropdown for Box Size field */}
{/* value={boxSize} displays current state */}
          {/* onChange updates state when user selects an option */}
<select value={boxSize} onChange={(e) => setBoxSize(e.target.value)}>

  {/* Provide three size options: Small, Medium, Large */}
  <option>Small</option>
  <option>Medium</option>
  <option>Large</option>
</select>

{/* Submit button triggers handleSubmit when clicked */}
<button type="submit">Create Mailbox</button>
 </form>

</main>

)
}