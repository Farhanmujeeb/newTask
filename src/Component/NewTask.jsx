import React, { useState, useEffect } from "react";
import "./NewTask.css";
import profile from "../Assets/profile.jpg";
import whitelist from "../Assets/listnew.png";
import blacklist from "../Assets/list.png";
import whitepara from "../Assets/paragraphnew.png";
import blackpara from "../Assets/paragraph.png";
import Sign from "./Sign";

const NewTask = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isParagraphActive, setIsParagraphActive] = useState(true);
    const [isListActive, setIsListActive] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeImage, setActiveImage] = useState(null);

  

const openMenu = () => {

  setIsMenuOpen(true);
};

const closeMenu = () => {
    
  setIsMenuOpen(false);
};


const toggleParagraphImage = () => {
    setIsParagraphActive(true);
    setIsListActive(false);
    setActiveImage("paragraph");
  };

  const toggleListImage = () => {
    setIsListActive(true);
    setIsParagraphActive(false);
    setActiveImage("list");
  };
  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData); // Store the fetched data in the "data" state
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const imageUrls = [
    "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=740&t=st=1699430409~exp=1699431009~hmac=d8623cd65a1752726109e65fc0977459e1a80a18ce550458e5a86d32325a5fac",
    "https://img.freepik.com/free-photo/casual-man-model_144627-17075.jpg?w=900&t=st=1699437448~exp=1699438048~hmac=351821de553c599aa8490f563e6d5faaa053e023d16c62e147933351056f5dac",
    "https://img.freepik.com/free-photo/young-asian-girl-portrait-isolated_53876-70968.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/portrait-young-happy-man-smiling-against-white-space_58466-12722.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/portrait-dreamy-cute-adult-redhead-male-with-beard-looking-up-with-one-eye-closed-lifting-eyebrows-thinking-making-up-idea-picturing-something-gray-wall_176420-27566.jpg?size=626&ext=jpg",
    // Add more image URLs as needed
  ];

  const date= [
    "Mon,21 Dec 2020 14:57 GMT",
    "Mon,21 Dec 2020 14:57 GMT",
    "Mon,21 Dec 2020 14:57 GMT",
    "Mon,21 Dec 2020 14:57 GMT",
    "Mon,21 Dec 2020 14:57 GMT",
  ]

  const paragraphButtonClass = isParagraphActive
    ? "active-button"
    : "inactive-button";

  const listButtonClass = isListActive ? "active-button" : "inactive-button";


  const handleRemoveData = (postId) => {
    const updatedData = data.filter((item) => item.id !== postId);
    setData(updatedData);
  };


  return (
    <div className="test-container">
      <div className="test-toggle-container">
        <div className="test-profile-container">
          <img
            className="test-profile"
            width={50}
            height={50}
            src={profile}
            alt=""
          />
          <div className="test-profile-text">
            <span style={{ fontWeight: "bolder" }}>Hi Reader,</span>
            <span style={{ fontSize: 14 }}>Here's your News</span>
          </div>
        </div>
        <div className="toggle-button">
          <h2>View Toggle</h2>
          <div className="toggle-button-images">
            <button
              className={`button ${
                isParagraphActive ? "active-button" : "inactive-button"
              }`}
              onClick={toggleParagraphImage}
            >
              <img
                width={40}
                height={40}
                src={
                  activeImage === "paragraph" ? whitepara : blackpara
                }
                alt=""
              />
            </button>
            <button
              className={`button ${
                isListActive ? "active-button" : "inactive-button"
              }`}
              onClick={toggleListImage}
            >
              <img
                width={40}
                height={40}
                src={activeImage === "list" ? whitelist : blacklist}
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="test-feedback-Container">
          <span style={{ fontWeight: "900", fontSize: "18px" }}>
            Have a Feedback
          </span>
          <div className="feedback">
            <span onClick={openMenu}> We're Listening</span>
            {/* <Sign isopen={isMenuOpen} closeMenu={closeMenu}/> */}
          </div>
        </div>
      </div>
      <div className="second-part">
        <div className="datas">
          {currentData.map((post, index) => (
            <div className="posts" key={post.id}>
            <img className="imagespost" width={50} height={50} src={imageUrls[index % imageUrls.length]} alt={`Image ${post.id}`} />
            <div className="texts">
            <span className="title">{post.title}</span>
            <span className="titles">{post.body}</span>
            <span className="date">{date[index % date.length]}</span>
            </div>
            <button onClick={()=> handleRemoveData(post.id)} className="close-btn"><img width={20} height={20} src={require('../Assets/close.png')} alt="" /></button>
            </div>
            
          ))}
        </div>
        <div className="pagination">
          <div className="prev-button" onClick={prevPage}>
            Previous
          </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index + 1}
              className={`pages ${currentPage === index + 1 ? "active" : "inactive"}`}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </div>
          ))}
          <div className="next-button" onClick={nextPage}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
