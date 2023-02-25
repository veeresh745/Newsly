import React, { useEffect, useState } from "react";
import { BsRecord2 } from "react-icons/bs";

export const RecordScreen = ({ setBlobUrl }: { setBlobUrl: any }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [screenPermission, setScreenPermission] = useState<MediaStream | null>(
    null
  );

  let chunks: Blob[] = [];

  useEffect(() => {
    if (isRecording) {
      getAccessToRecord()
        .then((permission) => {
          setScreenPermission(permission);
          let r = new MediaRecorder(permission, {
            mimeType: "video/webm; codecs=vp8",
          });

          setRecorder(r);

          r.start(2000);

          r.ondataavailable = (e) => {
            chunks.push(e.data);
            console.log(chunks);
            // console.log(recorder?.state);
          };

          r.onerror = (e) => {
            console.log("recorder error: ", e);
          };

          r.onstop = () => {
            console.log("onstop: stopped");
            setIsRecording(false);
            // stop all streams
            screenPermission?.getTracks().forEach((track) => {
              track.stop();
              track.enabled = false;
            });

            // save video
            const blob = new Blob(chunks, { type: chunks[0].type });
            let url = window.URL.createObjectURL(blob);
            // send to parent element
            setBlobUrl(url);
          };
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (recorder?.state !== "inactive") {
        recorder?.stop();
      }
    }
  }, [isRecording]);

  const getAccessToRecord = async () => {
    const permission = await window.navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    return permission;
  };

  return (
    <>
      {!isRecording ? (
        <button
          className="flex flex-row btn"
          onClick={() => setIsRecording(true)}
        >
          <BsRecord2 size={20} className="text-red-500 " />
          Record
        </button>
      ) : (
        <button
          className="flex flex-row btn"
          onClick={() => setIsRecording(false)}
        >
          <BsRecord2 size={20} className="text-red-500 animate-pulse" />
          Stop recording
        </button>
      )}
    </>
  );
};
