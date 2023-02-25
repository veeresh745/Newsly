# mio frontend

## Endpoints

```text
GET /api/projects (get all projects) ✅

POST /api/projects (create a new project) ✅

GET /api/projects/:project_id/journey (get all journey related to project_id) ✅

POST /api/projects/:project_id/journey (create a new journey under project_id) ✅

GET /api/projects/:project_id/journey/:journey_id (get data of specific journey including steps and it's data) ✅

POST /api/projects/:project_id/journey/:journey_id/steps (create a new step under journey_id) ✅

PUT /api/projects/:project_id/journey/:journey_id/steps/:step_id (update a step data) ✅
```
