import React from "react";
import img1 from "../../assets/a1.svg";
import img4 from "../../assets/a2.svg";
import img3 from "../../assets/a3.svg";
import img2 from "../../assets/a4.svg";
import img6 from "../../assets/a6.svg";
import img7 from "../../assets/a7.svg";
import Card from "./Card";

const Feature = () => {
  const Data = [
    {
      img: img1,
      title: "AI-Powered Career Guidance Platforms 🤖",
      desc: "Develop AI-driven platforms that provide personalized career advice based on students' interests, strengths, and market trends.",
    },
    {
      img: img2,
      title: "Personalized Counselling Sessions 🗣️",
      desc: "Provide one-on-one personalized counselling sessions to help students identify their career goals and pathways.",
    },
    {
      img: img3,
      title: "Career Mentorship Programs 👥",
      desc: "Establish mentorship programs where students can receive guidance and support from professionals in their fields of interest.",
    },
    {
      img: img4,
      title: "Interactive Career Exploration Tools 💻",
      desc: "Create digital tools and apps that allow students to explore different careers through virtual simulations, videos, and interactive content.",
    },
    {
      img: img6,
      title: "Workshops and Skill Development 🛠️",
      desc: "Conduct workshops led by industry experts to enhance students' skills and prepare them for the job market.",
    },
    {
      img: img7,
      title: "Career Awareness Programs 🎓",
      desc: "Implement career awareness programs in schools to educate students and parents about diverse career opportunities available.",
    },
  ];

  return (
    <div className="bg-[#020617] font-poppins font-medium">
      <div className="container max-w-screen-xl mx-auto p-10 flex flex-col items-center justify-center">
        <div className="text-center p-4 mb-4">
          <h2 className="text-white text-3xl">
            Get your personalized career guidance -{" "}
            <span className="text-[#FCE356] font-semibold ">
              Our mentorship offerings
            </span>
          </h2>
          <p className="text-gray-400 mt-4 text-md">
            Build meaningful connections and get expert advice and Insights from
            mentors. Book exclusive sessions with mentors to resolve your
            queries on a 1-1 basis. Get access to skill-based webinars and group
            mentorship boot camps with industry experts.
          </p>
        </div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {Data.map((item, index) => (
            <Card key={index} img={item.img} title={item.title} desc={item.desc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
