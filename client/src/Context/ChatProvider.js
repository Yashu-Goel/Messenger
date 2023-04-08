import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ childern }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        const userInfo = (JSON.parse(localStorage.getItem("userInfo")));
        setUser(userInfo);
        if (!userInfo) {
            navigate("/");
        }
    }, [navigate])

    return <ChatContext.Provider value={{ user, setUser }}>
        {childern}
    </ChatContext.Provider>
}
export const ChatState = () => {
    return useContext(ChatContext);
}
export default ChatProvider;