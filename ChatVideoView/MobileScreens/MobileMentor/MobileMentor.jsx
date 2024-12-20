import { Box, Image, Text, Spinner, VStack, Center, Skeleton, Avatar, HStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { CallAPI } from '../../../../middleware/api';
import endpoints from '../../../../middleware/endpoint';
import { toastError } from '../../../../util_helper';
import { IBotIflowContext } from '../../../../Context/iBotIflowContext';
import { TecButton } from '../../../elements/elements';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const MobileMentor = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMentors = async () => {
        setLoading(true);
        try {
            const res = await CallAPI(endpoints?.fetchByRole, {
                fetch: 'business',
                role: 'mentor',
            });
            if (res?.status?.code === 200) {
                const updatedMentors = res?.data?.map((items) => ({
                    ...items,
                    name: `${items?.first_name || ''} ${items?.last_name || ''}`,
                }));
                setError(false);
                setMentors(updatedMentors || []);
            } else {
                setError(true);
                setMentors([]);
            }
        } catch (error) {
            console.error('Error fetching mentors:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);



    const { setFlowVideos, flowVideos } = useContext(IBotIflowContext);


    const handleSendData = async (item,founded) => {
        setLoading(true);

       
        if (!!!founded) {
            let newItem = {
                fullData: { item },
                ...item,
                type: 'mentors',
            };

            await setFlowVideos((prev) => {
                return { ...prev, buckListItems: [...prev.buckListItems, newItem] };
            });
        }

        setLoading(false);
    };

    const handleRemoveItem = async (item) => {
        setLoading(true);
        const updatedBucketlistItem = flowVideos?.buckListItems?.filter(
            (course) => course?.id !== item?.id
        );
        await setFlowVideos((prev) => {
            return { ...prev, buckListItems: updatedBucketlistItem };
        });
        setLoading(false);
    };

    return (
        <Box
            bg="gray.50"
            boxShadow="md"
            borderRadius="lg"
            p={4}
            minHeight="50vh"
            maxHeight="70vh"
            overflowY="auto"
        >
            {loading ? (
                <Center h="full">
                    <VStack spacing={4} w="100%">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} width="100%" h="100px" />
                        ))}
                    </VStack>
                </Center>
            ) : error ? (
                <Center h="full">
                    <Text color="red.500" fontWeight="bold">
                        Failed to load mentors.
                    </Text>
                </Center>
            ) : mentors.length === 0 ? (
                <Center h="full">
                    <Text>No mentors available.</Text>
                </Center>
            ) : (
                <VStack spacing={4} align="stretch">
                    {mentors.map((mentor) => {
                        const founded = flowVideos?.buckListItems?.find(
                            (items) => items?.id === mentor?.id
                        );
                        return <Box
                            key={mentor.id}
                            bg="white"

                            borderRadius="md"
                            p={4}
                            display="flex"
                            alignItems="center"
                            gap={4}
                            boxShadow={founded ? "0 0 0 2px #805AD5" : "0 0 0 2px transparent"}
                            transition="box-shadow 0.5s ease"
                            onClick={() => founded ? handleRemoveItem(mentor) : handleSendData(mentor,founded)}

                        >


                            {!!mentor?.profile_url ? <Image
                                src={mentor.profile_url || 'https://via.placeholder.com/50'}
                                alt={mentor.name}
                                boxSize="50px"
                                borderRadius="full"
                                objectFit="cover"
                            /> :
                                <Avatar name={mentor.name} src={mentor.avatar} boxSize={'50px'} />
                            }
                            <Box width={'full'}>
                                <Text fontWeight="bold" fontSize="lg">
                                    {mentor.name}
                                </Text>
                                <HStack justifyContent={'space-between'} alignItems={'center'}>
                                    <Text fontSize="sm" color="gray.600">
                                        {mentor.roles}
                                    </Text>
                                    <TecButton
                                       
                                        onClick={() => {
                                            if (founded) {
                                                handleRemoveItem(item);
                                            } else {
                                                handleSendData(item);
                                            }
                                        }}
                                        icon={founded ? <DeleteIcon /> : <AddIcon />}
                                        loading={loading}
                                        styling={{
                                            fontWeight: 'bold',
                                            fontSize: '0.875rem',
                                            colorScheme: 'purple',
                                            variant: 'solid',
                                            borderRadius: '50%',
                                            borderColor: founded ? 'transparent' : '#8A0EE5',
                                            backgroundColor: founded ? '#8A0EE5' : 'white',
                                            color: founded ? 'white' : '#8A0EE5',
                                            padding: '0.2rem',
                                            transition: 'background-color 0.2s ease, color 0.2s ease',
                                            _hover: {
                                                backgroundColor: '#8A0EE5',
                                                color: 'white',
                                                boxShadow: '0 6px 16px rgba(138, 14, 229, 0.5)',
                                            },
                                            _active: {
                                                transform: 'scale(0.98)',
                                                boxShadow: '0 3px 8px rgba(138, 14, 229, 0.3)',
                                            },
                                        }}
                                    />

                                </HStack>
                            </Box>

                        </Box>
                    })}
                </VStack>
            )}
        </Box>
    );
};

export default MobileMentor;
