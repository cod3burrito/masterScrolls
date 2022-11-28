import logo from './logo.svg';
import './App.css';
//importing from npm packages
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
//pages

//components
import Navbar from './components/Navbar'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
})

const httpLink = createHttpLink({
  uri: 'graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
function App() {
  return (
    <ApolloClient client={client}>
      <Navbar />
      <Routes>
        {/* <Route path='/' index element={<Home />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ApolloClient>
  );
}

export default App;
