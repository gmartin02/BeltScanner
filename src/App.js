import './App.css';
import Scanner from './Components/Scanner/Scanner.js';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <div className="App">
        <header className="App-header">
        <Scanner />
        <Button onClick={signOut}>Sign Out</Button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
