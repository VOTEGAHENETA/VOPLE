package util;

import java.util.Random;

public class ColorGenerator {
  private static final Random random = new Random();

  public static String generateColor() {
    int red = random.nextInt(256);
    int green = random.nextInt(256);
    int blue = random.nextInt(256);
    return String.format("#%02x%02x%02x", red, green, blue);
  }
}
