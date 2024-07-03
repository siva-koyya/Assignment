import React, { useState } from "react"
import { Button } from "@chakra-ui/button"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Input,FormLabel,FormControl } from "@chakra-ui/react"
  import { useDisclosure } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { Form } from "react-router-dom"
import HookForm from "./Form"


function ActiveModal({Details}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    let [data,setData]=useState(Details)
    return (
      <>
        <Button colorScheme='purple' onClick={onOpen}>
            <FontAwesomeIcon icon={faEllipsis} ></FontAwesomeIcon>
        </Button>
        <Modal
           
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Sale</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
             
             <HookForm Sku={Details}/>

            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme='blue' mr={3} >
                Save
              </Button> */}
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default ActiveModal