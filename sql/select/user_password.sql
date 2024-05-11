/* Select user password */
SELECT userPasswordHash FROM Users WHERE userEmail = @userEmail;
