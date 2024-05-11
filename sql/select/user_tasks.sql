/* Select users task */
SELECT taskName, taskDescription, statusName, statusTypeName, taskTimeEstimation, taskTimeSpent, projectName
    FROM Tasks
    LEFT JOIN Users ON Users.userId = Tasks.userId
    LEFT JOIN Statuses ON Statuses.statusId = Tasks.statusId
    LEFT JOIN StatusTypes ON StatusTypes.statusTypeId = Statuses.statusTypeId
    LEFT JOIN Projects ON Projects.projectId = Statuses.projectId
    WHERE Users.userId = @userId;
