import { useEffect, useState } from "react";
import styles from "./Certificate.module.css"
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { getID } from "../../siteConfig";
import { toastError } from "../../util_helper";
import CertificateCard from "../CertificateCard/CertificateCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { ShimmerPostList } from "react-shimmer-effects";


const CertificateList = () => {

    const [loading, setLoading] = useState(true);
    const [certificateList, setCertificateList] = useState([]);
    const userId = getID('userId');

    const fetchCourseList = () => {
        try {
            CallAPI(endpoints?.getAllCertificates, { user_id: userId })
                .then((res) => {
                    setLoading(false)
                    if (res?.status?.code === 200) {
                        const filterCertificate = res?.data?.filter((items) => !!items?.courseDetails?.sections);
                        setCertificateList(filterCertificate || [])
                        return
                    }
                    toastError("Something went wrong!")
                })
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchCourseList();
    }, [])


    return <div className={`${styles?.certificateWrapper} padding-3`}>
        <div className={`row ${styles?.cardContainer} marginLeftRight-2`}>
            {loading ?

                <ShimmerPostList
                    postStyle="STYLE_FOUR"
                    col={4}
                    row={1}
                    gap={30}
                />
                : certificateList.length === 0 ? <NoDataFound title="No certificates yet!" className="marginTop-5" /> : certificateList.map((value, index) => {
                    const { courseDetails } = value;
                    const videosTotalProgress = [];
                    const videoCurrentProgress = [];
                    //getting video length & progress length
                    if (!!courseDetails?.sections) {
                        const { sections } = courseDetails;
                        sections.map((secItems) => {
                            if (secItems?.courseSubSections) {
                                secItems?.courseSubSections.map((subSecItems) => {
                                    videosTotalProgress.push(subSecItems?.video_length);
                                    videoCurrentProgress.push(subSecItems?.progressData?.video_progress || "0")
                                })
                            }
                        })
                        //calculating video progress
                        let videoProgress = videoCurrentProgress.map(Number);
                        let videoProgressSum = videoProgress.reduce((acc, num) => acc + num, 0);

                        //calculating total video progress 
                        let totalVideoProgress = videosTotalProgress.map(Number);
                        let totalVideoProgressSum = totalVideoProgress.reduce((acc, num) => acc + num, 0);

                        return <CertificateCard
                            key={index}
                            certificateDetails={value}
                            totalVideoLength={totalVideoProgressSum}
                        />
                    }

                })}
        </div>
    </div>

}

export default CertificateList;