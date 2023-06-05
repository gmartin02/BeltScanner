import './App.css';
import Scanner from './Components/Scanner/Scanner.js';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
} from "@aws-amplify/ui-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import NinjaTable from './Components/NinjaTable/NinjaTable';

function App({ signOut }) {
  return (
    <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Scanner />} />
                  <Route path="/ninjaList" element={<NinjaTable />} />
                </Route>
              </Routes>
          </BrowserRouter>
          <Button onClick={signOut}>Sign Out</Button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
