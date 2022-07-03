import {
  Button,
  Spinner,
  Title,
} from "@patternfly/react-core/dist/esm/components";
import { useEffect, useRef, useState } from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@patternfly/react-table";
import { Bullseye } from "@patternfly/react-core";

export default function Resources({ setting }) {
  const loading= useRef(true);
  const [resources, setResources] = useState<any>([]);

  useEffect(() => {
    const fetchResources = async () => {
      loading.current = true;
      fetch(setting.resourceAPIGetURL)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data: ", data);
          setResources(data);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
        loading.current = false;
    };
    fetchResources();
  }, []);

  const emptyListStyle = {
    margin: "15.3em 0 15.5em 0",
  };

  const columnNames = setting.resourceColumnNames;
  const columnsKeys = Object.keys(columnNames);
  return (
    <div style={{ height: "100vh" }}>
      {" "}
      <Title headingLevel="h1">{setting.resourcePluralName}</Title>
      <br />
      <div>
        {loading.current ? (
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
                {columnsKeys.map((columnKey, key: number) => (
                  <Th key={key}>{columnNames[columnKey]}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {resources.map((resource, key: number) => (
                <Tr key={key}>
                  {columnsKeys.map((columnKey, key: number) => (
                    <Td dataLabel={columnNames[columnKey]} key={key}>
                      {resource[columnKey]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        )}
      </div>
    </div>
  );
}
