import '../styles/globals.css'
import '../styles/nprogress.css'
import { Provider } from "../context/index.js"
import Router from 'next/router'
import Nprogress from 'nprogress'
Nprogress.configure({ showSpinner: false });
Nprogress.configure({ minimum: 0.8});
Nprogress.configure({ easing: 'ease-in', speed: 500 });

function MyApp({ Component, pageProps }) {

  Router.events.on('routeChangeStart',(url)=>{
    Nprogress.start();
  })

  Router.events.on('routeChangeComplete',(url)=>{
    Nprogress.done();
  })
  
  Router.events.on('routeChangeError',(url)=>{
    Nprogress.done();
  })


  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )

}

export default MyApp
