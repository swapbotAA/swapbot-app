<template>
	<div class="container">
        <img class="head" src="../../assets/logo.svg"/>

        <div class="content">
			<div v-html="contentText" class="markdown leading-7">
  			</div>
			<!-- <div class="text">{{ contentText }}</div> -->
				<!-- <div class="text" v-show="initPosition !== contentText.length" :style="{ display: initPosition % 2 == 0 || initPosition == total ? 'hidden' : 'inline-block' }">|</div> -->
        </div>

    </div>
</template>

<script>
import {marked} from 'marked';
import hljs from 'highlight.js';
marked.setOptions({
			highlight: function (code, lang) {
				try {
					if (lang) {
						return hljs.highlight(code, { language: lang }).value
					} else {
						return hljs.highlightAuto(code).value
					}
				} catch (error) {
					return code
				}
			},
			gfmtrue: true,
			breaks: true
		});
export default {
	name: 'TypeWriter',
	props: {
		contentList: {
			type: Array,
			required: true
		},
		delaytime: {
			type: Number,
			default: 100
		},
		uid: {
			type: String | Number
		}
	},
	data() {
		return {
			timer: null,
			contentText: '',
			initPosition: 0,
			total: 0
		};
	},
	watch: {
		contentList(newvalue) {
			const me = this;
			clearInterval(me.timer);
			me.timer = null;
			me.initWriter(newvalue);
		}
	},
	mounted() {
		const me = this;
		console.log(me);
		me.initWriter(me.contentList);
	},
	methods: {
		initWriter(messageList) {
			const me = this;
			const text = messageList.join('');
			// me.initPosition =;
			me.total = marked.parse(text).length;
			console.log("messageList: ", text);
			console.log("marked.setOptions: ", marked.parse(text));
			me.getChatContent(marked.parse(text));
		},
		// 逐字显示内容,text:全部聊天内容
		getChatContent(text) {
			const me = this;
			// 定义当前定时器
			let timer = setInterval(() => {
				me.initPosition++;
				// 判断是否全部拼接
				if (me.initPosition == me.total) {
					console.log(' me.total', me.total);
					// 拼接内容
					let nowStr = text.substring(0, me.initPosition);
					me.contentText = nowStr;
					// 重置起始值
					// me.initPosition = 0;

					// 拼接完成清除定时器
					clearInterval(me.timer);
					me.$emit('finish', me.uid, true);
					return;
				}

				// 未拼接完成的取字符串子串进行拼接更新
				let nowStr = text.substring(0, me.initPosition);
				me.contentText = nowStr;
			}, 10);
			me.timer = timer;
		},
		pause() {
			const me = this;
			clearInterval(me.timer);
			me.$emit('pause', me.uid, true);
		},
		continues() {
			const me = this;
			me.initWriter(me.contentList);
		},
		reset() {
			const me = this;
			me.initPosition = 0;
			me.initWriter(me.contentList);
		}
	}
};
</script>

<style scoped lang="scss">
.type-writer-container {
	width: 100%;
	height: auto;
}
.container {
        display: flex;
        padding: 10px 15px;
        margin-right: 60px;

        .head {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #eee;
        }

        .content {
            margin-left: 10px;
            margin-top: 10px;
			text-align: left;
            .text {
                background-color: deepskyblue;
                border-bottom-right-radius: 10px;
                padding: 5px 5px;
                font-size: 14px;
                color: #fff;
                white-space: pre-line;
                text-align: left;
            }

            .img {
                width: 100px;
                border-bottom-right-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }

    }
</style>