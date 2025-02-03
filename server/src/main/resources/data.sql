-- delete from Session_chat;
-- delete from Session_chat_room;
-- delete from Election_session;
-- delete from Users;

-- Users table
-- INSERT INTO Users (id, username, nickname)
-- VALUES (1, 'user1', 'nickname1'),
--        (2, 'user2', 'nickname2'),
--        (3, 'user3', 'nickname3');

-- Election_session tableINSERT INTO Election_session (id, host_id, qr_code, session_name, whole_voter, voted_voter,
-- --                               entrance_question, entrance_answer, session_start_time,
-- --                               vote_start_time, vote_end_time)
-- -- VALUES (1, 1, 'QR_CODE_1', 'Session 1', 100, 50, 'Question 1', 'Answer 1', '2023-01-01 10:00:00',
-- --         '2023-01-01 11:00:00', '2023-01-01 12:00:00'),
-- --        (2, 2, 'QR_CODE_2', 'Session 2', 200, 150, 'Question 2', 'Answer 2', '2023-02-01 10:00:00',
-- --         '2023-02-01 11:00:00', '2023-02-01 12:00:00');
--

-- Vote Table
insert into Vote (id, session_id, vote_name)
values (1, 1, 'test');

-- Vote_team table
insert into Vote_team (id, vote_id, poll_cnt, candidate_statement, poster, prefix)
values (1, 1, 0, 'statement', 'poster', 'prefix');

-- team_chat_room table
-- insert into team_chat_room (id)
-- values (1);

-- team_chat table


-- Session_chat_room table
-- INSERT INTO Session_chat_room (id)
-- VALUES (1),
--        (2);

-- Session_chat table
-- INSERT INTO Session_chat (id, session_chat_room_id, text, user_id, created_time)
-- VALUES (1, 1, 'Message 1 in session 1', 1, '10:01:00'),
--        (2, 1, 'Message 2 in session 1', 2, '10:02:00'),
--        (3, 1, 'Message 3 in session 1', 3, '10:03:00'),
--        (4, 1, 'Message 4 in session 1', 1, '10:04:00'),
--        (5, 1, 'Message 5 in session 1', 2, '10:05:00'),
--        (6, 1, 'Message 6 in session 1', 3, '10:06:00'),
--        (7, 1, 'Message 7 in session 1', 1, '10:07:00'),
--        (8, 1, 'Message 8 in session 1', 2, '10:08:00'),
--        (9, 1, 'Message 9 in session 1', 3, '10:09:00'),
--        (10, 1, 'Message 10 in session 1', 1, '10:10:00'),
--        (11, 1, 'Message 11 in session 1', 2, '10:11:00'),
--        (12, 1, 'Message 12 in session 1', 3, '10:12:00'),
--        (13, 1, 'Message 13 in session 1', 3, '10:13:00'),
--        (14, 1, 'Message 14 in session 1', 1, '10:14:00'),
--        (15, 1, 'Message 15 in session 1', 2, '10:15:00'),
--        (16, 1, 'Message 16 in session 1', 1, '10:16:00'),
--        (17, 1, 'Message 17 in session 1', 2, '10:17:00'),
--        (18, 1, 'Message 18 in session 1', 3, '10:18:00'),
--        (19, 1, 'Message 19 in session 1', 1, '10:19:00'),
--        (20, 1, 'Message 20 in session 1', 2, '10:20:00');
