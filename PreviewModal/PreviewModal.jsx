import { Button, ChakraProvider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import styles from './PreviewModal.module.css'
import messageService from '../MessageService/Index';
import { useState } from 'react';
import { COURSE_DOWNLOAD } from '../Config';
import { TecButton } from '../elements/elements';


const PreviewModal = (props) => {
    const {
        fileName = "No file name",
        fileUrl = "https://wallpapers.com/images/high/greenland-3d-nature-bb5rytu2lsnel82u.webp",
        uuid = '',
        allList = '',
        section_id = '',
        isMyCourse = false,
    } = props;
    const [fName, url] = fileUrl?.split("~") || "";
    const [name, type] = fName.split(".");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const [fr, urls] = fileUrl?.split("~") || "";
    const [fileContent, setFileContent] = useState('');

    const handleDownloadFile = (url, name) => {
        try {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = name;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    window.open(blobUrl, '_blank');
                    link.remove();
                    URL.revokeObjectURL(blobUrl);
                })
                .catch(error => console.error('Error fetching the file:', error));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownloadClick = () => {
        handleDownloadFile(url, fName);
    };
    return (
        <ChakraProvider>
            <Drawer
                isOpen={true}
                placement="right"
                size={"lg"}
            >
                <DrawerOverlay />
                <DrawerContent className={styles?.drawerContainer}>
                    <DrawerHeader className={styles?.previewHeader}>{fName}</DrawerHeader>
                    <DrawerBody p={1}>
                        <>
                            {((type === "pdf") || (type === "txt")) &&
                                <>
                                    <iframe
                                        src={url}
                                        width="100%"
                                        height="100%"
                                        title="PDF Viewer"
                                        style={{ border: 'none' }}
                                    ></iframe>
                                </>
                            }
                            {['jpg', 'png', 'jpeg', 'svg'].includes(type) &&
                                <img src={url} alt={fName} width={"600px"} />
                            }
                            {type === "txt" &&
                                <>
                                    <pre>{fileContent}</pre>
                                </>
                            }
                        </>

                    </DrawerBody>
                    <DrawerFooter className={styles?.previewModalFooter}>
                        {!!uuid && <TecButton
                            title="Download"
                            className="tecPrimaryButton"
                            onClick={handleDownloadClick}
                        />

                        }
                        {false && isMyCourse && !!uuid &&
                            <TecButton
                                title="Delete"
                                className="tecDangerButton"
                                onClick={() => {
                                    // console.log( "modal file", fileUrl, allList, uuid, section_id, fileName);
                                    messageService.sendMessage("previewModal", {
                                         fileUrl,
                                        allList,
                                        uuid,
                                        section_id,
                                        url
                                    }, "courseVideo")
                                    messageService.sendMessage('coursePage', { show: false }, 'previewModal');
                                }}
                            />

                        }

                        {/* Delete
                    </Button> */}

                        <TecButton
                            title="Close"
                            className="tecSecondaryButton"
                            onClick={() => {
                                messageService.sendMessage('coursePage', { show: false }, 'previewModal')
                            }}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </ChakraProvider >
    )
}

export default PreviewModal;