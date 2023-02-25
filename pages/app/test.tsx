import React, { useContext, useEffect, useState } from "react";
import { ProtectedRoutesContext } from "../../components/layout/protectedRoutes";
import { RecordScreen } from "../../components/Recorder";

function Test() {
  const user = useContext(ProtectedRoutesContext);
  if (!user) return null;

  const [blobUrl, setBlobUrl] = useState<string>("");

  return (
    <div className="text-white">
      extension endpoint test page. check console for outputs
      <RecordScreen setBlobUrl={setBlobUrl} />
      <video controls src={blobUrl} width={500} height={500} />
    </div>
  );
}

export default Test;
