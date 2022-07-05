import {
  Alert,
  Button,
  Spinner,
  Title,
} from "@patternfly/react-core/dist/esm/components";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@patternfly/react-table";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { Bullseye } from "@patternfly/react-core";
import { fixDate } from "src/utils/helpers";

export default function ConfigList({ currentUser }) {
  // const user = "avika";
  const user = currentUser.email.split("@")[0];
  const [loading, setLoading] = useState(true);
  const connectBtnRef = useRef<any>();
  const [toggleConnected, setToggleConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const errorRef = useRef<any>();
  // const [selectedConfig, setSelectedConfig] = useState<string>("");
  const [resStatus, setResStatus] = useState("");

  const configs = useRef<any>([]);

  useEffect(() => {
    const fetchConfigs = async () => {
      setLoading(true);
      const recordRef = collection(firestore, "kubeconfig_mapping");
      const q = query(recordRef, where("user", "==", user));
      const querySnapshot = await getDocs(q);
      console.log("snap: ", querySnapshot);
      if (querySnapshot.docs.length > 0) {
        configs.current = querySnapshot.docs[0].data().configs;
        console.log("dfsdf: ", querySnapshot.docs[0].data().configs);
        console.log("!!!!!Getting all Configs: ", configs.current);
      }
      setLoading(false);
    };
    fetchConfigs();
    console.log("!!!!!!!!!!!!!s: ", toggleConnected, error);
  }, [error]);

  const updateConnectedStatus = async (status, config) => {
    const recordRef = collection(firestore, "kubeconfig_mapping");
    const q = query(recordRef, where("user", "==", user));
    const querySnapshot = await getDocs(q);

    if (status === "disconnect") {
      if (querySnapshot.docs.length > 0) {
        const docRef = doc(recordRef, querySnapshot.docs[0].id);
        console.log(docRef);
        await updateDoc(docRef, {
          configs: [
            ...querySnapshot.docs[0]
              .data()
              .configs.filter((e) => e.name !== config.name),
            {
              ...config,
              connected: false,
            },
          ],
        });
      }
    } else {
      if (querySnapshot.docs.length > 0) {
        const docRef = doc(recordRef, querySnapshot.docs[0].id);
        console.log(docRef);
        await updateDoc(docRef, {
          configs: [
            ...querySnapshot.docs[0]
              .data()
              .configs.filter((e) => e.name !== config.name),
            {
              ...config,
              connected: true,
            },
          ],
        });
      }
    }
    console.log("Successfully Updated");
  };

  const handleConnect = async (config: any) => {
    setLoading(true);
    const updatedConfig = {
      ...config,
      updatedAt: fixDate(config.updatedAt),
      user: user,
    };
    console.log("clicked: ", updatedConfig);

    await fetch("http://localhost:9001/test-connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(updatedConfig),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        console.log("Ref: ", connectBtnRef);
        setResStatus(data.status);
        if (data.status !== "OK") {
          setError(data.status);
          // errorRef.current = data.status;
        }
        setToggleConnected(true);
        // setSelectedConfig(config.name);
        console.log("Starting to Update");
        updateConnectedStatus("connect", config);
      })
      .catch((err) => {
        console.log("err: ", err);
        setError(err);
      });
    setLoading(false);
    console.log("Completed");
    //   await axios
    //     .post(
    //       "http://localhost:9001/test-connect",
    //       updatedConfig,
    //       {headers}
    //     )
    //     .then((res) => {
    //       console.log("res: ", res);
    //       console.log("Ref: ", connectBtnRef);
    //       connectBtnRef.current.childNodes[0].textContent = "Connected";
    //     })
    //     .catch((err) => {
    //       console.log("err: ", err);
    //     });
  };

  const handleDisconnect = async (config: any) => {
    setLoading(true);
    const updatedConfig = {
      ...config,
      updatedAt: fixDate(config.updatedAt),
      user: user,
    };
    console.log("clicked: ", updatedConfig);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    await fetch("http://localhost:9001/disconnect-cluster", {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(updatedConfig),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("disconnect: ", data.status);
        updateConnectedStatus("disconnect", config);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const emptyListStyle = {
    margin: "15.3em 0 15.5em 0",
  };

  const columnNames = {
    name: "Name",
    displayName: "Display Name",
    status: "Status",
    updatedAt: "Updated At",
    configURL: "",
  };
  console.log("configurations: ", configs.current);
  return (
    <div>
      {" "}
      <Title headingLevel="h1">Your Kubernetes Configurations</Title>
      <br />
      {resStatus && (
        <Alert
          variant={resStatus === "OK" ? "success" : "danger"}
          title={
            resStatus === "OK"
              ? "Cluster Successfully Connected"
              : "Unexpected Error. Please Try Again"
          }
        />
      )}
      {loading && (
        <Alert
          variant="warning"
          title="Loading Configurations. Please wait..."
        />
      )}
      <br />
      <div>
        {loading ? (
          <div>
            <Bullseye>
              <Spinner isSVG diameter="80px" />
            </Bullseye>
          </div>
        ) : (
          <TableComposable
            aria-label="Simple table"
            variant="compact"
            borders={true}
          >
            <Thead>
              <Tr>
                <Th>{columnNames.name}</Th>
                <Th>{columnNames.displayName}</Th>
                <Th>{columnNames.updatedAt}</Th>
                <Th>{columnNames.configURL}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {configs.current.map((config, key: number) => (
                <Tr key={key}>
                  <Td dataLabel={columnNames.name}>{config.name}</Td>
                  <Td dataLabel={columnNames.displayName}>
                    {config.displayName}
                  </Td>
                  <Td dataLabel={columnNames.updatedAt}>
                    {fixDate(config.updatedAt)}
                  </Td>
                  <Td>
                    <Button
                      ref={connectBtnRef}
                      variant={"secondary"}
                      onClick={() => {
                        handleConnect(config);
                      }}
                      isDisabled={config.connected || toggleConnected}
                    >
                      {"Connect"}
                    </Button>{" "}
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        handleDisconnect(config);
                      }}
                      isDisabled={!config.connected}
                    >
                      Disconnect
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        )}
      </div>
    </div>
  );
}
