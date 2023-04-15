import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import HomePage from "./Components/HomePage/HomePage";
import ChatPage from "./Components/ChatPage/ChatPage";
import ChatProvider from './Context/ChatProvider';

function App() {
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
