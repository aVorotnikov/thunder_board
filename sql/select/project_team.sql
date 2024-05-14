/* Select project team */
SELECT Users.userId, userName, userEmail, Roles.roleName
    FROM Users
    LEFT JOIN UsersProjects ON Users.userId = UsersProjects.userId
    LEFT JOIN Projects ON UsersProjects.projectId = Projects.projectId
    LEFT JOIN Roles ON UsersProjects.roleId = Roles.roleId
    WHERE Projects.projectId = @projectId;
