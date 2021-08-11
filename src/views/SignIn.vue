<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between p-6 border-b-4 border-blue-600 items-center">
      <p class="titlename">ChatChatChat</p>
      <button class="button">
        <router-link to="/register">Chatをはじめる</router-link>
      </button>
    </header>
    <div class="bg-gray-100 flex-auto">
      <div class="flex justify-center mt-16">
        <div class="w-2/5 border-4 border-blue-600 rounded-3xl bg-blue-600">
          <div class="text-center">
            <div class="mt-6 flex">
              <Key class="mx-3 text-white"/>
            <h2 class="text-4xl font-bold font-serif text-white">サインイン</h2>
            </div>
            <form @submit.prevent="signIn" class="bg-white rounded-b-3xl">
                <p class="my-2 pt-6 flex ml-6">
                  <span class="font-semibold text-xl mt-2 font-serif">メールアドレス</span>
                </p>
                <div class="mb-2">
                    <input
                    type="email"
                    v-model="email"
                    placeholder="メールアドレス"
                    class="text-2xl w-11/12 p-3 border rounded"
                    />
                </div>
                <div class="mb-2">
                  <p class="my-2 pt-4 flex ml-6">
                    <span class="font-semibold text-xl mt-2 font-serif">パスワード</span>
                  </p>
                    <input
                    type="password"
                    v-model="password"
                    class="text-2xl w-11/12 p-3 border rounded"
                    placeholder="パスワード"
                    />
                </div>
                <div v-if="errors.length">
                    <ul class="my-4">
                    <li
                        v-for="(error, index) in errors "
                        :key="index"
                        class="font-semibold text-red-700"
                    >{{ error }}</li>
                    </ul>
                </div>
                <button type="submit" class="decision">サインイン</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes typing { from { width: 0; } }
@keyframes caret { 50% { border-color: transparent; } }
.titlename{
  font-family: 'Teko', sans-serif;
  color: #3366FF;
  font-weight: bold;
  width: 11ch;
  border-right: .08em solid;
  overflow: hidden;
  font-size: 3em;
  white-space: nowrap;
  animation: typing 4s steps(11, end), caret .5s step-end infinite;
}

.button{
  background:	#3366FF;
  padding: 14px 22px;
  color: white;
  box-shadow: 0 5px black;
  font-size: 18px;
  font-weight: bold;
  border-radius:20px;
}
.button:hover{
  box-shadow: none;
  transform: translate(0,5px);
}

.decision{
  background:#33CC66;
  padding: 14px 40px;
  color: white;
  box-shadow: 0 5px black;
  font-size: 20px;
  font-weight: bold;
  border-radius:20px;
  margin-bottom: 30px;
  margin-top: 20px;
}
.decision:hover{
  box-shadow: none;
  transform: translate(0,5px);
}
</style>


<script>
import firebase from "firebase/app";
import "firebase/auth";
import Key from "../components/icons/Key";

export default {
  components: {
   Key
  },
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          console.log(response);
          this.$router.push("/");
        })
        .catch(() => {
          this.password = "";
          this.errors.push("メールアドレスかパスワードに誤りがあります。");
        });
    }
  }
};
</script>