![nodejs](https://img.shields.io/badge/nodejs-14.18.2-green)

# PLASK-backend-coding-test

## Description

plask의 백엔드 코딩 테스트 입니다.
다음과 같은 기능을 구현하였습니다.

- User (Shop-Owner)
    - **회원가입** API를 구현합니다.
        - 회원가입 진행 시 받는 정보는 **이메일, 비밀번호, 이름, 전화번호** 입니다.
            - 회원가입 시 비밀번호는 세가지 종류 이상의 문자구성으로 8자리 이상의 길이로 구성된 문자열으로 검증합니다. (비밀번호 암호화 방식은 자유롭게 진행합니다.)
    - **로그인** API를 구현합니다.
        - 로그인 진행 시 받는 정보는 **이메일 및 비밀번호** 입니다.
          이메일과 비밀번호를 모두 입력 후 로그인 성공 시 로그인 **Token** 을 리턴합니다.
    - 회원탈퇴 API를 구현합니다.
        - 회원 탈퇴는 `Authorization` 검증을 통한 호출만 허용합니다.
- Shop
    - 쇼핑몰 리스트 API를 구현 합니다.
        - 쇼핑몰 리스트 조회 시 다음과 같은 정보는 확인할 수 있어야 합니다.
            - 쇼핑몰 id, 쇼핑몰 이름, 쇼핑몰 로고
        - Pagination 을 구현합니다. (Name 순)
        - (Optional) 쇼핑몰 이름 검색 옵션을 넣습니다.
    - 쇼핑몰 상세 조회 API를 구현합니다.
        - 이 때 쇼핑몰 정보 및 쇼핑몰 Owner 에 대한 정보도 얻을 수 있어야 합니다.
    - 쇼핑몰 등록 API를 구현합니다.
        - 쇼핑몰 등록은 `Authorization` 검증을 통한 호출만 허용합니다.
- Product
    - **상품 리스트 API를** 구현합니다.
        - 필터 기능이 있는 **상품 리스트**를 구현해야 합니다.
            - 필터는 **낮은 가격, 높은 가격, 평점, 최신순**으로 나뉘어 있습니다.
            - 낮은 가격을 적용하였을 때를 가정하면, 가장 낮은 가격을 가진 상품이 첫번째 표시가 되어야 합니다.
            - 기본 환경은 10개까지 로드되지만, 사용자 요청에 따라 20개~40개까지 로드할 수 있습니다. ( Pagination )
    - 상품 상세 정보 API를 구현합니다.
        - 유저가 상품을 클릭 했을 때 상세 정보를 확인할 수 있어야 합니다.
    - **상품 등록 및 삭제 API를** 구현합니다.
        - 상품 등록 시 받는 정보는 다음과 같습니다.
            - **상품 이름, 상품 설명, 이미지, 원가, 할인가**
        - 상품 삭제 및 등록 시 **등록된 ID**를 기반으로 상품을 삭제합니다.
        - 상품 등록 및 삭제는 `Authorization` 검증을 통한 호출만 허용합니다.
- ~~(Optional) Category~~
    - ~~쇼핑몰에서 카테고리에 따른 상품 리스트를 구현합니다.~~
        - ~~예) 남성, 여성, 아이~~

# Installation

다음과 같이 입력하여 해당 프로젝트를 실행할 수 있습니다.
```shell
cd ~
git clone https://github.com/tjsry0466/PLASK_backend-coding-test.git
cd PLASK_backend-coding-test
cp .env.example .env
cp .ormconfig.json.example .ormconfig.json
docker-compose -f docker-compose.yml up 

# 새로운 터미널을 엽니다.
cd ~/PLASK_backend-coding-test
nest start
``` 