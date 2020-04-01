export type ClockifyTag = any;
export type ClockifyTask = any;
export type ClockifyProject = any;
export type ClockifyWorkspace = any;
export type ClockifyTimeEntry = any;
export type ClockifyUser = any;

let apiToken: string | null;

export function setApiToken(token: string) {
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
    let workspaces: ClockifyWorkspace;
    return apiRequest('/workspaces')
        .then(data => {
            workspaces = data;

            return Promise.all(data.map((workspace: ClockifyWorkspace) => {
                // get tags
                const promise1 = apiRequest(`/workspaces/${workspace.id}/tags`)
                    .then((tags) => {
                        workspace.tags = tags;
                        return tags;
                    });

                // get projects
                const promise2 = apiRequest(`/workspaces/${workspace.id}/projects?archived=false`)
                    .then((projects) => {
                        workspace.projects = projects;

                        // get tasks
                        return Promise.all(projects.map((project: ClockifyProject) => {
                            const promise = apiRequest(`/workspaces/${workspace.id}/projects/${project.id}/tasks`);
                            return promise.then((tasks) => {
                                project.tasks = tasks;
                            });
                        }));
                    });

                return Promise.all([promise1, promise2]);
            }));
        })
        .then(() => {

        })
        .then(() => {
            return workspaces;
        });
}

export function getRunningEntry(workspaceId: string) {
    return apiRequest('/user').then((user: ClockifyUser) => {
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

export function startTask(project: ClockifyProject, task: ClockifyTask | null = null, tag: ClockifyTag | null = null) {
    const timeEntry = {
        //description: '',
        tagIds: tag && [tag.id],
        billable: project.billable,
        taskId: task ? task.id : null,
        projectId: project.id,
        start: new Date().toISOString(),
        //end: '2018-06-12T13:50:14.000Z',
    };
    return apiRequest(`/workspaces/${project.workspaceId}/time-entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeEntry),
    });
}

export function stopTask(currentTimeEntry: ClockifyTimeEntry) {
    const timeEntry = {
        description: currentTimeEntry.description,
        tagIds: currentTimeEntry.tagIds,
        billable: currentTimeEntry.billable,
        taskId: currentTimeEntry.taskId,
        projectId: currentTimeEntry.projectId,
        start: currentTimeEntry.timeInterval.start,
        end: new Date().toISOString(),
    };

    // PUT /workspaces/{workspaceId}/time-entries/{id}
    return apiRequest(`/workspaces/${currentTimeEntry.workspaceId}/time-entries/${currentTimeEntry.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeEntry),
    });
}

export function updateTask(currentTimeEntry: ClockifyTimeEntry) {
    const timeEntry = {
        description: currentTimeEntry.description,
        tagIds: currentTimeEntry.tagIds,
        billable: currentTimeEntry.billable,
        taskId: currentTimeEntry.taskId,
        projectId: currentTimeEntry.projectId,
        start: currentTimeEntry.timeInterval.start,
        end: currentTimeEntry.timeInterval.end,
    };

    // PUT /workspaces/{workspaceId}/time-entries/{id}
    return apiRequest(`/workspaces/${currentTimeEntry.workspaceId}/time-entries/${currentTimeEntry.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeEntry),
    });
}

export function apiRequest(url: string, options: any = {}) {
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

function parseJson(response: Response) {
    return response.json()
}
