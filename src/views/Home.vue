<template>
<!--              -->
<!--   sideber   -->
<!--              -->
    <div class="home-screen">
      <div class="home-sideber">
        <div class="home-sideber-title">
        <h1 class="title">ChatChatChat</h1>
      </div>
      <button class="channelbutton" @click="showAccoutModal">アカウント名変更</button>
      <div class="sideber-username">
        <span class="check"></span>
        <span class="name" @click="directMessage(user.email)">{{ user.displayName }}</span>
      </div>
        <div
        class="name-screen"
        style="background-color:rgba(0,0,0,0.5)"
        v-show="accoutModal"
        @click="closeAccoutModal"
        >
        <div class="name-box" v-on:click.stop>
            <div class="name-box-padding">
              <div class="name-box-change">
              <h2 class="name-box-title">アカウント名変更</h2>
              <span @click="closeAccoutModal" class="name-box-cancel">×</span>
            </div>
            <div class="name-box-name">名前</div>
             <div class="name-box-box">
              <input
                type="text"
                class="name-box-input"
                v-model="accout"
              />
             </div>
              <div class="name-box-click">
              <button
                class="name-box-button"
                @click="createUser"
              >OK!</button>
              </div>
          </div>
        </div>
      </div>
        <div class="channel-bar">
          <div class="channelname">ちゃんねる</div>
          <PlusCircle @click.native="showChannelModal" />
        </div>
        <div
        class="channel-check"
        style="background-color:rgba(0,0,0,0.5)"
        v-show="channelModal"
        @click="closeChannelModal"
        >
        <div class="channel-box" v-on:click.stop>
            <div class="channel-box-padding">
              <div class="channel-box-text">
                <h2 class="channel-box-title">ちゃんねる作成</h2>
                <span @click="closeChannelModal" class="channel-box-cancel">×</span>
              </div>
            <p>チャンネルはユーザーとのコニュニケーションを取る場所です。自分でチャンネルを作ってみよう！(例:〇〇チャンネル)</p>
            <div class="channel-box-box">
              <input
                type="text"
                class="channel-box-input"
                v-model="channel"
              />
            </div>
            <div class="channel-box-button">
              <button
                class="channel-chack-box"
                @click="addChannel"
              >作成</button>
            </div>
          </div>
        </div>
      </div>
      <div
          class="group"
          v-for="channel in channels"
          :key="channel.id">
            <span class="check-2"></span>
            <span class="channel-margin" @click="channelMessage(channel)">{{ channel.channel_name }}</span>
      </div>
        <div class="direct">
        <div class="channelname-2">ダイレクトメッセージ</div>
      </div>
        <div class="direct-user" v-for="user in users" :key="user.user_id">
        <span class="check-3"></span>
        <span class="usernames" @click="directMessage(user)">{{ user.displayName }}</span>
      </div>
    </div>
      <div class="masseage-screen">
      <!--            -->
      <!--   header   -->
      <!--            -->
        <header class="head">
          <div class="header-box">
          <div class="header-text">
            <div class="header-name">{{ channel_name }}</div>
          </div>
          <div class="header-button">
            <button class="button-out" @click="signOut">サインアウト</button>
          </div>
        </div>
      </header>


      <!--          -->
      <!--   main   -->
      <!--          -->
        <main class="main-screen">
          <div class="main-message">
            <div class="main-message-box">
            <p>メッセージ一覧</p>
              <div class="main-message-box">
                <div class="main-message-name" v-for="message in messages" :key="message.key">
                <Avator :user="message.user" class="avator"/>
                  <div class="main-message-text">
                  <div class="main-name">{{ message.displayName }}</div>
                  <div class="message-talk">{{ message.content }}</div>
                </div>
              </div>
            </div>
          </div>
            <div class="message-text-box">
            <textarea
              class="message-text-input"
              :placeholder="placeholder"
              v-model="message"
            ></textarea>
              <div class="message-text-send">
              <button
                class="send"
                @click="sendMessage"
              >送信</button>
            </div>
          </div>
        </div>
      </main> 
    </div>
  </div>  
