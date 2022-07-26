# wanted_pre_onboarding_assignment
원티드 프리온보딩 개인 과제

# 서비스 개요
- 본 서비스는 SNS(Social Networking Service)입니다.
- 사용자는 본 서비스에 접속하여, 게시물을 업로드 하거나 다른 사람의 게시물을 확인하고, 좋아요를 누를 수 있습니다.

# 요구사항
### 유저관리
- 유저 회원가입
  - 이메일을 ID로 사용
- 유저 로그인 및 인증
  - JWT 토큰을 발급 / 사용자 인증
  - 로그아웃은 프론트엔드 처리 가정

### 게시글
- 게시글 생성
  - 제목, 내용, 해시태그 등을 입력하여 생성
  - 제목, 내용, 해시태그는 필수 정보
  - 작성자는 request body 존재 x, 요청한 인증 정보에서 추출 등록
  - 해시태그는 #로 시작되고 ","로 구분되는 텍스트가 입력  
  ex) { "hashtags": "#맛집,#서울,#브런치 카페,#주말", ... }
- 게시글 수정
  - 작성자만 수정
- 게시글 삭제
  - 작성자만 삭제
  - 작성자는 삭제된 게시글을 복구 가능
- 게시글 상세보기
  - 모든 사용자는 모든 게시물에 보기권한이 있음
  - 작성자를 포함한 사용자는 본 게시글에 좋아요를 누를 수 있음,  
    좋아요된 게시물에 다시 좋아요를 누르면 취소
  - 작성자를 포함한 사용자가 게시글을 상세보기 하면 조회수가 1 증가(횟수 제한 x)
- 게시글 목록
  - 모든 사용자는 모든 게시물에 보기권한이 있음
  - 게시글 목록에는 제목, 작성자, 해시태그, 작성일, 좋아요 수, 조회수 포함
> **아래의 기능은 쿼리 파라미터로 구현.** ex) ?search=..&orderBy=..  
> 아래 4가지 동작은 각각 동작 할 뿐만 아니라, 동시에 적용될 수 있음  
>> Ordering (= Sorthing, 정렬)  
>> 사용자는 게시글 목록을 원하는 값으로 정렬  
>> (default: 작성일 / 작성일, 좋아요 수, 조회수 중 1개 만 선택가능)  
>> 오름차 순, 내림차 순으로 선택할 수 있음  

>> Searching (= 검색)
>> 사용자는 입력한 키워드로 해당 키워드를 포함한 게시물을 조회  
>> &#35; Like 검색, 해당 키워드가 문자열 중 포함된 데이터 검색  
>> 검색 방법 1. some-url?search=후기 -> "후기" 가 제목에 포함된 게시글 목록  
>> ex) 후기 검색 시 -> 00 방문후기 입니다.(검색 됨)  

>> Filtering (= 필터링)  
>> 사용자는 지정한 키워드로 해당 키워드를 포함한 게시물을 필터링  
>> 예시 1) Some-url?hashtags=서울 -> "서울" 해시태그를 가진 게시글 목록  
>> 예시 2) some-url?hashtags=서울,맛집 -> "서울" 과 "맛집" 해시태그를 모두 가진 게시글 목록  
>> ex) "서울" 검색 시 -> #서울(검색됨) / #서울맛집(검색안됨) / #서울,#맛집(검색됨)  
>> ex) "서울,맛집" 검색 시 -> #서울(검색안됨) / #서울맛집(검색안됨) / #서울,#맛집(검색됨)  

>> Pagination (=페이지 기능)  
>> 사용자는 1 페이지 당 게시글 수를 조정할 수 있음(default: 10건)

# API 설계
![sns-service-api](https://user-images.githubusercontent.com/67082984/180637036-e5d818c4-edc6-4403-b249-a53881124030.png)

# DB ERD 설계
![sns-service-erd](https://user-images.githubusercontent.com/67082984/180637041-5e72c0cc-8b8e-4047-bce6-732822610bc3.png)



