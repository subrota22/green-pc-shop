
const dataShow =  () => {
 let newData = "" ;

   fetch('https://my-json-server.typicode.com/savayer/demo/posts')
   .then((res) => res.json() )
   .then(data => newData = data ) ;
   return   console.log(newData);
}

dataShow() ;

