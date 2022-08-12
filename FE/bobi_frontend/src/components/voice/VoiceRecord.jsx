import React, { useState, useCallback } from "react";
import { uploadFile } from "react-s3";
import Modal from "../modal/Modal"

window.Buffer = window.Buffer || require("buffer").Buffer; 
// ReferenceError: Buffer is not defined 에러때문에 넣음

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_REGION;
const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

function VoiceRecord () {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [audioFile, setAudioFile] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };
  
  // const closeModal = () => {
  //   setModalOpen(false);
  // };
  
  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  
  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    const soundUrl = URL.createObjectURL(audioUrl);
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "1_from_web.wav", { lastModified: new Date().getTime(), type: "audio" });
    console.log(sound); // File 정보 출력
    setAudioFile(sound);
    console.log(soundUrl);
    setModalOpen(true);
  }, [audioUrl]);
  
  // 여기부터 s3 업로드 관련 코드
  
  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  };
  
  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => console.log(data))
      .catch(err => console.error(err))
      setModalOpen(false);
  };
  
  // 여기까지 s3



  
  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      <button onClick={onSubmitAudioFile}>결과 확인</button>
      <Modal open={modalOpen} close={() => handleUpload(audioFile)}>
        <p>제출하시겠습니까?</p>
      </Modal>
      {/* <button onClick={() => handleUpload(audioFile)}>업로드</button> */}
    </>
  );
};

export default VoiceRecord;
