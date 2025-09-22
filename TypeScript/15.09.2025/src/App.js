import './App.css';

import { Button } from './components/Buttons.tsx';

function App() {
  return (
    <div className="App">
      <Button onClick={()=>console.log('Button Pressed')} label='Primary' variant='primary'/>
      <Button onClick={()=>console.log('Button Pressed')} label='Secondary' variant='secondary'/>
      <Button onClick={()=>console.log('Button Pressed')} label='No Variant'/>
    </div>
  );
}

export default App;
