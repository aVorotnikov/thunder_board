/* Script to insert test data in data base */

PRAGMA foreign_keys = ON;

-- Insert users
INSERT OR IGNORE INTO User (userName, userEmail, userPassword, userIsAdmin) VALUES
    ("Иванов Иван Иванович", "ivanov@org.org", "aaAA00__", 1),
    ("Петров Петр Петрович", "petrov@org.org", "bbBB11--", 0),
    ("Сергеев Сергей Сергеевич", "sergeev@org.org", "ccCC22;;", 1),
    ("Виталиев Виталий Виталиевич", "vitaliev@org.org", "ddDD33::", 0);

-- Insert projects
INSERT OR IGNORE INTO Project (projectName, projectDescription) VALUES
    ("Альфа", "Автоматизация наблюдения за проектом Бета"),
    ("Бета", "Наблюдение солнца в оптические приборы");

-- Insert Ivanov project roles
INSERT OR IGNORE INTO UserProject (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM User, Project, Role
    WHERE userEmail="ivanov@org.org" AND projectName="Альфа" AND roleName="manager";
INSERT OR IGNORE INTO UserProject (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM User, Project, Role
    WHERE userEmail="ivanov@org.org" AND projectName="Бета" AND roleName="participant";
-- Insert Petrov project roles
INSERT OR IGNORE INTO UserProject (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM User, Project, Role
    WHERE userEmail="petrov@org.org" AND projectName="Альфа" AND roleName="manager";
INSERT OR IGNORE INTO UserProject (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM User, Project, Role
    WHERE userEmail="petrov@org.org" AND projectName="Бета" AND roleName="manager";
-- Insert Vitaliev project roles
INSERT OR IGNORE INTO UserProject (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM User, Project, Role
    WHERE userEmail="vitaliev@org.org" AND projectName="Альфа" AND roleName="manager";

-- Insert Alpha statuses
CREATE TEMP TABLE _DataToInsertInStatus(
    statusName TEXT NOT NULL,
    statusNumber INTEGER NOT NULL
);
INSERT INTO _DataToInsertInStatus (statusName, statusNumber) VALUES
    ("Назначено", 0);
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Альфа" AND statusTypeName="initial";
UPDATE _DataToInsertInStatus SET statusName = "Активно", statusNumber = 1;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Альфа" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatus SET statusName = "Разрешено", statusNumber = 2;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Альфа" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatus SET statusName = "Завершено", statusNumber = 3;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Альфа" AND statusTypeName="final";

-- Insert Beta statuses
UPDATE _DataToInsertInStatus SET statusName = "Поступило", statusNumber = 0;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Бета" AND statusTypeName="initial";
UPDATE _DataToInsertInStatus SET statusName = "Исследование", statusNumber = 1;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Бета" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatus SET statusName = "В работе", statusNumber = 2;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Бета" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatus SET statusName = "Завершено", statusNumber = 3;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Бета" AND statusTypeName="final";
UPDATE _DataToInsertInStatus SET statusName = "Отклонено", statusNumber = 4;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatus
    WHERE projectName="Бета" AND statusTypeName="final";
DROP TABLE _DataToInsertInStatus;

-- Insert Alpha tasks
CREATE TEMP TABLE _DataToInsertInTask(
    taskNumber INTEGER NOT NULL,
    taskName TEXT NOT NULL,
    taskDescription TEXT NOT NULL,
    taskTimeEstimation INTEGER NOT NULL,
    taskTimeSpent INTEGER NOT NULL
);
INSERT INTO _DataToInsertInTask
    (taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent) VALUES
    (
        1,
        "Добавить в команду Сергеева",
        "Добавить в исполнители проекта Сергеева С.С. (sergeev@org.org)",
        2 * 60,
        0
    );
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Альфа" AND userEmail="vitaliev@org.org" AND statusName="Назначено";
UPDATE _DataToInsertInTask SET
    taskNumber = 2,
    taskName = "Создание новых задач",
    taskDescription = 'Создавать задачи в проекте "Альфа"',
    taskTimeEstimation = 200 * 60,
    taskTimeSpent = 100 * 60;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Альфа" AND userEmail="petrov@org.org" AND statusName="Активно";
UPDATE _DataToInsertInTask SET
    taskNumber = 3,
    taskName = "Шпионаж",
    taskDescription = "Выяcнить планы проекта Бета",
    taskTimeEstimation = 10 * 60,
    taskTimeSpent = 100 * 60;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Альфа" AND userEmail="ivanov@org.org" AND statusName="Разрешено";
UPDATE _DataToInsertInTask SET
    taskNumber = 4,
    taskName = "Полезная работа",
    taskDescription = "Сделать хоть что-то полезное для проекта",
    taskTimeEstimation = 1 * 60,
    taskTimeSpent = 0;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Альфа" AND userEmail="vitaliev@org.org" AND statusName="Завершено";
UPDATE _DataToInsertInTask SET
    taskNumber = 5,
    taskName = "Проверить Сергеева",
    taskDescription = "Проверить Сергеева на возможность присоединиться к проекту",
    taskTimeEstimation = 10 * 60,
    taskTimeSpent = 15 * 10;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Альфа" AND userEmail="vitaliev@org.org" AND statusName="Завершено";

-- Insert Beta tasks
UPDATE _DataToInsertInTask SET
    taskNumber = 1,
    taskName = "Сделать работу за проект Альфа",
    taskDescription = 'От команды проекта "Альфа" поступил запрос на выполнение их работы',
    taskTimeEstimation = 20 * 60,
    taskTimeSpent = 0;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Бета" AND userEmail="ivanov@org.org" AND statusName="Поступило";
UPDATE _DataToInsertInTask SET
    taskNumber = 2,
    taskName = "Антишпионаж",
    taskDescription = 'Выявить шпиона команды "Альфа"',
    taskTimeEstimation = 50 * 60,
    taskTimeSpent = 20 * 60;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Бета" AND userEmail="petrov@org.org" AND statusName="Исследование";
UPDATE _DataToInsertInTask SET
    taskNumber = 3,
    taskName = "Наблюдение за солнцем",
    taskDescription = "Наблюдать за солнцем в телескоп",
    taskTimeEstimation = 100 * 60,
    taskTimeSpent = 50 * 60;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Бета" AND userEmail="ivanov@org.org" AND statusName="В работе";
UPDATE _DataToInsertInTask SET
    taskNumber = 4,
    taskName = "Бесполезная работа",
    taskDescription = "Сделать бесполезную работу",
    taskTimeEstimation = 500 * 60,
    taskTimeSpent = 1000 * 60;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Бета" AND userEmail="petrov@org.org" AND statusName="Завершено";
UPDATE _DataToInsertInTask SET
    taskNumber = 5,
    taskName = "Полезная работа",
    taskDescription = "Сделать полезную работу",
    taskTimeEstimation = 2 * 60,
    taskTimeSpent = 2 * 60;
INSERT OR IGNORE INTO Task (taskNumber, taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, projectId, userId, statusId)
    SELECT taskNumber, taskName, taskDescription, taskTimeEstimation, taskTimeSpent,
        Project.projectId, userId, statusId
    FROM _DataToInsertInTask, User, Status
    LEFT JOIN Project ON Status.projectId = Project.projectId
    WHERE projectName="Бета" AND userEmail="ivanov@org.org" AND statusName="Отклонено";
DROP TABLE _DataToInsertInTask;
