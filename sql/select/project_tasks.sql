/* Select project task */
SELECT taskName, taskDescription, statusName, statusTypeName, taskTimeEstimation, taskTimeSpent, userName, userEmail
    FROM Task
    LEFT JOIN User ON User.userId = Task.userId
    LEFT JOIN Status ON Status.statusId = Task.statusId
    LEFT JOIN StatusType ON StatusType.statusTypeId = Status.statusTypeId
    LEFT JOIN Project ON Project.projectId = Status.projectId
    WHERE projectName = @projectName;
