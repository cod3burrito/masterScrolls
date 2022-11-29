import './App.css';
//importing from npm packages
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
//pages

//components
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';

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
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    // <ApolloClient client={client}>
    <>
      <Navbar />
      <Routes>
        {/* <Route path='/' index element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>  
    </>    
    //</ApolloClient>
  );
}

export default App;
