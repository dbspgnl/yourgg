<template>
  <div>
    <b-container>
      <b-card>
        <!-- 경고 -->
        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="success"
          @dismissed="dismissCountDown = 0"
        >
          수정에 성공했습니다.
        </b-alert>
        <!-- 타이틀 -->
        <h2>{{ items.title }}</h2>
        <b-row>
          <b-col sm="6" class="text-left">
            <span class="linkBtn" @click="goToList">목록가기 </span>|
            <span class="linkBtn" v-b-modal.modal-edit> 글수정 </span>|
            <span class="linkBtn" @click="deletePost()"> 글삭제</span>
          </b-col>
          <b-col sm="6" class="text-right">
            <div class="text-right">
              {{ items.name }}님 | 조회 {{ items.viewsCtn }} | 댓글
              {{ items.replyCtn }} | 추천 {{ items.rcmCtn }}
            </div>
          </b-col>
        </b-row>
        <!-- 본문 -->
        <hr />
        <div class="text-left">{{ items.content }}</div>
        <hr />
        <div>
          <b-button-group>
            <b-button variant="primary" @click="recommendUp">▲ 추천</b-button>
          </b-button-group>
        </div>
      </b-card>
      <!-- 답변 -->
      <b-card>
        <b-form>
          <b-row>
            <b-col sm="3">
              <form ref="replyForm" @submit.stop.prevent="writeReply">
                <b-form-input
                  v-model="replyForm.name"
                  type="text"
                  required
                  placeholder="이름"
                ></b-form-input>
                <b-form-input v-model="replyForm.list_num" hidden />
                <hr />
                <b-button type="submit" variant="primary">댓글 등록</b-button>
              </form>
            </b-col>
            <b-col sm="9">
              <b-form-textarea
                v-model="replyForm.content"
                style="height: 120px;"
              ></b-form-textarea>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
      <!-- 답변 -->
      <b-card class="text-left" v-if="isReply">
        <h3>댓글</h3>
        <b-card
          v-for="(item, i) in itemsReply"
          v-bind:key="i"
          class="replycard"
        >
          <b-row>
            <b-col sm="6">
              <h5>{{ item.name }}</h5>
            </b-col>
            <b-col sm="6" class="text-right">
              <!-- <span v-b-toggle.collapse-1 class="linkBtn">답변 </span>| -->
              <span
                class="linkBtn"
                v-b-modal.modal-editReply
                @click="setReplyEditSeq(item.seq)"
                >수정 </span
              >|
              <span class="linkBtn" @click="deleteReply(item.seq)"> 삭제</span>
            </b-col>
          </b-row>
          <div>{{ item.content }}</div>
          <!-- 답변의 답변 -->
          <!-- <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <p class="card-text">Collapse contents Here</p>
              <b-button v-b-toggle.collapse-1-inner size="sm"
                >Toggle Inner Collapse</b-button
              >
              <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card>Hello!</b-card>
              </b-collapse>
            </b-card>
          </b-collapse> -->
        </b-card>
      </b-card>
      <!-- 글 다이얼로그 -->
      <b-modal
        id="modal-edit"
        ref="modal"
        title="글수정"
        @show="resetModal"
        @hidden="resetModal"
        @ok="editPost"
      >
        <form ref="form" @submit.stop.prevent="editPost">
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
      <!-- 댓글 다이얼로그 -->
      <b-modal
        id="modal-editReply"
        ref="modal"
        title="댓글수정"
        @show="resetModal"
        @hidden="resetModal"
        @ok="editReply"
      >
        <form ref="replyEditForm" @submit.stop.prevent="editReply">
          <b-form-group label="Name">
            <b-form-input v-model="replyEditForm.name" required />
          </b-form-group>
          <b-form-group label="Content">
            <b-form-textarea v-model="replyEditForm.content" required />
          </b-form-group>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import {
  detailPost,
  editPost,
  deletePost,
  rcmCtnUpPost,
  viewCtnUpPost,
  fetchReply,
  writeReply,
  editReply,
  deleteReply
} from "@/api/index";
export default {
  name: "detail",
  props: {
    no: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        name: "",
        title: "",
        content: ""
      },
      replyForm: {
        name: "",
        content: "",
        list_num: ""
      },
      replyEditForm: {
        name: "",
        content: "",
        seq: ""
      },
      items: [],
      itemsReply: [],
      dismissSecs: 2,
      dismissCountDown: 0,
      isReply: true
    };
  },
  created() {
    this.detailPosts(); // 글 내용 세팅
    this.setDeail(); // 수정 내용 세팅
    this.viewUP(); // 조회수 ++
    this.replyForm.list_num = this.no; // 글 번호 세팅
    this.fetchReply(); // 댓글 모두 불러오기
  },
  methods: {
    goToList() {
      this.$router.push({ path: "/list" });
    },
    resetModal() {
      this.setDeail();
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async setDeail() {
      const { data } = await detailPost(this.no);
      this.form = data.posts;
    },
    async detailPosts() {
      const { data } = await detailPost(this.no);
      this.items = data.posts;
    },
    async editPost() {
      await editPost(this.no, this.form);
      this.showAlert();
      this.detailPosts();
    },
    async deletePost() {
      await deletePost(this.no);
      this.$router.push({ path: "/list" });
    },
    async recommendUp() {
      await rcmCtnUpPost(this.no);
      this.detailPosts();
    },
    async viewUP() {
      await viewCtnUpPost(this.no);
      this.detailPosts();
    },
    async fetchReply() {
      const { data } = await fetchReply(this.no);
      this.itemsReply = data.result;
      if (this.itemsReply.length === 0) this.isReply = false;
    },
    async writeReply() {
      await writeReply(this.replyForm);
      this.replyForm.name = "";
      this.replyForm.content = "";
      this.fetchReply();
    },
    async editReply() {
      await editReply(this.replyEditForm.seq, this.replyEditForm);
      this.fetchReply();
    },
    async deleteReply(seq) {
      const num = seq.toString();
      // alert(typeof num);
      alert("댓글 삭제!" + num);
      await deleteReply(num);
      this.fetchReply();
    },
    setReplyEditSeq(seq) {
      this.replyEditForm.seq = seq;
    }
  }
};
</script>

<style scoped>
.alert {
  position: absolute;
  width: 96%;
  z-index: 1;
}
.replycard {
  margin-bottom: 5px;
}
</style>
