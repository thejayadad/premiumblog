'use client'
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const SiteModal = ({header, description, button}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
     <Button color='primary' onPress={onOpen}>{button}</Button>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={'center'}>
     <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
              <ModalBody>
                {description}
              </ModalBody>
            </>
          )}
        </ModalContent>
     </Modal>
    </>
  )
}

export default SiteModal