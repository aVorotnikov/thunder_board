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
CREATE TEMP TABLE _DataToInsertInStatusNumber(
    statusName TEXT NOT NULL,
    statusNumber INTEGER NOT NULL
);
INSERT INTO _DataToInsertInStatusNumber (statusName, statusNumber) VALUES
    ("Назначено", 0);
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Альфа" AND statusTypeName="initial";
UPDATE _DataToInsertInStatusNumber SET statusName = "Активно", statusNumber = 1;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Альфа" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatusNumber SET statusName = "Разрешено", statusNumber = 2;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Альфа" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatusNumber SET statusName = "Завершено", statusNumber = 3;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Альфа" AND statusTypeName="final";

-- Insert Beta statuses
UPDATE _DataToInsertInStatusNumber SET statusName = "Поступило", statusNumber = 0;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Бета" AND statusTypeName="initial";
UPDATE _DataToInsertInStatusNumber SET statusName = "Исследование", statusNumber = 1;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Бета" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatusNumber SET statusName = "В работе", statusNumber = 2;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Бета" AND statusTypeName="intermediate";
UPDATE _DataToInsertInStatusNumber SET statusName = "Завершено", statusNumber = 3;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Бета" AND statusTypeName="final";
UPDATE _DataToInsertInStatusNumber SET statusName = "Отклонено", statusNumber = 4;
INSERT OR IGNORE INTO Status (statusName, statusNumber, projectId, statusTypeId)
    SELECT statusName, statusNumber, projectId, statusTypeId
    FROM Project, StatusType, _DataToInsertInStatusNumber
    WHERE projectName="Бета" AND statusTypeName="final";
