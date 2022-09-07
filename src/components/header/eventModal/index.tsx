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
  Text,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";

import styles from "./styles.module.css";
import dayjs from "dayjs";
import GlobalContext from "../../context/globalContext";

const EventModal = ({
  children,
  variant,
  selectedEvent,
}: {
  children?: React.ReactNode;
  variant?: "add";
  selectedEvent?: any;
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
      createdAt: selectedEvent
        ? selectedEvent.createdAt
        : dayjs().format("DD.MM.YYYY HH:mm"),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
  }

  function handleOpen() {
    onOpen();
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      selectedEvent.description && setDescription(selectedEvent.description);
      setDate(selectedEvent.date);
      selectedEvent.beginTime && setBeginTime(selectedEvent.beginTime);
    }
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
          onClick={handleOpen}
        >
          <AddIcon />
        </Button>
      ) : (
        <div onClick={handleOpen}>{children}</div>
      )}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>
              {selectedEvent ? `Edit idea item` : `Add new idea item`}
            </Text>
            {selectedEvent && (
              <Text fontWeight="normal" fontSize="14px" color="gray.600">
                Created at: {selectedEvent.createdAt}
              </Text>
            )}
          </ModalHeader>

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
                  value={title}
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
                  value={description}
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
                    value={beginTime}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              {selectedEvent && (
                <Button
                  onClick={() => {
                    dispatchCalEvent({
                      type: "delete",
                      payload: selectedEvent,
                    });
                    handleClose();
                  }}
                  colorScheme="red"
                  mr={3}
                >
                  <DeleteIcon />
                </Button>
              )}
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
                onClick={handleSubmit}
                isDisabled={title.length === 0 || date.length === 0}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;
