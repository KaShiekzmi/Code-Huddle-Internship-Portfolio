import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import JobListings from './pages/Job Listing/JobListings.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostJob from './pages/Post Job/PostJob.jsx';
import JobDetail from './pages/Job Detail/JobDetail.jsx';

function App() {
  return (
    <div className="">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <JobListings />
            }
          />
          <Route
            path="/job/:id"
            element={
              <JobDetail />
            }
          />
          <Route
            path='/post'
            element={
              <PostJob />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div >
  );
}

export default App;