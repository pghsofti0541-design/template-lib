# Website Agent Guide

이 문서는 `website/` 작업 시 에이전트가 반드시 지킬 최소 규칙만 담는다.
프로젝트별 정보, 메뉴, Figma 링크, 진행 상황은 `docs/guide.md`와 `docs/progress.md`를 기준으로 한다.

## 하드 룰

1. `aria-*`, `role`, `aria-current`, `aria-label` 같은 접근성 속성은 스타일 선택자로 쓰지 않는다.
   - 금지: `[aria-*]`, `[aria-current]`, `[aria-expanded]`, `[aria-controls]` 같은 접근성 속성을 CSS 선택자나 JS 상태 기준으로 사용하지 않는다. 상태 스타일과 토글 제어는 `is-active`, `is-current`, `is-open` 같은 전용 class와 DOM 구조 기준으로 처리한다.
2. 스타일이 필요하면 전용 class를 추가해서 제어한다.
3. 활성 상태는 `is-active`, `on` 같은 class로 처리한다.
4. 스크롤바 모양 문제를 JS, Swiper, 드래그 라이브러리로 먼저 풀지 않는다.
5. 스크롤 컨테이너와 폭/패딩 래퍼는 분리한다.
6. `id`는 앵커, 제어 대상, 스킵네비처럼 의미가 있을 때만 쓴다.
7. 불필요한 새 자산, 새 의존성, 새 JS는 늘리지 않는다.
8. PC와 모바일은 같은 마크업이라도 표현이 다르면 분기한다.


## 1. 먼저 확인할 것

- 작업 전 `docs/guide.md`에서 프로젝트 정보, 메뉴, Figma, 예외사항을 확인한다.
- 진행 상태는 `docs/progress.md`를 확인하고, 구조 변경이나 섹션 구현처럼 의미 있는 변경만 갱신한다.
- 실제 작업 파일은 `html/`, `resources/css/`, `resources/js/`, `resources/images/` 아래 파일을 기준으로 한다.

## 2. 작업 방식

- 기존 HTML/CSS/JS 구조와 class 이름을 최대한 유지한다.
- 현재 요청받은 섹션이나 파일만 수정하고, 전체 페이지를 불필요하게 재작성하지 않는다.
- Figma 작업은 필요한 노드나 섹션 단위로 확인한다. 전체 이미지나 asset을 무분별하게 내려받지 않는다.
- React/Tailwind 예시는 일반 HTML/CSS/JS 구조로 변환해서 적용한다.
- 새 라이브러리는 추가하지 않는다. 기존 jQuery, Swiper, AOS 사용 방식이 있으면 그 패턴을 따른다.

## 3. 기본 구조

```html
<body>
  <header id="header"></header>
  <main id="container"></main>
  <footer id="footer"></footer>
</body>
```

- 메인 템플릿: `html/main01.html` ~ `html/main03.html`
- 서브 템플릿: `html/sub01.html` ~ `html/sub03.html`
- 공통 CSS: `resources/css/common.css`, `layout.css`, `components.css`, `board.css`
- 유형별 CSS: `resources/css/main01.css` ~ `main03.css`, `sub.css`
- 공통 JS: `resources/js/common.js`, `layout.js`
- 유형별 JS: `resources/js/main01.js` ~ `main03.js`

## 4. 구현 규칙

- 단순 가로 정렬, 좌우 배치, 반응형 순서 조정은 `flex`를 우선 사용한다.
- 카드 목록이나 갤러리처럼 명확한 격자 구조에만 `grid`를 사용한다.
- 메뉴는 `docs/guide.md`의 1depth, 2depth, 3depth 구성을 HTML에 반영한다. 화면에 3depth가 보이지 않는 디자인이어도 마크업은 유지하고 CSS로 숨긴다.
- 접근성은 시맨틱 태그를 우선 사용하고, `label`, `caption`, skip navigation 등 기본 요소를 챙긴다. `aria-*`는 실제 동작 설명이 필요할 때만 추가한다.
- 이미지는 실제 이미지가 없으면 `resources/images/temp/`의 placeholder를 사용한다.
- Swiper 슬라이드가 링크라면 `.swiper-slide` 내부 전체를 `a`로 감싼다.


## 5. 완료 체크

- 선택하지 않은 템플릿 파일이 정리되어 있는가?
- 사용하지 않는 CSS/JS 링크가 남아 있지 않은가?
- 이미지 경로와 placeholder 경로가 정상인가?
- 모바일 메뉴 열기/닫기가 동작하는가?
- 콘솔 오류가 없는가?
- 반응형에서 텍스트, 버튼, 표가 겹치지 않는가?
- 구조 변경이나 구현 완료 내용이 `docs/progress.md`에 반영되어 있는가?
