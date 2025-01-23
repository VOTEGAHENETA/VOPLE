# ✨ VOPLE

### RTMP 실행 방법
1. Docker Desktop 설치
2. 터미널에서 `compose.yml`이 위치한 폴더로 가서 `docker compose up` 실행
3. 그럼 rtmp/hls가 돌아갑니다.

![실행화면](doc/image.png)
실행 시 이런 상태

### 개발 환경
- 기본적으로 올려둔 compose.yml은 현재 nginx-rtmp 컨테이너만 활성화했으므로 그냥 실행해도 됨
- 단, MySQL과 Spring Boot, client project는 docker를 통하지 않고 직접 실행하는 방식

### Spring Boot application 실행 전
- **Mysql database vople은 직접 생성해줘야 합니다(`/db/init.sql` 실행). -> 추후 로컬은 h2 전환예정** 

## 폴더 구조
### 전체
```
├── 📁 client
│   ├── 📁 Client project
│   ├── Dockerfile
├── 📁 db
│   ├── init.sql (DDL 정의 - schema, table)
├── 📁 hls (폴더 이하 내용은 방송 시작 시 생성, 종료 시 삭제됨)
│   ├── 스트리밍key-스트림번호.ts
│   ├── 스트리밍key.m3u8
├── 📁 nginx
│   ├── default.conf
│   ├── rtmp.conf
├── 📁 redis
│   ├── (Docker volume mount를 위한 빈 폴더, 관련 설정 생길 시 추가)
├── 📁 server
│   ├── 📁 Spring Boot server project
├── compose.yml
├── README.md

```
### Server - Spring Boot package
```
├── 📁 com.votegaheneta
│   ├── 📁 test (추후 본 개발 시 삭제)
│   │   ├── TestController.java
│   │   ├── StreamTestController.java
│   ├── 📁 Configuration
│   │   ├── WebConfig.java
│   │   ├── SecurityConfig.java
│   ├── 📁 server
│   │   ├── ServerApplication.java
```

### Client (필요 시 작성)
```
src/
│
├── assets/                    # 정적 리소스 저장소
│   ├── images/               # 이미지 파일들
│   ├── fonts/                # 폰트 파일들
│   └── styles/               # 글로벌 스타일 파일들
│
├── components/               # 아토믹 디자인 컴포넌트
│   ├── atoms/               # 가장 작은 단위의 컴포넌트
│   │   ├── Button/         # 버튼 컴포넌트
│   │   │   ├── Button.tsx  # 컴포넌트 파일
│   │   │   ├── Button.test.tsx  # 테스트 파일
│   │   │   ├── Button.stories.tsx  # 스토리 파일
│   │   │   └── index.ts    # 내보내기 파일
│   │   └── Input/          # 입력 컴포넌트
│   │
│   ├── molecules/           # atoms를 조합한 좀 더 복잡한 컴포넌트
│   │   ├── SearchBar/      # 검색바 (Input + Button)
│   │   └── FormField/      # 폼 필드 (Label + Input)
│   │
│   ├── organisms/          # molecules을 조합한 더 큰 단위
│   │   ├── Header/        # 헤더 (Logo + Navigation + SearchBar)
│   │   └── UserProfile/   # 사용자 프로필 섹션
│   │
│   └── templates/         # 페이지 레이아웃을 구성하는 템플릿
│       ├── MainLayout/    # 메인 레이아웃
│       └── AuthLayout/    # 인증 페이지 레이아웃
│
├── pages/                 # 실제 라우팅되는 페이지 컴포넌트들
│   ├── Home/             # 홈 페이지
│   ├── About/            # 소개 페이지
│   └── Auth/             # 인증 관련 페이지들
│
├── store/                # Zustand 스토어 관리
│   ├── auth/            # 인증 관련 스토어
│   │   ├── types.ts    # 타입 정의
│   │   └── store.ts    # 스토어 로직
│   └── common/          # 공통 스토어
│
├── hooks/               # 커스텀 훅
│   ├── useAuth.ts      # 인증 관련 훅
│   └── useForm.ts      # 폼 관련 훅
│
├── utils/              # 유틸리티 함수들
│   ├── api.ts         # API 관련 유틸
│   └── validation.ts  # 유효성 검사 유틸
│
├── types/             # TypeScript 타입 정의
│   ├── common.ts     # 공통 타입
│   └── api.ts        # API 관련 타입
│
└── constants/        # 상수 정의
    ├── routes.ts    # 라우트 경로
    └── config.ts    # 환경 설정

/*
 * 폴더 내 파일은 예시 데이터입니다.
 */
```
