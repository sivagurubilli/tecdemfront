import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Icon, Text, Image } from '@chakra-ui/react';
import { BOT_ICON, COURSE_ICON, DASHBOARD_ICON2, DASHBOARD_ACTIVE, SUPPORT_ICON_ACTIVE, SUPPORT_ICON, BOT_ICON_ACTIVE, COURSE_ICON_ACTIVE, BUCKETLIST, BUCKETLIST_ACTIVE, METAVERSE_ICON } from '../Config';
import { fetchPaths, scrollTop } from '../../util_helper';
import { useSelector } from 'react-redux';

const BottomMenu = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const user = useSelector((store) => store?.user?.user || {});
    const usertypes = user?.roles || '';
    const { menus = [] } = useSelector((store) => store?.user || {});
    const menuPaths = fetchPaths(menus);

    let filteredMenus;
  
    if (usertypes === 'admin') {
        
        filteredMenus = menus.filter(
            (menu) => menuPaths.includes(menu.path) && menu.isSideMenu && menu.isAdminMenu
        );
    } else {

        filteredMenus = menus.filter(
            (menu) => menuPaths.includes(menu.path) && menu.isSideMenu
        );
    }


    return (
        <Box
            width={'100vw'}
            height={'100%'}
            bg="white"
            py={'5px'}
            display={'flex'}
            alignItems={'flex-start'}
            borderTopRadius={'20px'}
            borderTop="1px solid #e0e0e0"
            zIndex="1000"
            boxShadow="0 -2px 5px rgba(0, 0, 0, 0.1)"
            overflow={'hidden'}
        >
            <Flex align="center" w="100%" gap={'0px'} py={2} overflowX={'auto'}
                css={{

                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    '&': {
                        scrollbarWidth: 'none',
                    },
                }}
            >

                {
                    filteredMenus?.length > 0 && filteredMenus?.map((menu, index) => {
                        const iconClassName = menu?.className;
                        return <Flex
                            key={index}
                            direction="column"
                            align="center"
                            justify="center"
                            flex="1"


                            onClick={() => {
                                navigate(menu.path);
                                scrollTop();
                            }}
                            cursor={'pointer'}
                            opacity={1} >

                            <Box width={'80px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <span
                                    className={` ${iconClassName}`}
                                    dangerouslySetInnerHTML={{
                                        __html: `${pathname === menu.path
                                            ? menu?.classNameOfIconActive
                                            : menu?.classNameOfIcon
                                            }`,
                                    }}
                                />
                                <Text fontSize="xs" color={pathname === menu.path ? 'purple.500' : 'gray.600'} fontWeight={600}>
                                    {menu.name}
                                </Text>
                            </Box>

                        </Flex>
                    })}
            </Flex>
        </Box>
    );
};

export default BottomMenu;
