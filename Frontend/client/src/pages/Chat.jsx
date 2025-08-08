import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Phone, Mail } from "lucide-react";


const socket = io("http://localhost:5000");

export default function Chat() {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const chatBoxEndRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"))?.user;

    //  Scroll to bottom on new message
    useEffect(() => {
        chatBoxEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);


    useEffect(() => {
        socket.on("chatHistory", (msgs) => {
            setAllMessages(msgs);
            scrollToBottom();
        });

        socket.on("receiveMessage", (msg) => {
            setAllMessages((prev) => [...prev, msg]);
            scrollToBottom();
        });

        return () => {
            socket.off("chatHistory");
            socket.off("receiveMessage");
        };
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => {
            chatBoxEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };


    const sendMessage = () => {
        if (message.trim()) {
            const msgData = {
                user: user?.name || "Anonymous",
                text: message,
                // time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                time: new Date(),

            };
            socket.emit("sendMessage", msgData);
            setMessage('');
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Chat Container */}
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
                    <div className="bg-blue-600 text-white text-lg font-semibold p-4 rounded-t-lg">
                        Real-Time Chat
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" >
                        {allMessages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">
                                No messages yet. Start the conversation!
                            </div>
                        ) : (
                            <>
                                {[...allMessages]
                                    .sort((a, b) => new Date(a.time) - new Date(b.time))
                                    .map((msg, i) => {
                                        const isOwn = msg.user === user?.name;

                                        return (
                                            <div
                                                key={i}
                                                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-xs rounded-lg px-4 py-2 text-sm shadow ${isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                                        }`}
                                                >
                                                    <div className="font-semibold mb-1">{msg.user}</div>
                                                    <div>{msg.text}</div>
                                                    <div className="text-[10px] mt-1 text-right opacity-70">
                                                        {new Date(msg.time).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                {/*  Empty div at end to scroll to */}
                                <div ref={chatBoxEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t flex items-center">
                        <input
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Branding */}
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-2">VillageConnect</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Bridging rural communities with essential services and digital
                            empowerment.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-3">Contact Us</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone size={18} className="text-yellow-400" /> +91 98765 43210
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} className="text-yellow-400" /> help@villageconnect.in
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
                            <li><a href="/about" className="hover:text-yellow-400 transition">About Us</a></li>
                            <li><a href="/services" className="hover:text-yellow-400 transition">Services</a></li>
                            <li><a href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
                    © 2025 VillageConnect. All rights reserved.
                </div>
            </footer>
        </div>
    );
}