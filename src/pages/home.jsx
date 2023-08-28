import React from 'react';
import {
    Page,
    Navbar,
    NavTitle,
    NavTitleLarge,
    Link,
    Toolbar,
    Block, Button, f7
} from 'framework7-react';

const HomePage = () => {
    const navigateToBarCode = () => {
        f7.views.main.router.navigate('/barcode-reader/');
    };
    // const navigateToBarCodeByNarrowcamera = () => {
    //     f7.views.main.router.navigate('/camerasizereduce/');
    // };


    return (
        <Page>
            <Navbar title="Barcode Scanner Test" />
            <Block>
                <div className="centered-container">
                <Button fill onClick={navigateToBarCode}>
                Read Barcode
                </Button>
                </div>
            </Block>

         

        </Page>
    );
};
export default HomePage;