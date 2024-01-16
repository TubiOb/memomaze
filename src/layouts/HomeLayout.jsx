import { CiSearch } from "react-icons/ci";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { MdAdd } from "react-icons/md";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

const HomeLayout = () => {
    // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <div className='flex-1 flex-grow flex flex-col md:flex-row gap-2 md:gap-0 w-full items-start'>
        <aside className="h-auto md:h-screen flex-grow flex flex-col bg-white left-0 items-center justify-center md:justify-start md:items-start w-full md:w-[25%] xl:w-[20%] md:border-r md:border-r-neutral-200 shadow-md py-3 px-2">
            <div className="flex items-center w-[95%] mx-auto text-sm 2xl:text-base hover:bg-blue-300 cursor-pointer group py-1 px-1.5 rounded-lg hover:text-white gap-2">
                <MdAdd size='20' className="p-0.5 border border-neutral-400 rounded-md group-hover:border-white group-hover:shadow-md" />
                <button className="p-1 ">New Folder</button>
            </div>
            
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
                <Tabs w='full' align="center" h='full' className="flex-grow"  variant="unstyled">
                    <TabList display='flex' alignItems='center' gap={['7', '32']} cursor='pointer'>
                        <Tab>All</Tab>
                        <Tab>Notes</Tab>
                        <Tab>Tasks</Tab>
                    </TabList>
                    <TabIndicator mt="-1.5px" height="2px" bg="blue.200" borderRadius="1px"/>
                    <TabPanels h={['79.5vh', '90vh', '85vh', '81.5vh']} w='full' p='1' className="overflow-y-auto" overflowY='auto'>
                        <TabPanel className="flex-grow items-center w-full" h='screen' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                        </TabPanel>
                        <TabPanel className="flex-grow items-center w-full" h='screen' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                        </TabPanel>
                        <TabPanel className="flex-grow items-center w-full" h='screen' gap='2' flexWrap='wrap' display='flex' justifyContent='start' flexGrow='grow'>
                             <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                            <div className="w-32 md:w-48 max-h-56 overflow-hidden border border-neutral-400">
                                <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                                is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                                Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                                attack by Bowser.
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            {/* <Box className='md:w-[15%]'>
                {buttonSize === 'md' ? (
                    <MdAdd size='25' className="p-1 border border-neutral-200 rounded-md hover:border-neutral-300 hover:shadow-md" />
                ) : (
                    <Button leftIcon={<MdAdd size='18' />} colorScheme='blue' variant='outline' rounded='3xl' mx='auto'>
                    Add Note
                    </Button>
                )}
            </Box> */}
        </div>
    </div>
  )
}

export default HomeLayout