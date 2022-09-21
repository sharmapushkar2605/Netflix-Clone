import React,{useState} from 'react';
import {useNavigate}from "react-router-dom";
import styled from 'styled-components'
import video from "../static/video.mp4";
import {IoPlayCircleSharp} from "react-icons/io5"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi" 
import { useDispatch } from "react-redux";
import { showNotification } from "../store/NotificationSlice";
function Card({movieData}) {
  const dispatch = useDispatch()
   const [isHovered,setIsHovered]=useState(false);
   const [isLiked,setIsLiked]=useState(false);
   const [isDisliked,setIsDisliked]=useState(false);
   const navigate=useNavigate();
   const handleAdd = async (tg)=>{
    const res = await fetch(`http://localhost:8000/api/movies/add?tag=${tg}`,
    {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        'authToken':localStorage.getItem('authToken')
      },
      body:JSON.stringify(movieData)
    });
    const data = await res.json()
    if(tg==='like')
    {
      setIsLiked(true)
      setIsDisliked(false)
    }
    if(tg==='dislike')
    {
      setIsLiked(false)
      setIsDisliked(true)
    }
    dispatch(showNotification({ message: data.message, severity: data.severity }))
   }
  return (
    <Container
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
      alt="card"
      onClick={() => navigate("/player")}
    />
    {isHovered && (
      <div className="hover">
        <div className="image-video-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
            alt="card"
            onClick={() => navigate("/player")}
          />
          <video
            src={video}
            autoPlay={true}
            loop
            muted
            onClick={() => navigate("/player")}
          />
        </div>
        <div className="info-container flex column">
          <h3 className="name" onClick={() => navigate("/player")}>
            {movieData.name}
          </h3>
          <div className="icons flex j-between">
            <div className="controls flex">
              <IoPlayCircleSharp
                title="Play"
                onClick={() => navigate("/player")}
              />
              <ThumbUpIcon color={`${isLiked?'primary':''}`} onClick={()=>handleAdd('like')} title="Like" />
              <ThumbDownIcon color={`${isDisliked?'primary':''}`} onClick={()=>handleAdd('dislike')} title="Dislike" />
              <AiOutlinePlus onClick={()=>handleAdd('watch-later')} title="Add to my list" />
            </div>
            <div className="info">
              <BiChevronDown title="More Info" onClick={()=>navigate(`/info/${movieData.id}`)}/>
            </div>
          </div>
          <div className="genres flex">
            <ul className="flex">
              {movieData.genres.map((genre) => (
                <li>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </Container>
);
};

const Container = styled.div`
max-width: 230px;
width: 230px;
height: 100%;
cursor: pointer;
position: relative;
img {
  border-radius: 0.2rem;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.hover {
  z-index: 99;
  height: max-content;
  width: 20rem;
  position: absolute;
  top: -18vh;
  left: 0;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  background-color: #181818;
  transition: 0.3s ease-in-out;
  .image-video-container {
    position: relative;
    height: 140px;
    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 0.3rem;
      top: 0;
      z-index: 4;
      position: absolute;
    }
    video {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 0.3rem;
      top: 0;
      z-index: 5;
      position: absolute;
    }
  }
  .info-container {
    padding: 1rem;
    gap: 0.5rem;
  }
  .icons {
    .controls {
      display: flex;
      gap: 1rem;
    }
    svg {
      font-size: 2rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      
    }
  }
  .genres {
    ul {
      gap: 1rem;
      li {
        padding-right: 0.7rem;
        &:first-of-type {
          list-style-type: none;
        }
      }
    }
  }
}
`;  
export default Card