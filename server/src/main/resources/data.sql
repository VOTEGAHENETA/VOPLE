-- delete from Session_chat;
-- delete from Session_chat_room;
-- delete from Election_session;
-- delete from Users;

-- Users table
INSERT INTO Users (id, username, nickname)
VALUES (1, 'user1', 'nickname1'),
       (2, 'user2', 'nickname2'),
       (3, 'user3', 'nickname3');

-- Election_session table
INSERT INTO Election_session (id, host_id, qr_code, session_name, whole_voter, voted_voter,
                              entrance_question, entrance_answer, session_start_time,
                              vote_start_time, vote_end_time)
VALUES (1, 1, 'QR_CODE_1', 'Session 1', 100, 50, 'Question 1', 'Answer 1', '2023-01-01 10:00:00',
        '2023-01-01 11:00:00', '2023-01-01 12:00:00'),
       (2, 2, 'QR_CODE_2', 'Session 2', 200, 150, 'Question 2', 'Answer 2', '2023-02-01 10:00:00',
        '2023-02-01 11:00:00', '2023-02-01 12:00:00');


-- Vote Table
insert into Vote (id, session_id, vote_name)
values (1, 1, 'test');

-- Vote_team table
insert into Vote_team (id, vote_id, poll_cnt, candidate_statement, poster, prefix)
values (1, 1, 0, 'statement', 'poster', 'prefix');


--
-- ---USER---
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (1, 'sunset_glow', '김석양');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (2, 'winter_snow', '이눈꽃');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (3, 'gentle_breeze', '박바람');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (4, 'starry_night', '최별빛');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (5, 'morning_dew', '정이슬');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (6, 'rocky_mountain', '강산맥');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (7, 'deep_sea', '임심해');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (8, 'green_meadow', '한초원');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (9, 'wild_fire', '서불꽃');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (10, 'misty_morning', '윤안개');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (11, 'silent_lake', '김호수');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (12, 'volcanic_rock', '이화산');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (13, 'northern_wind', '박북풍');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (14, 'rainbow_arch', '최무지개');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (15, 'canyon_echo', '정협곡');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (16, 'polar_ice', '강얼음');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (17, 'red_maple', '임단풍');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (18, 'crystal_cave', '한동굴');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (19, 'dark_forest', '서숲속');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (20, 'silver_moon', '윤은달');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (21, 'rushing_river', '김급류');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (22, 'golden_field', '이밀밭');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (23, 'cosmic_dust', '박우주');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (24, 'sacred_tree', '최거목');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (25, 'hidden_valley', '정계곡');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (26, 'eternal_wind', '강바람');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (27, 'deep_canyon', '임협곡');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (28, 'frozen_peak', '한고봉');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (29, 'twilight_sky', '서저녁');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (30, 'ancient_stone', '윤바위');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (31, 'thunder_cloud', '김뇌운');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (32, 'silent_creek', '이시내');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (33, 'golden_beach', '박모래');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (34, 'mystic_mist', '최안개');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (35, 'celestial_wind', '정하늘');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (36, 'crimson_leaf', '강단풍');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (37, 'deep_valley', '임골짜기');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (38, 'eternal_snow', '한눈보라');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (39, 'mountain_breeze', '최산바람');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (40, 'desert_flower', '박꽃');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (41, 'ocean_current', '김해류');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (42, 'forest_whisper', '이숲속');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (43, 'lunar_eclipse', '정달빛');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (44, 'river_stone', '강돌');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (45, 'wind_chime', '임풍경');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (46, 'autumn_rain', '서가을비');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (47, 'cloud_shadow', '윤구름');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (48, 'spring_echo', '최봄소리');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (49, 'summer_dream', '한여름꿈');
-- INSERT INTO users (ID, NICKNAME, USERNAME) VALUES (50, 'winter_light', '박겨울빛');
--
-- ---ELECTION_SESSION
-- INSERT INTO ELECTION_SESSION (VOTED_VOTER, WHOLE_VOTER, HOST_ID, ID, SESSION_START_TIME, VOTE_END_TIME, VOTE_START_TIME, ENTRANCE_ANSWER, ENTRANCE_QUESTION, QR_CODE, SESSION_NAME)
-- VALUES (0, 100, 1, 1, '2025-02-03 15:45:00', '2025-02-03 15:45:00', '2025-02-04 15:45:00', '파란색', '하늘의 색깔은?', 'QR003', '동아리 회장 선거');
--
--
-- ---VOTE_INFO---
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 1, 1, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 2, 2, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 3, 3, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 4, 4, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 5, 5, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 6, 6, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 7, 7, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 8, 8, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 9, 9, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 10, 10, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 11, 11, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 12, 12, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 13, 13, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 14, 14, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 15, 15, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 16, 16, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 17, 17, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 18, 18, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 19, 19, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 20, 20, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 21, 21, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 22, 22, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 23, 23, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 24, 24, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 25, 25, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 26, 26, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 27, 27, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 28, 28, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 29, 29, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 30, 30, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 31, 31, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 32, 32, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 33, 33, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 34, 34, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 35, 35, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 36, 36, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 37, 37, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 38, 38, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 39, 39, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 40, 40, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 41, 41, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 42, 42, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 43, 43, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 44, 44, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 45, 45, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 46, 46, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 47, 47, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 48, 48, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 49, 49, 1, null);
-- INSERT INTO vote_info (has_select, user_type, id, user_id, vote_id, select_candidate) VALUES (false, 'VOTER', 50, 50, 1, null);
--
--
--
-- ---VOTE---
-- INSERT INTO VOTE (ID, SESSION_ID, VOTE_NAME) VALUES (1, 1, '학생회장 선거');
-- INSERT INTO VOTE (ID, SESSION_ID, VOTE_NAME) VALUES (2, 2, '학생회장 선거');
-- INSERT INTO VOTE (ID, SESSION_ID, VOTE_NAME) VALUES (3, 3, '학생회 예산안 의결');
--
--
-- ---VOTE_TEAM---
-- INSERT INTO vote_team (id, vote_id, prefix, candidate_statement, poster, poll_cnt) VALUES (1, 1, '똘끼', '잘부탁드립니다.', '1번후보포스터.img', 0);
-- INSERT INTO vote_team (id, vote_id, prefix, candidate_statement, poster, poll_cnt) VALUES (2, 1, '혁명', '잘부탁드립니다.', '2번후보포스터.img', 0);
--
--
-- ---CANDIDATE---
-- INSERT INTO candidate (id, user_id, vote_team_id) VALUES (1, 1, 1);
-- INSERT INTO candidate (id, user_id, vote_team_id) VALUES (2, 2, 1);
-- INSERT INTO candidate (id, user_id, vote_team_id) VALUES (3, 3, 2);
-- INSERT INTO candidate (id, user_id, vote_team_id) VALUES (4, 4, 2);
