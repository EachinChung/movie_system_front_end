<template>
  <div class="bg">
    <div class="clock">
      <p class="date">...404 error page...</p>
      <p class="time">{{ time }}</p>
      <p class="text">{{ date }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'NotFound',
  setup() {
    const week = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ]
    const time = ref('')
    const date = ref('')

    const updateTime = () => {
      const now = new Date()
      time.value = `${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      date.value = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${
        week[now.getDay()]
      }`
    }

    onMounted(() => {
      updateTime()
      setInterval(updateTime, 1000)
    })

    return { time, date }
  },
}
</script>

<style lang="less" scoped>
.bg {
  background: #0f3854;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
  height: 100vh;

  .clock {
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);

    p {
      margin: 0;
      padding: 0;
    }

    .time {
      letter-spacing: 0.05em;
      font-size: 60px;
      padding: 5px 0;
    }

    .date {
      letter-spacing: 0.1em;
      font-size: 15px;
    }

    .text {
      letter-spacing: 0.1em;
      font-size: 12px;
      padding: 20px 0 0;
    }
  }
}
</style>