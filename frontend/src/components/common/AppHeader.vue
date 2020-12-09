<template>
  <header>
    <!-- 첫번째 -->
    <div class="header">
      <b-container>
        <b-row class="text-center">
          <b-col>
            <router-link to="/" class="logo">
              YOUR.GG
              <!-- <span v-if="isUserLogin">by {{ $store.state.username }}</span> -->
            </router-link>
          </b-col>
          <b-col cols="8">
            <b-form-input
              class="search-bar"
              placeholder="소환사"
              style="width:90%; display:inline"
            ></b-form-input>
            <b-button variant="primary" style="margin-left: 10px;"
              >검색</b-button
            >
          </b-col>
          <b-col class="text-right">
            <img
              src="@/styles/images/region-kr.png"
              fluid
              alt="Responsive image"
            />
            <img src="@/styles/images/lang.png" fluid alt="Responsive image" />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- 두번째 -->
    <div class="menu">
      <b-container class="text-left">
        <a href="https://your.gg/kr/item">
          <span
            ><b-icon
              class="h3 mb-2 menu_style"
              icon="server"
              variant="primary"
            />
            아이템DB</span
          ></a
        >
        <a href="https://your.gg/kr/duo/reqest">
          <span
            ><b-icon
              class="h3 mb-2 menu_style"
              icon="people-fill"
              style="color: #47a447"
            />
            듀오 신청</span
          ></a
        >
        <a href="https://your.gg/kr/about/ggx/ko">
          <span
            ><b-icon
              class="h3 mb-2 menu_style"
              icon="stickies-fill"
              style="color: #5bc0de"
            />
            더 보기</span
          ></a
        >
        <router-link to="/">
          <span class="linkhover"
            ><b-icon
              class="h3 mb-2 menu_style"
              icon="card-list"
              style="color: #dc3545"
            />
            게시판</span
          ></router-link
        >
      </b-container>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    gotoList() {
      this.$router.push({ path: "/list" });
    }
  }
};
</script>

<style scoped>
.username {
  color: white;
}
a {
  color: #dedede;
  font-size: 18px;
}
a:hover {
  color: #dedede;
  font-size: 18px;
  text-decoration: none;
}
a.logo {
  font-size: 26px;
  font-weight: 900;
  color: white;
}
.logo > span {
  font-size: 14px;
  font-weight: normal;
}
.navigations a {
  margin-left: 10px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.logout-button {
  font-size: 14px;
}
a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
.search-bar {
  background-color: #191c20;
  border-color: #191c20;
}
.search-bar:focus {
  background-color: #191c20;
  border-color: #191c20;
}
.menu_style {
  display: inline;
  background-color: black;
  margin-left: 1.5%;
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  padding: 0.6%;
}
span {
  font-size: 0.875rem;
}
img {
  width: 25%;
  border-radius: 50%;
  margin-left: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 10px 20px;
  background-color: #000000;
  z-index: 2;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 10px 20px;
  background-color: #191c20;
  color: #dedede;
  z-index: 2;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}
.linkhover {
  cursor: pointer;
}
</style>
