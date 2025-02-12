package com.votegaheneta.configuration;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.sql.SQLQueryFactory;
import com.querydsl.sql.SQLTemplates;
import jakarta.persistence.EntityManager;
import java.sql.Connection;
import java.util.function.Supplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueryDslConfig {

  private final EntityManager entityManager;

  public QueryDslConfig(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  @Bean
  public JPAQueryFactory jpaQueryFactory() {
    return new JPAQueryFactory(entityManager);
  }

  @Bean
  public SQLQueryFactory sqlQueryFactory() {
    com.querydsl.sql.Configuration configuration = new com.querydsl.sql.Configuration(SQLTemplates.DEFAULT);
    return new SQLQueryFactory(configuration,
        (Supplier<Connection>) () -> entityManager.unwrap(Connection.class));
  }
}
