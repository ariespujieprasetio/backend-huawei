CREATE TABLE employees (
  Name VARCHAR(100),
  Position VARCHAR(100),
  Join_Date DATE,
  Release_Date DATE,
  Year_of_Experience VARCHAR(20),
  Salary DECIMAL(10,2)
);

INSERT INTO employees (Name, Position, Join_Date, Release_Date, Year_of_Experience, Salary) VALUES
('Jacky', 'Solution Architect', '2018-07-25', '2022-07-25', '8 Years', 150),
('John', 'Assistant Manager', '2016-02-02', '2021-02-02', '12 Years', 155),
('Alano', 'Manager', '2010-11-09', NULL, '14 Years', 175),
('Aaron', 'Engineer', '2021-08-16', '2022-08-16', '1 Years', 80),
('Allen', 'Engineer', '2024-06-06', NULL, '4 Years', 75),
('Peter', 'Team Leader', '2020-01-09', NULL, '3 Years', 85);

-- 1. Tambah employee baru
INSERT INTO employees (Name, Position, Join_Date, Release_Date, Year_of_Experience, Salary)
VALUES ('Albert', 'Engineer', '2024-01-24', NULL, '2.5 Years', 50);

-- 2. Update salary engineer jadi 85
UPDATE employees
SET Salary = 85
WHERE Position = 'Engineer';

-- 3. Total salary di tahun 2021
SELECT SUM(Salary) AS Total_Salary_2021
FROM employees
WHERE (YEAR(Join_Date) <= 2021)
  AND (Release_Date IS NULL OR YEAR(Release_Date) >= 2021);

-- 4. 3 employee dengan pengalaman tertinggi
SELECT Name, Position, Year_of_Experience, Salary
FROM employees
ORDER BY CAST(REPLACE(Year_of_Experience, ' Years', '') AS DECIMAL) DESC
LIMIT 3;

-- 5. Subquery engineer dengan pengalaman <= 3 tahun
SELECT *
FROM employees
WHERE Position = 'Engineer'
  AND CAST(REPLACE(Year_of_Experience, ' Years', '') AS DECIMAL) <= 3;