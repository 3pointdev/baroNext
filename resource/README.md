#프로젝트

####개발환경

- nodejs 20.4.0
- react 18.2.0
- nextjs 13.2.1

####개발 스크립트

- 의존성 설치가 필요한 경우 yarn install or npm install 실행
- yarn or npm 사용
- yarn dev 혹은 npm run dev
- 스크립트는 package.json 에서 확인 및 편집가능

####배포 스크립트

- 의존성 설치가 필요한 경우 yarn install or npm install 실행
- yarn or npm 사용
- yarn build 후 yarn start 혹은 npm run build 후 npm run start
- 스크립트는 package.json 에서 확인 및 편집가능

####프로젝트 주요 경로

- /resource/components 모든 컴포넌트가 포함된 경로
- /resource/config url,상수 등 모든 설정이 포함된 경로
- /resource/modules 자주 사용되는 기능 함수 모듈 경로
- /resource/pages next.js router 경로
- /resource/public font, image 같은 asset 이 존재하는 경로
- /resource/styles CSS 경로 \* styled-components 사용으로 각 View, Component에 스타일이 적용되어 있음.
- /resource/src/dto 서버 요청 관련 DTO
- /resource/src/mobx mobx(state 관리) 관련
- /resource/src/models 서버 응답 관련 모델
- /resource/src/viewModels ViewModel 관련

#참고

####리팩토링

- 초기 개발된 환경은 VueJS 기반으로 개발이 진행됬으며, 현 소스코드는 타입 스트립트로 전환 및 프로젝트 구조를 부분 리팩토링을 진행하고 있는 상태
- 명확한 타입 정의, 기존 수많은 분기점 대신 의존성을 주입하여 사용하는 방식으로 변경, 중복 코딩된 소스 코드 재사용 및 캡슐화가 목적

####사이트 설정

- /app/pages/\_app.js 에서 처리됨
