import 'materialize-css/dist/css/materialize.css';
import './shared/styles/styles.scss';
import ReactDOMClient from 'react-dom/client';

import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache()
});

const App = () => {
  return(
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  )
}

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);
root.render(<App />);