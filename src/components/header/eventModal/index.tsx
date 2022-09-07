import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormHelperText,
  Input,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";

import styles from "./styles.module.css";
import dayjs from "dayjs";
import GlobalContext from "../../context/globalContext";

const EventModal = ({
  children,
  variant,
}: {
  children?: React.ReactNode;
  variant?: "add";
}) => {
  const { dispatchCalEvent } = useContext(GlobalContext);

  const [title, setTitle] = useState<string>(``);
  const [description, setDescription] = useState<string>(``);
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [beginTime, setBeginTime] = useState<string>(``);
  const [requiredInput, setRequiredInput] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleClose() {
    onClose();
    setTitle(``);
    setDescription(``);
    setDate(dayjs().format("YYYY-MM-DD"));
    setBeginTime(``);
    setRequiredInput(false);
  }

  function handleSubmit(e: any) {
    handleClose();
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      date,
      beginTime,
      createdAt: dayjs().format("DD.MM.YYYY HH:mm"),
    };
    dispatchCalEvent({ type: "push", payload: calendarEvent });
  }

  return (
    <>
      {variant === "add" ? (
        <Button
          borderRadius="100%"
          h="48px"
          w="48px"
          colorScheme="twitter"
          boxShadow="xl"
          onClick={onOpen}
        >
          <AddIcon />
        </Button>
      ) : (
        <div onClick={onOpen}>{children}</div>
      )}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new idea item</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <FormControl mb="8">
                <FormHelperText>Title *</FormHelperText>
                <Input
                  type="text"
                  variant="unstyled"
                  borderRadius="0"
                  borderBottom="1px"
                  borderColor={requiredInput ? "crimson" : "gray.200"}
                  onChange={(e) => {
                    setTitle(e.target.value.trim());
                    if (title.length !== 0) {
                      setRequiredInput(false);
                    }
                  }}
                  onBlur={() =>
                    title.length === 0
                      ? setRequiredInput(true)
                      : setRequiredInput(false)
                  }
                />
              </FormControl>
              <FormControl mb="4">
                <FormHelperText>Description</FormHelperText>
                <Textarea
                  variant="unstyled"
                  borderRadius="0"
                  borderBottom="1px"
                  borderColor="gray.200"
                  minH="32"
                  style={{ resize: "none" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Flex justify="space-between" align="flex-end">
                <FormControl w="32">
                  <FormHelperText>Date</FormHelperText>
                  <Input
                    type="date"
                    variant="unstyled"
                    borderRadius="0"
                    borderBottom="1px"
                    className={styles.datePickerModal}
                    borderColor={requiredInput ? "crimson" : "gray.200"}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (date.length !== 0) {
                        setRequiredInput(false);
                      }
                    }}
                    onBlur={() =>
                      date.length === 0
                        ? setRequiredInput(true)
                        : setRequiredInput(false)
                    }
                  />
                </FormControl>
                <FormControl w="24">
                  <FormHelperText>
                    Begin
                    <br />
                    Time
                  </FormHelperText>
                  <Input
                    type="time"
                    variant="unstyled"
                    borderRadius="0"
                    borderBottom="1px"
                    borderColor="gray.200"
                    onChange={(e) => setBeginTime(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                bg="#000"
                color="#fff"
                _hover={title.length !== 0 ? { bg: "rgba(0, 0, 0, 0.8)" } : {}}
                _active={
                  title.length !== 0
                    ? {
                        bg: "rgba(0, 0, 0, 0.6)",
                      }
                    : {}
                }
                _disabled={{
                  bg: "rgba(0, 0, 0, 0.25)",
                  cursor: "not-allowed",
                }}
                mr={3}
                onClick={handleSubmit}
                isDisabled={title.length === 0 || date.length === 0}
              >
                Save
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;
