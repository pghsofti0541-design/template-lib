# 패턴 작업 규칙

이 폴더는 복붙용 패턴을 만드는 곳이다. 샘플은 샘플답게, 패턴은 패턴답게 유지한다.

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

## 레이아웃 분리

- `layout.css`는 헤더 예시가 아니라 샘플 사이트의 공통 쉘만 맡는다.
- 헤더 관련 스타일은 `header/*.html` 안에서 각 예시가 자체적으로 가진다.
- 공통 쉘에는 `#wrap`, 본문 여백, 푸터, 탑버튼, 공통 레이아웃 보정만 둔다.
- 샘플용 보정 스타일은 `sample.css`.
- 복붙해야 하는 서브 패턴 CSS는 각 HTML 패턴 안에 둔다.
- 서브비주얼, 서브컨테이너, SNB는 페이지마다 달라질 수 있으니 공통 CSS로 무리하게 올리지 않는다.
- `m_nav/*.html`은 모바일 내비 예시 파일이다. 공통 셸과 DOM 훅이 맞는 경우에만 `layout.js`를 재사용하고, PC 내비 스타일/동작은 예시 파일 안에서 따로 둔다.

## 수정 방식

- 변경 범위는 필요한 부분만 작게 잡는다.
- 기존 템플릿 분위기와 구조는 가능한 유지한다.
- 비슷한 기능이 여러 개면 공통 동작은 하나로 두고, 시각 차이는 CSS로 나눈다.
- HTML, CSS, JS를 한 파일에 두더라도 PC 영역 규칙을 먼저 두고, 그 바로 아래에 PC/Mobile 전환용 미디어쿼리를 둔 뒤, 모바일 규칙을 배치한다.
- CSS와 JS는 큰 구분 주석으로 PC 영역과 모바일 영역이 바로 보이게 나눠서, 다른 파일로 떼어낼 때 범위를 쉽게 찾을 수 있게 한다.
- PC와 모바일에서 같은 모양의 기능이라도 `.pc_nav`와 `.mb_nav` 선택자를 한 CSS 규칙으로 묶지 않는다. 새창 아이콘, depth 링크, 활성 상태처럼 양쪽에 모두 필요한 스타일도 PC 영역과 모바일 영역에 각각 따로 작성한다.

## 모바일 기준

- 모바일에서 메뉴가 열릴 때 본문을 밀지 말고, 일반적인 드롭다운처럼 위에 뜨게 한다.
- 모바일용 드롭다운은 버튼 + 패널 구조를 우선 쓴다.
- PC에서 보이는 가로 스크롤과 모바일에서의 드롭다운은 같은 컴포넌트로 섞지 말고 분리해서 관리한다.

## 검증 기준

- 작업 후에는 `rg`로 다음을 점검한다.
  - `aria-current`가 스타일 선택자로 쓰였는지
  - `aria-label`이 디자인 선택자로 쓰였는지
  - 불필요한 JS가 추가됐는지
  - 스크롤 래퍼가 이중으로 잡혔는지

## 인코딩 기준

- 파일 저장은 UTF-8로 통일한다.
- PowerShell에서 파일을 쓸 때는 저장 인코딩을 명시한다.
- `Set-Content`나 `Out-File`을 쓸 때도 인코딩을 생략하지 않는다.
- 콘솔 출력이 깨져 보여도 바로 재저장하지 말고, 먼저 실제 바이트나 저장 인코딩을 확인한다.

## File Edit Safety

- Use pply_patch for manual file edits.
- Do not rewrite HTML, CSS, or Markdown files with Set-Content or Out-File unless -Encoding utf8 is explicit.
- For search-and-replace, prefer minimal patches over command-based bulk rewrites.
- If file text looks garbled in the console, verify the actual encoding before saving anything back.

