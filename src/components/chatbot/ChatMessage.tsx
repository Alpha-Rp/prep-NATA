import React from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";
import { Message } from "./ChatbotInterface";

interface ChatMessageProps {
  message: Message;
  onCopy: () => void;
  isCopied: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onCopy,
  isCopied,
}) => {
  const isBot = message.sender === "bot";

  const formatMessageContent = (content: string) => {
    // Handle line breaks
    const withLineBreaks = content.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));

    return withLineBreaks;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-4 ${
        isBot ? "items-start" : "items-start justify-end"
      }`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-terracotta to-sage p-0.5 mr-2 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-deepNavy p-0.5">
            <img
              src="https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              alt="Pragna"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      )}

      <div className={`max-w-[85%] group ${isBot ? "" : "order-1"}`}>
        <div
          className={`p-3 rounded-lg ${
            isBot
              ? "bg-white/10 backdrop-blur-sm rounded-tl-none border border-white/10"
              : "bg-gradient-to-r from-terracotta to-sage text-white rounded-tr-none"
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">
            {formatMessageContent(message.content)}
          </div>
        </div>

        <div
          className={`mt-1 flex items-center text-xs text-white/60 ${
            isBot ? "" : "justify-end"
          }`}
        >
          <span className="mr-2">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isBot && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
              <button
                onClick={onCopy}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title={isCopied ? "Copied!" : "Copy to clipboard"}
              >
                {isCopied ? (
                  <Check size={14} className="text-sage" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
              <button
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title="Helpful"
              >
                <ThumbsUp size={14} />
              </button>
              <button
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title="Not helpful"
              >
                <ThumbsDown size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-2 flex-shrink-0 border border-white/20">
          <span className="text-xs font-medium text-white">You</span>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
