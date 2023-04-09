import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Components/HomePage/HomePage";
import ChatPage from "./Components/ChatPage/ChatPage";
// import ChatProvider from './Context/ChatProvider';

function App() {
console.log("okok");
  return (
    <>


      <Routes>
        <Route exact path="/" element={<HomePage />} />
        
        <Route exact path="/chats" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
