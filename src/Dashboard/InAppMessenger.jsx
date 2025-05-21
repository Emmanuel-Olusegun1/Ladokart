import { useState, useEffect, useRef } from 'react';
import { FiSend, FiChevronLeft, FiMoreVertical, FiPaperclip, FiSmile } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function InAppMessager() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', text: 'Hi, is this textbook still available?', time: '10:30 AM' },
    { id: 2, sender: 'them', text: 'Yes it is! Are you on campus?', time: '10:32 AM' },
    { id: 3, sender: 'user', text: 'Yes, I can meet at the faculty lobby', time: '10:33 AM' },
    { id: 4, sender: 'them', text: 'Perfect! How about 3pm today?', time: '10:35 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        sender: 'them',
        text: 'Sounds good! See you then.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 md:ml-64">
      {/* Chat Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <Link to="/messages" className="mr-2 text-gray-600 hover:text-gray-900">
            <FiChevronLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h2 className="font-semibold">Adeola Johnson</h2>
              <p className="text-xs text-gray-500">Selling: Chemistry Textbook</p>
            </div>
          </div>
          <button className="ml-auto text-gray-500 hover:text-gray-700">
            <FiMoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="max-w-2xl mx-auto space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user' 
                  ? 'bg-emerald-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="max-w-2xl mx-auto flex items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700 mr-1">
            <FiPaperclip className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 mr-1">
            <FiSmile className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`ml-2 p-2 rounded-full ${!newMessage.trim() 
              ? 'text-gray-400' 
              : 'text-white bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <FiSend className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}