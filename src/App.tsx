import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FormEvent, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import useHooks from './components/useHooks';
import { Billboard, DroneActionLabels } from './components/helpers';
import BillboardCard from './components/billboard-card';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [capturedBillboards, setCapturedBillboards] = useState<Billboard[]>([]);
  const [droneActionLabels, setDroneActionLabels] = useState<string[]>([]);
  const { instructDrone } = useHooks();

  async function handleSubmit(e: FormEvent<HTMLFormElement>)  {
    e.preventDefault();
    setIsSubmitting(true);
    setDroneActionLabels([]);
    const result = await instructDrone(instructions);
    if (result) {
      setCapturedBillboards(result.billboards);
      setDroneActionLabels(result.instructions.split("").map(label => DroneActionLabels[label as keyof typeof DroneActionLabels]))
    }
    setIsSubmitting(false);
    setInstructions('');
  }

  return (
    <>
      <Toaster />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Drone</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          style={{
            padding: '1rem'
          }}
          onChange={(e) => setInstructions(e.target.value)} 
          value={instructions}
          autoFocus
          placeholder="Write your instructions here..."  
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Instruct'}
        </button>
      </form>
      {capturedBillboards.length > 0 && <>
        <p>Drown actions: <b>{droneActionLabels.join(' -> ')}</b></p>
        <div className="billboards">
          {capturedBillboards.map(capturedBillboard => (
            <BillboardCard 
              key={capturedBillboard.id}
              text={capturedBillboard.billboardText}
              advertiser={capturedBillboard.advertiser}
              image={capturedBillboard.image} 
            />
          ))}
        </div>
      </>}
    </>
  )
}

export default App
