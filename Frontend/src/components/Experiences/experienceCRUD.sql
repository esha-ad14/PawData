--insert into experience values (0, 2, '2022-08-13', 'A', 'great job on elevator alone','Elevator along');

--C
--insert into experience values (0, 2, '2022-08-13', 'A', 'great job on elevator alone','Elevator along');


--U
--UPDATE experience SET dog_id = 1 WHERE dog_id = 0
--UPDATE experience SET exp_id = 3 WHERE exp_id = 0
--UPDATE experience SET exp_date = '2022-08-23' WHERE exp_date = '2020-08-23'
--UPDATE experience SET exp_level = 'A' WHERE exp_level = 'C';

--R
--SELECT * FROM exam;
--select experience that have level C
--SELECT exp_id, exp_name, exp_level FROM experience WHERE exp_level = 'A';

--select exams that have not been passed
--SELECT exam_name, exam_pass FROM experience WHERE exam_pass = false;


--D
--DELETE FROM experience WHERE exp_level = 'C';
--DELETE FROM experience WHERE exp_date = '2022-08-10';
--DELETE FROM experience WHERE exp_name = 'crowded stairwell';
--SELECT * FROM experience;