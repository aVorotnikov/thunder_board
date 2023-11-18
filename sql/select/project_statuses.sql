/* Select statuses from project */
SELECT statusName, statusNumber, statusTypeName
    FROM Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    LEFT JOIN StatusType ON StatusType.statusTypeId = Status.statusTypeId
    WHERE projectName = @projectName
    ORDER BY statusNumber;
