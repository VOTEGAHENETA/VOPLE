package com.votegaheneta.server.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.votegaheneta.user.entity.QUsers;
import com.votegaheneta.user.entity.Users;
import com.votegaheneta.user.repository.UsersRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class QueryDslTest {

  @Autowired
  private JPAQueryFactory queryFactory;

  @Autowired
  private UsersRepository usersRepository;

  @Autowired
  private EntityManager em;

  @Test
  public void testQueryDsl() {
    Users user1 = Users.builder().username("user1").build();
    Users user2 = Users.builder().username("user2").build();

    usersRepository.save(user1);
    usersRepository.save(user2);

    QUsers qUsers = QUsers.users;

    List<Users> users = queryFactory.selectFrom(qUsers)
        .fetch();

    Assertions.assertThat(users).hasSize(2);
    Assertions.assertThat(users.get(0).getUsername()).isEqualTo("user1");
    Assertions.assertThat(users.get(1).getUsername()).isEqualTo("user2");
  }
}
