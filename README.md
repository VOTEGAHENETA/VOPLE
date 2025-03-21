<img src="https://github.com/user-attachments/assets/48844617-a603-4303-9ed6-a1d5925a60d8" />

# 1. 프로젝트 개요

### 📋 서비스 개요

- 중고등학생 실시간 선거 플랫폼
- RTMP, HLS, WebSocket을 사용하여 **선거를 온라인으로 진행**할 수 있도록 돕는
  서비스입니다.
- **프로젝트 기간:** 2025/1/06 ~ 2025/2/21 (35일간)

### 💰 **서비스 특징**

1. **실시간 라이브**
   - 후보자는 **라이브 방송**을 통해 후보자와 시공간의 제약없이 소통 가능합니다.
2. **후보자별 채팅**
   - 유권자는 **후보자별 채팅방**을 통해 본인이 지지하는 후보자와 긴밀하게
     소통가능 합니다.
3. **실시간 투표 현황**
   - Web Socket을 활용해 **투표 진행 정보**를 실시간으로 제공합니다.
4. **디자인**
   - 학생들의 취향을 고려한 페이지 구성 및 디자인

### 👭팀원 정보 및 업무 분담 내역
| 이름           | 역할 및 구현 기능                                                                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🟧최효재(팀장) | **Backend**<br>- ERD 설계<br>- 선거 API 개발<br>- 채팅 기능 개발<br>- 사용자 인증 관리<br>- API 메서드 보안 적용<br>                                                                                                                                                                                             |
| 🟩이동영(팀원) | **Backend**<br>- 투표 API 개발<br>- 선거 API 개발<br>- 조회 로직 redis 캐싱<br> - 후보자 초성 검색 구현<br>- JPA 쿼리 최적화                                                                                                                                                                                                           |
| 🟦황규현(팀원) | **Backend**<br>- 스트리밍 API 개발<br>- WebSocket으로 스트림 수신<br>- 스트림을 FFmpeg로 RTMP 변환<br> <br>**Infra**<br>- 프로젝트 전체 구조 설정<br>- Docker, Docker-compose로 프로젝트 실행과 배포 환경 구축<br>- Jenkins로 CI/CD 구축<br>- RTMP-HLS 스트리밍 환경 구축 |
| 🟥강성엽(팀원) | **Frontend**<br>- figma 디자인<br>- client 프로젝트 구조 설정<br>- WebSocket과 hls.js를 활용한 라이브 스트리밍 구현<br>- 선거 및 투표 만들기 구현 <br>- 선거 메인 화면 구현 <br>- 유틸 기능 구현 (글자수 처리, 날짜 데이터 처리 등)<br> |
| 🟨김선명(팀원) | **Frontend**<br>- figma 디자인<br>- 페이지 마크업 및 스타일링<br>- axios, zustand, react-qeury를 활용한 데이터 바인딩 <br> - 투표하기 Session 구현 <br> - Web Socket을 활용한 실시간 투표 정보 제공<br>                                 |
| 🟪황연주(팀원) | **Frontend**<br>- figma 디자인 <br>  - SockJS와 STOMP 프로토콜 활용한 서비스 내 실시간 채팅 컴포넌트 구현 <br>- 사용자 및 후보자 정보 관리 구현<br>- 선거 유세를 위한 라이브 화면 구현 <br>   <br>                                                                                                                                                                                                     |

<br>

# 2. 설계 및 구현

### 🛠 기술 스택

