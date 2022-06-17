import logo from './logo.svg';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { ApolloProvider , ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies:{
      Query:{
        fields:{
          clients:{
            merge(existing, incoming){
              return incoming;
            }
          },
          projects:{
            merge(existing, incoming){
              return incoming;
            }
          }
        }
      }
  }
})


const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
     <Header />
     <div className='w-full '>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<Project />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
     </div>
     </Router>
     </ApolloProvider>
    </div>
    
  );
}

export default App;
