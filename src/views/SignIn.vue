<template>
    <div class="home">
    <header>
      <p class="titlename">ChatChatChat</p>
      <button class="button">
        <router-link to="/register">Chatをはじめる</router-link>
      </button>
    </header>
      <div class="screen">
        <div class="main">
        <div class="signin">
            <div class="signin-header">
              <div class="signin-text">
              <Key class="item"/>
            <h2 class="signin-header-text">サインイン</h2>
            </div>
              <form @submit.prevent="signIn" class="signin-box">
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
                        v-for="(error, index) in errors "
                        :key="index"
                        class="error-text"
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
.home{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-content: center;
  border-bottom-width: 4px;
  border-bottom-color: #3366FF;
}

.signin-padding{
  padding: 20px;
}

@keyframes typing { from { width: 0; } }
@keyframes caret { 50% { border-color: transparent; } }
.titlename{
  font-family: 'Teko', sans-serif;
  color: #3366FF;
  font-weight: bold;
  padding-top: 10px;
  width: 11ch;
  border-right: .08em solid;
  overflow: hidden;
  font-size: 50px;
  white-space: nowrap;
  animation: typing 4s steps(11, end), caret .5s step-end infinite;
}

.button{
  background:	#98FB98;
  padding: 14px 22px;
  color: #fff;
  box-shadow: 0 5px black;
  font-size: 18px;
  font-weight: bold;
  border-radius:20px;
}
.button:hover{
  box-shadow: none;
  transform: translate(0,5px);
}

.screen{
  flex: auto;
  background-color: #EEFFFF;
}

.main{
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.signin{
  width: 40%;
  border-width: 4px;
  border-color: #3366FF;
  border-radius: 1.5rem;
  background-color: #3366FF;
}

.signin-header{
  align-items: center;
  padding: 1px;
}

.signin-text{
  /* margin-top: 25px; */
  margin: 25px 0;
  display: flex;
}

.item{
  margin: 0 16px;
  color: #fff;
}

.signin-header-text{
  font-size: 40px;
  line-height: 3rem;
  font-weight: bold;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  color: #fff;
}

.signin-box{
  background-color: #fff;
  border-radius: 0 0 30px 30px;
}

.signin-mail{
  padding: 15px 0;
  padding-top: 35px;
  display: flex;
  margin-left: 25px;
}

.mail-text{
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 20px;
}

.password-box{
  margin-bottom: 10px;
}

.text-box{
  width: 510px;
  font-size: 20px;
  line-height: 60px;
  border-radius: 10px;
  padding-left: 20px;
}

.error{
  margin: 10px 0;
}

.error-text{
  font-size: 20px;
  color: red;
}

.decision{
  background: #98FB98;
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

/*                       */
/*       レスポンシブ      */
/*                      */
@media (max-width: 560px) {
  .home{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  header{
    width: 100%;
    height: 110px;
  }
  .titlename{
  padding-top: 22px;
  font-size: 34px;
  }
  .button{
  padding:0px;
  font-size: 10px;
  width: 25%;
  height: 90%;
  font-weight: bold;
  border-radius: 70px;
  }
  .screen{
  height: 100%;
  }
  .main{
    margin-top: 1px;
    height: 565px;
  }
  .signin{
  width: 100%;
  }
  .signin-box{
  margin-top: 40px;
  }
  .text-box{
  width: 90%;
  font-size: 20px;
  line-height: 60px;
  border-radius: 10px;
  padding-left: 20px;
  }
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