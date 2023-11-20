/* Select users task */
SELECT projectName, taskNumber, taskName, taskDescription,
    statusName, statusTypeName, taskTimeEstimation, taskTimeSpent
    FROM Task
    LEFT JOIN User ON User.userId = Task.userId
    LEFT JOIN Status ON Status.statusId = Task.statusId
    LEFT JOIN StatusType ON StatusType.statusTypeId = Status.statusTypeId
    LEFT JOIN Project ON Project.projectId = Task.projectId
    WHERE userEmail = @userEmail;
