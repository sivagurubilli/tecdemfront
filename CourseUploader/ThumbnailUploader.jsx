import React, { memo, useEffect } from "react";
import Styles from "./courseUploader.module.css";
import { Container, Box, Flex, Image } from "@chakra-ui/react";
import { FileIcon } from "../../util_helper";
import { validProfileExtension, videoValidation } from "../Config";

const ThumbnailUploader = ({
  name,
  isThumbnail,
  accept,
  handleChangeUploader,
  fileUrls = [],
  fileUrlsArrayObject = [],
  handleDeleteFile,
  multiple = false,
  pdfFile = "",
}) => {


  return (
    <Container maxW="100%" maxH="100%" p={0}>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="#fafafb"
        borderRadius="10px"
        margin={0}
        cursor="pointer"
        className="dropZoneImages"
      >

        {fileUrlsArrayObject?.length > 0 &&
          fileUrlsArrayObject.map((item) => (
            <div className={Styles?.assetContainer} key={item?.fileUrl}>
              <FileIcon fileName={item?.fileName} />
              <i
                onClick={() => handleDeleteFile(item?.fileUrl)}
                className={`fas fa-xmark ${Styles?.crossButton}`}
              ></i>
            </div>
          ))}

        {fileUrls?.filter((url) => url?.trim() !== "")?.length > 0 ? (
          fileUrls.map((item, index) => {
            if (typeof item === "string" && item.trim() !== "") {
              const cleanUrl = item.split("?")[0];
    const fileExt = cleanUrl.split(".").pop().toLowerCase();
              if (validProfileExtension.includes(fileExt)) {

                return (
                  <div className={Styles?.assetContainer} key={index}>
                    <Image
                      className={Styles?.filePreviewer}
                      w={30}
                      src={item}
                      alt={item}
                    />
                    <i
                      onClick={() => handleDeleteFile(item)}
                      className={`fas fa-xmark ${Styles?.crossButton}`}
                    ></i>
                  </div>
                );
              } else if (videoValidation.includes(fileExt)) {

                return (
                  <div className={Styles?.assetContainer} key={index}>
                    <video
                      className={Styles?.filePreviewer}
                      width="100%"
                      controls
                    >
                      <source src={item} type={`video/${fileExt}`} />
                      Your browser does not support the video tag.
                    </video>
                    <i
                      onClick={() => handleDeleteFile(item)}
                      className={`fas fa-xmark ${Styles?.crossButton}`}
                    ></i>
                  </div>
                );
              }
            }
            return null;
          })
        ) : (
          // Fallback if no valid fileUrls
          <Box className={Styles?.uploadDiv} flex="1">
            <i className="fas fa-plus"></i>
            <input
              type="file"
              accept={accept}
              multiple={multiple}
              name={name}
              onChange={handleChangeUploader}
              className={Styles?.inputCertificates}
            />
          </Box>
        )}

        {/* Render multiple upload option */}
        {multiple && (
          <Box className={Styles?.uploadDiv} flex="1">
            <i className="fas fa-plus"></i>
            <input
              type="file"
              accept={accept}
              multiple={multiple}
              name={name}
              onChange={handleChangeUploader}
              className={Styles?.inputCertificates}
            />
          </Box>
        )}

        {/* Render PDF file if present */}
        {!!pdfFile && (
          <iframe
            src={pdfFile}
            width="100%"
            height="100%"
            title="PDF Viewer"
            style={{ border: "none" }}
          ></iframe>
        )}
      </Box>
    </Container>
  );
};

export default memo(ThumbnailUploader);
