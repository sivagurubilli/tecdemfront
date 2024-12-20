import React, { useEffect, useState } from 'react'
import { CallAPI } from '../../middleware/api'
import endpoints from '../../middleware/endpoint'
import Styles from "./CoursePreview.module.css"
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { placeHolderImage } from '../Config'

const PreviewReviews = ({ course }) => {
    const [reviews, setReviews] = useState([])

    const fetchReviews = async () => {
        const response = await CallAPI(endpoints.getReviews, {
            "course_id": course.id,
        })
        console.log(response.data.data)
        setReviews(response.data.data)
    }

    useEffect(() => {
        fetchReviews()
    }, [course.id])

    return (
        <div className={Styles?.Container}>
            <Text fontWeight="700">Reviews</Text>
            <div className={Styles?.ReviewContainer}>
                {reviews.map((review) => (
                    <div key={review.id} style={{ marginBottom: '20px' }}>
                        <Flex align="center" gap="20px">
                            <Avatar
                                size='lg'
                                name={review.userDetails.name}
                                src={review.userDetails.profile_Url || placeHolderImage}
                                />
                            <Box>
                                <Text fontWeight="700">{review.userDetails.first_name + " " + review.userDetails.last_name}</Text>
                                <Text fontWeight="500">Rating: {review.stars} stars</Text>
                                <Text>{review.comment}</Text>
                            </Box>
                        </Flex>
                    </div>
                ))}
                </div>
            </div>
    )
}

export default PreviewReviews
