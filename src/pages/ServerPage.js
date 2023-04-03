import React, { useEffect, useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useColorModeValue,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Center,
} from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import CreateDuelForm from "../components/manager/createDuelForm";
import WaitingDuelsTable from "../components/manager/waitingDuelsTable";
import OngoingDuelsTable from "../components/manager/ongoingDuelsTable";
import FinishedDuelsTable from "../components/manager/finishedDuelsTable";
import DuelCounter from "../components/manager/duelCounter";
import Database, { getUID } from "../data";
import { useNavigate } from "react-router-dom";

const TabContainer = ({ duels, setRefresh }) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [index, setIndex] = useState(0);

  return (
    <Tabs
      variant="line"
      borderColor={borderColor}
      width="41em"
      index={index}
      onChange={(index) => setIndex(index)}
      colorScheme="primary"
    >
      <TabList>
        <Flex width="100%">
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Available Duels
          </Tab>
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Ongoing Duels
          </Tab>
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Past Duels
          </Tab>
        </Flex>
      </TabList>

      <TabPanels border="none">
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <WaitingDuelsTable duels={duels} setRefresh={setRefresh} />
          </Center>
        </TabPanel>
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <OngoingDuelsTable duels={duels} setRefresh={setRefresh} />
          </Center>
        </TabPanel>
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <FinishedDuelsTable duels={duels} setRefres={setRefresh} />
          </Center>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const InADuelAlert = ({ duelLink }) => {
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);
  const backgroundColor = useColorModeValue("#ffa987", "");

  return (
    <Alert
      width={["19em", "25em", "45em", "60em", "72em"]}
      height={[null, null, "3em", "4em"]}
      status="warning"
      variant="left-accent"
      backgroundColor={backgroundColor}
    >
      <AlertIcon />
      <AlertTitle>You are currently in a duel!</AlertTitle>
      <Button
        variant="solid"
        colorScheme="primary"
        isLoading={navigating}
        ml={5}
        transform={[null, "scale(0.9)", null, "none"]}
        onClick={() => {
          setNavigating(true);
          window.location.href = duelLink;
        }}
      >
        Return
      </Button>
    </Alert>
  );
};

const ServerPage = () => {
  const [inADuel, setInADuel] = useState(false);
  const [currentDuelLink, setCurrentDuelLink] = useState();
  const [duels, setDuels] = useState([]);
  const [duelCount, setDuelCount] = useState({active: 0, ongoing: 0, waiting: 0, initialized: 0});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const checkIfInDuel = async () => {
      let res = await Database.checkIfUserInDuel();
      if (res?.currentDuels?.length) {
        setInADuel(true);
        setCurrentDuelLink(res.currentDuels[0]);
      } else {
        setInADuel(false);
      }
    }
    const getDuels = async () => {
      let duels = await Database.getDuels();
      let duelCounterInfoUpdate = {active: 0, ongoing: 0, waiting: 0, initialized: 0};
      if (duels?.length) {
        setDuels(duels);
        duelCounterInfoUpdate.active = duels.filter(duel => duel.status !== "FINISHED" && duel.status !== "ABORTED").length;
        duelCounterInfoUpdate.waiting = duels.filter(duel => duel.status === "WAITING").length;
        duelCounterInfoUpdate.initialized = duels.filter(duel => duel.status === "INITIALIZED").length;
        duelCounterInfoUpdate.ongoing = duels.filter(duel => duel.status === "ONGOING").length;
      }
      setDuelCount(duelCounterInfoUpdate);
    };
    if (refresh) {
      checkIfInDuel();
      getDuels();
      setRefresh(false);
    }
  }, [inADuel, refresh]);

  return (
    <BaseLayout
      content={
        <Flex
          justify="space-between"
          gap={[0, null, null, null, 0]}
          flexWrap="wrap"
        >
          {inADuel ? (
            <Box mx="auto" mt={2} mb={3}>
              <InADuelAlert duelLink={currentDuelLink} />
            </Box>
          ) : (
            ""
          )}
          <Box>
            <TabContainer duels={duels} setRefresh={setRefresh}/>
          </Box>
          <Box>
            <CreateDuelForm />
            <Box mt="1em">
              <DuelCounter duelCount={duelCount} />
            </Box>
          </Box>
        </Flex>
      }
    />
  );
};

export default ServerPage;