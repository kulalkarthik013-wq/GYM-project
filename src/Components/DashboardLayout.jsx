import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

const DashboardLayout = ({ children, noPadding }) => {
  const user = JSON.parse(localStorage.getItem("gymUser"));

  return (
    <div>
      <Header user={user} />

      <main
        style={{
          minHeight: "80vh",
          padding: noPadding ? "0" : "20px",
        }}
      >
        {children}
      </main>

      <Footer />

      {/* 🔥 ADD THIS */}
      <Chatbot />
    </div>
  );
};

export default DashboardLayout;