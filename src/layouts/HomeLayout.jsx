import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { MdAdd } from "react-icons/md";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import Blank from '../assets/No Item.png'
import { PiSmileyDuotone } from "react-icons/pi";
import CustomModal from "../components/CustomModal";

const HomeLayout = () => {
    // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      console.log("What's on your mind?");
      setIsModalOpen(true);
    }
  
    const closeModal = () => {
      setIsModalOpen(false);
    }

  return (
    <div className='flex-1 h-full static flex-grow flex flex-col md:flex-row gap-2 md:gap-0 w-full items-start'>
        <aside className="h-auto md:h-screen flex-grow flex flex-col bg-white left-0 items-center justify-center md:justify-start md:items-start w-full md:w-[25%] xl:w-[20%] md:border-r md:border-r-neutral-200 shadow-md py-3 px-2">
            <button className="flex items-center w-[95%] mx-auto text-sm 2xl:text-base hover:bg-blue-300 cursor-pointer group py-2 px-1.5 rounded-lg hover:text-white gap-2" onClick={openModal}>
                <MdAdd size='20' className="p-0.5 border border-neutral-400 rounded-md group-hover:border-white group-hover:shadow-md" />
                New Folder
                {/* <button className="p-1 ">New Folder</button> */}
            </button>
            
        </aside>

        <div className="w-full h-screen flex flex-col items-start gap-1">
            <div className="w-full sticky flex border-b border-b-neutral-200 px-2 py-2 items-start justify-center">
                <Box className='w-full md:w-[60%] lg:w-[45%] xl:w-[70%]'>
                    <InputGroup className='w-[90%] lg:w-[80%] mx-auto'>
                        <InputLeftElement py='0.5'>
                        <CiSearch />
                        </InputLeftElement>
                        <Input type='text' placeholder='Search Memomaze' className='text-xs md:text-sm 2xl:text-base focus-within:border-neutral-200' focusBorderColor='#d3d3d3' _placeholder={{ fontSize: 'sm', fontWeight: 'thin' }} />
                    </InputGroup>
                </Box>
            </div>
            

            <Box w='full' display='flex' alignContent='center' justifyContent='center' h='screen'>
                <Tabs variant='soft-rounded' colorScheme='blue' p='1' w='full' align="center" h='full' className="flex-grow" isLazy>
                    <TabList display='flex' alignItems='center' gap={['7', '32']} cursor='pointer'>
                        <Tab>All</Tab>
                        <Tab>Notes</Tab>
                        <Tab>Tasks</Tab>
                    </TabList>
                    <TabPanels h={['79.5vh', '90vh', '85vh', '81.5vh']} w='full' p='1' className="overflow-y-auto" overflowY='auto'>
                        <TabPanel className="flex-grow items-center w-full" h='full' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                                <PiSmileyDuotone size='150' opacity='60%' />
                                <p className=" font-medium tracking-wide">Create a Task/Note to get started.</p>
                             </div>
                        </TabPanel>
                        <TabPanel className="flex-grow items-center w-full" h='full' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                                <PiSmileyDuotone size='150' opacity='60%' />
                                <p className=" font-medium tracking-wide">Create a Note to get started.</p>
                             </div>
                        </TabPanel>
                        <TabPanel className="flex-grow items-center w-full" h='full' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="flex flex-col items-center justify-center w-full flex-grow flex-1 h-full">
                                <PiSmileyDuotone size='150' opacity='60%' />
                                <p className=" font-medium tracking-wide">Create a Task to get started.</p>
                             </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </div>

        <CustomModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default HomeLayout