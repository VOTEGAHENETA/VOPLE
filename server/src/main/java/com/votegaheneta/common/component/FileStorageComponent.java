package com.votegaheneta.common.component;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStorageComponent {

  private static final int MAX_FILE_SIZE = 5 * 1024 * 1024;
  // 리눅스 배포 환경용 경로
  private static final String UPLOAD_URL = "/uploads";
  private static final String DATE_PATTERN = "yyyy/MM/dd";

  @Value("${base_url}")
  private String mediaUrl;

  public String fileSave(MultipartFile file, String type) {
    if (file != null) {
      validateFile(file);
      try {
        String subDirectory = createSubDirectory(type);
        String fileName = createFileName(file.getOriginalFilename());
        System.out.println("여기는?");
        String fullFileName = mediaUrl + "/uploads" + saveFile(file, subDirectory, fileName);
        return  convertToRelativePath(fullFileName);
      } catch (IllegalStateException | IOException e) {
        throw new IllegalArgumentException("파일 처리중 오류가 발생했습니다", e);
      }
    }
    return null;
  }

  public String convertToRelativePath(String fullFileName) {
    return fullFileName.replace(mediaUrl + "/uploads", "").replace("\\", "/");
  }

  private String saveFile(MultipartFile file, String subDirectory, String fileName)
      throws IOException {
    try {
      Path fullPath = Paths.get(UPLOAD_URL, subDirectory, fileName);
      Files.createDirectories(fullPath.getParent());
      file.transferTo(fullPath.toFile());
    } catch (Exception e) {
      e.printStackTrace();
    }
    return File.separator + subDirectory + fileName;
  }

  private String createFileName(String originalFilename) {
    return File.separator + UUID.randomUUID() + "_" + originalFilename;
  }

  private String createSubDirectory(String type) throws IOException {
    String datePath = LocalDateTime.now().format(DateTimeFormatter.ofPattern(DATE_PATTERN));
    File directory = new File(UPLOAD_URL, type + File.separator + datePath);
    directory.mkdirs();
    return type + File.separator + datePath;  // 상대 경로만 반환
  }

  private void validateFile(MultipartFile file) {
    if (file.isEmpty()) {
      throw new IllegalArgumentException("빈 파일은 업로드할 수 없습니다.");
    }
    if (file.getSize() > MAX_FILE_SIZE) {
      throw new IllegalArgumentException("파일 크기가 너무 큽니다. 최대 5MB 이하의 파일만 업로드할 수 있습니다.");
    }
  }
}
