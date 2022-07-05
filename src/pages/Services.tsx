import {
  Button,
  Spinner,
  Title,
} from "@patternfly/react-core/dist/esm/components";
import { useEffect, useRef, useState } from "react";
import { Bullseye, Level, LevelItem } from "@patternfly/react-core";
import ResourceTable from "src/components/ResourceTable";
import useResourceFetch from "src/hooks/useResourceFetch";

export default function Services({ setting }) {
  const loading = useRef(true);
  const [resources, error] = useResourceFetch(
    setting.resourceAPIGetURL,
    loading
  );

  const emptyListStyle = {
    margin: "15.3em 0 15.5em 0",
  };

  return (
    <div>
      {" "}
      <Level>
        <LevelItem span={9}>
          {" "}
          <Title headingLevel="h1">{setting.resourcePluralName}</Title>
        </LevelItem>
        <LevelItem span={3}>
          <Button>Create {setting.resourceName}</Button>
        </LevelItem>
      </Level>
      <br />
      <div>
        {loading.current ? (
          <div>
            <Bullseye>
              <Spinner isSVG diameter="80px" />
            </Bullseye>
          </div>
        ) : (
          <ResourceTable setting={setting} data={resources} />
        )}
      </div>
    </div>
  );
}
