import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqData = {
  title: "Your questions, answered",
  subtitle: "Still need help?",
  contactText: "Contact us",
  topQuestions: "Top questions",
  faqs: [
    {
      id: 1,
      question:
        "I have created a Return request. When will the product be picked up?",
      answer:
        "Once you create a return request, our logistics partner will contact you within 24-48 hours to schedule a pickup. The pickup will be arranged at your convenience during business hours.",
    },
    {
      id: 2,
      question: "How do I check the status of my order?",
      answer:
        "You can check your order status by logging into your account and visiting the 'My Orders' section. You'll also receive email and SMS updates at each stage of your order processing and delivery.",
    },
    {
      id: 3,
      question: "How can I get my order delivered faster?",
      answer:
        "We offer express delivery options during checkout. You can choose same-day delivery in select cities or next-day delivery for faster service. Additional charges may apply based on your location.",
    },
    {
      id: 4,
      question: "How do I cancel my Order?",
      answer:
        "You can cancel your order within 1 hour of placing it by going to 'My Orders' and clicking the 'Cancel' button. After this window, please contact customer support for assistance.",
    },
    {
      id: 5,
      question: "Refund of Shipping Fee",
      answer:
        "Shipping fees are refunded in case of order cancellation within the allowed timeframe, product defects, or if we're unable to deliver to your location. The refund will be processed within 5-7 business days.",
    },
  ],
};

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void; // 👈 new
}

const Faq: React.FC<FaqModalProps> = ({ isOpen, onClose,onContactClick }) => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black text-white rounded-lg sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-800"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 relative">
          <div className="flex justify-between pr-8 sm:pr-10">
            <h1 className="text-xl sm:text-2xl md:text-4xl mb-2 font-popins">
              <span className="text-[#ffb300]">
                {faqData.title.split(",")[0]},
              </span>
              <br />
              <span className="text-[#ffb300] ">
                {faqData.title.split(",")[1]}
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 lg:gap-5 mt-4 sm:mt-6">
              <span className="text-[#cacacae6] text-[23px] fonnt-popins sm:text-sm">
                {faqData.subtitle}
              </span>
              <button
                onClick={() => {
                  if (onContactClick) onContactClick();
                  onClose(); // close FAQ modal
                }}
                className="bg-[#ffb300] hover:bg-[#ffb300] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-popins transition-colors text-sm w-fit"
              >
                {faqData.contactText}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 font-popins">
          <h2 className="text-[#ffb300] text-base sm:text-lg font-popins mb-3 sm:mb-4 ">
            {faqData.topQuestions}
          </h2>

          <div className="space-y-1 max-h-[calc(95vh-200px)] sm:max-h-96 overflow-y-auto scrollbar-hide cursor-pointer">
            {faqData.faqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="border-b text-[white] last:border-b-0"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full py-3 sm:py-4 px-0 text-left flex items-start sm:items-center justify-between hover:text-[#ffb300] transition-colors group"
                  >
                    <span className="text-sm sm:text-base pr-3 sm:pr-4 font-popins leading-relaxed cursor-pointer">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#cacacae6] group-hover:text-[#ffb300] transition-transform duration-300 flex-shrink-0 mt-0.5 sm:mt-0 sm:w-5 sm:h-5 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    ref={
                      (el) => {
                        contentRefs.current[faq.id] = el;
                      } // correct, returns void
                    }
                    className="overflow-hidden transition-all duration-1000 ease-in-out"
                    style={{
                      maxHeight: isOpen
                        ? contentRefs.current[faq.id]?.scrollHeight + "px"
                        : "0px",
                    }}
                  >
                    <p className="text-[#cacacae6] text-xs sm:text-sm font-popins leading-relaxed py-2 sm:py-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
