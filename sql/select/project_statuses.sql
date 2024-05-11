/* Select statuses from project */
SELECT statusName, statusNumber, statusTypeName
    FROM Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    LEFT JOIN StatusTypes ON StatusTypes.statusTypeId = Statuses.statusTypeId
    WHERE Projects.projectId = @projectId
    ORDER BY statusNumber;
