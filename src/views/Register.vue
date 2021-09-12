<template>
    <div class="home">
      <header>
      <p class="titlename">ChatChatChat</p>
        <button class="button">
        <router-link to="/signin" class="signin-padding">サインイン</router-link>
      </button>
    </header>
      <div class="screen">
          <div class="main">
            <div class="signin">
                  <div class="signin-header">
                    <div class="signin-text">
                    <Entry class="item"/>
                    <h2 class="signin-header-text">ユーザの登録</h2>
                  </div>
                    <form @submit.prevent="registerUser" class="signin-box">
                      <div class="signin-mail">
                        <span class="mail-text">E-mail address</span>
                      </div>
                          <div class="password-box">
                            <input
                            type="email"
                            v-model="email"
                            placeholder="メールアドレス"
                            class="text-box"
                            />
                        </div>
                          <div class="password-box">
                          <div class="signin-mail">
                            <span class="mail-text">password</span>
                          </div>
                            <input
                                type="password"
                                v-model="password"
                                class="text-box"
                                placeholder="パスワード"
                            />
                        </div>
                        <div v-if="errors.length">
                            <ul class="error">
                                <li
                                v-for="(error, index) in errors"
                                :key="index"
                                class="error-text"
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