"use client";

import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { createSocket } from "../../lib/socket";
import { parseMessage } from "../../lib/parseMessage";
import { getUserCode, getUserColor } from "../../lib/userIdentity";
import Loader from "./loading"
import { useRouter } from "next/navigation";


/* =========================CHAT PAGE========================= */

export default function ChatPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [showTools, setShowTools] = useState(false);
  const [text, setText] = useState("");
  const [myChatId, setMyChatId] = useState("");
  const [maskedId, setMaskedId] = useState("");

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  /* ---------- INIT (CLIENT ONLY) ---------- */

  useEffect(() => {
    let socket;

    try {
      setMounted(true);
      setLoading(true);

      const chatId = localStorage.getItem("chatId");
      const sessionId = localStorage.getItem("WF_sessionId");

      /* ---------- AUTH GUARD ---------- */
      if (!sessionId) {
        setStatus("Unauthorized");
        setTimeout(() => router.replace("/"), 1000);
        return; // 🔴 REQUIRED
      }

      if (!chatId) {
        const newId = crypto.randomUUID();
        if (!newId) {
          router.replace("/");
          return;
        }
        localStorage.setItem("chatId", newId);
      }

      const finalChatId = localStorage.getItem("chatId");
      setMyChatId(finalChatId);
      setGender(sessionId.split("-")[1]);

      /* ---------- SOCKET INIT ---------- */
      socket = createSocket(finalChatId);
      socketRef.current = socket;
      const connectionTimer = setTimeout(() => {
        setStatus("Server not responding");
        setLoading(true);
      }, 5000);

      socket.on("connect", () => {
        setStatus("Connecting…");
      });

      socket.on("chat:init", (data) => {
        clearTimeout(connectionTimer);
        setMaskedId(data.maskedChatId);
        setStatus("");
        setLoading(false);
      });

      socket.on("chat:history", (history) => {
        clearTimeout(connectionTimer);
        setMessages(history);
      });

      socket.on("chat:message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      socket.on("disconnect", () => {
        setStatus("Disconnected");
        setLoading(true);
      });
      const closeTools = (e) => {
        if (e.target.closest(".chat-tools")) return;
        setShowTools(false);
      };

      window.addEventListener("click", closeTools);

      return () => {
        socket?.disconnect();
        window.removeEventListener("click", closeTools);
      };
    } catch (err) {
      setStatus(err.message);
      setLoading(true);
    }
  }, [router]);


  /* ---------- AUTOSCROLL ---------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!mounted) return null;
  if (loading) {
    return <Loader status={status} />;
  }
  // setLoading(true);
  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = () => {
    if (!text.trim()) return;

    socketRef.current.emit("chat:send", {
      text,
      gender,
      replyTo,
    });

    setText("");
    setReplyTo(null);
  };

  const wrapText = (symbol) => {
    setText((t) => `${symbol}${t}${symbol}`);
    setShowTools(false);
  };
  const handleProfileClick = async () => {
    const info = await getColorInfoFromHSL(getUserColor(myChatId));

    const textToCopy = `${info.hex} ${info.name}`;

    await navigator.clipboard.writeText(textToCopy.toLowerCase());
  };
  /* ---------- RENDER ---------- */

  return (
    < div className="h-[100dvh] flex flex-col bg-[#efeae2]" >

      {/* HEADER */}
      <div className="bg-white px-4 py-3 shadow flex items-center justify-between gap-3" >
        <div className="flex gap-3 items-center">
          <span onClick={() => {
            handleProfileClick();
            alert("copied profile color");
          }} title="copy profile color and name" className="cursor-pointer">{<Avatar letter={getUserCode(myChatId)[0]} color={getUserColor(myChatId)} />}</span>
          <div>
            <p className="font-medium text-2xl main-logo" style={{ "color": getUserColor(myChatId) }}>Anonymous Wolf Chat</p>
            <p className="text-xs text-gray-500">
              Global chat ID — <span style={{ "color": getUserColor(myChatId) }}>{maskedId}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex flex-column justify-center w-[25px] h-[25px] rounded bg-blue-400 text-white" title="report an issue" style={{ "background": getUserColor(myChatId) }}>
            <i className="">i</i>
            <div className="hidden">Report an issue</div>
          </button>
          <button className="flex flex-column justify-center w-[25px] h-[25px] rounded bg-blue-400 text-white" title="contact us" style={{ "background": getUserColor(myChatId) }}>
            <i className="">e</i>
            <div className="hidden">Contact us</div>
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8" >
        {
          messages
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((m) => (
              <Message
                key={m.msgId}
                message={m}
                timeStamp={m.timestamp}
                maskedId={m.maskedChatId}
                self={m.senderChatId === myChatId}
                gender={m.gender}
                senderColor={hslToHex(getUserCode(m.senderChatId))}
                onReply={() =>
                  setReplyTo({
                    msgId: m.msgId,
                    maskedChatId: m.maskedChatId,
                    senderChatId: m.senderChatId,
                    senderColor: hslToHex(getUserCode(m.senderChatId)),
                    replyTo: `${getUserCode(m.senderChatId)}-${m.maskedChatId.slice(-4)}`,
                    text: m.text,
                  })
                }
              />
            ))
        }
        <div ref={bottomRef} />
      </div >

      <div className="bg-white px-4 py-3 relative" >

        {
          showTools && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-16 left-4 z-20 w-48 rounded-xl bg-white shadow-xl border p-2"
            >
              <ToolButton label="Bold" onClick={() => wrapText("*")} />
              <ToolButton label="Italic" onClick={() => wrapText("_")} />
              <ToolButton label="Code" onClick={() => wrapText("`")} />
              <ToolButton label="Red" onClick={() => setText((t) => `#ff0000 ${t}`)} />
              <ToolButton label="Emoji 😄" onClick={() => setText((t) => `${t} :smile:`)} />
            </div>
          )
        }

        {
          replyTo && (
            <div className={`mx-4 mb-2 border-l-4 pl-3 pr-2 py-2 rounded text-xs flex justify-between`} style={{ borderColor: getUserColor(replyTo.senderChatId), background: hslToHex(getUserColor(replyTo.senderChatId)) + "15" }}>
              <div>
                <p className={`font-medium`} style={{ "color": `${getUserColor(replyTo.senderChatId)}` }}>
                  Replying to @{replyTo.replyTo}
                </p>
                <p className="truncate text-gray-600">
                  {replyTo.text}
                </p>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
          )
        }

        <div className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTools((v) => !v);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-200"
          >
            <FiPlus className="text-xl text-gray-600" />
          </button>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
          />

          <button
            onClick={sendMessage}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500"
            style={{ "background": getUserColor(myChatId) }}>
            <IoSend />
          </button>
        </div>
      </div >
    </div >
  )
}

