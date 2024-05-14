/* Script to insert test data in data base */

-- Insert users
INSERT INTO Users (userName, userEmail, userPasswordHash, userIsAdmin) VALUES
    (
        'Иванов Иван Иванович',
        'ivanov@org.org',
        '$2b$12$tCNED8vgoroj/CwgckdBPeW66axzwMfqQMLvFVawDa1gwa3/LPCpG', -- password 'aaAA00__'
        TRUE
    ),
    (
        'Петров Петр Петрович',
        'petrov@org.org',
        '$2b$12$VJept1kJz6gppfvcZEy6Tec8qc7TYNPF4Dsr0YeW3KL75TsMVlHmK', -- password 'bbBB11--'
        FALSE
    ),
    (
        'Сергеев Сергей Сергеевич',
        'sergeev@org.org',
        '$2b$12$qpBkrHSwdC3fMOjoOMxJKOAJ6.E6aHgouFAHHt8Bd/WUDhvqiOtYK', -- password 'ccCC22;;'
        TRUE
    ),
    (
        'Виталиев Виталий Виталиевич',
        'vitaliev@org.org',
        '$2b$12$plfZWvPXA9zLzHwBKGvhz..Ko8dveqXY2a4xizrmy8uQMZh3HPSbC', -- password 'ddDD33::'
        FALSE
    );

-- Insert projects
INSERT INTO Projects (projectName, projectDescription) VALUES
    ('Альфа', 'Автоматизация наблюдения за проектом Бета'),
    ('Бета', 'Наблюдение солнца в оптические приборы');

