// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        username: 'John Doe',
        age: 30,
    }),
    actions: {
        setUsername(username) {
            this.username = username;
        },
        incrementAge() {
            this.age++;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'store_key', // 本地存储的 key
                storage: localStorage, // 存储位置：localStorage / sessionStorage
                paths: ['token', 'userInfo'], // 只存储部分字段（可选）
            }
        ]
    }
});
