import React, { useState, useRef, useEffect } from 'react';
import { f7, Page, Navbar, Button, Popup, Row, Col, Block } from 'framework7-react';
import { BrowserMultiFormatReader } from '@zxing/library';
const BarcodeScanner = () => {


    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [result, setResult] = useState('');
    const [scanning, setscanning] = useState(false);
    const [showResultbtn, setShowResultbtn] = useState(false);

    const [popupOpened, setPopupOpened] = useState(false);
    const [showResult, setshowResult] = useState(false);
    const [showscanRec, setshowscanRec] = useState(false);
    const stopBtnElement = document.getElementById('stopbtn');
    const scannrectangleElement = document.getElementsByClassName('scan-rectangle');


    const openPopup = () => {
        setPopupOpened(true);


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
            videoElement.style.display = 'none';
        }

        setshowscanRec(false);
        setshowResult(true);
        setShowResultbtn(false);
        scannrectangleElement.style.display = 'none';







    }
    const retryScanning = () => {
        setResult('');
        setPopupOpened(false);
        // startVideo();
        f7.views.main.router.navigate('/barcode-reader/');
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
        setshowscanRec(true);
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
            <div id="barcode-scanner" style={{ display: showscanRec ? "block" : "none" }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} id="video" />
                <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} id="canvas" />

                <div class="scan-rectangle" style={{ display: showscanRec ? "block" : "none" }}>
                    <div class="corner top-left" style={{ display: showscanRec ? "block" : "none" }}></div>
                    <div class="corner top-right" style={{ display: showscanRec ? "block" : "none" }}></div>
                    <div class="corner bottom-left" style={{ display: showscanRec ? "block" : "none" }}></div>
                    <div class="corner bottom-right" style={{ display: showscanRec ? "block" : "none" }}></div>
                </div>


            </div>


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
                    <Col tag="span" style={{ display: result ? "block" : "none" }}>
                        <Button onClick={openPopup} large raised id="showResultBtn" style={{ display: showResultbtn ? "block" : "none" }}>
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
export default BarcodeScanner;