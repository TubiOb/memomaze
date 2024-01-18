import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, /* FormControl, FormLabel, Input, Textarea */ } from '@chakra-ui/react';

const CustomModal = ({ isOpen, onClose, initialRef, modalConfig, onSubmit }) => {

    const { title, formFields } = modalConfig;

    const [formData, setFormData] = useState({});

    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }))
    
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'md', 'lg']} colorScheme='teal' >
            <ModalOverlay backdropFilter='blur(5px) hue-rotate(30deg)' />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {formFields.map((field, index) => (
                            <form onSubmit={handleSubmit} key={index} className='w-[95%] md:w-[90%] mt-2 flex flex-col mx-auto justify-between gap-4'>
                                        {field.type === 'input' ? (
                                            <React.Fragment>
                                                <label className="text-xs font-medium text-gray-500 mb-1">{field.label}
                                                    <input type={field.type} id={field.id} ref={index === 0 ? initialRef : null} value={formData[field.fieldName] || ''} onChange={(e) => handleFieldChange(field.fieldName, e.target.value)} required className=" border-none bg-blue-50 w-full focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base font-normal focus:border-transparent focus:outline-none rounded-lg focus:ring-0" placeholder={field.placeholder} />
                                                </label>
                                            </React.Fragment>

                                        ) : field.type === 'select' ? (
                                            <React.Fragment>
                                                <label className="text-xs font-medium text-gray-500 mb-1">{field.label}
                                                    <select id={field.id} ref={index === 0 ? initialRef : null} onChange={(e) => handleFieldChange(field.fieldName, e.target.value)} required className="peer border-none block bg-blue-50 w-full focus:bg-blue-100 py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base font-normal focus:border-transparent focus:outline-none rounded-lg focus:ring-0">
                                                        <option disabled selected value="">
                                                            {field.placeholder}
                                                        </option>
                                                        {field.options &&
                                                            field.options.map((option, optionIndex) => (
                                                                <option key={optionIndex} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </label>
                                            </React.Fragment>

                                        ) : field.type === 'textarea' ? (
                                            <React.Fragment>
                                                <label className="text-xs font-medium text-gray-500 mb-1">{field.label}
                                                    <textarea type={field.type} id={field.id} ref={index === 0 ? initialRef : null} onChange={(e) => handleFieldChange(field.fieldName, e.target.value)} rows="10" required className="border-none bg-blue-50 w-full focus:bg-blue-100  py-2 md:py-1.5 lg:py-1 xl:py-2 px-2 xl:px-3.5 text-sm md:text-sm lg:text-base font-normal focus:border-transparent focus:outline-none rounded-lg focus:ring-0 resize-none" placeholder={field.placeholder} />
                                                </label>
                                            </React.Fragment>
                                            
                                        ) : null}
                                {/* <button type="submit" className='text-blue-400 px-2 py-2 rounded-xl w-[70%] mx-auto bg-white font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300  hover:font-semibold hover:bg-blue-400 hover:text-white hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >Sign Up</button> */}
                                
                                <ModalFooter>
                                    <Button type='submit' colorScheme='teal' mr={3}>Save</Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </form>
                        ))}
                    </ModalBody>
                </ModalContent>
        </Modal>
    </div>
  )
}

export default CustomModal