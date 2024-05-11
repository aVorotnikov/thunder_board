/* Select project task */
SELECT taskId, taskName, taskDescription, statusName, statusTypeName, taskTimeEstimation, taskTimeSpent, Users.userId, Users.userName, Users.userEmail
    FROM Tasks
    LEFT JOIN Users ON Users.userId = Tasks.userId
    LEFT JOIN Statuses ON Statuses.statusId = Tasks.statusId
    LEFT JOIN StatusTypes ON StatusTypes.statusTypeId = Statuses.statusTypeId
    LEFT JOIN Projects ON Projects.projectId = Statuses.projectId
    WHERE Projects.projectId = @projectId;
