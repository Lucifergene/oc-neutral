import {
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
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";
import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { Bullseye } from "@patternfly/react-core";

export default function ConfigList() {
  const user = "avika";
  const [loading, setLoading] = useState(true);

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
        console.log("!!!!!Getting all ToDos: ", configs.current);
      }
      setLoading(false);
    };
    fetchConfigs();
  }, []);

  const fixDate = (date) => {
    const foo: Date = new Date(date.toDate());
    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return foo.toLocaleDateString("en-US", options);
  };

  const handleClick = (config: any) => {
    console.log("clicked: ", config);
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
    <div style={{ height: "100vh" }}>
      {" "}
      <Title headingLevel="h1">Your Kubernetes Configurations</Title>
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
                      variant="secondary"
                      onClick={() => {
                        handleClick({
                          name: config.name,
                          displayName: config.displayName,
                          createdAt: config.createdAt,
                          configURL: config.configURL,
                        });
                      }}
                    >
                      Connect
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
