import { Title } from "@patternfly/react-core/dist/esm/components";
import { useState } from "react";
import { TableComposable, Thead, Tr, Th } from "@patternfly/react-table";

export default function Deployments() {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);

  // //   api.getAllTodos().then((todos) => {
  // //     console.log("JSON DATA: ", todos.data);
  // //     dispatch({ type: "GET_TODOS", payload: todos.data });
  // //   });

  //   setLoading(false);
  //   // console.log("Getting all ToDos: ", state.todoList);
  // }, [state.todoList]);

  const emptyListStyle = {
    margin: "15.3em 0 15.5em 0",
  };

  const columnNames = {
    name: "Name",
    deadline: "Deadline",
    completed: "Complete Task",
  };
  return (
    <div style={{"height":"100vh"}}>
      {" "}
      <Title headingLevel="h1">Deployments</Title>
      <br />
      <div>
        {/* {loading ? (
          <div>
            <Bullseye>
              <Spinner isSVG diameter="80px" />
            </Bullseye>
          </div>
        ) : state.todoList ? ( */}
        <TableComposable>
          {/* <Caption>
            <Title headingLevel="h1">
              <Bullseye>My Pending ToDos</Bullseye>
            </Title>
          </Caption> */}
          <Thead>
            <Tr>
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.deadline}</Th>
              <Th>{columnNames.completed}</Th>
            </Tr>
          </Thead>
          {/* <Tbody>
              {state.todoList.map((task: ITask, key: number) => (
                <Tr key={key}>
                  <Td dataLabel={columnNames.name}>{task.taskname}</Td>
                  <Td dataLabel={columnNames.deadline}>{task.deadline}</Td>
                  <Td dataLabel={columnNames.completed}>
                    <Button
                      variant="link"
                      icon={<CheckIcon />}
                      onClick={() => {
                        completeTask(task.id);
                      }}
                    >
                      Completed
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody> */}
        </TableComposable>
        {/* ) : (
          <EmptyState style={emptyListStyle}>
            <EmptyStateIcon icon={CubesIcon} />
            <Title headingLevel="h4" size="lg">
              No Tasks
            </Title>
            <EmptyStateBody>Hurray !!!</EmptyStateBody>
            <br />
            <Link to="/">
              <Button variant="secondary">Click here to Add Tasks</Button>
            </Link>
          </EmptyState>
        )} */}
      </div>
    </div>
  );
}
