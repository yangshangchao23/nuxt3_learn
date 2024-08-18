const todos = [
  { id: 1, title: "Learn Angular 2", completed: false },
  { id: 2, title: "Learn RxJS", completed: false },
  { id: 3, title: "Learn TypeScript", completed: false },
  { id: 4, title: "Learn Redux", completed: false },
];

const today = {
  weather: "sunny",
  temp: 20,
};

// 导出一个接口
export default (event: Event) => {
    console.log(event, 'event');
    
    return todos
}


// 导出多个接口--不对！导出多个接口怎么处理呢？
// Define the API handler
// export default defineEventHandler((event) => {
//   const path = event.node.req.url;

//   if (path === '/api/todo') {
//     return todos; // Return todos when /api/todo is called
//   } else if (path === '/api/today') {
//     return today; // Return today when /api/today is called
//   } else {
//     return { message: 'Not Found' }; // Handle other paths
//   }
// });
