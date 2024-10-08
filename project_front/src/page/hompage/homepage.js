import React from "react";
import { NavLink } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div className="homepage h-screen flex flex-col">
      <div className="header h-[10vh] flex justify-between items-center px-4 md:px-10">
        <div className="logo flex items-center">
          <img src="img/test.png" alt="" className="h-20 w-20" />
          <h2 className="text-2xl sm:block md:text-3xl font-bold ml-2 translate-x-[-20px]">
            GeniusTrainer
          </h2>
        </div>
        <NavLink
          to="/login"
          className="bg-gray-800 text-white text-1xl border-2 border-gray-800 hover:bg-white hover:text-gray-800 transition duration-200 py-1 px-2 md:py-2 md:px-4 mr-2 md:mr-10"
        >
          <span className="hidden md:inline">CONNEXION</span>
          <i className="fa-regular fa-user w-4 h-4 md:hidden"></i>
        </NavLink>
      </div>
      <div className="main flex flex-col items-start sm:justify-center flex-1 pt-12 px-4 md:px-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-5 max-w-2xl z-50">
          <p className="text-xl">Pourquoi ?</p>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight md:text-5xl">
            Simplifier la création des séances pour vous concentrer sur la
            performance.
          </h1>
          <NavLink
            to="/register"
            className="bg-gray-800 text-white border-2 border-gray-800 hover:bg-white hover:text-gray-800 transition duration-200 py-2 px-4 w-1/2 sm:w-1/3 md:w-1/4 text-center"
          >
            INSCRIPTION
          </NavLink>
        </div>
        <img
          src="img/pngtree-fitness-coach-original-hand-drawn-cartoon-png-image_2617677-removebg-preview (1).png"
          alt=""
          className="block z-0"
        />
      </div>
      <div className="flex flex-col w-full h-54 sm:h-48 bg-gray-800 text-[#e5e7eb] px-8 md:px-16 lg:px-32 xl:px-48 py-4">
        <div className="flex gap-6 flex-row justify-center items-center sm:justify-start ">
          <div className="flex flex-col  gap-2 justify-center sm:w-[35%] w-full">
            <div className="flex items-center w-full gap-4 justify-center">
              <img src="/img/test.png" alt="" className="h-8 w-8" />{" "}
              <div className="text-2xl md:text-3xl">GeniusTrainer</div>{" "}
            </div>
          </div>
          <div className="flex flex-row w-[65%] sm:justify-end justify-center  gap-8 text-nowrap">
            <div className="grid grid-cols-1 gap-12">
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/legal"
                  className="hover:underline text-sm md:text-base"
                >
                  Mentions Légales
                </NavLink>
                <NavLink
                  to="/confidentiality"
                  className="hover:underline text-sm md:text-base"
                >
                  Charte de confidentialité
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-500 mt-2 mb-1"></div>
        <div className="text-center text-sm md:text-base">
          © 2024 Your Company - All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Homepage;