</template>

<style>
.home-screen{
  display: flex;
  height: 100vh;
  width: 100%;
}
.home-sideber{
  width: 270px;
  padding: 10px;
  background-color: #3366FF;
  color: #fff;
}
.home-sideber-title{
  display: flex;
  justify-content: space-between;
}
.title{
  font-size: 30px;
  font-weight: bold;
  font-family: 'Teko', sans-serif;
  margin-top: 4px;
  margin-bottom: 8px;
  color: white;
}
.sideber-username{
  display: flex;
  text-align: center;
}
.check{
  background-color:#98FB98;
  border-radius: 20px;
  width: 13px;
  height: 13px;
  margin: 4px;
}
.name{
  font-size: 15px;
  font-weight: bold;
  opacity: 0.7;
  position: relative;
  color: white;
}
.name-screen{
  z-index: 10px;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
}
.name-box{
  background-color: #fff;
  z-index: 10px;
  color: #000;
  width: 500px;
  height: 300px;
  border-radius: 20px;
  margin-top: 200px;
}
.name-box-padding{
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.name-box-change{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name-box-title{
  font-size: 30px;
  color: #000;
  line-height: 10px;
  font-weight: bold;
  margin-left: 100px;
}
.name-box-cancel{
  font-size: 30px;
  font-weight: bold;
}
.name-box-name{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin-top: 30px;
}
.name-box-box{
  margin-bottom: 30px;
  width: 460px;
}
.name-box-input{
  width: 100%;
  height: 50px;
  border: #000;
  border-radius: 20px;
  border-style: solid;
  padding: 10px;
}
.name-box-click{
  display: flex;
  justify-content: space-around;
}
.name-box-button{
  font-size: 20px;
  color: #fff;
  background-color: #33CC66;
  padding: 10px 50px;
  border-radius: 20px;
}
.channel-bar{
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 20px 0 0 0px;
}
.channelname{
  font-size: 20px;
  font-weight: bold;
  color: white;
}
.channelname-2{
  font-size: 20px;
  font-weight: bold;
  color: white;
}
.channelbutton{
  width: 115px;
  height: 30px; 
  line-height: 28px;
  border-width: 2px;
  border-style: solid;
  border-color: #fff;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  padding-left: 3px;
  margin: 5px 0px 15px 0px;
}
.channel-check{
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
}
.channel-box{
  background-color: #fff;
  z-index: 10px;
  color: #000;
  width: 500px;
  height: 370px;
  border-radius: 20px;
  margin-top: 0px;
}
.channel-box-padding{
  flex-direction: column;
  display: flex;
  padding: 20px;
}
.channel-box-text{
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.channel-box-title{
  font-size: 30px;
  color: #000;
  font-weight: bold;
  margin-left: 120px;
}
.channel-box-cancel{
  font-size: 30px;
  color: #000;
  font-weight: bold;
}
p{
  font-size: 20px;
  color: #000;
  line-height: 35px;
}
.channel-box-box{
  width: 430px;
  height: 40px;
  margin: 20px;
}
.channel-box-input{
  width: 100%;
  height: 50px;
  border: #000;
  border-radius: 20px;
  border-style: solid;
  padding: 10px;
  color: #000;
}
.channel-box-button{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.channel-chack-box{
  width: 130px;
  height: 50px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  background-color: #33CC66;
  color:#fff;
}
.group{
  font-size: 18px;
  font-weight: bold;
  display: flex;
  opacity: 0.7;
  position: relative;
}
.group::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: #FFCC00;
  transition: all 0.3s ease 0s;
}
.group:hover {
  cursor: pointer;
}
.group:hover::after {
  width: 100%;
}
.check-2{
  background-color:#98FB98;
  border-radius: 20px;
  width: 13px;
  height: 13px;
  margin: 4px;
  margin-top: 20px;
}
.channel-margin{
  margin-top: 15px;
  margin-left: 5px;
}
.direct{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.direct-user{
  display: flex;
  text-align: center;
  margin-top: 16px;
}
.check-3{
  background-color:#98FB98;
  border-radius: 20px;
  width: 13px;
  height: 13px;
  margin: 4px;
  margin-top: 6px;
  margin-right: 13px;
  opacity: 0.7;
}
.masseage-screen{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #EEFFFF;
}
.head{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom-width: 4px;
  border-bottom-color: #3366FF;
}
.header-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.header-text{
  display: flex;
  justify-content: space-between;
}
.header-name{
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
}
.header-button{
  display: flex;
}
.button-out{
  height: 60px;
  background:	#98FB98;
  padding: 14px 22px;
  color: #fff;
  box-shadow: 0 5px black;
  font-size: 18px;
  font-weight: bold;
  border-radius:20px;
}
.main-screen{
  overflow-y: scroll;
  flex-grow: 1;
}
.main-message{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main-message-box{
  flex-flow: 1;
  overflow-y: scroll;
  height: 100%;
}
.main-message-name{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  margin-left: 30px;
}
.avator{
  width: 40px;
  height: 40px;
}
.main-message-text{
  margin-left: 10px;
}
.main-name{
  font-size: 20px;
  font-weight: bold;
}
.message-text-box{
  margin-bottom: 20px;
}
.message-text-input{
  width: 95%;
  padding-top: 20px;
  outline: thick double #3366FF;
  font-size: 20px;
}
.message-text-send{
  padding: 6px;
}
.send{
  width: 120px;
  height: 50px;
  background-color: #98FB98;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
}
.usernames{
  font-size: 15px;
  font-weight: bold;
  opacity: 0.7;
  position: relative;
  color: white;
}
.usernames::after {
	position: absolute;
	content: '';
	bottom: 0;
	left: 0;
	width: 0;
	height: 3px;
	background: #FFCC00;
	transition: all 0.3s ease 0s;
}
.usernames:hover {
	cursor: pointer;
}
.usernames:hover::after {
	width: 100%;
}

/*                       */
/*       レスポンシブ      */
/*                      */
@media (max-width: 560px) {
  .home-sideber{
  width: 130px;
  padding: 5px;
  }
  .title{
  font-size: 15px;
  margin: 15px 0;
  }
  .channelbutton{
  width: 100px;
  border-width: 2px;
  border-radius: 15px;
  font-size: 11px;
  padding-left: 4px;
  }
  .check{
  width: 12px;
  height: 12px;
  }
 .name{
  font-size: 14px;
  }
  .channel-bar{
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 30px 0 0 0px;
  }
  .channelname{
  font-size: 15px;
  margin-top: 2px;
  margin-left: 3px;
  margin-bottom: 0px;
  }
  .check-2{
  width: 12px;
  height: 12px;
  }
  .channel-margin{
  margin-top: 16px;
  margin-left: 0%;
  font-size: 14px;
  width: 82%;
  display: flex;
  justify-content: flex-start;
  }
  .channelname-2{
  font-size: 12px;
  margin-top: 16px;
  margin: 0%;
  }
  .usernames{
  font-size: 13px;
  }
  .check-3{
  width: 12px;
  height: 12px;
  margin: 4px;
  margin-top: 1px;
  margin-right: 10px;
  opacity: 0.7;
  }
  .head{
  height: 90px;
  padding: 6px;
  }
  .header-box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  }
  .header-text{
  width: 76%;
  }
  .header-name{
  font-size: 18px;
  font-weight: bold;
  margin-left: 0px;
  margin-top: 20px;
  }
  .header-button{
  display: block;
  width: 25%;
  height: 60%;
  margin-top: 10px;
  }
  .button-out{
  width: 60%;
  height: 90%;
  background:	#98FB98;
  padding: 0px 0px;
  color: #fff;
  box-shadow: 0 5px black;
  font-size: 10px;
  font-weight: bold;
  border-radius:  30px;
  }
  p{
  font-size: 16px;
  }
  .main-name{
  font-size: 13px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  width: 90%;
  }
  .message-talk{
    width: 90%;
    display: flex;
    justify-content: flex-start;
  }
  .message-text-input{
  height: 50px;
  padding-top: 10px;
  font-size: 12px;
  }
  .main-message-text{
  margin-left: 10px;
  width: 90%;
  }
  .main-message-name{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  margin-left: 10px;
}
  .send{
  width: 120px;
  height: 40px;
  background-color: #98FB98;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  }
}

</style>



<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import PlusCircle from "../components/icons/PlusCircle";
// import Star from "../components/icons/Star";
import Avator from "../components/Avator";


export default {
  components: {
    PlusCircle,
    // Star,
    Avator,
  },


  data() {
    return {
      user: "",
      users: [],
      channel_name: '',
      accout:"",
      accouts:[],
      message: "",
      messages: [],
      placeholder: "",
      channel_id: "",
      channelModal: false,
      accoutModal:false,
      channel:"",
      channels: [],
    };
  },


  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/signin");
    },
    sendMessage() {
      const newMessage = firebase
        .database()
        .ref("messages")
        .child(this.channel_id)
        .push();

      const key_id = newMessage.key;

      newMessage.set({
        key: key_id,
        content: this.message,
        user: this.user.email,
        displayName:this.user.displayName,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });

      this.message = "";
    },

    directMessage(user) {
      this.messages = [];
      this.user.uid > user.user_id
        ? (this.channel_id = this.user.uid + "-" + user.user_id)
        : (this.channel_id = user.user_id + "-" + this.user.uid);

      this.channel_name = user.displayName;
      this.placeholder = user.displayName + "へのメッセージ";

      firebase
        .database()
        .ref("messages")
        .child(this.channel_id)
        .on("child_added", snapshot => {
          this.messages.push(snapshot.val());
        });
        },
        showChannelModal() {
          this.channelModal = true;
        },
        closeChannelModal() {
          this.channelModal = false;
        },

      addChannel() {
          const newChannel = firebase
            .database()
            .ref("channel")
            .push();

          const key_id = newChannel.key;

          newChannel
            .set({
              channel_name: this.channel,
              id: key_id
            })
            .then(() => {
              this.channelModal = false;
            });

          this.channel = ''
        },

          showAccoutModal() {
          this.accoutModal = true;
        },
        closeAccoutModal() {
          this.accoutModal = false;
        },

      createUser(){
        const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: this.accout,
        }).then(() => {
          firebase
            .database()
            .ref("users")      
            .child(user.uid)
            .update({
              displayName: user.displayName
            })
            .then(() => {
              this.$router.push("/");
            })
            .catch(e => {
              console.log(e);
            });
          console.log("success!");
        }).catch((error) => {
          console.log(error);
        });
      },

        channelMessage(channel) {
          this.messages = [];
          this.channel_name =channel.channel_name;
          this.placeholder =channel.channel_name + 'へのメッセージ';
          this.channel_id = channel.id;

          if (this.channel_id != "") {
            firebase
              .database()
              .ref("messages")
              .child(this.channel_id)
              .off();
          }

          firebase
            .database()
            .ref("messages")
            .child(channel.id)
            .on("child_added", snapshot => {
              this.messages.push(snapshot.val());
            });
        },
      },

  

      mounted() {
        this.user = firebase.auth().currentUser;

        firebase
          .database()
          .ref("users")
          .on("child_added", snapshot => {
            this.users.push(snapshot.val());
          });
        firebase
          .database()
          .ref("channel")
          .on("child_added", snapshot => {
            this.channels.push(snapshot.val());
          });

          firebase
          .database()
          .ref("accout")
          .on("child_added", snapshot => {
            this.channels.push(snapshot.val());
          });

          },
      beforeDestroy() {
        firebase
          .database()
          .ref("users")
          .off();

       firebase
          .database()
          .ref("messages")
          .child(this.channel_id)
          .off();
        },

}
</script>