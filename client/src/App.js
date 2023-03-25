import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Components/HomePage/HomePage";
import ChatPage from "./Components/ChatPage/ChatPage";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/chats' element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
