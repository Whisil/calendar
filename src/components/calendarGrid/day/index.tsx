import { Button, Flex, GridItem, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../../context/globalContext";

interface DayProps {
  day: any;
  variant?: "picker";
  onClick?(): void;
  selected?: boolean;
}

const Day = ({ day, variant, onClick, selected }: DayProps) => {
  const { monthIndex, datePickerMonth } = useContext(GlobalContext);
  
  return (
    <GridItem
      h={variant === "picker" ? "10" : "48"}
      borderBottom={variant !== "picker" ? "1px" : 0}
      borderRight={variant !== "picker" ? "1px" : 0}
      borderColor="gray.200"
      borderRadius={variant !== "picker" ? 0 : "md"}
      p={variant !== "picker" ? "2" : 0}
      color={
        dayjs(
          new Date(
            dayjs().year(),
            variant === "picker" && datePickerMonth
              ? datePickerMonth
              : monthIndex
          )
        ).format("MMMM YYYY") === day.format("MMMM YYYY")
          ? "black"
          : "blackAlpha.400"
      }
      bgColor={
        day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
          ? "rgb(72, 187, 120, 0.3)"
          : "transparent"
      }
      transition="color .2s ease"
    >
      {variant !== "picker" ? (
        <Flex justify={variant !== "picker" ? "space-between" : "center"}>
          <Text fontWeight="bold" fontSize="14px">
            {day.format("D")}
          </Text>

          <Text fontWeight="bold" fontSize="14px">
            {day.format("dd")}
          </Text>
        </Flex>
      ) : (
        <Button
          size="sm"
          w="100%"
          h="100%"
          variant="ghost"
          onClick={onClick}
          isActive={selected}
        >
          <Text fontWeight="bold" fontSize="14px">
            {day.format("D")}
          </Text>
        </Button>
      )}
    </GridItem>
  );
};

export default Day;
