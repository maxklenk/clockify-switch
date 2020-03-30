let apiToken;

export function setApiToken(token) {
  apiToken = token;
  return apiRequest('/user')
    .then(() => {
      return apiToken;
    })
    .catch((response) => {
      apiToken = null;
      throw response;
    });
}

export function getWorkspaces() {
  if (!apiToken) {
    return Promise.resolve([]);
  }
  let workspaces;
  return apiRequest('/workspaces')
    .then(data => {
      workspaces = data;

      // get projects
      return Promise.all(data.map((workspace) => {
        const promise = apiRequest(`/workspaces/${workspace.id}/projects?archived=false`);
        return promise.then((projects) => {
          workspace.projects = projects;

          // get tasks
          return Promise.all(projects.map((project) => {
            const promise = apiRequest(`/workspaces/${workspace.id}/projects/${project.id}/tasks`);
            return promise.then((tasks) => {
              project.tasks = tasks;
            });
          }));
        });
      }));
    })
    .then(() => {
      return workspaces;
    });
}

export function getRunningEntry(workspaceId) {
  return apiRequest('/user').then((user) => {
    return apiRequest(`/workspaces/${workspaceId}/user/${user.id}/time-entries?in-progress=true`)
      .then((entries) => {
        if (entries.length) {
          return entries[0];
        } else {
          return null;
        }
      });
  });
}

export function startTask(project, task = null) {
  const timeEntry = {
    "start": new Date().toISOString(),
    //"billable": "true", // default
    //"description": "Writing documentation",
    "projectId": project.id,
    "taskId": task ? task.id : null,
    //"end": "2018-06-12T13:50:14.000Z",
  };
  return apiRequest(`/workspaces/${project.workspaceId}/time-entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  });
}

export function stopTask(currentTask) {
  const timeEntry = {
    "billable": currentTask.billable,
    "projectId": currentTask.projectId,
    "taskId": currentTask.taskId,
    "start": currentTask.timeInterval.start,
    "end": new Date().toISOString(),
  };

  // PUT /workspaces/{workspaceId}/time-entries/{id}
  return apiRequest(`/workspaces/${currentTask.workspaceId}/time-entries/${currentTask.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  });
}

export function editTaskDescription(currentTask) {
  const timeEntry = {
    "billable": currentTask.billable,
    "projectId": currentTask.projectId,
    "taskId": currentTask.taskId,
    "start": currentTask.timeInterval.start,
    "description": currentTask.description,
  };

  // PUT /workspaces/{workspaceId}/time-entries/{id}
  return apiRequest(`/workspaces/${currentTask.workspaceId}/time-entries/${currentTask.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeEntry),
  });
}

export function apiRequest(url, options = {}) {
  url = 'https://api.clockify.me/api/v1' + url;
  if (!options.headers) {
    options.headers = {};
  }
  options.headers['X-Api-Key'] = apiToken;
  options.mode = 'cors';

  return fetch(url, options)
    .then((response) => {
      if (response.status < 400) {
        return response;
      } else {
        throw response;
      }
    })
    .then(parseJson)
}

function parseJson(response) {
  return response.json()
}
