'use client';

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ModalImage } from './ui/modal-image';
import { ModalContactBlock } from './ui/modal-contact-block';
import ModalHeader from './ui/modal-header';

export default function Modal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative max-w-[800px] rounded-2xl bg-white p-6 shadow-xl md:flex"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-3 text-black transition hover:scale-105 hover:bg-black/5"
        >
          <X size={20} />
        </button>
        <ModalImage />
        <div className="mt-6 flex flex-col items-center justify-center text-center md:mt-0 md:w-[60%] md:px-6">
          <ModalHeader />
          <ModalContactBlock />
        </div>
      </motion.div>
    </motion.div>
  );
}
