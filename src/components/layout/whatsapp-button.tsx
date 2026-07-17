"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed bottom-6 left-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
    >
      <MessageCircle className="size-7 fill-white text-[#25D366]" />
    </motion.a>
  );
}
