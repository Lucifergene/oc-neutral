import { useRef, useState } from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@patternfly/react-table";

export default function ResourceTable({ setting, data }) {

  const {resourceColumnNames} = setting;
  const columnsKeys = Object.keys(resourceColumnNames);
  return (
    <TableComposable aria-label="Simple table" variant="compact" borders={true}>
      <Thead>
        <Tr>
          {columnsKeys.map((columnKey, key: number) => (
            <Th key={key}>{resourceColumnNames[columnKey]}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data && data.map((resource, key: number) => (
          <Tr key={key}>
            {columnsKeys.map((columnKey, key: number) => (
              <Td dataLabel={resourceColumnNames[columnKey]} key={key}>
                {resource[columnKey]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
}
