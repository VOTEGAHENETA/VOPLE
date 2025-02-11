package com.votegaheneta.util.nickname.component;

import com.votegaheneta.util.nickname.entity.Animal;
import com.votegaheneta.util.nickname.entity.Attribute;
import com.votegaheneta.util.nickname.repository.AnimalRepository;
import com.votegaheneta.util.nickname.repository.AttributeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.springframework.boot.sql.init.dependency.DependsOnDatabaseInitialization;
import org.springframework.stereotype.Component;

@Component
@DependsOnDatabaseInitialization
public class NicknameGenerator {

  private static final List<Animal> animalList = new ArrayList<>();
  private static final List<Attribute> attributeList = new ArrayList<>();
  private static int MAX_SIZE;

  private final AnimalRepository animalRepository;
  private final AttributeRepository attributeRepository;

  private NicknameGenerator(AnimalRepository animalRepository,
      AttributeRepository attributeRepository) {
    this.animalRepository = animalRepository;
    this.attributeRepository = attributeRepository;
    init();
  }

  private void init() {
    animalList.addAll(animalRepository.findAll());
    attributeList.addAll(attributeRepository.findAll());
    MAX_SIZE = animalList.size();
  }

  public static String generateNickname() {
    Random random = new Random();
    Animal animal = animalList.get(random.nextInt(MAX_SIZE));
    Attribute attribute = attributeList.get(random.nextInt(MAX_SIZE));
    return String.format("%s %s", attribute.getDescribing(), animal.getAnimalName());
  }
}
