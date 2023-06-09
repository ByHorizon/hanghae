# Mini project - 팀 바닥에서 하늘까지 소개 홈페이지

# 프로젝트 소개

팀 바닥에서 하늘까지 소개 홈페이지 입니다.

![mainpage](https://github.com/ByHorizon/hanghae/assets/84562770/40b691c4-aaf4-47da-a045-53c26818954c)

<br/>
<br/>
<br/>

### 목차

-   프로젝트 소개
-   구현 기능
-   배운 점 & 아쉬운 점

<br/>

<br/>

<br>

## 구현 기능

-   html 마크업 빌드 & css 스타일링
-   방명록 글 저장, 수정, 삭제 구현
-   방명록 수정, 삭제 시 비밀번호 입력
-   비밀번호 암호화
-   db에 저장된 방명록 글 불러와 html에 삽입
-   반응형 디자인

<br>

## 배포 링크

-   [AWS](http://mini.eba-cqpj3jhf.ap-northeast-2.elasticbeanstalk.com/)

## API

|    기능     | Method |    URL     | request | response |
| :---------: | :----: | :--------: | :-----: | :------: |
| 방명록 삭제 | `GET`  | /guestbook |   {}    |    {}    |
| 방명록 저장 | `POST` | /guestbook |   {}    |    {}    |
|   방명록    | `POST` |  /update   |   {}    |    {}    |
|   방명록    | `POST` |  /delete   |   {}    |    {}    |