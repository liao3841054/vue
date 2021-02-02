// Vue.component("todo-item", {
//   props: ["todo", "pre"],
//   template: "<li>{{pre}} {{todo.text}}</li>",
// });

Vue.component("todo-item", {
  template:
    "\
      <li>\
        {{ title }}\
        <button v-on:click=\"$emit('remove')\">Remove</button>\
      </li>\
    ",
  props: ["title"],
});

// 定义一个名为 button-counter 的新组件
Vue.component("button-counter", {
  data: function () {
    return { count: 0 };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});

Vue.component("alert-box", {
  template:
    '\
      <div class="demo-alert-box">\
        <strong>Error!</strong>\
        <slot></slot>\
      </div>\
    ',
});

var app = new Vue({
  el: "#app",
  data: {
    isActive: false,
    hasError: false,
    activeClass: "active",
    message: "当前时间： " + new Date().toLocaleTimeString(),
    hidden: false,
    pre: "开始学习",
    url: "http://www.baidu.com",
    answer: "I cannot give you an answer until you ask a question!",
    answerPic: "",
    question: "",
    awesome: 1,
    ok: 1,
    bigRedStyle: {
      color: "red",
      fontSize: "44px",
    },
    isButtonDisabled: false,
    todos: [
      {
        // id: 1,
        text: "Java",
      },
      {
        // id: 2,
        text: "Android",
      },
      {
        // id: 3,
        text: "iOS",
      },
    ],
    items: [
      {
        // id: 1,
        msg: "Java",
      },
      {
        // id: 2,
        msg: "Android",
      },
      {
        // id: 3,
        msg: "iOS",
      },
    ],

    sets: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ],
    object: {
      title: "How to do lists in Vue",
      author: "Jane Doe",
      publishedAt: "2016-04-10",
    },
    newTodoText: "",
    todos: [
      {
        id: 1,
        title: "Do the dishes",
      },
      {
        id: 2,
        title: "Take out the trash",
      },
      {
        id: 3,
        title: "Mow the lawn",
      },
    ],
    nextTodoId: 4,
    // selected: "",
    selected: [],
    age: 10,
    show: true,
  },
  watch: {
    question: function (newQ, oldQ) {
      this.answer = "Waiting for you to stop typing...";
      this.debouncedGetAnswer();
    },
  },
  beforeCreate() {
    console.log("beforeCreate--" + this.message);
  },
  created() {
    console.log("created--" + this.message);
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  mounted() {
    console.log("mounted--" + this.message);
  },
  destroyed() {
    console.log("destroyed--" + this.message);
  },
  updated() {
    console.log("updated--" + this.message);
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
      });
      this.newTodoText = "";
    },
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0;
      });
    },
    getAnswer() {
      if (this.question.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
        return;
      }
      this.answer = "Thinking...";
      var vm = this;
      axios
        .get("https://yesno.wtf/api")
        .then(function (response) {
          console.log("answer: " + JSON.stringify(response));
          vm.answer = _.capitalize(response.data.answer);
          vm.answerPic = response.data.image;
        })
        .catch(function (error) {
          vm.answer = "Error! Could not reach the API. " + error;
        });
    },
    reverseMessage() {
      //   if (app.message == "111111111") {
      //     app.message = "哈哈哈哈";
      //   } else {
      //     app.message = "111111111";
      //   }
      this.message = this.message.split("").reverse().join("");
      this.isButtonDisabled = !this.isButtonDisabled;
      this.url = "http://www.jd.com";
      this.hasError = true;
      this.isActive = true;
    },
  },
});

app.todos.push({ text: "ssssss" });
console.log("HEllo--");

console.log(app.$data);
// console.log(vue.$el);s
app.$watch("message", function (n, o) {
  console.log("new:" + n + " old:" + o);
});
