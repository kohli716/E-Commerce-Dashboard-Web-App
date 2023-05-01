
import './App.css';
import Nav from "./components/Nav"
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Footer from "./components/Footer"
import Signup from "./components/Signup"
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Nav />
      <h1>
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/" element ={<ProductList/>}/>
          <Route path="/add" element ={<AddProduct/>}/>
          <Route path="/update/:id" element ={<UpdateProduct/>}/>
          <Route path="/profile" element ={<h1> profile of component</h1>}/>
          <Route path="/logout" element ={<h1> logout from component</h1>}/>
          </Route>

            <Route path="/Signup" element ={<Signup/>}/>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/home" element ={<Home/>}/>


        </Routes>
      </h1>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
