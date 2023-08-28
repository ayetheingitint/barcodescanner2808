import React, { useState, useRef, useEffect } from 'react';
import { f7, Page, Navbar, Button, Popup, Row, Col, Block } from 'framework7-react';
import { BrowserMultiFormatReader } from '@zxing/library';
const CamerasizeReduce = () => {
    const red = 0;
    const green = 153;
    const blue = 153;

    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [result, setResult] = useState('');
    const [scanning, setscanning] = useState(false);
    const [showResultbtn, setShowResultbtn] = useState(false);

    const [popupOpened, setPopupOpened] = useState(false);
    const [showResult, setshowResult] = useState(false);
    const canvasElement = document.getElementById('canvas');
    const stopBtnElement = document.getElementById('stopbtn');
    const startBtnElement = document.getElementById('startbtn');
    const showResultBtnElement = document.getElementById('showResultBtn');
    const [scannedCodes, setScannedCodes] = useState([]);
    const openPopup = () => {
        setPopupOpened(true);
        setShowResultbtn(false);

    };

    const closePopup = () => {
        setPopupOpened(false);
    };
    const OKbtnStopScanning = () => {
        setPopupOpened(false);
        const videoElement = document.getElementById('video'); // Replace with your video element's ID
        const stream = videoElement.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }
        setshowResult(true);
        videoElement.style.display = 'none';
        canvasElement.style.display = 'none';
        stopBtnElement.style.display = 'none';
        showResultBtnElement.style.display = 'none';


    }
    const retryScanning = () => {
        setResult('');
        setPopupOpened(false);
      
        // f7.views.main.router.navigate('/barcode-reader/');
         startVideo();
        const codeReader = new BrowserMultiFormatReader();
        codeReader.reset();
    };

    const navigateToHome = () => {
        f7.views.main.router.navigate('/');

    };

    const startVideo = () => {

        const codeReader = new BrowserMultiFormatReader();
        codeReader.reset();
        setscanning(true);
        const drawRectangle = (context, x, y, width, height) => {
            context.beginPath();
            context.strokeStyle = rgbColor; // Rectangle border color
            context.lineWidth = 3; // Border width
            context.setLineDash([10, 5]);
            context.rect(x, y, width, height);
            context.stroke();
        };
        codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
            if (result) {
                setResult(result.text);
                console.log('Detected barcode:', result.text);

                setShowResultbtn(true);

                // You can perform further actions with the detected barcode here
            } else if (error) {
                console.error('Error:', error);
            }

        }, videoRef.current);
        const video = videoRef.current;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Calculate rectangle position and size for the bottom
        const canvasWidth = 250;
        const canvasHeight = 150;
        const rectangleWidth = 100; // Width of the rectangle
        const rectangleHeight = 50; // Height of the rectangle
        const rectangleX = (canvasWidth - rectangleWidth); // Center horizontally
        const rectangleY = (canvasHeight - rectangleHeight);
        drawRectangle(context, rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        codeReader.reset();
        // return () => {
        //     codeReader.reset();
        // };
    }

    const stopScanning = () => {
        const videoElement = document.getElementById('video'); // Replace with your video element's ID
        const stream = videoElement.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }
        f7.views.main.router.navigate('/');

    }
    return (
        <Page>
            <div className="video-container">
                <video ref={videoRef} autoPlay playsInline style={{ width: '50%', height: '50%' }} id="video" />

            </div>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} id="canvas" />


            {scanning == true ? (
                <Button onClick={stopScanning} id="stopbtn">Stop Scanning</Button>
            ) : (
                <Button onClick={startVideo} id="startbtn">Start Scanning</Button>
            )}
            <div>
                <div style={{ display: showResult ? "block" : "none" }}><p>Scan Result: {result}</p></div>
            </div>
            <Block strong>
                <Row tag="p">
                    <Col tag="span" style={{ display: showResultbtn ? "block" : "none" }}>
                        <Button onClick={openPopup} large raised id="showResultBtn">
                            Show Result
                        </Button>
                    </Col>
                    <Col tag="span">
                        <Button onClick={navigateToHome} large raised fill>
                            Back
                        </Button>
                    </Col>
                </Row>
            </Block>

            <Popup opened={popupOpened} onPopupClosed={closePopup}>
                <Page>
                    <Navbar title="Popup Content" backLink="Close" sliding={false} />
                    <div className="popup-content">
                        <p> 1.Click [OK] button, to check the scan result.</p>
                        <p> 2.Click [Retry] button, to retry the scanner again.</p>
                        <Block strong>
                            <Row tag="p">
                                <Col tag="span">
                                    <Button onClick={OKbtnStopScanning} large raised>
                                        OK
                                    </Button>
                                </Col>
                                <Col tag="span">
                                    <Button onClick={retryScanning} large raised fill>
                                        Retry
                                    </Button>
                                </Col>
                            </Row>
                        </Block>
                    </div>
                </Page>
            </Popup>
        </Page>
    );
}
export default CamerasizeReduce;