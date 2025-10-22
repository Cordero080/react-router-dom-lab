import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MailboxDetails from './components/MailboxDetails/MailboxDetails';
import MailboxForm from './components/MailboxForm/MailboxForm'
import MailboxList from './components/MailboxList/MailboxList'
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import DarkTechnoEffects from './components/Effects/DarkTechnoEffects';
import EffectsToggle from './components/Effects/EffectsToggle';

import './App.css'

const App = () => {
  const [mailboxes, setMailboxes] = useState([]);

  function addBox ({ boxOwner, boxSize}) {
    // Auto-generate ID by adding 1 to current array length
    const newId = mailboxes.length + 1;
    
    const newMailbox = {
      _id: newId,
      boxOwner: boxOwner,
      boxSize: boxSize
    };

    setMailboxes([...mailboxes, newMailbox]);

  }
  return (
    <BrowserRouter>
      <DarkTechnoEffects />
      <EffectsToggle />
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-mailbox" element={<MailboxForm addBox={addBox}/>} />
        <Route path="/mailboxes" element={<MailboxList mailboxes={mailboxes}/>} />
        <Route path="/mailboxes/:mailboxId" element={<MailboxDetails mailboxes={mailboxes}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;