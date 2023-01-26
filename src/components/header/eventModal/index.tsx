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
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect, useState, useRef } from 'react';

import styles from './styles.module.css';
import dayjs from 'dayjs';
import GlobalContext, { Event } from '../../../context/globalContext';

const EventModal = ({
  children,
  variant,
  selectedEvent,
}: {
  children?: React.ReactNode;
  variant?: 'add';
  selectedEvent?: Event;
}) => {
  const { dispatchCalEvent, selectedDate } = useContext(GlobalContext);

  const [title, setTitle] = useState<string>(``);
  const [description, setDescription] = useState<string>(``);
  const [date, setDate] = useState<string>(
    selectedDate || dayjs().format('YYYY-MM-DD'),
  );
  const [beginTime, setBeginTime] = useState<string>(``);
  const [requiredInputTitle, setRequiredInputTitle] = useState<boolean>(false);
  const [requiredInputDate, setRequiredInputDate] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    selectedDate && setDate(selectedDate);
  }, [selectedDate]);

  function handleClose() {
    onClose();
    setTitle(``);
    setDescription(``);
    setBeginTime(``);
    setRequiredInputTitle(false);
    setRequiredInputDate(false);
  }

  function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    handleClose();

    const calendarEvent = {
      id: selectedEvent
        ? selectedEvent.id
        : dayjs().format('DD.MM.YYYY HH:mm:ss:ms'),
      title,
      description,
      date,
      beginTime,
      createdAt: selectedEvent
        ? selectedEvent.createdAt
        : dayjs().format('DD.MM.YYYY HH:mm'),
      updatedAt:
        selectedEvent &&
        selectedEvent.createdAt &&
        dayjs().format('DD.MM.YYYY HH:mm'),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      title.trim().length !== 0 &&
      date.length !== 0
    ) {
      e.preventDefault();
      formRef!.current!.requestSubmit();
    }
  };

  return (
    <>
      {variant === 'add' ? (
        <Button
          borderRadius="100%"
          h="48px"
          w="48px"
          colorScheme="twitter"
          boxShadow="md"
          onClick={handleOpen}
          aria-label="open add event modal"
        >
          <AddIcon />
        </Button>
      ) : (
        <div onClick={handleOpen}>{children}</div>
      )}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Text>
              {selectedEvent ? `Edit idea item` : `Add new idea item`}
            </Text>
            {selectedEvent && (
              <Text fontWeight="normal" fontSize="14px" color="gray.600">
                {selectedEvent.updatedAt
                  ? `Updated at: ${selectedEvent.updatedAt}`
                  : `Created at: ${selectedEvent.createdAt}`}
              </Text>
            )}
          </ModalHeader>

          <ModalCloseButton aria-label="close modal" />
          <form onSubmit={handleSubmit} ref={formRef}>
            <ModalBody>
              <FormControl mb="8">
                <FormHelperText>Title *</FormHelperText>
                <Input
                  type="text"
                  autoComplete="off"
                  variant="unstyled"
                  borderRadius="0"
                  borderBottom="1px"
                  borderColor={requiredInputTitle ? 'crimson' : 'gray.200'}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (title.length !== 0) {
                      setRequiredInputTitle(false);
                    }
                  }}
                  onBlur={() =>
                    title.length === 0
                      ? setRequiredInputTitle(true)
                      : setRequiredInputTitle(false)
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
                  style={{ resize: 'none' }}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </FormControl>
              <Flex justify="space-between" align="flex-end">
                <FormControl w="32">
                  <FormHelperText>Date *</FormHelperText>
                  <Input
                    type="date"
                    variant="unstyled"
                    borderRadius="0"
                    borderBottom="1px"
                    className={styles.datePickerModal}
                    borderColor={requiredInputDate ? 'crimson' : 'gray.200'}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (date.length !== 0) {
                        setRequiredInputDate(false);
                      }
                    }}
                    onBlur={() =>
                      date?.length === 0
                        ? setRequiredInputDate(true)
                        : setRequiredInputDate(false)
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
                      type: 'delete',
                      payload: selectedEvent,
                    });
                    handleClose();
                  }}
                  colorScheme="red"
                  mr={3}
                  aria-label="delete event"
                >
                  <DeleteIcon />
                </Button>
              )}
              <Button
                type="submit"
                bg="#000"
                color="#fff"
                _hover={title.length !== 0 ? { bg: 'rgba(0, 0, 0, 0.8)' } : {}}
                _active={
                  title.length !== 0
                    ? {
                        bg: 'rgba(0, 0, 0, 0.6)',
                      }
                    : {}
                }
                _disabled={{
                  bg: 'rgba(0, 0, 0, 0.25)',
                  cursor: 'not-allowed',
                }}
                isDisabled={title.trim().length === 0 || date.length === 0}
                aria-label="save event"
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
