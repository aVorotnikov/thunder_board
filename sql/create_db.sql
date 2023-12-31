/* Script to create data base */

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User (
    userId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL UNIQUE,
    userPassword TEXT NOT NULL,
    userIsAdmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Project (
    projectId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    projectName TEXT NOT NULL UNIQUE,
    projectDescription TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Role (
    roleId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    roleName TEXT NOT NULL UNIQUE
);
INSERT OR IGNORE INTO Role (roleName) VALUES ("manager"), ("participant");

CREATE TABLE IF NOT EXISTS UserProject (
    userProjectId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(userId),
    FOREIGN KEY(projectId) REFERENCES Project(projectId),
    FOREIGN KEY(roleId) REFERENCES Role(roleId)
);

CREATE TABLE IF NOT EXISTS StatusType (
    statusTypeId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    statusTypeName TEXT NOT NULL UNIQUE
);
INSERT OR IGNORE INTO StatusType (statusTypeName) VALUES ("initial"), ("intermediate"), ("final");

CREATE TABLE IF NOT EXISTS Status (
    statusId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    statusName TEXT NOT NULL,
    statusNumber INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    statusTypeId INTEGER NOT NULL,
    FOREIGN KEY(projectId) REFERENCES Project(projectId),
    FOREIGN KEY(statusTypeId) REFERENCES StatusType(statusTypeId),
    UNIQUE(statusName, projectId),
    UNIQUE(statusNumber, projectId)
);

CREATE TABLE IF NOT EXISTS Task (
    taskId INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    taskDescription TEXT NOT NULL,
    taskTimeEstimation INTEGER NOT NULL,
    taskTimeSpent INTEGER DEFAULT 0 NOT NULL,
    userId INTEGER NOT NULL,
    statusId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(userId),
    FOREIGN KEY(statusId) REFERENCES Status(statusId)
);
