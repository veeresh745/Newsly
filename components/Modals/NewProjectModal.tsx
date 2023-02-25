import React, { useState } from "react";
import backendClient from "../../lib/backend/client";
import projects from "../../pages/api/projects";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

function NewProjectModal({ user, refetch }: { user: any; refetch: any }) {
  const [projectName, setProjectName] = useState("");
  const [creatingProject, setCreatingProject] = useState(false);

  const createNewProject = async () => {
    try {
      const accessToken = await user?.getIdToken();
      setCreatingProject(true);
      await backendClient.post(
        "/projects",
        {
          project_name: projectName,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      setCreatingProject(false);

      refetch();

      toast.success(`new project ${projectName} created successfully`);
    } catch (err) {
      console.log(err);
      toast.error("Error occurred while creating new project");
      setCreatingProject(false);
    }
  };
  return (
    <>
      <input type="checkbox" id="new_project_modal" className="modal-toggle" />
      <div className="modal bg-opacity-70">
        <div className="modal-box relative bg-dark-mode-primary">
          <label
            htmlFor="new_project_modal"
            className="btn btn-xs btn-circle absolute right-2 top-2 bg-dark-mode-secondary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-white">Create new project</h3>
          <div className="form-control w-full py-4 space-y-3">
            <input
              type="text"
              placeholder="project name"
              className="input input-bordered w-full bg-dark-mode-secondary text-gray-200 "
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
            <div className="flex justify-end">
              <button
                className={`btn btn-sm bg-brand-accent hover:bg-brand-accent ${
                  creatingProject && "disabled"
                }`}
                onClick={createNewProject}
              >
                {!creatingProject ? (
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

export default NewProjectModal;
