import React, { useState } from "react";
import backendClient from "../../lib/backend/client";
import projects from "../../pages/api/projects";
import { toast } from "react-hot-toast";
import {
  AiOutlineInfoCircle,
  AiOutlineLoading,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

function NewStepModal({
  user,
  refetch,
  projectId,
  interviewId,
}: {
  user: any;
  refetch: any;
  projectId: string;
  interviewId: string;
}) {
  const [stepName, setStepName] = useState("");
  //generate random color
  const [stepColor, setStepColor] = useState("#6B43FD");
  const [creating, setCreating] = useState(false);

  const createNewStep = async () => {
    try {
      const accessToken = await user?.getIdToken();
      setCreating(true);

      await backendClient.post(
        `/projects/${projectId}/interviews/${interviewId}/steps`,
        {
          title: stepName,
          colorCode: stepColor,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      setCreating(false);

      refetch();

      toast.success(`new step created`);
    } catch (err) {
      console.log(err);
      toast.error("Error occurred while creating new step");
      setCreating(false);
    }
  };

  const handleColorChange = (e: any) => {
    setStepColor(e.target.value);
  };

  return (
    <>
      <input type="checkbox" id="new_step_modal" className="modal-toggle" />
      <div className="modal bg-opacity-70">
        <div className="modal-box relative bg-dark-mode-primary">
          <label
            htmlFor="new_step_modal"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-dark-mode-secondary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-white">Create new step</h3>
          {/* alert */}
          <div className="alert alert-info shadow-lg my-2">
            <div>
              <AiOutlineInfoCircle size={20} />
              <span>
                Steps are questions or the stages of an interview.
                <p className="font-medium">Examples:</p>
                <ul className="list-disc mx-4">
                  <li>What is your expectation from the product?</li>
                  <li>Testing click dummy</li>
                </ul>
              </span>
            </div>
          </div>
          {/* alert end */}
          <div className="form-control w-full py-4 space-y-3">
            <input
              type="text"
              placeholder="Ex: What do you expect from this product?"
              className="input input-bordered w-full bg-dark-mode-secondary text-gray-200  "
              value={stepName}
              onChange={(e) => {
                setStepName(e.target.value);
              }}
            />
            {/* color picker */}
            <label className="input-group text-gray-400">
              <span className="bg-dark-mode-secondary ">Select color</span>
              <input
                type="color"
                color={stepColor}
                onChange={handleColorChange}
                className="h-10 w-10 rounded-tr-md rounded-br-md bg-dark-mode-secondary p-1 hover:cursor-pointer "
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className={`btn btn-sm bg-brand-accent hover:bg-brand-accent ${
                creating && "disabled"
              }`}
              onClick={createNewStep}
            >
              {!creating ? (
                "Create"
              ) : (
                <AiOutlineLoading size={15} className="animate-spin" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewStepModal;
