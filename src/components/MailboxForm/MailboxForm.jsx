import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MailboxForm.css';
import '../Effects/AdvancedEffects.css';
import ScrambleButton from '../ScrambleButton/ScrambleButton';

export default function MailboxForm({addBox}) {
  const [boxOwner, setBoxOwner] = useState('');
  const [boxSize, setBoxSize] = useState('Small'); 
  const navigate = useNavigate();

  function handleSubmit(e)  {
    e.preventDefault();
    if(!boxOwner.trim()) return;
    
    addBox({ boxOwner: boxOwner.trim(), boxSize });
    navigate('/mailboxes');
}
return (
  <main className="hologram">
    <h2 className="glitch-text">Register New Mailbox</h2>
    
    <form onSubmit={handleSubmit} className="focus-ring">
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
      
      <label>
        Security Code
        <input
          type="password"
          placeholder="Optional security code"
          className="focus-ring"
        />
      </label>

      <ScrambleButton type="submit" variant="accent">Initialize Mailbox</ScrambleButton>
    </form>
  </main>
)
}