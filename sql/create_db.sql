/* Script to create data base */

DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL UNIQUE,
    userPasswordHash TEXT NOT NULL,
    userIsAdmin BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS Projects CASCADE;
CREATE TABLE Projects (
    projectId SERIAL PRIMARY KEY,
    projectName TEXT NOT NULL UNIQUE,
    projectDescription TEXT NOT NULL
);

DROP TABLE IF EXISTS Roles CASCADE;
CREATE TABLE Roles (
    roleId SERIAL PRIMARY KEY,
    roleName TEXT NOT NULL UNIQUE
);
INSERT INTO Roles (roleName) VALUES ('manager'), ('participant');

DROP TABLE IF EXISTS UsersProjects CASCADE;
CREATE TABLE UsersProjects (
    userProjectId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES Users(userId) ON DELETE RESTRICT,
    projectId INTEGER NOT NULL REFERENCES Projects(projectId) ON DELETE RESTRICT,
    roleId INTEGER NOT NULL REFERENCES Roles(roleId) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS StatusTypes CASCADE;
CREATE TABLE StatusTypes (
    statusTypeId SERIAL PRIMARY KEY,
    statusTypeName TEXT NOT NULL UNIQUE
);
INSERT INTO StatusTypes (statusTypeName) VALUES ('initial'), ('intermediate'), ('final');

DROP TABLE IF EXISTS Statuses CASCADE;
CREATE TABLE Statuses (
    statusId SERIAL PRIMARY KEY,
    statusName TEXT NOT NULL,
    statusNumber INTEGER NOT NULL,
    projectId INTEGER NOT NULL REFERENCES Projects(projectId) ON DELETE RESTRICT,
    statusTypeId INTEGER NOT NULL REFERENCES StatusTypes(statusTypeId) ON DELETE RESTRICT,
    UNIQUE(statusName, projectId),
    UNIQUE(statusNumber, projectId)
);

DROP TABLE IF EXISTS Tasks CASCADE;
CREATE TABLE Tasks (
    taskId SERIAL PRIMARY KEY,
    taskName TEXT NOT NULL,
    taskDescription TEXT NOT NULL,
    taskTimeEstimation INTEGER NOT NULL,
    taskTimeSpent INTEGER DEFAULT 0 NOT NULL,
    userId INTEGER NOT NULL REFERENCES Users(userId) ON DELETE RESTRICT,
    statusId INTEGER NOT NULL REFERENCES Statuses(statusId) ON DELETE RESTRICT
);
