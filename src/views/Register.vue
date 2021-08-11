<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between p-6 border-b-4 border-blue-600 items-center">
      <h1 class="titlename">ChatChatChat</h1>
        <button class="button">
        <router-link to="/signin" class="px-4">サインイン</router-link>
      </button>
    </header>
    <div class="bg-gray-100 flex-auto">
        <div class="flex justify-center mt-16">
            <div class="w-2/5 border-4 border-blue-600 rounded-3xl bg-blue-600">
                <div class="text-center">
                  <div class="mt-6 flex">
                    <Entry class="mx-3 text-white"/>
                    <h2 class="text-4xl font-bold font-serif text-white">ユーザの登録</h2>
                  </div>
                    <form @submit.prevent="registerUser" class="bg-white rounded-b-3xl">                       
                    <p class="my-2 pt-6 flex ml-6">
                        <span class="font-semibold text-xl mt-2 font-serif">E-mail address</span>
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
                            <span class="font-semibold text-xl mt-2 font-serif">Password</span>
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
                                v-for="(error, index) in errors"
                                :key="index"
                                class="font-semibold text-red-700"
                                >
                                {{ error }}
                                </li>
                            </ul>
                        </div>
                            <button
                            type="submit"
                            class="decision"
                            >
                            ユーザの登録
                            </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Entry from "../components/icons/Entry";

export default {
  components: {
   Entry
  },
  data() {
    return {
      email: "",
      password: "",
      errors:[]
    };
  },
  methods: {
    registerUser() {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.email, this.password)
    .then(response => {
      const user = response.user;
      firebase
        .database()
        .ref("users")      
        .child(user.uid)
        .set({
          user_id: user.uid,
          email: user.email,
          displayName: user.displayName
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch(e => {
      console.log(e);
      if (e.code == "auth/email-already-in-use") {
        this.errors.push("入力したメールアドレスは登録済みです。");
      } else {
        this.errors.push(
          "入力したメールアドレスかパスワードに問題があります。"
        );
      }
    });
    }
  }
}
</script>