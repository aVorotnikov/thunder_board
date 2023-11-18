/* Select project team */
SELECT userName, userEmail, roleName
    FROM User
    LEFT JOIN UserProject ON User.userId = UserProject.userId
    LEFT JOIN Project ON UserProject.projectId = Project.projectId
    LEFT JOIN Role ON UserProject.roleId = Role.roleId
    WHERE projectName = @projectName;
