let counter: number = 0

export default defineEventHandler((event) => {
  console.log(event, 'event');
  
  counter += 1
  return {
    name: 'Ryan',
    gender: 'male',
    email: '111@qq.com',
    counter,
  }
})
