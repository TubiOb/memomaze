import { CiSearch } from "react-icons/ci";
import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { MdAdd } from "react-icons/md";

const HomeLayout = () => {
    // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-0 w-full h-screen items-start'>
        <aside className="h-20 md:h-screen flex flex-col items-center md:items-start w-full md:w-[15%] md:border-r md:border-r-neutral-200 shadow-md py-3 px-2">
            <div className="flex items-center w-[95%] mx-auto text-sm hover:bg-blue-300 cursor-pointer group py-1 px-1.5 rounded-lg hover:text-white gap-2">
                <MdAdd size='20' className="p-0.5 border border-neutral-400 rounded-md group-hover:border-white group-hover:shadow-md" />
                <button className="p-1 ">New Folder</button>
            </div>
            
        </aside>

        <div className="w-full px-2 py-1 flex border-b border-b-neutral-200 items-center justify-center">
            <Box className='md:w-[45%]'>
                <InputGroup w='65%' className='w-[80%] mx-auto'>
                    <InputLeftElement py='0.5'>
                    <CiSearch />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search task' className='text-xs focus-within:border-neutral-200' focusBorderColor='#d3d3d3' _placeholder={{ fontSize: 'sm', fontWeight: 'thin' }} />
                </InputGroup>
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