-- Insert Ivanov project roles
INSERT INTO UsersProjects (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM Users, Projects, Roles
    WHERE userEmail='ivanov@org.org' AND projectName='Альфа' AND roleName='manager';
INSERT INTO UsersProjects (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM Users, Projects, Roles
    WHERE userEmail='ivanov@org.org' AND projectName='Бета' AND roleName='participant';
-- Insert Petrov project roles
INSERT INTO UsersProjects (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM Users, Projects, Roles
    WHERE userEmail='petrov@org.org' AND projectName='Альфа' AND roleName='manager';
INSERT INTO UsersProjects (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM Users, Projects, Roles
    WHERE userEmail='petrov@org.org' AND projectName='Бета' AND roleName='manager';
-- Insert Vitaliev project roles
INSERT INTO UsersProjects (userId, projectId, roleId)
    SELECT userId, projectId, roleId
    FROM Users, Projects, Roles
    WHERE userEmail='vitaliev@org.org' AND projectName='Альфа' AND roleName='manager';

-- Insert Alpha statuses
CREATE TEMP TABLE _DataToInsertInStatuses(
    statusName TEXT NOT NULL,
    statusNumber INTEGER NOT NULL
);
INSERT INTO _DataToInsertInStatuses (statusName, statusNumber) VALUES
    ('Назначено', 0);
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Альфа' AND statusTypeName='initial';
UPDATE _DataToInsertInStatuses SET statusName = 'Активно', statusNumber = 1;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Альфа' AND statusTypeName='intermediate';
UPDATE _DataToInsertInStatuses SET statusName = 'Разрешено', statusNumber = 2;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Альфа' AND statusTypeName='intermediate';
UPDATE _DataToInsertInStatuses SET statusName = 'Завершено', statusNumber = 3;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Альфа' AND statusTypeName='final';

-- Insert Beta statuses
UPDATE _DataToInsertInStatuses SET statusName = 'Поступило', statusNumber = 0;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Бета' AND statusTypeName='initial';
UPDATE _DataToInsertInStatuses SET statusName = 'Исследование', statusNumber = 1;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Бета' AND statusTypeName='intermediate';
UPDATE _DataToInsertInStatuses SET statusName = 'В работе', statusNumber = 2;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Бета' AND statusTypeName='intermediate';
UPDATE _DataToInsertInStatuses SET statusName = 'Завершено', statusNumber = 3;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Бета' AND statusTypeName='final';
UPDATE _DataToInsertInStatuses SET statusName = 'Отклонено', statusNumber = 4;
INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Projects, StatusTypes, _DataToInsertInStatuses
    WHERE projectName='Бета' AND statusTypeName='final';
DROP TABLE _DataToInsertInStatuses;

-- Insert Alpha tasks
CREATE TEMP TABLE _DataToInsertInTasks(
    taskName TEXT NOT NULL,
    taskDescription TEXT NOT NULL,
    taskTimeEstimation INTEGER NOT NULL,
    taskTimeSpent INTEGER NOT NULL
);
INSERT INTO _DataToInsertInTasks (taskName, taskDescription, taskTimeEstimation, taskTimeSpent) VALUES
    (
        'Добавить в команду Сергеева',
        'Добавить в исполнители проекта Сергеева С.С. (sergeev@org.org)',
        2 * 60,
        0
    );
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Альфа' AND userEmail='vitaliev@org.org' AND statusName='Назначено';
UPDATE _DataToInsertInTasks SET
    taskName = 'Создание новых задач',
    taskDescription = 'Создавать задачи в проекте "Альфа"',
    taskTimeEstimation = 200 * 60,
    taskTimeSpent = 100 * 60;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Альфа' AND userEmail='petrov@org.org' AND statusName='Активно';
UPDATE _DataToInsertInTasks SET
    taskName = 'Шпионаж',
    taskDescription = 'Выяcнить планы проекта Бета',
    taskTimeEstimation = 10 * 60,
    taskTimeSpent = 100 * 60;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Альфа' AND userEmail='ivanov@org.org' AND statusName='Разрешено';
UPDATE _DataToInsertInTasks SET
    taskName = 'Полезная работа',
    taskDescription = 'Сделать хоть что-то полезное для проекта',
    taskTimeEstimation = 1 * 60,
    taskTimeSpent = 0;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Альфа' AND userEmail='vitaliev@org.org' AND statusName='Завершено';

-- Insert Beta tasks
UPDATE _DataToInsertInTasks SET
    taskName = 'Сделать работу за проект Альфа',
    taskDescription = 'От команды проекта "Альфа" поступил запрос на выполнение их работы',
    taskTimeEstimation = 20 * 60,
    taskTimeSpent = 0;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Бета' AND userEmail='ivanov@org.org' AND statusName='Поступило';
UPDATE _DataToInsertInTasks SET
    taskName = 'Антишпионаж',
    taskDescription = 'Выявить шпиона команды "Альфа"',
    taskTimeEstimation = 50 * 60,
    taskTimeSpent = 20 * 60;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Бета' AND userEmail='petrov@org.org' AND statusName='Исследование';
UPDATE _DataToInsertInTasks SET
    taskName = 'Наблюдение за солнцем',
    taskDescription = 'Наблюдать за солнцем в телескоп',
    taskTimeEstimation = 100 * 60,
    taskTimeSpent = 50 * 60;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Бета' AND userEmail='ivanov@org.org' AND statusName='В работе';
UPDATE _DataToInsertInTasks SET
    taskName = 'Бесполезная работа',
    taskDescription = 'Сделать бесполезную работу',
    taskTimeEstimation = 500 * 60,
    taskTimeSpent = 1000 * 60;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Бета' AND userEmail='petrov@org.org' AND statusName='Завершено';
UPDATE _DataToInsertInTasks SET
    taskName = 'Полезная работа',
    taskDescription = 'Сделать полезную работу',
    taskTimeEstimation = 2 * 60,
    taskTimeSpent = 2 * 60;
INSERT INTO Tasks (taskName, taskDescription,
    taskTimeEstimation, taskTimeSpent, userId, statusId)
    SELECT taskName, taskDescription, taskTimeEstimation, taskTimeSpent, userId, statusId
    FROM _DataToInsertInTasks, Users, Statuses
    LEFT JOIN Projects ON Statuses.projectId = Projects.projectId
    WHERE projectName='Бета' AND userEmail='ivanov@org.org' AND statusName='Отклонено';
DROP TABLE _DataToInsertInTasks;
