package com.votegaheneta.vote.repository;

import com.votegaheneta.vote.dto.VoteDetailDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;


//@SpringBootTest
//@Transactional
@DataJpaTest
class CustomVoteRepositoryImplTest {

  @Autowired
  private TestEntityManager entityManager;

  private CustomVoteRepositoryImpl customVoteRepository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    customVoteRepository = new CustomVoteRepositoryImpl(entityManager.getEntityManager());
  }

  @Test
  void getVoteDetails() {
    VoteDetailDto voteDetails = customVoteRepository.getVoteDetails(1L, 1L, PageRequest.of(0, 5));
    Assertions.assertNotNull(voteDetails);
    System.out.println(voteDetails.getUserList().size());
    System.out.println(voteDetails.getCandidateList().size());
  }
}