**Frontend** <br>
![React](https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/react_query-FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white)
![Yarn Berry](https://img.shields.io/badge/yarn_berry-2C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Storybook](https://img.shields.io/badge/storybook-FF4785.svg?style=for-the-badge&logo=storybook&logoColor=white)
![SASS](https://img.shields.io/badge/sass-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-E26529.svg?style=for-the-badge&logo=zustand&logoColor=white)

**Backend** <br>
![Java](https://img.shields.io/badge/java-3670A0?style=for-the-badge&logo=java&logoColor=ffdd54)
![Spring](https://img.shields.io/badge/spring_boot-6DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/spring_security-6DB33F.svg?style=for-the-badge&logo=springsecurity&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/spring_data_jpa-6DB33F.svg?style=for-the-badge&logo=springdatajpa&logoColor=white)
![Spring Session](https://img.shields.io/badge/spring_session-6DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![OAuth2](https://img.shields.io/badge/oauth2-000000.svg?style=for-the-badge&logo=oauth2&logoColor=white)
![QueryDSL](https://img.shields.io/badge/QueryDSL-0089CF?style=for-the-badge&logo=querydsl&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)
![FFmpeg](https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)

**DevOps** <br>
![NginX](https://img.shields.io/badge/NginX-009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-D24939.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/amazon_ec2-FF9900.svg?style=for-the-badge&logo=amazonec2&logoColor=white)
![GitLab](https://img.shields.io/badge/gitlab-FC6D26.svg?style=for-the-badge&logo=gitlab&logoColor=white)

**Tools** <br>
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Intellij IDEA](https://img.shields.io/badge/Intelij_IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white)
![Swagger](https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Figma](https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

<br>

### 🖼️아키텍쳐 설계

<img src="https://github.com/user-attachments/assets/0f82d06b-e9c1-4bf2-80a0-09eb63285206" alt="아키텍쳐 설" />

<br>

### 💾데이터베이스 모델링(ERD)

<img src="https://github.com/user-attachments/assets/d4705450-9db8-481d-aec5-8f5360484012" alt="ERD" />

<br>

### 🎨화면 정의서(Figma)

[Figma_화면정의서](https://www.figma.com/design/vjvnTeJaKQ8GiHWMzViQQP/B102-%ED%99%94%EB%A9%B4%EC%A0%95%EC%9D%98%EC%84%9C?node-id=0-1&p=f&t=NiuQAB3cPmeqwIld-0)

<br>

### 📝기능명세서

[Notion_기능명세서](https://www.notion.so/46b7bdd2acd247c8b35a52599ee7cb6c?v=17ef92b0a86881e1a7a3000ca9079ee2&pvs=4)

<br>

### 📄API명세서

[Notion_API명세서](https://www.notion.so/c2fde4bab51e451385f94d83005db51a?v=182f92b0a86881388936000cb5a76f34&pvs=4)

<br>

### 🗂️프로젝트 폴더 구조

**Frontend** - Yarn Berry + Vite + React + Typescript

```text
client
├── .storybook
├── .yarn
├── public
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   ├── imgs
│   │   ├── styles
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   └── templates
│   ├── constants
│   ├── hooks
│   ├── mocks
│   ├── pages
│   ├── routes
│   ├── services
│   │   ├── hooks
│   ├── stores
│   ├── types
│   └── utils
```

**Backend** - Spring Boot

```text
server
├── src.main.java.com.votegaheneta
│   ├── chat
│   │   ├── component
│   │   ├── controller
│   │   ├── dto
│   │   ├── exception
│   │   └── service
│   ├── common
│   │   ├── component
│   │   ├── exception
│   │   ├── repository
│   │   └── response
│   ├── configuration
│   ├── interceptor
│   ├── security
│   │   ├── autorization
│   │   └── config
│   ├── stream
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── handler
│   │   ├── repository
│   │   └── service
│   ├── test
│   ├── user
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── enums
│   │   ├── repository
│   │   └── service
│   ├── util
│   │   ├── nickname
│   │   │   ├── component
│   │   │   ├── entity
│   │   │   └── repository
│   ├── vote
│   │   ├── controller
│   │   │   ├── request
│   │   │   └── response
│   │   ├── dto
│   │   ├── entity
│   │   ├── handler
│   │   ├── repository
│   │   └── service
```

<br>

<img src='./images/투표자_메인페이지탐방.gif' alt='투표자 메인 페이지 탐방' width='200' /> <img src='./images/투표자_스트리밍,채팅.gif' alt='투표자 스트리밍 채팅 기능능' width='200' /> <img src='./images/투표진행.gif' alt='투표진행' width='200' />

# 3. 기능 상세 설명

**Front-End**

- 개발환경: YarnBerry + Vite + React + Tyepscript
- 디자인 패턴: Atomic Design
- API 통신: Axios
- 상태 관리: Zustand
- 데이터 캐싱 관리: React-Query
- API Mocking Library: MSW
- UI Test: StoryBook
- SCSS

## ✅ 투표 관리(담당: 김선명)

### 진행 순서 및 핵심 기능

1. **후보자 선택하기**

   - 포스터를 클릭하면 후보자가 선택됩니다.
   - 선택된 후보자 정보는 상태 변화를 감지하는 빈칸에 입력됩니다.
   - 버튼을 클릭하면 선택한 후보를 확인하는 Modal 화면이 나타납니다.
   - 이 때 각 컴포넌트에 렌더링 되는 **데이터는 부모에서 Zustand**로 전역
     관리됩니다.

2. **선택한 후보 확인 Modal**

   - 선택한 후보를 Modal PopUp에서 확인합니다.
   - 투표 버튼을 누르면 Loading Modal으로 전환되며, 3초 후 결과 대기 페이지로
     이동.
   - 이 때 보내는 POST 요청은 **React-Query의 useMutation**을 사용해 진행됩니다.

3. **실시간 득표율 확인 및 투표 완료자 채팅방**

   - 투표를 완료한 사용자는 투표가 종료되기 전까지 대기 페이지에서 머무릅니다.
   - 실시간으로 받아오는 투표 데이터와 채팅은 **WebSocket**을 통해 관리됩니다.
   - 득표율에 따라 표시되는 순위와 이모티콘이 달라집니다.
   - axios를 통해 전달 받은 투표 종료 시간과 타임스탬프 값을 비교합니다.
   - 종료 시간이 되면 선거 최종 결과 페이지로 사용자를 이동 시킵니다.
   - 위 과정은 useEffect를 통해 데이터를 전부 가져온 후 이루어집니다.

4. **최종 결과 확인**

   - 이동된 투표자는 최종 결과를 확인합니다.
   - 각 투표별(회장, 부회장) 후보자들의 **상위 3명의 최종 득표율**을 확인할 수
     있습니다.

5. **로그인하지 않은 사용자의 경우**
   - 전체 사용자가 많이 가입한 상품 중 **우대 금리** 기준 상위 5개 상품을
     추천합니다.

## ✅ 라이브 스트리밍 (담당: 강성엽, 황규현)

### 1️⃣ 스트림 송신자 (방송 하는 사람)

- **MediaRecorder API**

  - `navigator.mediaDevices.getUserMedia`를 사용하여 사용자의 카메라 및 마이크
    스트림을 가져옴.
  - `MediaRecorder`를 활용해 `video/webm; codecs=vp8,opus` 포맷으로 영상을 녹화
    및 스트림 데이터 전송.
  - `WebSocket`을 통해 일정 주기(1초)로 녹화된 데이터를 서버로 전송.

- **RTMP**
  - WebSocket을 통해 송출된 스트림을 RTMP 서버에서 수집 및 변환.
  - HLS 스트리밍을 위한 RTMP → HLS 변환 처리.

### 2️⃣ 스트림 수신자 (방송 보는 사람)

- **Hls.js**
  - `Hls.js` 라이브러리를 사용하여 HLS 포맷 스트리밍을 재생.
  - `Hls.Events.MANIFEST_PARSED` 이벤트 발생 시 자동 재생 시도.
  - `Hls.Events.ERROR` 이벤트를 감지하여 오류 핸들링 및 디버깅 지원.

<br>

## ✅ 선거 및 투표 기능 (담당: 강성엽)

### 1️⃣ 선거 생성 기능

- **React State Management**

  - `useState`를 활용하여 선거 정보를 상태로 관리.
  - 날짜 및 시간을 별도의 상태(`dateState`)로 분리하여 입력값 유효성 검사 수행.

- **Form Validation**

  - 필수 입력값(`sessionName`, `wholeVoter`, `entranceQuestion`,
    `entranceAnswer`)이 누락되지 않도록 검사 후 경고 메시지 출력.
  - 선거 시작과 종료 시간이 유효한 범위 내에 있도록 조정.

- **API 연동**

  - `useCreateElection` 커스텀 훅을 사용하여 선거 생성 API 호출.

- **날짜 및 시간 처리**
  - `combineDateAndTimePost()`, `convertUTCToKST()` 유틸 함수를 활용하여 날짜와
    시간을 조합 및 변환.
  - 시작 시간과 종료 시간이 같은 경우 종료 시간을 최소 1분 이후로 조정하여
    유효한 범위 유지.

### 2️⃣ 후보자 지정 기능

- **상태 관리**

  - `useState`를 활용하여 후보자 목록(`candidateList`)과 유저 목록(`userList`)을
    상태로 관리.
  - `useCandidateStore`(Zustand)를 사용하여 전역 상태에서 후보자 그룹과 선택된
    후보자 정보를 저장 및 관리.

- **후보자 그룹 관리**

  - `useCandidateStore`를 활용하여 후보자 그룹 추가 및 활성화된 그룹 설정 기능
    제공.
  - 각 후보자는 하나의 그룹에만 포함될 수 있도록 검증 로직 적용.
  - 그룹을 선택한 후 후보자를 추가해야 하며, 선택하지 않고 추가 시 경고 메시지
    출력.

- **API 연동**
  - `usePostVoteTeam` 커스텀 훅을 사용하여 후보자 목록을 서버로 전송.
  - 후보자가 모든 그룹에 최소 1명 이상 배정되지 않으면 제출 불가능하도록 유효성
    검사 수행.

## ✅ 실시간 채팅 구현 (담당: 황연주)
### 1️⃣ 실시간 채팅
- **SockJS와 STOMP 프로토콜을 활용한 `useWebSocket` 커스텀 훅 구현**
  - `stompClient.current`를 통한 WebSocket 연결 상태 관리
  - `subscription.current`를 활용한 채팅방 구독 관리
  - `isMounted.current` ref를 통한 컴포넌트 라이프사이클 최적화

- **재사용 가능한 `ChatBoard` 컴포넌트 개발**
  - theme(dark/light)와 type(session/team) props를 통한 스타일 및 채널 분기 처리
  - `MessageList` 컴포넌트와 `ChatBar` 컴포넌트로 구조화
  - `messageAreaRef`를 활용한 자동 스크롤 기능 구현
    
- **메시지 타입별 처리 로직 구현**
  - System Message(userId: 0)와 User Message 분기 처리
  - `formatTime` 함수를 통한 시간 포맷팅 표준화
  - `updateMessages` 함수를 통한 메시지 상태 안전한 업데이트


### 2️⃣ 실시간 참여자 수 업데이트 기능
- **WebSocket 구독을 통한 실시간 데이터 처리**
  - `participantCount` 상태로 참여자 수 관리
  - JSON 파싱된 데이터에서 `participantCount` 필드 분기 처리
  - `styles.sessionCnt`를 활용한 세션별 스타일링 적용

<br>

## ✅ 라이브 선거 유세 (담당 : 황연주)
### 1️⃣ 스트리밍 화면 처리
- **역할별 스트리밍 컴포넌트 분기 처리**
  - `StreamSender`(후보자용) / `StreamReceiver`(투표자용) 컴포넌트 동적 렌더링
  - `getIsMine` API를 통한 후보자 여부 확인
  - 라이브 송출 기능의 모바일 접근 제한을 위한 `StreamMobileBlock` 컴포넌트 구현
- **`isStreaming` 상태에 따른 조건부 렌더링**
  - 스트리밍 전이라면 `LoadingSpinner`와 사용자를 위한 안내 문구 렌더링
- **라이브 진행 여부에 따른 사용자(후보자/투표자) 화면 분기 처리** 
  - `useStreamData` 커스텀 훅을 활용한 스트리밍 상태 관리
  - `StreamingState` 인터페이스를 통한 타입 안정성 확보

### 2️⃣ 탭 기반 후보자 정보 조회 시스템
- **`TabContainer` 컴포넌트를 활용한 멀티탭 인터페이스 구현**
- **`useMemo`를 활용한 채팅 탭의 불필요한 리렌더링 방지**
  - 채팅 탭과 후보자 정보 탭의 독립적인 상태 관리
  - 탭 전환 시 채팅 연결 상태 유지

<br>

## ✅  사용자/후보자 정보 관리(담당 : 황연주)
### 1️⃣ 사용자 정보 수정
- **`UserInfoSection` 컴포넌트 구현**
  - `UserInfoFormData` 타입을 활용한 폼 데이터 관리
  - 닉네임과 사용자 이름 입력 필드 유효성 검사
  - 재사용 가능한 InputField 컴포넌트 활용

### 2️⃣ 후보자 정보 수정
- **`CandidateInfoSection` 컴포넌트 개발**
  - `VoteTeamInfoFormData` 인터페이스를 통한 타입 안정성 확보
  - 파일 업로드 기능 (`fileInputRef` 활용)
  - 공약 관리 기능 (추가/삭제/수정)
    - 최대 5개 공약 제한 (공약당 100자 제한)
    - 이미지 파일 유효성 검사 (타입, 크기 제한)

<br>

<br>


**Back-End**
- 개발환경: Spring Boot + JPA + Spring Security
- 데이터: MySQL, Redis
- RTMP 변환: FFmpeg

## ✅ 선거방 입장 플로우 (담당: 최효재)
- **카카오 로그인**
  - `Spring Security`를 이용해 카카오 로그인 API에 관한 설정을 유지
  - `CustomOauth2User`를 구현해 카카오 인증 성공시 DB에 유저 정보를 저장
  - `CustonUserService`와 `CustomSuccessHandler`를 정의하여 사용자 정보 관리

- **선거방 입장**
  - `Spring Interceptor`를 이용해 특정 선거의 GET API가 호출됐을때 인터셉터가 가로챔
  - 이미 선거 DB에 존재하는 사용자면 true를 리턴해 선거방 입장
  - 존재하지 않는 사용자이면 질문-답변 화면으로 클라이언트 URL을 리다이렉트

- **URL 캐싱**
  - 카카오 인증 시도 전 URL을 `RequestCache`에 저장하여 인증 성공 핸들러에서 캐싱된 URL로 리다이렉트
  - `RequestCache`가 처리해야할 쿼리스트링(`?entrance`)를 지정하여 매칭되는 URL만 캐싱


## ✅ 선거 및 투표 (담당: 이동영, 최효재)
- **선거 CRUD**
  - 선거 정보에 관한 생성, 조회, 수정, 삭제 기능 API 개발

- **투표 CRUD**
  - 관리자로서 새로운 투표 생성, 삭제 API 구현
  - 삭제될때 자식 엔티티의 삭제작업을 `Batch`작업으로 쿼리 최적화

- **후보자 선정 CRUD**
  - 특정 선거 안의 투표에 후보자 지정을 하는 메소드를 GET과 POST로 나눠서 구현
  - GET 메서드는 `QueryDSL`를 사용해 쿼리 구현
  - POST 메서드로 생성, 수정, 삭제 기능을 한번에 구현
  - 사용자 입력이 들어올때마다 해당 투표의 후보 정보를 전체 삭제 후 새로운 후보로 삽입

- **후보자 정보 CRUD**
  - 후보자의 공약, 자기소개, 칭호 등의 관한 정보들에 대한 API 개발

- **투표 WebSocket**
  - 투표를 진행하는 POST 요청에서 투표 데이터가 DB에 저장된 후, `SimpMessagingTemplate`을 통해 `WebSocket`을 구독 중인 클라이언트들에게 실시간으로 투표 결과를 전달
  
- **redis 캐싱**
  - 최종 투표 결과는 redis에 `session:vote:result:"+sessionId` 이 keyname으로 저장되고 결과 요청시 redis에서 먼저 조회 후 결과를 반환 
  
- **후보자 초성 검색**
  - 후보자 검색 api 요청시 초성을 정규표현식으로 변환 ex) ㄱ->[가-깋] QueryDSL을 사용해서 현재 투표의 사용자를 검색 후 `Pattern` 객체를 통해 정규식 패턴을 생성 후 `stream`을 통해 pattern 필터링과 페이징 처리 후 불변 리스트로 결과를 반환
  
- **선거 세션 QR코드 생성**
  - zxing라이브러리를 사용해 `MultiFormatWriter`로 QR코드를 생성 `MatrixToImageWriter`를 통해 QR코드를 이미지로 변환 
  
- **batch insert**
  - 후보자, 공약 데이터의 대량 삽입 시 JdbcTemplate의 batchUpdate를 활용하여 쿼리 성능 최적화
  
- **poster file 저장**
  - `@RequestPart`로 `MultipartFile`과 `VoteTeamInfoRequest`를 따로 받아서 "/app/uploads" 이 경로로 ec2 클라우드에 저장 db에는 `https://{host}/uploads/type/uuid_파일명`으로 저장
## ✅ 채팅 (담당: 최효재)

### 1️⃣ 채팅 기능
- **채팅방 구독**
  - `/ws`로 클라이언트와 서버간 웹소켓 연결
  - `MessageBroker`를 이용하여 `/api/room/{type}/{roomId}`에 채팅 데이터 구독 (type은 Session이나 Team이 들어감)

- **채팅 송수신**
  - `/api/room/{type}/{roomId}`으로 사용자가 채팅 전달 후 해당 채널을 구독하고 있는 모든 참여자에게 채팅 브로드캐스팅
  - 채팅 데이터는 `Redis`로 관리해 사용자의 동시채팅과 채팅 불러오기 API에서 낮은 지연속도를 달성
  - 채팅이 입력될때마다 `Redis`의 list에 `push`와 `trim`메서드를 동시에 호출해 일정한 수의 채팅을 유지하며 시간복잡도 최소화

- **채팅방 인원 유지**
  - 웹소켓의 `EventListener`를 통해 사용자의 구독과 연결해제를 수신함
  - 사용자의 인증 정보와 채팅방 ID를 key로 사용, 자바의 `CuncurrentHashMap`을 이용하여 경합상황 방지

## ✅ 라이브 스트리밍 (담당: 황규현)
### 1️⃣ 스트림 송신자 (방송 하는 사람)
- **WebSocket**
  - Spring boot의 `WebSocketConfigurer`를 implement하여 웹소켓 수신.
  - `WebSocket`을 통해 일정 주기(1초)로 녹화된 데이터를 수신.

- **FFmpeg**
  - Spring boot의 `BinaryWebSocketHandler`를 implement하여 소켓 수신 및 handling.
  - `FFmpegSession`을 별도로 정의하고 `ConcurrentHashMap`을 사용하여 여러 방송 세션을 스트림 키 기준으로 관리.
  - `FFmpeg`를 이용하여 스트림을 RTMP로 변환.

- **RTMP**
  - `Process`와 `OutputStream`을 통해 RTMP 프로토콜을 사용하여 `nginx-rtmp` 서버에 전송.

### 2️⃣ 스트림 수신자 (방송 보는 사람)

- **NGINX-RTMP**
  - Spring Boot로부터 전송받은 RTMP를 HLS로 변환.

- **Hls**
  - `/opt/data/hls` 폴더에 각 라이브 스트리밍별로 `{streamkey}.m3u8` 파일과 `{streamkey}-{stream}.ts` 파일들을 저장.
  - 브라우저에서 `https://{host}/hls/{streamkey}.m3u8`로 요청했을 때 스트리밍 영상 제공.

<br>

**Infra**
- 웹서버: NginX
- 스트리밍: Nginx-rtmp
- 실행환경: Docker, Docker-compose
- CI/CD: Jenkins
- 배포: AWS EC2

## ✅ 배포 환경 구축 (담당: 황규현)
### 1️⃣ 웹서버
- **NGINX**
  - `HTTPS`를 적용하고 여 사이트의 보안 향상.
  - `Reverse Proxy`을 통해 브라우저에서 오는 모든 HTTPS와 WSS요청을 server와 nginx-rtmp 컨테이너로 프록시.

- **NGINX-RTMP**
  - Spring Boot로부터 전송받은 RTMP를 HLS로 변환.

### 2️⃣ 배포 환경 구축과 CI/CD

- **Docker, Docker-compose**
  - `docker`를 이용하여 실행환경을 컨테이너화.
  - 배포에 사용되는 컨테이너 6개를 `docker-compose`로 묶어서 배포.

- **Jenkins**
  - Docker에서 Jenkins image를 pull 받아서 실행
  - 파이프라인 스크립트를 작성하여 배포

- **AWS EC2**
  - 제공받은 AWS EC2 사용

<br>

# 4. 소감

**🟧 최효재**

- 프로젝트 요구사항에 맞는 새로운 기술들을 공부하고 적용해보는 시간이었습니다(`Spring Security`, `Redis`, `Websocket`, `Oauth2`, `JPA`, `QueryDSL`)
- 리팩토링을 하는 과정 혹은 새로운 기능을 추가하는 과정에서 기존의 기능들에서 에러가 발생하는 경우가 있었습니다. 
  이를 통해 테스트 케이스의 중요성을 뼈저리게 느꼈습니다. 이런 예상치 못한 에러는 프로젝트 기간 계산에 상당한 난관이었습니다.
- 프론트와 백엔드로 개발환경을 나누어서 협업하는 경험이 처음이었는데 `Swagger`를 이용한 협업이 상당히 중요함을 느꼈습니다.
- 로컬과 클라우드 환경에서의 차이에서도 많은 에러를 만났습니다. 또한 배포환경을 테스트하기 위해 `branch`가 한개여서 테스트하기가 어려웠습니다.
  다음 프로젝트에서는 `master` 브랜치와 `release`브랜치를 나누어서 관리하는 것을 고려해야겠다고 느꼈습니다.
- 팀원들이 적극적으로 프로젝트에 참여해서 저 혼자였으면 절대 하지 못할 일의 양을 잘 분담했기에 이렇게 완성할 수 있었다고 생각합니다.
  또한 같이 일궈냈던 프로젝트인만큼 스스로도 자부심을 느끼고 뿌듯했던 경험이었습니다.


**🟥 강성엽**

- 최신 기술들(`React Query`, `Zustand`, `Storybook`, `msw` 등)을 이론으로만
  공부를 하고 실제 적용해 본적이 없었습니다. 짧은 프로젝트 기간이여도 팀원 모두
  도전하는 마음으로 프로젝트에 사용해보며 적응할 수 있는 좋은 기회였습니다.
- UI 작업을 하며 세세한 부분까지 배울 수 있었고, 이를 통해 많이 성장했습니다.
  앞으로도 이번 프로젝트에서 배운 점들을 바탕으로 더 나은 개발자가 되겠습니다.
- 협업 프로젝트를 하며, 개발 과정에서 지치는 것보다 인간관계에서 오는 피로감을
  더 많이 느낄 것이라 예상했지만, 좋은 팀원들과 함께하며 그런 걱정을 할 필요가
  없었음을 느꼈습니다.
- '느리지만 천천히', 제 삶의 모토로 급하지 않게 프로젝트를 하나하나 나아가는
  것입니다. 팀원들도 급하지 않고 차근차근 자신의 역할을 200% 해주어 좋은 결과가
  나왔다고 생각합니다.
- 모두 고생했습니다.


**🟨 김선명**

- 처음으로 리액트+타입스크립트+Atomic Design Pattern을 도입하며 프로젝트 설계에
  대한 중요성을 느낄 수 있었습니다.
- UI와 로직이 왜 분리되어야 하는가, 설계를 어떻게 해야 하는가, 전역 상태 관리가
  왜 만능이 아닌가에 대해 배울 수 있었습니다.
- 피그마 목업을 멋있게 꾸미고, 프론트엔드 팀원을 위해 자신이 더 고생했던 연주
  누나.
- 로그인과의 싸움에서 이기고 돌아와 팀을 위해 주말을 반납하며 QA를 진행했던
  효재.
- 복잡한 API 데이터 구조에 대해 최대한 설명 해주며 프론트 팀원들이 원하는대로
  데이터베이스를 수정해주었던 동영이.
- 덕분에 Frontend에 대해 많은 것을 배우고, 다양한 기술스택에 도전해볼 수 있었던
  성엽이.
- 내가 쓴 API 함수가 제대로 작동하는 지 확인해주고, 다른 팀원들이 작업할 때
  서버를 지키고 있었던 규현이.
- 좋은 팀원들을 만나 프로젝트를 하는 동안 즐겁게 진행할 수 있었고, 많은 것을
  배울 수 있었습니다. 기회가 된다면 다시 한번 프로젝트를 진행하고 싶습니다.


**🟩 이동영**
- 이번 프로젝트에서는 Spring, JPA를 적용해서 REST API를 구현했습니다. JPA가
  기존의 MyBatis와 다른점이 많아 배우고 적용하는게 새롭고 재밌었습니다. 
- JPA에서 N + 1 문제가 많이 발생해서 이걸 최적화 하는데 시간을 많이 투자했습니다.
- 더욱 빠른 요청 처리를 위해 redis 캐싱, insert batch 쿼리를 최적화 작업을 많이 고민했던것 같습니다.
- 다양한 전공의 사람들과 함께해서 많은 인사이트를 얻을 수 있었습니다.
- 문제가 발생했을 때 팀원들과 함께 해결방안을 찾아가는것이 특히 값진 경험이었습니다.
- 우리팀 모두 열심히 참여했고, 잘 해주어서 너무 좋은 결과를 만들어낸것 같아서 만족하는 프로젝트였습니다. 
- 우리팀원 모두들 고생 많으셨습니다.


**🟦 황규현**
- 스트리밍 구현이 까다로웠는데 잘 구현되어서 다행입니다.
- 프로젝트에서 기술 스택을 선택할 때, 할 수 있는 것에 프로젝트를 끼워맞추는 게 아니라 프로젝트에 필요한 환경을 만들고, 기술을 찾아 사용하는 과정을 익힐 수 있었습니다.
- 소켓 프로그래밍은 여러모로 저에게 과제 같은 것이었는데 막상 사용해보니 어려운 것이 아니었습니다 ^^;
- 인프라로 분류되었지만 사실 서버 하나를 관리하는 정도였음에도, 단순히 Docker로 환경만을 통일했던 예전보다 배포에도 적극적으로 활용하고, CI/CD와 로깅 그리고 HTTPS와 프록시까지 많은 것을 배웠고 웹 서비스와 서버 구조를 제대로 알게 됐습니다.
- 팀원들 모두가 열심히 하고, 그만큼 실력이 다들 좋은 분들이어서 프로젝트가 원활히 마무리 될 수 있었습니다. 정말 고생 많으셨습니다.


**🟪 황연주** 
- React Query, Zustand와 같은 최신 상태 관리 라이브러리를 활용하고 팀원들과 코드 리뷰를 하며 더 나은 코드를 고민해볼 수 있어 좋았습니다.
- 여러 신기술과 코드 리팩토링을 하면서 재미도 느꼈고, 자극도 많이 받았습니다.
- React Query의 캐싱 개념을 이해하고 적용하는 것에 대해 많이 고전했던 것 같습니다. 
- 팀 적으로는 좋은 팀원들을 만나 많은 것을 배울 수 있었고, 함께 할 수 있어 좋았던 순간이 많았습니다. 
- 팀원들 모두 끝없는 토론과 각자의 일을 척척 해낸 덕분에 정말 좋은 결과물이 나올 수 있었다고 생각합니다. 
- 이 소감을 통해서라도 팀원 한분 한분께 못다 전한 깊은 감사의 마음을 전하고 싶습니다.
- 팀원들을 위해 누구보다 노력하고, 먼저 행동하고 팀장으로서 진실된 모습뿐 아니라 마지막까지 멋진 능력을 보여줬던 효재. 
- 더 나은 코드를 함께 고민하고, 리뷰하며 더 성장할 계기를 만들어주며 지치지 않게 앞에서 끌어준 FE 팀장이자 분위기 메이커 성엽이. 
- 빠른 판단력과 결단력으로 때론 열띤 토론으로 과열되었던 팀 분위기를 잘 중재하고, 누구보다 깊은 마음으로 팀원들을 챙겼던 선명이.
- 항상 밝고 리액션으로 팀 분위기를 환하게 만들고, 프로젝트 협업에 있어서도 그 누구보다 활발한 소통력과 능력을 보여줬던 동영이.
- 높은 능력치로 든든하게 우리 팀의 인프라를 지키고, 항상 내 옆 짝꿍으로 의지가 많이 되었던 귀엽고 든든한 규현이.
- 모두에게 감사하고, 고생한 만큼 각자 더 성장해서 다들 승승장구 했으면 좋겠습니다.

