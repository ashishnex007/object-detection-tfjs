"use client";

import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from '@/utils/Render';

let detect;

const ObjectDetection = () => {

  const [loading, setLoading] = useState(false);

  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  const showVideo = () => {
    if (webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
      const myVideoWidth = webCamRef.current.video.videoWidth;
      const myVideoHeight = webCamRef.current.video.videoHeight;

      webCamRef.current.video.width = myVideoWidth;
      webCamRef.current.video.height = myVideoHeight;
    }
  };

  async function runObjectDetection(model) {
    if (canvasRef.current && webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
      canvasRef.current.width = webCamRef.current.video.videoWidth;
      canvasRef.current.height = webCamRef.current.video.videoHeight;

      // find detections

      const detections = await model.detect(webCamRef.current.video, undefined, 0.6);

      // console.log(detections);

      const context = canvasRef.current.getContext("2d");

      renderPredictions(detections, context);
    }
  }

  const runCoco = async () => {
    setLoading(true);
    const model = await cocoSSDLoad();
    setLoading(false);

    detect = setInterval(() => {
      runObjectDetection(model);
    }, 10);
  }

  useEffect(() => {
    runCoco();
    showVideo();
  }, []);

  return (
    <div className='mt-8'>

      {loading ? (
        <div className='gradient-text'>
          AI model is loading...
        </div>) :

        <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>

          <Webcam
            ref={webCamRef}
            className='rounded-md w-full lg:h-[720px] muted'
          />

          <canvas
            ref={canvasRef}
            className='absolute top-0 left-0 z-99999 w-full lg:h-[720px]'
          />

        </div>}
    </div>
  )
}

export default ObjectDetection
