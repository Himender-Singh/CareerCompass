import React, { useState } from "react";
import img from "../../assets/bg2.svg";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the primary goal of Career Compass?",
      answer:
        "The primary goal of Career Compass is to provide personalized career guidance, mentorship, and resources to help individuals navigate their career paths and make informed decisions.",
    },
    {
      question: "How do I become a Mentor on Career Compass?",
      answer:
        "To become a Mentor on Career Compass, you can apply through our mentor registration process. Our team will review your application, and once approved, you'll be able to offer mentorship to others.",
    },
    {
      question: "Are there any fees associated with using your mentorship services?",
      answer:
        "Career Compass offers both free and premium mentorship services. While some mentors may offer their services at no cost, others may charge a fee depending on the nature of the guidance provided.",
    },
    {
      question: "How do I find the right Mentor for my needs?",
      answer:
        "You can use our search and filter tools to find mentors who match your career goals, industry, and areas of interest. We also provide recommendations based on your profile.",
    },
    {
      question: "What can I expect from a mentorship relationship?",
      answer:
        "You can expect to receive guidance, support, and knowledge from your Mentor. You can also expect to receive feedback on your progress and advice on how to improve.",
    },
  ];

  return (
    <div className="bg-[#0f172a] text-white mx-auto py-16 px-4">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="w-full">
          <img src={img} alt="FAQ illustration" className="w-full h-auto rounded-md" />
        </div>

        {/* FAQ Section */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border-b border-gray-300 pb-4 transition-all duration-500 ease-in-out"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-white focus:outline-none transition-transform duration-300 ease-in-out"
              >
                {faq.question}
                <span
                  className={`ml-4 transform transition-transform ${
                    openFaq === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {openFaq === index ? "-" : "+"}
                </span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="mt-3 text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
