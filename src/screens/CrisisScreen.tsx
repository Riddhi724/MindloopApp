import { useState } from 'react';
import { Phone, MessageCircle, Heart, ArrowLeft } from 'lucide-react';
import { HELPLINE_NUMBER, HELPLINE_LABEL } from '@/lib/data';

interface Props {
  onBack: () => void;
}

export default function CrisisScreen({ onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mist-50 via-sage-50 to-sage-100 animate-fadeIn px-6 py-10 max-w-md mx-auto w-full">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-1.5 text-sage-600 text-sm font-medium mb-6 active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-sage-200 flex items-center justify-center mb-6 animate-breathe">
          <Heart className="w-10 h-10 text-sage-600" fill="currentColor" />
        </div>

        <h1 className="text-2xl font-bold text-sage-800">You're not alone right now</h1>
        <p className="text-sage-600 mt-3 leading-relaxed max-w-sm">
          What you're feeling matters, and it's okay to ask for help. Talking to someone — even just one person — can make a real difference.
        </p>

        <div className="w-full mt-8 p-6 rounded-3xl bg-white shadow-soft border border-sage-100">
          <p className="text-sm text-sage-500 font-medium">Call or text 24/7, free & confidential</p>
          <p className="text-5xl font-bold text-sage-700 mt-2 tracking-tight">{HELPLINE_NUMBER}</p>
          <p className="text-sm text-sage-500 mt-1">{HELPLINE_LABEL}</p>
        </div>

        <div className="w-full mt-4 space-y-3">
          <a
            href={`tel:${HELPLINE_NUMBER}`}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-sage-500 text-white font-semibold shadow-soft active:scale-[0.99] transition-transform"
          >
            <Phone className="w-5 h-5" /> Talk to someone now
          </a>
          <a
            href={`sms:${HELPLINE_NUMBER}`}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-sage-700 font-semibold border border-sage-200 active:scale-[0.99] transition-transform"
          >
            <MessageCircle className="w-5 h-5" /> Text instead
          </a>
        </div>

        <p className="text-xs text-sage-500 mt-6 leading-relaxed max-w-xs">
          If you're in immediate danger, call your local emergency number. This app is a companion, not a substitute for professional care.
        </p>
      </div>
    </div>
  );
}
