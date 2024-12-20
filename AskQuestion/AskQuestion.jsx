import { Input, Text } from "@chakra-ui/react"
import { TecButton, TecInput } from "../elements/elements"
import styles from "./AskQuestion.module.css"
import { useEffect, useState } from "react"
import { CallAPI, CallAPI_AI } from "../../middleware/api"
import endpoints from "../../middleware/endpoint"
import axios from "axios"
import { getUserData } from "../../middleware/auth"
import NoDataFound from "../NoDataFound/NoDataFound"

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react";

export const AskQuestion = (props) => {
    const { selectedVideoDetails = {} } = props;
    const { course_video = "", uuid = "" } = selectedVideoDetails;
    const [question, setQuestion] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const currentUser = getUserData()?.userdata || ""
    const { first_name = "", last_name = "" } = currentUser;
    const [questionList, setQuestionList] = useState([]);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!!question) {
                //submit
                const splitUrl = course_video.split("/");
                const fileName = splitUrl[splitUrl.length - 1]
                setLoading(true)
                const response = await axios.post(endpoints?.askQuestionAPI,
                    {
                        "service": "video_question_answer",
                        "body": {
                            "url": `videos/${fileName}`,
                            "question": `${question}`
                        }
                    }
                )
                const { data } = response;
                const { status = true, answer = "", timestamp = null } = data;
                if (!!status) {
                    const response = await CallAPI(endpoints?.saveUserAnswers,
                        {
                            user_id: currentUser?.id,
                            username: `${first_name} ${last_name}`,
                            question: question,
                            answer: answer,
                            course_video_id: selectedVideoDetails?.id
                        }
                    )
                    const { status, data = {} } = response;
                    if (status.code === 200) {
                        setQuestionList((prev) => {
                            return [data, ...prev]
                        })
                    } else {

                    }
                    setLoading(false)
                    setQuestion("")
                    return;
                }
                setError(answer);
                setLoading(false)

            }
        } catch (error) {
            console.error(error);
        }
    }


    const fetchQuestionList = async () => {
        try {
            if (selectedVideoDetails?.id && currentUser?.id) {
                const response = await CallAPI(endpoints?.fetchUserQuestion, { user_id: currentUser?.id, courseVideoId: selectedVideoDetails?.id });
                const { status, data = [] } = response;
                if (status.code === 200) {
                    setQuestionList(data)
                }
                console.error("Questions not fetched!");
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchQuestionList();
    }, [selectedVideoDetails])

    useEffect(() => {
        if (!!error) {
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }, [error])
    return (
        <div className={styles?.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles?.header}>
                    <h5>Ask Question</h5>
                </div>
                <div className={styles?.body}>
                    <div className={styles?.inputContainer} >
                        <Input
                            value={question}
                            placeHolder="Example : What is react ?"
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <TecButton title="Ask" disabled={!!!question} loading={loading} className="tecPrimaryButton" type='submit' />
                    </div>

                    {!!error && <Text className={`${styles?.questionError} fadeElement`} >
                        {error}
                    </Text>
                    }
                </div>
                <div className={styles?.questionList}>
                    <Accordion defaultIndex={[0]} allowToggle width={'100%'} mt={4}>
                        {questionList?.length === 0 ? <NoDataFound title="No questions asked yet!" /> :
                            questionList?.map((question, index) => {
                                const { answer } = question;
                                const reverseIndex = questionList?.length - 1 - index;
                                return <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" textTransform={'capitalize'}>
                                                Que No.{reverseIndex} : {question?.question}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} textAlign={"left"}>
                                        Answer : {answer}
                                    </AccordionPanel>
                                </AccordionItem>
                                //  <div className={styles?.questionContainer}>
                                //     <div className={styles?.questionHeader}>
                                //         <h6>Que No. {reverseIndex + 1} : {question?.question}</h6>
                                //         <Text><span>Answer : </span>  {answer}</Text>
                                //     </div>
                                // </div>
                            })
                        }
                    </Accordion>



                </div>
            </form>
        </div>
    )
}