import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Box, Text } from "@chakra-ui/react";
import { CallAPI } from "../../../middleware/api";
import endpoints from "../../../middleware/endpoint";
import { useDispatch } from "react-redux";
import { cleanAdminMenus, setAdminMenus, setMenuConfig, updateAdminMenu } from "../../../Redux/adminSlice";
import { useSelector } from "react-redux";
import { BOLoading, TecButton } from "../../elements/elements";
import ToggleButton from "../../ToggleButton/ToggleButton";
import styles from "./AdminMenus.module.css"

const AdminMenus = () => {

    const [data, setData] = useState([]); // Stores table data
    const [page, setPage] = useState(1); // Current page
    const [hasMore, setHasMore] = useState(true); // Whether more data is available
    const dispatch = useDispatch();
    const { menus = [] } = useSelector(store => store.Admin)
    const fetchData = async () => {
        try {
            const response = await CallAPI(`${endpoints?.fetchAdminMenus}?page=${page}&limit=10`);
            const menuList = response?.data;
            dispatch(setAdminMenus([...menus, ...menuList]))
            if (menuList?.length === 0) {
                setHasMore(false);
            } else {
                setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData();
        return () => {
            dispatch(cleanAdminMenus())
        }
    }, []);


    const handleToggleUser = async (activeUser, menu, toggleType) => {
        try {
            const { id } = menu;
            const response = await CallAPI(endpoints?.updateMenu, { id, [toggleType]: activeUser })
            if (response.status.code) {
                dispatch(updateAdminMenu({ ...menu, [toggleType]: activeUser }))
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditMenu = (menu) => {
        try {
            dispatch(setMenuConfig(menu))
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Box>
            {/* <Text fontSize="xl" mb={4}>Infinite Scroll Table</Text> */}

            <InfiniteScroll
                dataLength={data.length} // Number of items currently loaded
                next={fetchData} // Function to load more data
                hasMore={hasMore} // Indicates if more data is available
                loader={<BOLoading />} // Spinner shown during loading
                endMessage={
                    <Text mt={4} textAlign="center">
                        No more data to load
                    </Text>
                }
            >
                <Box className="marginLeftRight-2 marginTopBottom-1 tec-flex tec-align-center tec-horizontal-align-between">
                    {/* header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Text fontSize="lg" fontWeight="bold">Admin Menus</Text>
                    </Box>
                    <Box>
                        <TecButton
                            title="ADD NEW MENU"
                            onClick={() => dispatch(setMenuConfig({}))}
                            className="tecPrimaryButton"
                        />
                    </Box>
                </Box>
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Icons</Th>
                            <Th>Name</Th>
                            <Th>Path</Th>
                            <Th>Status</Th>
                            <Th>Side Menu</Th>
                            {/* <Th>Admin Menu</Th> */}
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {menus.map((item) => {
                            return <Tr key={item.id} className={styles?.tableRowContainer}>
                                <Td>
                                    <span
                                        // className={`${styles?.innerTitle} ${iconClassName}`}
                                        dangerouslySetInnerHTML={{
                                            __html: item?.classNameOfIconActive,
                                        }}
                                    />

                                </Td>
                                <Td>{item.name}</Td>
                                <Td >{item.path}</Td>
                                <Td >
                                    <ToggleButton
                                        selectedAll={!!item?.status}
                                        onToggle={(isTrue) => handleToggleUser(isTrue, item, 'status')}
                                        label={!!item?.status ? "Active" : "Inactive"}
                                        style={{ justifyContent: 'flex-start' }}
                                    />

                                </Td>
                                <Td >
                                    <ToggleButton
                                        selectedAll={!!item?.isSideMenu}
                                        onToggle={(isTrue) => handleToggleUser(isTrue, item, 'isSideMenu')}
                                        label={!!item?.isSideMenu ? "Active" : "Inactive"}
                                        style={{ justifyContent: 'flex-start' }}
                                    />

                                </Td>
                                {/* <Td >
                                    <ToggleButton
                                        selectedAll={!!item?.isAdminMenu}
                                        onToggle={(isTrue) => handleToggleUser(isTrue, item, 'isAdminMenu')}
                                        label={!!item?.isAdminMenu ? "Active" : "Inactive"}
                                        style={{ justifyContent: 'flex-start' }}
                                    />

                                </Td> */}
                                <Td className="tec-flex">
                                    <TecButton
                                        className="tecPrimaryButton"
                                        title='Edit'
                                        onClick={() => handleEditMenu(item)}

                                    />
                                    <TecButton
                                        className="tecDangerButton marginLeft-2"
                                        title='Delete'
                                    />
                                </Td>
                            </Tr>
                        })}
                    </Tbody>
                </Table>
            </InfiniteScroll>
        </Box>
    );
}

export default AdminMenus;

