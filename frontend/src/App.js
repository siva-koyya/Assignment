import './App.css';
import Home from './components/Home';
import AddSale from './components/AddSale';
// import SaleOrderForm from './components/Form';
import CompletdSale from './components/CompletdSale';
import Login from './components/Login'
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import ActiveSaleComponent from './components/ActiveSale/ActiveComponent';
 
const rooter=createBrowserRouter(
  
  [
    {path:'/',element:<Login/>},
    {path:"home",element:<Home/>,
    children:[
    {index:'activesale',element:<ActiveSaleComponent/>},
    {path:"completedsale",element:<CompletdSale/>},
    {path:"addSale",element:<AddSale></AddSale>},
    ],
  },
  ]
);

function App() {
  return (
    <RouterProvider router={rooter}/>
  );
}

export default App;
