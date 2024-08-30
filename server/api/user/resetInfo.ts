export default defineEventHandler((event) => {
  console.log(event, 'event');
  const counter = 0
  return {
    name: 'Ryan',
    gender: 'male',
    email: '111@qq.com',
    counter,
  }
})
