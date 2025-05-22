import { useState, useEffect, useRef } from 'react';
import { FiSend, FiChevronLeft, FiMoreVertical, FiPaperclip, FiSmile, FiImage, FiMic } from 'react-icons/fi';
import { IoCheckmarkDone } from 'react-icons/io5';
import { HiOutlineShieldExclamation, HiOutlineEmojiHappy } from 'react-icons/hi';
import { BsThreeDotsVertical, BsCheck2All } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

export default function InAppMessage() {
  // Message data
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
    }
  ]);
  
  // UI states
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const messagesEndRef = useRef(null);

  // Contact info
  const currentChat = {
    name: 'David O.',
    status: 'Online',
    course: 'Computer Science',
    year: '300L',
    item: 'Java Programming Textbook',
    price: '₦4,500',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastSeen: '2 min ago'
  };

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message function
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      avatar: ''
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setShowEmojiPicker(false);
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate reply after 1-3 seconds
    setTimeout(() => {
      setIsTyping(false);
      
      const replyMsg = {
        id: Date.now() + 1,
        sender: 'them',
        text: getRandomReply(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        avatar: currentChat.avatar
      };
      
      setMessages(prev => [...prev, replyMsg]);
    }, 1000 + Math.random() * 2000);
  };

  // Random replies for simulation
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

  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle online status
  const toggleStatus = () => {
    setOnlineStatus(!onlineStatus);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-emerald-600 text-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center flex-1">
            <Link to="/messages" className="mr-3 text-white">
              <FiChevronLeft className="h-5 w-5" />
            </Link>
            
            <img 
              src={currentChat.avatar} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="font-semibold">{currentChat.name}</h2>
                <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                  {currentChat.year}
                </span>
              </div>
              <div className="flex items-center text-xs">
                <span className={`w-2 h-2 rounded-full mr-1 ${onlineStatus ? 'bg-green-300' : 'bg-gray-300'}`}></span>
                <span>{onlineStatus ? 'Online' : currentChat.lastSeen}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              className="text-white hover:text-emerald-100"
              onClick={toggleStatus}
            >
              <HiOutlineShieldExclamation className="h-5 w-5" />
            </button>
            <button 
              className="text-white hover:text-emerald-100"
              onClick={() => setShowMenu(!showMenu)}
            >
              <BsThreeDotsVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-16 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200 w-48"
          >
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
              View contact
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
              Media, links, and docs
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
              Search
            </button>
            <button 
              className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full text-left"
              onClick={() => {
                setShowMenu(false);
                setShowSecurityInfo(true);
              }}
            >
              Report user
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Info Modal */}
      <AnimatePresence>
        {showSecurityInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center mb-4">
                <HiOutlineShieldExclamation className="text-emerald-500 mr-2 text-xl" />
                <h3 className="text-lg font-medium">Security Information</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This chat is secured with end-to-end encryption. Messages are only visible to you and the recipient.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-emerald-800 mb-2">Safety Tips:</p>
                <ul className="text-xs text-emerald-700 list-disc list-inside space-y-1">
                  <li>Never share personal financial information</li>
                  <li>Meet in public places for exchanges</li>
                  <li>Verify the item before payment</li>
                  <li>Report suspicious behavior immediately</li>
                </ul>
              </div>
              <button 
                onClick={() => setShowSecurityInfo(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Messages Container */}
      <div 
        className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be8c74.png')]"
        style={{ backgroundSize: '412.5px 749.25px' }}
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Item info bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-lg shadow-sm px-4 py-3 max-w-xs text-center">
              <p className="font-medium text-emerald-600">{currentChat.item}</p>
              <p className="text-lg font-bold my-1">{currentChat.price}</p>
              <p className="text-xs text-gray-500">Posted by {currentChat.name}</p>
            </div>
          </motion.div>

          {/* Messages */}
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs md:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {message.sender === 'them' && (
                  <img 
                    src={message.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover mr-2 mt-1 self-end flex-shrink-0"
                  />
                )}
                <div 
                  className={`rounded-2xl px-4 py-2 ${message.sender === 'user' 
                    ? 'bg-emerald-100 text-gray-800 rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${message.sender === 'user' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span>{message.time}</span>
                    {message.sender === 'user' && (
                      message.status === 'read' ? (
                        <BsCheck2All className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <IoCheckmarkDone className="h-3 w-3" />
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
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
          
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-16 right-0 left-0 max-w-3xl mx-auto"
          >
            <EmojiPicker 
              onEmojiClick={onEmojiClick}
              width="100%"
              height={350}
              searchDisabled
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachment Options */}
      <AnimatePresence>
        {showAttachments && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-16 right-0 left-0 max-w-3xl mx-auto bg-white rounded-t-xl shadow-lg p-4"
          >
            <div className="grid grid-cols-4 gap-4 text-center">
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <FiImage className="h-6 w-6 mb-1" />
                <span className="text-xs">Photo</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Video</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <FiPaperclip className="h-6 w-6 mb-1" />
                <span className="text-xs">Document</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-xs">Audio</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs">Location</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Schedule</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs">Contact</span>
              </button>
              <button className="flex flex-col items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-xs">Poll</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="bg-gray-50 border-t border-gray-200 p-3 sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm">
            <button 
              className="p-1 text-gray-500 hover:text-emerald-600 mr-1"
              onClick={() => {
                setShowAttachments(!showAttachments);
                setShowEmojiPicker(false);
              }}
            >
              <FiPaperclip className="h-5 w-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message"
                rows={1}
                className="w-full border-0 focus:ring-0 resize-none max-h-32 text-sm"
              />
            </div>
            
            <div className="flex items-center ml-2">
              <button 
                className="p-1 text-gray-500 hover:text-emerald-600"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowAttachments(false);
                }}
              >
                <HiOutlineEmojiHappy className="h-5 w-5" />
              </button>
              
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
      </div>
    </div>
  );
}