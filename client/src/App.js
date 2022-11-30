import './App.css';
//importing from npm packages
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import UserContext from './utils/UserContext';
import {  useReducer } from 'react';
import { reducer } from './utils/reducers';
import Auth from './utils/auth';
//pages
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Campaigns from './pages/Campaigns';
//components
import Navbar from './components/Navbar'
import SingleCampaign from './pages/SingleCampaign';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {      
  
  const initialState = Auth.getToken() ? Auth.getUser().data : {};  

  const [user, setUser] = useReducer(reducer, initialState);  

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaign/:campaignId" element={<SingleCampaign />} />
        </Routes>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;