<template>
<!--              -->
<!--   sideber   -->
<!--              -->
  <div class="flex h-screen">
    <div class="w-1/5 bg-blue-600 text-white pt-3 px-4 border-r-4 border-gray-300">
      <div class="flex justify-between items-center">
        <h1 class="title">ChatChatChat</h1>
      </div>
      <div class="flex justify-between items-center">
        <!-- <span class="bg-green-300 rounded-full w-3 h-3 mr-2"></span> -->
        <span class="usernames" @click="directMessage(user.email)">{{ user.displayName }}</span>
        <PlusCircle @click.native="showAccoutModal" />
      </div>
        <div
        class="z-10 fixed top-0 left-0 h-full w-full flex items-center justify-center"
        style="background-color:rgba(0,0,0,0.5)"
        v-show="accoutModal"
        @click="closeAccoutModal"
        >
        <div class="z-20 bg-white text-gray-900 w-1/3 rounded-md" v-on:click.stop>
          <div class="flex flex-col p-6">
            <div class="flex justify-between items-center">
              <h2 class="text-3xl font-black leading-loose">アカウント名変更</h2>
              <span @click="closeAccoutModal" class="text-4xl">×</span>
            </div>
            <div class="mt-8 font-semibold">名前</div>
           <div class="my-3">
              <input
                type="text"
                class="w-full rounded border-gray-900 border-solid border p-3"
                v-model="accout"
              />
            </div>
            <div class="flex justify-end">
              <button
                class="px-8 py-2 rounded bg-green-900 font-bold text-white"
                @click="createUser"
              >OK!</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 flex justify-between items-center">
        <div class="channelname">ちゃんねる</div>
        <PlusCircle @click.native="showChannelModal" />
      </div>
      <div
        class="z-10 fixed top-0 left-0 h-full w-full flex items-center justify-center"
        style="background-color:rgba(0,0,0,0.5)"
        v-show="channelModal"
        @click="closeChannelModal"
        >
        <div class="z-20 bg-white text-gray-900 w-1/3 rounded-md" v-on:click.stop>
          <div class="flex flex-col p-6">
            <div class="flex justify-between items-center">
              <h2 class="text-3xl font-black leading-loose">チャンネルを追加する</h2>
              <span @click="closeChannelModal" class="text-4xl">×</span>
            </div>
            <p>チャンネルはユーザーとのコニュニケーションを取る場所です。自分でチャンネルを作ってみよう！(例: 漫画)</p>
            <div class="mt-8 font-semibold">名前</div>
           <div class="my-3">
              <input
                type="text"
                class="w-full rounded border-gray-900 border-solid border p-3"
                v-model="channel"
              />
            </div>
            <div class="flex justify-end">
              <button
                class="px-8 py-2 rounded bg-green-900 font-bold text-white"
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
            <span class="bg-green-300 rounded-full w-3 h-3 mr-2 my-3"></span>
            <span class="my-2" @click="channelMessage(channel)">{{ channel.channel_name }}</span>
      </div>
      <div class="mt-5 flex justify-between items-center">
        <div class="channelname">ダイレクトメッセージ</div>
      </div>
      <div class="mt-4 flex items-center" v-for="user in users" :key="user.user_id">
        <span class="bg-green-300 rounded-full w-3 h-3 mr-2"></span>
        <span class="usernames" @click="directMessage(user)">{{ user.displayName }}</span>
      </div>
    </div>


    <div class="flex flex-col flex-grow bg-gray-100">
      <!--            -->
      <!--   header   -->
      <!--            -->
      <header class="border-b-2 border-gray-300">
        <div class="flex justify-between m-3">
          <div class="flex">
            <Star />
            <div class="font-bold text-lg text-3xl ml-2">{{ channel_name }}</div>
          </div>
          <div class="flex items-center">
            <button class="button" @click="signOut">サインアウト</button>
          </div>
        </div>
      </header>


      <!--          -->
      <!--   main   -->
      <!--          -->
      <main class="overflow-y-scroll flex-grow">
        <div class="flex flex-col ml-6 h-full">
          <div class="flex-grow overflow-y-scroll">
            <p>メッセージ一覧</p>
            <div class="flex-grow overflow-y-scroll">
              <div class="mt-2 mb-4 flex" v-for="message in messages" :key="message.key">
                <Avator :user="message.user" />
                <div class="ml-2">
                  <div class="font-bold">{{ message.user }}</div>
                  <div>{{ message.content }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="border border-gray-900 rounded mb-4">
            <textarea
              class="w-full pt-4 pl-8 outline-none"
              :placeholder="placeholder"
              v-model="message"
            ></textarea>
            <div class="bg-gray-100 p-2">
              <button
                class="bg-green-500 text-sm text-white font-bold py-2 px-12 rounded"
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
.title{
  font-size: 30px;
  font-weight: bold;
  font-family: 'Teko', sans-serif;
  margin-top: 4px;
  margin-bottom: 8px;
  color: white;
}

.channelname{
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.usernames{
  font-size: 15px;
  font-weight: bold;
  opacity: 0.7;
  position: relative;
  color: white;
  margin-top: px;
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
</style>



<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import PlusCircle from "../components/icons/PlusCircle";
import Star from "../components/icons/Star";
import Avator from "../components/Avator";

export default {
  components: {
    PlusCircle,
    Star,
    Avator
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

      // addAccout() {
      //     const newAccout = firebase
      //       .database()
      //       .ref("accout")
      //       .push();

      //     const key_id = newAccout.key;

      //     newAccout
      //       .set({
      //         accout_name: this.accout,
      //         id: key_id
      //       })
      //       .then(() => {
      //         this.accoutModal = false;
      //       });

      //     this.accout = ''
      //   },
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