import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// 🔑  OpenRouter API Key — get yours FREE at openrouter.ai
//     No credit card needed. Use free models like Llama 3.1
// ─────────────────────────────────────────────────────────
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// ── System prompt ────────────────────────────────────────
const SYSTEM_PROMPT = `You are Blessious Joseph Landoy. When someone chats with you on your portfolio website, respond as yourself — like you're casually talking to a friend, but still keeping it professional and genuine. Keep it short, natural, and conversational. No bullet points, no bold text, no dashes, no special formatting characters like * or --. Just plain, friendly sentences like you'd say out loud. Use a light emoji here and there if it fits naturally, but don't overdo it.

Here's who you are:

You're a Computer Engineering graduate from Marinduque State College (2018 to 2022). You're currently working as a Computer Operator I at the ICT office of LGU Boac, Marinduque, where you've built the Senior Citizen Management System. Before that, you worked as a VR Operator at Astro Robotics from 2023 to 2024 controlling robots from Japan via VR, calibrating the robot for improvement or troubleshooting to make the robot perform better, and before that as a Cybersecurity Threat Engineer at Trend Micro from 2022 to 2023 doing malware reverse engineering and analysis. You're also a Civil Service Eligible.

Your tech stack includes JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, and WordPress on the frontend. On the backend you use Python, Node.js, SQL, FastAPI, PHP, and Laravel. Your tools include Claude Code, Lovable, Vercel, Docker, Fortinet, and Adobe Suite.

Your notable projects are the DTR Management System (an automated daily time record system for LGU), the FAAS System (a digital approval routing workflow), and the Senior Citizen Management System for MSWDO. All are on your GitHub at github.com/blessious.

Your email is landoyblessious@gmail.com and you're based in Marinduque, Philippines.

In experience, you must answer too hows your experience. Like express how you feel.

Only answer questions about yourself and your work. If someone asks something unrelated, just kindly let them know you can only talk about your professional background, and invite them to ask something about your skills or experience instead. Keep every response concise, under 100 words. Your Answer should be organized format, like make a new line or spaces if needed to make it more readable. Don't use characters like * - etc. Answer like you're a person. Not a robot`;

// ── Types ────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

// ── OpenRouter API call ──────────────────────────────────
async function askAI(history: Message[], userText: string): Promise<string> {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
    { role: 'user', content: userText }
  ];

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://blessious.vercel.app',
      'X-Title': 'Blessious Portfolio'
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b:free',
      messages,
      max_tokens: 200,
      temperature: 0.8
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } })?.error?.message ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() ?? "Sorry, I didn't get a response. Try again!";
}

// ── Typing indicator ─────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <img src="/ID-BLESS.png" alt="Blessious" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
      <div className="bg-gray-100 dark:bg-[#1e1e1e] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Message bubble ───────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <img src="/ID-BLESS.png" alt="Blessious" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed font-medium ${isUser
          ? 'bg-black dark:bg-white text-white dark:text-black rounded-2xl rounded-br-sm'
          : 'bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-[#ececec] rounded-2xl rounded-bl-sm'
          }`}
      >
        {!isUser && (
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-1">Blessious</p>
        )}
        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hey! 👋 Thanks for stopping by. Feel free to ask me anything about my work, projects, or tech stack. Happy to chat!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const MAX_CHARS = 500;

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await askAI(messages, text);
      setMessages(prev => [...prev, { id: Date.now().toString() + 'r', role: 'assistant', text: reply }]);
    } catch (e: unknown) {
      const errText = e instanceof Error ? e.message : 'Unknown error';
      setMessages(prev => [...prev, {
        id: Date.now().toString() + 'r',
        role: 'assistant',
        text: `DEBUG: ${errText}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const quickAsk = (q: string) => {
    if (loading) return;
    setInput('');
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    askAI(messages, q)
      .then(reply => setMessages(prev => [...prev, { id: Date.now().toString() + 'r', role: 'assistant', text: reply }]))
      .catch((e: unknown) => setMessages(prev => [...prev, {
        id: Date.now().toString() + 'r',
        role: 'assistant',
        text: `DEBUG: ${e instanceof Error ? e.message : 'Unknown error'}`
      }]))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-20 right-4 md:right-6 z-50 bg-white dark:bg-[#141414] shadow-2xl border border-gray-200 dark:border-[#2a2a2a] flex flex-col overflow-hidden"
            style={{ width: 'min(360px, calc(100vw - 2rem))', height: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-200 dark:border-[#2a2a2a] flex-shrink-0">
              <div className="relative">
                <img src="/ID-BLESS.png" alt="Blessious" className="w-12 h-12 object-cover rounded-full shadow-md" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#141414]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[14px] text-black dark:text-white leading-tight">Chat with Blessious</h3>
                <p className="text-[11px] text-green-500 font-bold mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online Now
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
              {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Quick chips — show only on first message */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {['Tech Stack', 'Experience', 'Projects', 'Contact'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => quickAsk(chip)}
                    className="text-[11px] font-bold px-3 py-1.5 bg-gray-100 dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-[#2a2a2a]">
              <div className="flex items-end gap-2 px-3 py-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder="Type a message..."
                  className="flex-1 resize-none bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] text-black dark:text-white placeholder-gray-400 text-[13px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all font-medium leading-snug"
                  style={{ maxHeight: '80px', minHeight: '40px' }}
                />
                <button
                  id="chat-send-btn"
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 flex-shrink-0 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:opacity-80 active:opacity-60 disabled:opacity-30 transition-opacity"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center px-4 pb-2">
                <p className="text-[10px] text-gray-400 font-bold">Ask me about my work, projects, or experience!</p>
                <p className="text-[10px] text-gray-400 font-bold">{input.length}/{MAX_CHARS}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Button ── */}
      <motion.button
        id="chat-open-btn"
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-5 py-3.5 text-[13px] font-bold shadow-lg border border-black dark:border-white flex items-center gap-2.5 transition-colors duration-300"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
        Chat with Blessious
      </motion.button>
    </>
  );
}
