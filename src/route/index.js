import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../components/chatBot/Chat'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/chat",
            component: Chat
        }
    ]
})