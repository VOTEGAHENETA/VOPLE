package com.votegaheneta.configuration;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.votegaheneta.vote.mapper")
public class MybatisConfig {

}
