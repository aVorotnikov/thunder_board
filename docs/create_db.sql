/* Script to create data base */

CREATE TABLE IF NOT EXISTS User (
    userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    userEmail TEXT NOT NULL,
    userPassword TEXT NOT NULL,
    userIsAdmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Project (
    projectId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    projectName TEXT NOT NULL,
    projectDescription TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Role (
    roleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    roleName TEXT NOT NULL
);
INSERT OR IGNORE INTO Role (roleName) VALUES ("manager"), ("regular");

CREATE TABLE IF NOT EXISTS UserProject (
    userProjectId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(userId),
    FOREIGN KEY(projectId) REFERENCES Project(projectId),
    FOREIGN KEY(roleId) REFERENCES Role(roleId)
);

CREATE TABLE IF NOT EXISTS StasusType (
    stasusTypeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    stasusTypeName TEXT NOT NULL
);
INSERT OR IGNORE INTO StasusType (stasusTypeName) VALUES ("initial"), ("intermediate"), ("final");

CREATE TABLE IF NOT EXISTS Status (
    statusId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    statusName TEXT NOT NULL,
    stasusTypeId INTEGER NOT NULL,
    FOREIGN KEY(stasusTypeId) REFERENCES StasusType(stasusTypeId)
);

CREATE TABLE IF NOT EXISTS StatusProject (
    statusProjectId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    statusId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    FOREIGN KEY(statusId) REFERENCES Stasus(statusId),
    FOREIGN KEY(projectId) REFERENCES Project(projectId)
);

CREATE TABLE IF NOT EXISTS Task (
    taskId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    taskDescription TEXT NOT NULL,
    taskTimeEstimation INTEGER NOT NULL,
    taskTimeSpent INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    statusId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(userId),
    FOREIGN KEY(statusId) REFERENCES Status(statusId)
);

CREATE TABLE IF NOT EXISTS TaskProject (
    taskProjectId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    taskId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    FOREIGN KEY(taskId) REFERENCES Task(taskId),
    FOREIGN KEY(projectId) REFERENCES Project(projectId)
);
