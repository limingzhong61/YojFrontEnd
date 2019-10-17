<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="problem" style="display:block;">
          <div class="input-group mb-3 col-md-6 offset-md-3">
            <div class="input-group-prepend">
              <span class="input-group-text">题目</span>
            </div>
            <input
              name="title"
              type="text"
              v-model="title"
              :class="{'form-control': true,'is-invalid': title == '','is-valid': title != ''}"
              placeholder="题目"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <div class="invalid-feedback">题目不能为空.</div>
          </div>
          <div>
            <div class="input-group mb-3 col-md-6 offset-md-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">时间限制(ms)</span>
              </div>
              <input
                name="timeLimit"
                v-model="timeLimit"
                type="number"
                :class="{'form-control': true,'is-invalid': timeLimit == '','is-valid': timeLimit != ''}"
                placeholder="时间限制(ms)"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <div class="invalid-feedback">时间限制不能为空.</div>
            </div>
            <div class="input-group mb-3 col-md-6 offset-md-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon2">内存限制(MB)</span>
              </div>
              <input
                name="memoryLimit"
                v-model="memoryLimit"
                type="number"
                :class="{'form-control': true,'is-invalid': memoryLimit == '','is-valid': memoryLimit != ''}"
                placeholder="内存限制(MB)"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <div class="invalid-feedback">内存限制不能为空.</div>
            </div>
          </div>
          <div class="des">
            <!-- 问题描述组件 -->
            <TextEditor
              v-model="problem[item.id]"
              :isClear="isClear"
              :title="item.title"
              v-for="item in textEditors"
              :key="item.id"
            ></TextEditor>
            <div class="sec_header">
              判题用例
              <button class="btn btn-primary btn-sm" @click="addCase">添加用例</button>
            </div>
            <div class="col-12 mb-3">
              <div class="mb-3">注意：判题用例最多不能超过10个</div>
              <div>
                <judge-case
                  v-model="judgeData[index]"
                  v-for="(item,index) in judgeData"
                  :key="index"
                  :index="index"
                  @toDelCase="toDelCase(index)"
                ></judge-case>
              </div>
            </div>
            <div class style="color: red; text-align: center" hidden="hidden">提交题目信息错误，请检查提交容纳是否有误！</div>
            <div style="display: flex; justify-content: center;">
              <button
                @click="addProblem"
                class="btn btn-primary btn-lg justify-content-sm-center"
                type="submit"
              >添加题目</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextEditor from "../../components/TextEditor/TextEditor.vue";
import JudgeCase from "../../components/JudgeCase/JudgeCase.vue";
import request from "../../api/ajax.js";
export default {
  data() {
    return {
      textEditors: [
        {
          title: "问题描述",
          id: "description"
        },
        {
          title: "输入格式",
          id: "formatInput"
        },
        {
          title: "输出格式",
          id: "formatOutput"
        },
        {
          title: "样例输入",
          id: "sampleInput"
        },
        {
          title: "样例输出",
          id: "sampleOutput"
        },
        {
          title: "提示",
          id: "hint"
        }
      ],
      problem: {},
      isClear: false,
      title: "",
      timeLimit: "",
      memoryLimit: "",
      judgeData: []
    };
  },
  components: {
    TextEditor,
    JudgeCase
  },
  methods: {
    addCase() {
      this.judgeData.push({ in: "", out: "" });
    },
    addProblem() {
      this.problem.judgeData = JSON.stringify(this.judgeData);
      //   console.log(this.problem.judgeData == "[]")
      this.problem.title = this.title;
      this.problem.timeLimit = this.timeLimit;
      this.problem.memoryLimit = this.memoryLimit;
      //   console.log(this.problem.judgeData)
      console.log(this.problem);
      if (
        this.problem.title == "" ||
        this.problem.timeLimit == "" ||
        this.problem.memoryLimit == "" ||
        this.problem.JudgeCase == "[]"
      ) {
        return;
      }
      console.log('in')
      request({
        url: "/problem/add",
        method: "POST",
        data: this.problem
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$router.replace("/problem/view/" + res.data.extend.pid)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toDelCase(index) {
      this.judgeData.splice(index - 1, 1);
    },
  }
};
</script>
<style>
.problem .des {
  margin: 20px 80px 12px 80px;
  padding: 16px 40px 16px 40px;
  background: #e4f1ff;
}

* {
  margin: 0;
  padding: 0;
  font-family: "宋体", "Times New Roman";
}

.problem .des .sec_header,
.problem .des .pdsec {
  font-family: "微软雅黑", "黑体", "宋体";
  margin: 16px 0px 8px 0px;
  font-size: 16px;
}

.invalid-feedback {
  font-size: 1rem;
}
</style>