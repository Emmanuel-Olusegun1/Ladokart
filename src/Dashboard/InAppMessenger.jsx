import { useState, useEffect, useRef } from 'react';
import { FiSend, FiChevronLeft, FiMoreVertical, FiPaperclip, FiSmile, FiImage, FiMic } from 'react-icons/fi';
import { IoCheckmarkDone } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function InAppMessage() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'them', 
      text: 'Hey! Is the Java textbook still available?', 
      time: '10:30 AM', 
      status: 'read',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    { 
      id: 2, 
      sender: 'user', 
      text: 'Yes it is! Are you on campus?', 
      time: '10:32 AM', 
      status: 'delivered',
      avatar: ''
    },
    { 
      id: 3, 
      sender: 'them', 
      text: 'Yes, I can meet at the CS faculty lobby', 
      time: '10:33 AM', 
      status: 'read',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    { 
      id: 4, 
      sender: 'user', 
      text: 'Perfect! How about 3pm today?', 
      time: '10:35 AM', 
      status: 'read',
      avatar: ''
    },
    { 
      id: 5, 
      sender: 'them', 
      text: 'Sounds good! Btw, does it have the OOP chapter highlights?', 
      time: '10:36 AM', 
      status: 'read',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample student data
  const currentChat = {
    name: 'David O.',
    course: 'Computer Science',
    year: '300L',
    item: 'Java Programming Textbook',
    price: '₦4,500',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      avatar: ''
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate reply after 1-3 seconds
    setTimeout(() => {
      setIsTyping(false);
      
      const replyMsg = {
        id: messages.length + 2,
        sender: 'them',
        text: getRandomReply(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        avatar: currentChat.avatar
      };
      
      setMessages(prev => [...prev, replyMsg]);
    }, 1000 + Math.random() * 2000);
  };

  const getRandomReply = () => {
    const replies = [
      "Sounds good!",
      "Can we meet at the library instead?",
      "I'll bring cash",
      "Is the price negotiable?",
      "Sorry, already sold it",
      "Can you hold it till Friday?",
      "Does it include the workbook?",
      "I'm at Hostel B, can you come here?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
          <Link to="/messages" className="mr-2 text-gray-600 hover:text-gray-900">
            <FiChevronLeft className="h-6 w-6" />
          </Link>
          
          <div className="flex items-center flex-1">
            <img 
              src={currentChat.avatar} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="font-semibold">{currentChat.name}</h2>
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {currentChat.year}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span>Selling: {currentChat.item}</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-emerald-600">{currentChat.price}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="ml-2 text-gray-500 hover:text-gray-700 p-1"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FiMoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-3xl mx-auto space-y-2">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-xs md:max-w-md">
                {message.sender === 'them' && (
                  <img 
                    src={message.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover mr-2 mt-1 self-end"
                  />
                )}
                <div 
                  className={`rounded-2xl px-4 py-2 ${message.sender === 'user' 
                    ? 'bg-emerald-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1 ${message.sender === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                    <span className="text-xs">{message.time}</span>
                    {message.sender === 'user' && (
                      <IoCheckmarkDone className={`h-3 w-3 ${message.status === 'read' ? 'text-blue-300' : ''}`} />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center bg-white rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                <div className="flex space-x-1 px-1 py-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          
          <div ref={messagesEndRef} />
        </div>
      </div>

      

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-3">
        <AnimatePresence>
          {showOptions && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-3xl mx-auto mb-2 flex justify-around"
            >
              <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full">
                <FiImage className="h-5 w-5" />
              </button>
              <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full">
                <FiPaperclip className="h-5 w-5" />
              </button>
              <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full">
                <FiMic className="h-5 w-5" />
              </button>
              <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full">
                <FiSmile className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-3xl mx-auto flex items-center">
          <button 
            className="p-2 text-gray-500 hover:text-emerald-600 mr-1"
            onClick={() => setShowOptions(!showOptions)}
          >
            <FiPaperclip className="h-5 w-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none max-h-32"
            />
            {newMessage.trim() === '' && (
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500">
                <FiSmile className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`ml-2 p-2 rounded-full ${!newMessage.trim() 
              ? 'text-gray-400 bg-gray-100' 
              : 'text-white bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <FiSend className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}