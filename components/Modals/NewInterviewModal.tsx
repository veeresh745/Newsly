import React, { useState } from "react";
import backendClient from "../../lib/backend/client";
import projects from "../../pages/api/projects";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

function NewInterviewModal({
  user,
  refetch,
  projectId,
}: {
  user: any;
  refetch: any;
  projectId: string;
}) {
  const [interviewName, setInterviewName] = useState("");
  const [creatingInterview, setCreatingInterview] = useState(false);

  const createNewInterview = async () => {
    try {
      const accessToken = await user?.getIdToken();
      setCreatingInterview(true);
      await backendClient.post(
        `/projects/${projectId}/interviews`,
        {
          interview_name: String(interviewName),
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      setCreatingInterview(false);

      refetch();

      toast.success(`new interview ${interviewName} created successfully`);
    } catch (err) {
      console.log(err);
      toast.error("Error occurred while creating new interview");
      setCreatingInterview(false);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        id="new_interview_modal"
        className="modal-toggle"
      />
      <div className="modal bg-opacity-70">
        <div className="modal-box relative bg-dark-mode-primary">
          <label
            htmlFor="new_interview_modal"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-dark-mode-secondary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-white">Create new interview</h3>
          <div className="form-control w-full py-4 space-y-3">
            <input
              type="text"
              placeholder="interview name"
              className="input input-bordered w-full bg-dark-mode-secondary text-gray-200 "
              value={interviewName}
              onChange={(e) => {
                setInterviewName(e.target.value);
              }}
            />
            <div className="flex justify-end">
              <button
                className={`btn btn-sm bg-brand-accent hover:bg-brand-accent ${
                  creatingInterview && "disabled"
                }`}
                onClick={createNewInterview}
              >
                {!creatingInterview ? (
                  "Create"
                ) : (
                  <>
                    <AiOutlineLoading size={15} className="animate-spin" />
                    Creating...
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewInterviewModal;
