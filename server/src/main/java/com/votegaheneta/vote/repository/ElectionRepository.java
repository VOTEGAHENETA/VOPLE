package com.votegaheneta.vote.repository;

import com.votegaheneta.user.entity.Users;
import com.votegaheneta.vote.entity.ElectionSession;
import com.votegaheneta.vote.entity.Vote;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ElectionRepository extends JpaRepository<ElectionSession, Long> {

  @Query("SELECT s.entranceQuestion FROM ElectionSession s WHERE s.id = :sessionId")
  String findEntranceQuestionById(Long sessionId);

  @Query("SELECT s FROM ElectionSession s join fetch s.hostUser WHERE s.id = :sessionId")
  ElectionSession findSessionById(Long sessionId);

  @Query("SELECT s FROM ElectionSession s join fetch s.sessionUserInfos WHERE s.id = :sessionId")
  Optional<ElectionSession> findSessionWithUserInfosById(Long sessionId);

  @Query("select es from ElectionSession es join fetch es.hostUser hu where hu.id = :userId")
  List<ElectionSession> findByHostUser_Id(@Param("userId") Long userId);

  @Query("select es.qrCode from ElectionSession es where es.id = :sessionId")
  Optional<String> findQrcodeById(@Param("sessionId") Long sessionId);

  @Query("select es from ElectionSession es join fetch es.sessionUserInfos sui where sui.user.id = :userId and es.hostUser.id != :userId")
  List<ElectionSession> findBySessionUserInfos_Id(@Param("userId") Long userId);

  @Query("select v from Vote v join v.electionSession es where es.id = :sessionId")
  List<Vote> findSessionEditById(@Param("sessionId") Long sessionId);

  @Query("select es.id from VoteTeam vt join vt.vote v join v.electionSession es where vt.id = :voteTeamId")
  Long findSessionIdByVoteTeamId(Long voteTeamId);

  boolean existsByIdAndHostUser(Long sessionId, Users hostUser);
}