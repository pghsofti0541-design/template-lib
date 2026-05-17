# Project Guide

프로젝트별 정보와 예외사항을 기록하는 문서. 공통 작업 규칙은 `../AGENTS.md`를 기준으로 한다.

## 프로젝트 구조

```text
template/
├─ AGENTS.md
├─ docs/
│  ├─ guide.md
│  └─ progress.md
├─ css/
├─ js/
├─ images/
├─ fonts/
├─ patterns/
├─ main01.html
├─ main02.html
├─ main03.html
├─ sub01.html
├─ sub02.html
└─ sub03.html
```

## 프로젝트 기본 정보

- 사이트명: 예시 사이트
- 페이지 기본 타이틀: 예시 사이트 - 기관명
- 설명 문구: 예시 사이트의 주요 서비스와 정보를 안내합니다.
- 대표 이미지: images/common/og_image.jpg

## 메뉴 작성 기준

- 메뉴 구성도에 적은 1뎁스, 2뎁스, 3뎁스 항목은 헤더 HTML에 모두 넣는다.
- 화면에서 3뎁스를 사용하지 않는 디자인이어도 HTML에서는 삭제하지 않고 CSS에서 숨긴다.
- 메뉴명 변경 요청은 기본적으로 구조 변경이 아니라 텍스트와 항목 수 반영으로 처리한다.

## 메뉴 구성도

- 사업소개
  - 인공지능
    - 인공지능1
    - 인공지능2
  - 온나라
  - 인프라

- 회사소개
  - 회사위치
    - 찾아오시는 길
    - 문의하기

- PR센터
  - 갤러리
  - 보도자료

- 고객지원
  - 문의하기
  - 자주묻는 질문

## 섹션 구성

### 메인

1.
2.
3.

### 서브

1.
2.
3.

## HTML 구조

- 기본 페이지는 `header`, `main`, `footer` 구조를 우선 사용한다.
- 공통 영역은 기존 마크업과 class명을 유지한다.
- 섹션 단위로 작업하며, 필요한 영역만 수정한다.

```html
<body>
  <header id="header"></header>
  <main id="container"></main>
  <footer id="footer"></footer>
</body>
```

## CSS 구조

- `common.css`: reset, font, 변수, 기본 태그 스타일
- `layout.css`: header, footer, gnb 등 공통 레이아웃
- `components.css`: button, card, tab, form 등 공통 컴포넌트
- `board.css`: 게시판, 검색, 페이징
- `main.css`: 메인 페이지 전용 스타일
- `sub.css`: 서브 페이지 전용 스타일
- `main01.css` ~ `main03.css`: 스타터 유형별 메인/서브 스타일

## JS 구조

- `common.js`: 공통 유틸 또는 사이트 공통 동작
- `layout.js`: header, mobile menu, language, top button 등 레이아웃 공통 동작
- `main01.js` ~ `main03.js`: 스타터 유형별 메인 비주얼 및 페이지 전용 동작
- `js/plugin/`: 외부 플러그인
- 페이지 전용 JS는 해당 페이지 역할에 맞는 파일에 작성한다.
- 불필요한 라이브러리는 추가하지 않는다.

## Figma 정보

- Figma 링크: https://figma.com/...
- 우선 작업 섹션: 메인 비주얼, 공지사항, 푸터

## 디자인 메모

- 주요 컬러: primary #005BAC, text #111, line #DDD
- 폰트: Pretendard, 기본 16px, 본문 line-height 1.6
- 버튼/폼: 버튼 높이 48px 기준, 모바일은 width 100%, input/select 높이 48px 통일
- 이미지 비율: 비주얼 16:6, 카드 썸네일 4:3, 게시판 썸네일 1:1
- 반응형 특이사항: 768px 이하에서 2단 그리드는 1단으로 변경, 테이블은 가로 스크롤 처리

## 패턴 사용 메모

- 패턴 목록: 루트 `patterns/index.html`
- 사용할 패턴:
- 수정해야 할 class명:
- 실제 페이지에 옮길 CSS/JS:

## 작업 기준

- Figma 또는 디자인 자료는 구조를 먼저 확인한다.
- 현재 작업할 섹션만 확인하고 구현한다.
- 기존 컴포넌트와 패턴을 우선 재사용한다.
- 완료 후 반응형, 접근성, 콘솔 오류를 점검한다.

## 검수 메모

- 반응형:
- 접근성:
- 브라우저:
- 콘솔 오류:
- 미처리 항목:
