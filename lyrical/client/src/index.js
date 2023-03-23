import ReactDOMClient from 'react-dom/client';
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import 'materialize-css/dist/css/materialize.css';
import './shared/styles/styles.scss';


import SongList from "./components/SongList";
import Landing from "./Landing";
import SongCreate from "./components/SongCreate";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="songs" element={<SongList />} />
          <Route path="songs/new" element={<SongCreate />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);
root.render(<App />);