/* =========================COMPONENTS========================= */
function hslToHex(hsl) {
  const match = hsl.match(/hsl\(\s*(\d+),\s*(\d+)%?,\s*(\d+)%?\s*\)/i);
  if (!match) return null;

  let [, h, s, l] = match.map(Number);

  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    )
      .toString(16)
      .padStart(2, "0");

  return `#${f(0)}${f(8)}${f(4)}`;
}

function ToolButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
    >
      {label}
    </button>
  );
}
function Message({ message, self, onReply, maskedId, timeStamp, senderColor, gender }) {
  const [messageActive, setMessageActive] = useState(false);
  const messageRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (messageRef.current && !messageRef.current.contains(e.target)) {
        setMessageActive(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const parsed = parseMessage(message.text);
  const userCode = getUserCode(message.senderChatId);
  const userColor = getUserColor(message.senderChatId);
  const usertimeStamp = new Date(timeStamp);
  const sendTime = `${usertimeStamp.getHours()}:${usertimeStamp.getMinutes()}`;
  const sendDate = `${usertimeStamp.getDate()}/${usertimeStamp.getMonth() + 1}/${usertimeStamp.getFullYear()}`;
  return (
    <div className={`flex gap-3 ${self ? "justify-end" : "justify-start"}`}>

      {!self && <Avatar letter={userCode[0]} color={userColor} />}

      <div className="max-w-[70%] group relative">
        <p className={`text-xs text-nowrap mb-1 absolute top-[-10] font-bold`} style={{ "color": userColor }}>{`${userCode}-${maskedId.slice(-4)}`}</p>

        <div
          ref={messageRef}
          onClick={(e) => { e.stopPropagation(); setMessageActive((v) => !v) }}
          className={`
    rounded-2xl px-4 py-2 mt-2 text-sm shadow relative
    ${self ? "bg-[#d9fdd3]" : "bg-white"}
    ${self ? "rounded-tr-none" : "rounded-tl-none"}
  `}
          style={parsed.color ? { color: parsed.color } : undefined}
        >
          {message.replyTo && (
            <div className="mb-2 border-l-4 border-blue-500 pl-2 text-xs text-gray-600">
              <span className="font-medium " >
                @{message.replyTo.replyTo}
              </span>
              <div className="truncate opacity-80">
                {message.replyTo.text}
              </div>
            </div>
          )}

          {parsed.type === "codeblock" ? (
            <pre className="bg-gray-900 text-green-200 rounded-lg p-3 text-xs overflow-x-auto">
              {parsed.content}
            </pre>
          ) : (
            parsed.tokens.map((t, i) => <Token key={i} token={t} />)
          )}


          <button
            onClick={onReply}
            className={`
  absolute ${!self ? "-right-10" : "-left-10"} top-1/2 -translate-y-1/2
  text-xs text-gray-500
  transition-all duration-200
  opacity-0
  group-hover:opacity-100
  ${messageActive ? "opacity-100" : ""}
`}
          >
            Reply
          </button>
        </div>
        <span
          className={`
    absolute -bottom-4 ${!self ? "-right-2" : "-left-0"}
    text-gray-400 text-[10px] text-nowrap
    transition-all duration-200
    opacity-0 translate-y-1
    group-hover:opacity-100 group-hover:translate-y-0
    ${messageActive ? "opacity-100 translate-y-0" : ""}
    pointer-events-none
  `}
        >
          {sendTime} {sendDate} {`(${gender ?? "!"})`}
        </span>
      </div>

      {self && <Avatar letter={userCode[0]} color={userColor} />}
    </div>
  );
}
async function getColorInfoFromHSL(hslString) {
  const match = hslString.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/i);
  if (!match) return null;

  const [, h, s, l] = match;

  const res = await fetch(
    `https://www.thecolorapi.com/id?hsl=${h},${s}%,${l}%`
  );

  if (!res.ok) throw new Error("Color API failed");

  const data = await res.json();

  return {
    hex: data.hex.value,
    name: data.name.value,
  };
}




function Avatar({ letter, color }) {
  return (
    <div
      className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
}

function Token({ token }) {
  switch (token.type) {
    case "*":
      return <strong>{token.text}</strong>;
    case "_":
      return <em>{token.text}</em>;
    case "~":
      return <del>{token.text}</del>;
    case "`":
      return (
        <code className="bg-gray-200 px-1 rounded text-xs">
          {token.text}
        </code>
      );
    case "link":
      return (
        <a
          href={token.text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {token.text}
        </a>
      );
    case "emoji":
      return <span>{token.text}</span>;
    default:
      return <span>{token.text}</span>;
  }
}
