import axios from "axios";

function createPosts() {
  const posts = axios.create({
    baseURL: "http://localhost:3000/posts"
  });
  return posts;
}
const posts = createPosts();

//============== 글 ==============

function createReply() {
  const reply = axios.create({
    baseURL: "http://localhost:3000/reply"
  });
  return reply;
}
const reply = createReply();

function fetchPosts() {
  return posts.get("/");
}

function writePost(data) {
  return posts.post("write", data);
}

function detailPost(id) {
  return posts.get("detail/" + id);
}

function editPost(id, data) {
  return posts.put(id, data);
}

function deletePost(id) {
  return posts.delete(id);
}

function viewCtnUpPost(id) {
  return posts.put("view/" + id);
}

function replyCtnUpPost(id) {
  return posts.put("reply/" + id);
}

function rcmCtnUpPost(id) {
  return posts.put("rcm/" + id);
}

//테스트용
function apiTest() {
  return posts.get("api");
}

//============== 댓글 ==============

function fetchReply(id) {
  return reply.get(id);
}

function writeReply(data) {
  return reply.post("write", data);
}

function editReply(id, data) {
  console.log(JSON.stringify(data));
  return reply.put("/" + id, { data: data });
}

function deleteReply(id) {
  return reply.delete(id, { data: id });
}

export {
  fetchPosts,
  writePost,
  detailPost,
  apiTest,
  deletePost,
  editPost,
  viewCtnUpPost,
  replyCtnUpPost,
  rcmCtnUpPost,
  fetchReply,
  writeReply,
  editReply,
  deleteReply
};
