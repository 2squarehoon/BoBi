import React, { useEffect, useState } from "react";
import HiddenStory from "./HiddenStory";
import StoryItem1 from "./StoryItem1";
import StoryItem2 from "./StoryItem2";
import StoryItem3 from "./StoryItem3";
import StoryItem4 from "./StoryItem4";
import StoryItem5 from "./StoryItem5";

function StoryList() {
  const [ exp, setExp ] = useState([]);

  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/robots/")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        // console.log(data)
        // console.log(data.length)
        const last = data.length - 1    // 가장 최신 데이터 출력
        const lastdata = data[last]
        console.log(lastdata)
        setExp(lastdata["exp"]);
    });
  }, []);

  return (
    <React.Fragment>
      <br />
        <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>숨겨진 이야기</h1>
        <br />
        <div>
          <span>현재 보비와의 친밀도 </span>
          <img width="3%" src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png" alt="heart" />
          <span style={{ fontWeight: "bold", marginLeft: "2%", textShadow: "-1px 0 #FFC0CB, 0 1px #FFC0CB, 1px 0 #FFC0CB, 0 -1px #FFC0CB"}}>{exp}</span>
          <p>친밀도를 올리면 숨겨진 이야기가 나타나요! 😊</p>
        </div>
        <br />
      
      <StoryItem1 />
      {
        exp < 100
        ? <HiddenStory />
        : <StoryItem2 />
      }
      {
        exp < 200
        ? <HiddenStory />
        : <StoryItem3 />
      }
      {
        exp < 300
        ? <HiddenStory />
        : <StoryItem4 />
      }
      {
        exp < 400
        ? <HiddenStory />
        : <StoryItem5 />
      }
    </React.Fragment>
  )
};

export default StoryList;