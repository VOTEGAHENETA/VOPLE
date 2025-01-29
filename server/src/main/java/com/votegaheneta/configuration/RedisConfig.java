package com.votegaheneta.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

  @Value("${spring.data.redis.host}")
  private String redisHost;

  @Value("${spring.data.redis.port}")
  private int redisPort;

  @Bean
  public RedisConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory(redisHost, redisPort);
  }

  @Bean
  public RedisTemplate<String, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
    RedisTemplate<String, ?> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory);
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(genericJackson2JsonRedisSerializer());
//    redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(ObjectMapperProvider.createObjectMapper()));
    return redisTemplate;
  }

  @Bean
  public GenericJackson2JsonRedisSerializer genericJackson2JsonRedisSerializer() {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    objectMapper.activateDefaultTyping(objectMapper.getPolymorphicTypeValidator(),
                                       ObjectMapper.DefaultTyping.NON_FINAL); // 클래스 타입 정보 추가
    return new GenericJackson2JsonRedisSerializer(objectMapper);
  }
}
