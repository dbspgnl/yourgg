<template>
  <div class="list">
    <b-container>
      <!-- 타이틀 & 메뉴 -->
      <b-row style="padding-top: 10px;">
        <b-col class="text-left"><h2>자유게시판</h2></b-col>
        <b-col class="text-right" align-self="center">
          <b-dropdown id="dropdown-1" right text="" class="m-md-2" size="sm">
            <b-dropdown-item @click="perPage = 5">5</b-dropdown-item>
            <b-dropdown-item @click="perPage = 10">10</b-dropdown-item>
            <b-dropdown-item @click="perPage = 25">25</b-dropdown-item>
          </b-dropdown>
          <b-button v-b-modal.modal-prevent-closing size="sm">
            <b-icon icon="pencil-square"></b-icon> 등록</b-button
          >
        </b-col>
      </b-row>

      <!-- 테이블 -->
      <b-table
        :fields="fields"
        :items="items"
        hover
        no-border-collapse
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template #cell(title)="data">
          <!-- <div class="linkBtn" @click="goToDetail(items[data.index].seq)"> -->
          <div class="linkBtn" @click="goToDetail(data.item.seq)">
            {{ data.value }}
          </div>
        </template>
      </b-table>

      <!-- 다이얼로그 -->
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="글쓰기"
        @show="resetModal"
        @hidden="resetModal"
        @ok="writeData"
      >
        <form ref="form" @submit.stop.prevent="writeData">
          <b-form-group label="Name">
            <b-form-input v-model="form.name" required />
          </b-form-group>
          <b-form-group label="Tilte">
            <b-form-input v-model="form.title" required />
          </b-form-group>
          <b-form-group label="Content">
            <b-form-textarea v-model="form.content" required />
          </b-form-group>
        </form>
      </b-modal>

      <!-- 페이지네이션 -->
      <div class="mt-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-number
          last-number
          align="center"
        ></b-pagination>
      </div>
    </b-container>
  </div>
</template>

<script>
import { fetchPosts, writePost } from "@/api/index";
export default {
  data() {
    return {
      fields: [
        {
          key: "title",
          label: "Title",
          formatter: "title"
        },
        {
          key: "name",
          label: "Name",
          formatter: "name",
          thStyle: { width: "30%" }
        },
        {
          key: "date",
          label: "Date",
          sortable: true,
          thStyle: { width: "30%" }
        }
      ],
      items: [],
      form: {
        title: "",
        name: "",
        content: ""
      },
      //페이지네이션
      rows: 0, //총갯수
      perPage: 5, //한페이지당
      currentPage: 1
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    resetModal() {
      this.form.name = "";
      this.form.title = "";
      this.form.content = "";
    },
    async fetchData() {
      const { data } = await fetchPosts();
      this.items = data.posts;
      this.rows = this.items.length; // 총 글 갯수 세팅
    },
    async writeData() {
      await writePost(this.form);
      this.fetchData();
    },
    goToDetail(num) {
      this.$router.push({ path: "/detail", query: { no: num } });
    }
  }
};
</script>

<style scoped>
table {
  color: #dedede;
}
.list {
  color: #dedede;
}
</style>
