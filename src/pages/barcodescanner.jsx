import React, { useState } from 'react';
import { f7, Page, Navbar, Button, Popup, Row, Col, Block } from 'framework7-react';
import { BrowserMultiFormatReader } from '@zxing/library';
const BarcodeScanner = () => {
    const [scanning, setscanning] = useState(false);
    const [showResultbtn, setShowResultbtn] = useState(false);
    const [showresult, setResult] = useState(false);
    const [popupOpened, setPopupOpened] = useState(false);
    const videoElement = document.getElementById('video');
    const stopBtnElement = document.getElementById('stopbtn');
    const showResultBtnElement = document.getElementById('showResultBtn');
    const [scannedCodes, setScannedCodes] = useState([]);
    const openPopup = () => {
        setPopupOpened(true);
        setShowResultbtn(false);
        setResult(true);
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

        videoElement.style.display = 'none';
        stopBtnElement.style.display = 'none';
        showResultBtnElement.style.display = 'none';
    }
    const retryScanning = () => {
        setPopupOpened(false);
        setResult(false);
        f7.views.main.router.navigate('/barcode-reader/');
        setScannedCodes([]);
        // startVideo();

    };

    const navigateToHome = () => {
        f7.views.main.router.navigate('/');
    };

    const startVideo = () => {
        try {
            new BrowserMultiFormatReader().listVideoInputDevices().then(videoInputDevices => {
                if (videoInputDevices.length > 0) {
                    startScanning(videoInputDevices[0].deviceId);
                }
            });

        } catch (error) {
            console.error('Error starting video stream:', error);
        }
    }
    const startScanning = (deviceId) => {
        setscanning(true);

        new BrowserMultiFormatReader().decodeFromVideoDevice(deviceId, 'video', (result, err) => {
            if (result) {
                const barcodeValue = result.text;
                
                //setScannedCodes(prevCodes => [...prevCodes, result.text]);
                // setPopupOpened(true);
                // setResult(result.text);
                setScannedCodes((prevCodes) => {
                    if (!prevCodes.includes(result.text)) {
                        return [...prevCodes, result.text];
                    }
                    return prevCodes;

                }

                );
                // setPopupOpened(true);
                // new BrowserMultiFormatReader().reset();
                setShowResultbtn(true);

            }
      
            if (err) {
                console.error('Barcode scanning error:', err);
                new BrowserMultiFormatReader().reset();

            }

        });

    }

    const stopVideo = () => {
        videoElement.style.display = 'none';
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
            <video id="video" autoPlay style={{ width: '100%', height: 'auto' }}></video>

            {scanning == true ? (
                <Button onClick={stopScanning} id="stopbtn">Stop Scanning</Button>
            ) : (
                <Button onClick={startVideo} id="startbtn">Start Scanning</Button>
            )}
            <div>
                <p>Scan Result:</p>
                <ul>
                    {scannedCodes.map((code, index) => (
                        <li key={index}>{code}</li>
                    ))}
                </ul>

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
};
export default BarcodeScanner;