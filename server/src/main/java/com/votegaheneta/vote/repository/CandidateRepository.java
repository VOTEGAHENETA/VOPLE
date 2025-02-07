package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.dto.CandidateResultDto;
import com.votegaheneta.vote.entity.Candidate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

  @Query("select new com.votegaheneta.vote.dto.CandidateResultDto(c.id, u.id, u.username)"
      + " from Candidate c join Users u on c.user.id = u.id where c.voteTeam.id = :voteTeamId")
  List<CandidateResultDto> findByVoteTeamId(@Param("voteTeamId") Long voteTeamId);

  @Query("select c from Candidate c join fetch c.user u join fetch c.voteTeam vt join fetch vt.vote v join fetch v.electionSession where u.id = :userId")
  List<Candidate> findCandidateAndUserAndVoteTeamByUserId(Long userId);
}