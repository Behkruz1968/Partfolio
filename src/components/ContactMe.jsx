import React, { useState, useCallback } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Your API bot token
const apiToken = "7475275047:AAFeJ9WqHkIg-nE0WXEjz6vEasye4GlOKw0";
const chatId = "5504133901"; // Replace with your chat ID

const InputField = ({ type, name, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="border border-darkDesert bg-lightDesert text-darkDesert mb-4 p-3 rounded w-full shadow-md focus:border-goldDesert transition-colors duration-200"
    value={value}
    onChange={onChange}
    required
  />
);

export default function ContactMe() {
  const contactSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleMessageChange = useCallback((e) => setMessage(e.target.value), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email input validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Prepare form data
      const formData = {
        name,
        email,
        message
      };

      // Send data to the Telegram bot
      const response = await axios.post(
        `https://api.telegram.org/bot${apiToken}/sendMessage`,
        {
          chat_id: chatId, // Replace with your chat ID
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }
      );

      if (response.data.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        toast.success("Your message has been sent successfully!");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setError("Oops! Something went wrong. Please try again later.");
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <animated.section
      id="contact-me"
      className="flex flex-col items-center justify-center bg-lightDesert p-8 rounded-lg shadow-md min-h-screen"
      style={contactSpring}
    >
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-darkDesert mb-6 text-center">
          Contact Me
        </h1>
        {success ? (
          <div>
            <img src="/thankyou-toast.jpg" alt="Success" className="rounded-3xl" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              className="border border-darkDesert bg-lightDesert text-darkDesert mb-4 p-3 rounded w-full h-24 shadow-md focus:border-goldDesert transition-colors duration-200"
              value={message}
              onChange={handleMessageChange}
              required
            />
            <button
              type="submit"
              className="bg-darkDesert text-lightDesert py-3 px-4 rounded w-full font-bold hover:bg-goldDesert transition-colors duration-300 shadow-md"
            >
              Submit
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        )}
      </div>
    </animated.section>
  );
}
