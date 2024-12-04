# 🍞E-geo-sa-jo🍞
#### 추운 겨울하면 붕어빵!! 주변 지역 붕어빵집을 다같이 찾아주세요!!

링크: 

# 👨‍👩‍👧‍👦 Our Team
| 한다영        |    김지은      |  이경민        |    정은혜      |    박준석   |   문다슬    |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| [@gksek015](https://github.com/gksek015) | [@zzieni](https://github.com/zzieni) | [@zzxx66052](https://github.com/zzxx66052)   |    [@gracejelly125](https://github.com/gracejelly125) |  [@bj9322](https://github.com/bj9322) | [@Raina-Moon](https://github.com/Raina-Moon)

<br/>

### [📄 프로젝트 노션 바로가기](https://teamsparta.notion.site/abe7227d0b014adf894df5a1b5a9b0fd)

<br/>

# 🔗 프로젝트 기능
### ✅ supabae를 활용한 로그인, 회원가입
- Authentication에서 제공하는 API를 이용하여 로그인, 회원가입 구현
- 회원가입: 이메일, 비밀번호, 닉네임 실시간 유효성 검사. 모든 필드가 채워지지 않으면 회원가입 불가
- 로그인 : 이메일, 비밀번호 실시간 유효성 검사 기능

### ✅ 홈페이지의 주요 기능
- 게시글 작성 이동
- Top10 리스트 불러오기
- 현재위치 지도에 불러오기
- 검색시 해당 키워드에 맞는 장소 지도에 표시
- 검색한 마커 클릭시 해당위치가 어떤지점인지 표시

### ✅ Top 10 리스트 페이지의 주요 기능
- 게시글 좋아요 Top 10 리스트 확인
- Top 10 리스트를 토대로 내림차순 정렬
- 리스트 클릭시 해당 게시글 확인

### ✅ 디테일 페이지 주요기능
- 상점 정보 표시 : 이름, 주소, 카테고리, 설명
- 수정 기능 : 게시물 작성자인 경우 “수정하기” 버튼 표시하여 게시물 작성자에 한해 수정 페이지로 이동
- 지도 보기 기능 : “지도보기” 버튼 클릭 시 카카오맵 연동을 통한 위치 정보 표시
- 뒤로가기 기능 : “돌아가기” 버튼을 통해 이전 페이지로 이동
- 댓글 작성 : `useRef`를 사용하여 입력 필드 참조
- 댓글 목록 표시 및 삭제 : 각 댓글에 대한 사용자 프로필 이미지, 닉네임, 내용 표시
- 좋아요 및 댓글 수 표시 : 누적 댓글, 좋아요 수 표시 / 좋아요 클릭 시 좋아요 상태 토글

### ✅ 마이 프로필 페이지
- 프로필 이미지 변경 기능 : 사용자 사진 파일 업로드, 이미지 미리보기, supabase 이미지 파일 업로드
-  닉네임 변경 기능 : 네임 유효성 검사, supabase 닉네임 업데이트
-  비밀번호 변경 기능 : 비밀번호 유효성 검사, supabase 비밀번호 업데이트
- 회원탈퇴 기능 : supabase user 데이터 삭제, 홈 화면으로 리다이렉트

### ✅ 마이페이지
- 슈퍼베이스를 활용한 이미지 관리 및 활용
- 게시물 읽어오기
- 게시물 삭제하기
- 카테고리 기반 필터링
- 게시물 클릭시 디테일 페이지로 라우팅

### ✅ 동적 페이지 라우팅
- Private, Public 페이지를 구분하여 로그인 여부에 따라 접근 권한 제어
- 공통 레이아웃 설정(헤더, 푸터)

### ✅ CRUD 페이지
- 포스팅 페이지: 지도에 마커를 찍으면 주소란에 자동으로 주소 작성
- 포스팅 페이지에서 작성한 것 외에 좌표까지 저장
- supabase에 저장된 정보들의 좌표 정보를 가져와서 미리 지도에 마커
- 지도에 마커를 찍으면 포스팅 페이지와 같이 주소란에 자동완성 가능

<br/>

# 🔧 Development Environment
`react-kakao-maps-sdk` `supabase/supabase-js` `tanstack/react-query` `tanstack/react-query-devtools` `zustand` `react-icons` `react-router-dom` `styled-components: ^6.1.13` `react-toastify` `styled-reset`

<br/>

# 📡 Technologies & Tools
<div>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS&logoColor=white" />
<img src="https://img.shields.io/badge/StyledComponent-FF4785?style=flat-square&logo=StyledComponent&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=flat-square&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/kakao-FFCD00?style=flat-square&logo=kakao&logoColor=white"/>
</div>

<br/>

# 🍀 프로젝트 구조
```bash
📦src
 ┣ 📂api
 ┃ ┣ 📜authApi.js
 ┃ ┣ 📜myPageApi.js
 ┃ ┣ 📜postApi.js
 ┃ ┣ 📜postUpdateDeleteApi.js
 ┃ ┗ 📜profileApi.js
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜LoginComponent.jsx
 ┃ ┃ ┗ 📜SignupComponent.jsx
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜CommentForm.jsx
 ┃ ┃ ┣ 📜CommentList.jsx
 ┃ ┃ ┗ 📜InteractionComponent.jsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜HeroSession.jsx
 ┃ ┃ ┣ 📜MapDisplay.jsx
 ┃ ┃ ┗ 📜SearchBar.jsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┗ 📜Layout.jsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📜MyComponent.jsx
 ┃ ┣ 📂myProfile
 ┃ ┃ ┣ 📜ProfileDataForm.jsx
 ┃ ┃ ┗ 📜ProfileImageForm.jsx
 ┃ ┣ 📂posting
 ┃ ┃ ┣ 📜PostForm.jsx
 ┃ ┃ ┣ 📜PostMap.jsx
 ┃ ┃ ┣ 📜PostUpdateDelete.jsx
 ┃ ┃ ┗ 📜UpdateMap.jsx
 ┃ ┗ 📂store
 ┃ ┃ ┣ 📜StoreDetail.jsx
 ┃ ┃ ┗ 📜StoreInfo.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useCommentsData.js
 ┃ ┣ 📜useLikesData.js
 ┃ ┣ 📜useSearchPlaces.js
 ┃ ┣ 📜useStoreData.js
 ┃ ┣ 📜useTopLikeData.js
 ┃ ┗ 📜useUserLocation.js
 ┣ 📂pages
 ┃ ┣ 📜DetailPage.jsx
 ┃ ┣ 📜HomePage.jsx
 ┃ ┣ 📜ListPage.jsx
 ┃ ┣ 📜LoginPage.jsx
 ┃ ┣ 📜MyPage.jsx
 ┃ ┣ 📜MyProfilePage.jsx
 ┃ ┣ 📜PostPage.jsx
 ┃ ┣ 📜SignupPage.jsx
 ┃ ┗ 📜UpdatePostPage.jsx
 ┣ 📂shared
 ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┣ 📜PublicRoute.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂styled
 ┃ ┗ 📜GlobalStyle.jsx
 ┣ 📂supabase
 ┃ ┗ 📜supabaseClient.js
 ┣ 📂zustand
 ┃ ┣ 📜useAuthStore.js
 ┃ ┣ 📜useCommentStore.js
 ┃ ┣ 📜useDetailStore.js
 ┃ ┣ 📜useLikesStore.js
 ┃ ┗ 📜usePostStore.js
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```
