import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MailboxDetails from './components/MailboxDetails/MailboxDetails';
import MailboxForm from './components/MailboxForm/MailboxForm'
import MailboxList from './components/MailboxList/MailboxList'
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import DarkTechnoEffects from './components/Effects/DarkTechnoEffects';
import EffectsToggle from './components/Effects/EffectsToggle';
import ThreeBackground from './components/ThreeScene/ThreeBackground';
import ThreeJsToggle from './components/ThreeScene/ThreeJsToggle';
import CyberGridToggle from './components/ThreeScene/CyberGridToggle';
import PureGridBackground from './components/ThreeScene/PureGridBackground';
import PureGridPage from './components/ThreeScene/PureGridPage';
import GridPageToggle from './components/ThreeScene/GridPageToggle';

import './App.css'

const App = () => {
  // PSEUDOCODE: Create state variable 'mailboxes' initialized as empty array

  const [mailboxes, setMailboxes] = useState([]);

// PSEUDOCODE: Create addBox function that accepts { boxOwner, boxSize } from form

  function addBox ({ boxOwner, boxSize}) {
    // PSEUDOCODE: Calculate new ID by adding 1 to current array length

    const newId = mailboxes.length +1 ;// ← Auto-generate ID
    // PSEUDOCODE: Create new mailbox object with auto-generated _id and form data

      const newMailbox ={
      _id: newId,// ← Add it to the object
      boxOwner: boxOwner,
      boxSize: boxSize
    };

    // PSEUDOCODE: Update state by adding newMailbox to existing mailboxes array
    // Use spread operator to create new array (don't mutate original)

    setMailboxes([...mailboxes, newMailbox]);

  }
  return (
    <BrowserRouter>
      <DarkTechnoEffects />
      <EffectsToggle />
      <ThreeBackground />
      <PureGridBackground />
      <ThreeJsToggle />
      <CyberGridToggle />
      <GridPageToggle />
      <NavBar/>
      <Routes>
<Route path="/" element={<Home />} />

{/* Pass mailboxes array to the list */}
<Route path="/new-mailbox" element={<MailboxForm addBox={addBox}/>}
/>

<Route path="/mailboxes" element={<MailboxList mailboxes={mailboxes}/>}
/>

{/* Pass mailboxes array to details */}
<Route path="/mailboxes/:mailboxId" element={<MailboxDetails mailboxes={mailboxes}/>}
/>
<Route path="/grid-page" element={<PureGridPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;